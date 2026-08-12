---
title: "The Cron Job You Deleted"
slug: "the-cron-job-you-deleted"
date: "2026-08-12"
excerpt: "Refresh jobs exist because the database could not keep a number current. Incremental views remove the job."
readTime: "6 min read"
author: "Dominique"
---

You have written this cron job. Maybe not this exact one, but this shape: something that wakes up every five minutes, recomputes a number that was already correct four minutes ago, and hopes nobody looked in between.

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

## Closing

The refresh job was never a design decision. It was the thing you added because the database could not do this, and then it grew a lock, a queue, a cache invalidator, and a runbook. Every one of those parts exists to compensate for a number that goes stale on its own.

A view that updates on write does not need any of them. Delete the job, delete the lock, delete the service that dropped the cache. The aggregation is still there. It just lives in the engine now, next to the data it reads, running on the only occasion that could ever change the answer.

For the full mechanics, including when a view becomes visible to a reader and how views compose on top of other views, see [Build Incremental Views](/docs/guides/incremental-views).
