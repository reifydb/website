---
title: "The Cron Job You Deleted"
slug: "the-cron-job-you-deleted"
date: "2026-08-12"
excerpt: "Refresh jobs exist because the database could not keep a number current. Incremental views remove the job."
readTime: "9 min read"
author: "Dominique"
tags: ["database", "realtime", "dataengineering"]
---

You have written this cron job. Maybe not this exact one, but this shape: something that wakes up every five minutes, recomputes a number that has been wrong for four of them, and hopes nobody looked.

## What Stale Actually Costs

The refresh job is not the problem. The window is. Between runs, the dashboard is wrong. Not broken, not erroring, just wrong, with a timestamp that looks fresh. You hear about it from someone who trusted it.

So the job gets defended. The refresh starts taking longer than the interval, so you add a lock. Two views need it in order, so you add a queue. Something has to drop the cache after the refresh lands, so you write a service whose entire job is knowing which keys to delete. None of that is your product. It is scaffolding around a database that cannot hold a derived number current on its own.

And nearly all of the work is waste. One order lands in one region. The refresh rescans every region, re-sums every row ever written, and writes back a result where exactly one number changed.

## The View Is The Query

Start with a table.

```rql
create namespace shop002;
create table shop002::orders { id: int4, region: utf8, total: float4, status: utf8 }
```

Now the revenue rollup, as a view.

```rql
create deferred view shop002::revenue_by_region { region: utf8, revenue: float4 } as {
  from shop002::orders
  filter { status == "paid" }
  aggregate { revenue: math::sum(total) } by { region }
}
```

That is the whole thing. No schedule, no trigger, no worker deployed beside it, no second copy of the aggregation logic living in application code. The query **is** the definition, and the definition is what runs on every write.

## Nothing Refreshes It

Three orders arrive. Two are paid, one is still pending.

```rql
insert shop002::orders [
  { id: 1, region: "north", total: 120.00, status: "paid" },
  { id: 2, region: "south", total: 80.50, status: "paid" },
  { id: 3, region: "north", total: 240.00, status: "pending" }
]
```

Read the view.

```rql
from shop002::revenue_by_region
sort { region: asc }
```

Two regions, paid rows only. The pending 240 is not in there, because the filter is part of the view and the filter ran on the way in.

Notice what did not happen. No job ran between the insert and the read. Nothing was scheduled, nothing was invalidated, nothing was waiting to catch up. There was no refresh to run, because the view was never behind.

## One Row In, One Row Out

One more paid order, in `north` only.

```rql
insert shop002::orders [
  { id: 4, region: "north", total: 300.00, status: "paid" }
]
```

Read the view again.

```rql
from shop002::revenue_by_region
sort { region: asc }
```

`north` moved from 120 to 420. `south` is untouched, and it was not recomputed to arrive at that. The engine did not rescan `orders`, did not re-sum rows it had already summed, and did not visit the `south` group at all. It took one row, worked out which group it belonged to, and adjusted that group.

This is the part that matters at scale. With a refresh job, inserting the millionth order costs a scan of a million rows, because the job has no idea what changed and has to assume everything did. Here it costs one row. The work is proportional to the change, not to the size of the table, so the cost of staying current stops growing with your data.

## The Number Can Go Down

Inserts are the easy half. Order 2 was keyed wrong: the total was 180.50, not 80.50.

```rql
update shop002::orders { total: 180.50 } filter { id == 2 }
```

Read the view.

```rql
from shop002::revenue_by_region
sort { region: asc }
```

`south` is 180.50 now. `north` did not move.

An update is two changes, not one. The old row leaves the sum and the new row joins it, so the engine subtracts 80.50 from `south`, adds 180.50, and stops. It did not re-sum the other `south` rows, and it did not visit `north` at all.

Subtraction is the half a refresh job cannot do. The job keeps no record of what any row contributed, so the only way it can take 80.50 back out of a total is to rebuild that total from zero. That is the real reason refresh cost tracks table size instead of change size. A view that can retract does not have that problem.

## Membership Is Not Decided At Insert

Order 3 was pending, so the view never counted it. It gets paid.

```rql
update shop002::orders { status: "paid" } filter { id == 3 }
```

```rql
from shop002::revenue_by_region
sort { region: asc }
```

`north` went from 420 to 660. A row entered the view without an insert.

Now a refund lands on order 1.

```rql
update shop002::orders { status: "refunded" } filter { id == 1 }
```

```rql
from shop002::revenue_by_region
sort { region: asc }
```

`north` dropped to 540. A row left the view without a delete.

The filter is not a gate the row passes once on the way in. It is re-tested on every change to that row, and the answer is allowed to flip in both directions. This is the failure that hides in most hand-rolled incremental caches: they add on insert, nobody remembers that `status` is a column that changes, and the total drifts upward forever because no run ever takes anything back out.

## A Row Can Change Groups

Order 4 was booked against the wrong region.

```rql
update shop002::orders { region: "south" } filter { id == 4 }
```

```rql
from shop002::revenue_by_region
sort { region: asc }
```

One row changed and two groups moved. `north` gave up 300, `south` took it. The engine did not have to enumerate the regions to work that out, and no third group was touched to confirm it was unaffected.

## Delete Is The Same Machinery

After the refund, `north` is holding exactly one paid order: id 3. Delete it.

```rql
delete shop002::orders filter { id == 3 }
```

```rql
from shop002::revenue_by_region
sort { region: asc }
```

`north` is not in the result. Not zero, not `none`, not a leftover row still claiming 240. The group is gone, because the group only ever existed for as long as a row produced it.

A delete is the retraction half of an update with nothing added back. Same path, same cost, one row. There is no separate deletion code to write, no tombstone to sweep, and no run to schedule that notices the group emptied out.

## Closing

The refresh job was never a design decision. It was the thing you added because the database could not do this, and then it grew a lock, a queue, a cache invalidator, and a runbook. Every one of those parts exists to compensate for a number that goes stale on its own.

A view that updates on write does not need any of them. Delete the job, delete the lock, delete the service that dropped the cache. The aggregation is still there. It just lives in the engine now, next to the data it reads, running on the only three occasions that could ever change the answer: a row arrives, a row changes, a row goes away.

For the full mechanics, including when a view becomes visible to a reader and how views compose on top of other views, see [Build Incremental Views](/docs/guides/incremental-views).
