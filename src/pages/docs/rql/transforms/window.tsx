import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

const tumblingDuration = `create deferred view shop::sales_per_5s { total: int8 } as {
  from shop::events
  window tumbling { total: math::sum(value) } with { duration: 5s }
}`;

const tumblingCount = `create deferred view shop::every_three { total: int8 } as {
  from shop::events
  window tumbling { total: math::count(id) } with { count: 3 }
}`;

const sliding = `create deferred view shop::rolling_10s { total: int8 } as {
  from shop::events
  window sliding { total: math::sum(value) } with { duration: 10s, slide: 5s }
}`;

const session = `create deferred view shop::bursts { total: int8 } as {
  from shop::events
  window session { total: math::count(id) } with { gap: 5s }
}`;

const rolling = `create deferred view shop::last_5s { total: int8 } as {
  from shop::events
  window rolling { total: math::sum(value) } with { duration: 5s }
}`;

const grouped = `create deferred view shop::sales_by_category { category: utf8, total: int8 } as {
  from shop::events
  window tumbling { total: math::sum(value) } with { duration: 5s } by { category }
}`;

const eventTime = `create table shop::events { id: int4, category: utf8, value: int4, ts: datetime }
  with { time: event(ts) };

create deferred view shop::sales_per_5s { total: int8 } as {
  from shop::events
  window tumbling { total: math::sum(value) } with { duration: 5s, lateness: 2s }
}`;

const rejected = `create deferred view shop::bad { x: int4 } as {
  from shop::events
  window tumbling { x: id } with { count: 3 }
}`;

export function WindowPage() {
  return (
    <Layout
      title="window"
      description="How the window operator buckets a stream of rows by time or count inside a deferred view, and the tumbling, sliding, session, and rolling shapes it supports."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">window</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            <Code>window</Code> is{' '}
            <Link to="/docs/rql/transforms/aggregate" className="text-primary hover:text-primary-light font-medium transition-colors">aggregate</Link>{' '}
            over a moving stream. Instead of collapsing every row that ever arrived into
            one group, it slices rows into buckets - by time or by count - and emits one
            aggregate row per bucket. It only exists inside a{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">deferred view</Link>,
            where the flow engine keeps the buckets and updates them incrementally as
            rows are inserted, updated, and deleted.
          </p>
        </div>

        <Callout variant="warning" title="No live examples on this page">
          The playground engine on this site accepts <Code>window</Code> syntax but
          cannot demonstrate correct bucketing: it does not yet parse the table-level{' '}
          <Code>with {'{'} time: event(ts) {'}'}</Code> declaration, and without a controllable
          clock every insert lands in the same processing-time bucket. The snippets
          below are reference syntax, checked against the engine source and its test
          suite, not runnable here.
        </Callout>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Shape</h2>
          <p className="text-text-secondary mb-4">
            The operator names a window kind, lists the aggregates to compute per
            bucket, and configures the kind in a <Code>with</Code> block:
          </p>
          <RqlCodeBlock code={tumblingDuration} />
          <p className="text-text-secondary mt-4 mb-4">
            The aggregate block has the same rules as a view-level <Code>aggregate</Code>:
            every output must reduce to <Code>math::count</Code>, <Code>math::sum</Code>,{' '}
            <Code>math::avg</Code>, <Code>math::min</Code>, or <Code>math::max</Code> over a
            column or scalar expression, optionally combined with arithmetic (for
            example <Code>math::max(x) - math::min(x)</Code>). A bare column is rejected
            at view creation with <Code>FLOW_013</Code>:
          </p>
          <RqlCodeBlock code={rejected} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Window kinds</h2>
          <p className="text-text-secondary mb-4">
            Four kinds exist. <Code>tumbling</Code>, <Code>sliding</Code>, and{' '}
            <Code>rolling</Code> are sized by either a <Code>duration</Code> or a{' '}
            <Code>count</Code>; <Code>session</Code> is sized by a <Code>gap</Code>.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-bold">Kind</th>
                  <th className="py-2 pr-4 font-bold">Required keys</th>
                  <th className="py-2 pr-4 font-bold">Buckets</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border">
                  <td className="py-2 pr-4"><Code>tumbling</Code></td>
                  <td className="py-2 pr-4"><Code>duration</Code> or <Code>count</Code></td>
                  <td className="py-2 pr-4">Fixed, non-overlapping. Each row lands in exactly one bucket.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4"><Code>sliding</Code></td>
                  <td className="py-2 pr-4"><Code>duration</Code> or <Code>count</Code>, plus <Code>slide</Code></td>
                  <td className="py-2 pr-4">Fixed size, overlapping. A new bucket starts every <Code>slide</Code>; a row can belong to several.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4"><Code>session</Code></td>
                  <td className="py-2 pr-4"><Code>gap</Code></td>
                  <td className="py-2 pr-4">Variable size. Rows closer together than <Code>gap</Code> share a bucket; a silence longer than <Code>gap</Code> closes it.</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4"><Code>rolling</Code></td>
                  <td className="py-2 pr-4"><Code>duration</Code> or <Code>count</Code></td>
                  <td className="py-2 pr-4">One bucket, always the most recent span. Old rows fall out as new ones arrive.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mb-4">
            A count-sized tumbling window closes every N rows:
          </p>
          <RqlCodeBlock code={tumblingCount} />
          <p className="text-text-secondary mt-4 mb-4">
            A sliding window must name its <Code>slide</Code>, in the same domain as its
            size (a duration slide for a duration window, a number for a count window).
            The slide has to be positive and smaller than the size; the planner rejects
            anything else:
          </p>
          <RqlCodeBlock code={sliding} />
          <p className="text-text-secondary mt-4 mb-4">
            A session window groups activity by inactivity:
          </p>
          <RqlCodeBlock code={session} />
          <p className="text-text-secondary mt-4 mb-4">
            A rolling window is a single moving aggregate - the last five seconds, or
            the last three rows:
          </p>
          <RqlCodeBlock code={rolling} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Grouping</h2>
          <p className="text-text-secondary mb-4">
            A trailing <Code>by {'{'} ... {'}'}</Code> partitions the stream first, so
            each group gets its own set of buckets. The grouping columns appear in the
            view's output alongside the aggregates:
          </p>
          <RqlCodeBlock code={grouped} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Event time and processing time</h2>
          <p className="text-text-secondary mb-4">
            Which clock places a row in a bucket is a property of the source table, not
            of the window. A table declared <Code>with {'{'} time: processing {'}'}</Code>{' '}
            buckets by the moment the row was committed. A table declared{' '}
            <Code>with {'{'} time: event(col) {'}'}</Code> buckets by the value of a{' '}
            <Code>datetime</Code> column, so late-arriving rows still land in the window
            their timestamp belongs to:
          </p>
          <RqlCodeBlock code={eventTime} />
          <p className="text-text-secondary mt-4 mb-4">
            The <Code>lateness</Code> key only matters for event-time sources, and it is
            a memory-for-exactness trade for <Code>math::min</Code> and{' '}
            <Code>math::max</Code>. Without it, a window keeps every entry so that
            deleting a source row always yields the exact new minimum or maximum. With
            it, entries older than <Code>lateness</Code> behind the window's newest
            event are folded into a sealed scalar and forgotten: a late insert is still
            folded in (never dropped), but deleting a sealed row can no longer move the
            min or max. <Code>math::sum</Code> and <Code>math::count</Code> are
            invertible and retract exactly either way. Processing-time windows never
            seal, even when a <Code>lateness</Code> key is present.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Configuration keys</h2>
          <p className="text-text-secondary mb-4">
            The <Code>with</Code> block accepts exactly these keys; any other key is a
            parse error naming the valid list.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-bold">Key</th>
                  <th className="py-2 pr-4 font-bold">Value</th>
                  <th className="py-2 pr-4 font-bold">Applies to</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border">
                  <td className="py-2 pr-4"><Code>duration</Code></td>
                  <td className="py-2 pr-4">Positive duration literal (<Code>5s</Code>, <Code>1m</Code>)</td>
                  <td className="py-2 pr-4">tumbling, sliding, rolling</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4"><Code>count</Code></td>
                  <td className="py-2 pr-4">Positive integer</td>
                  <td className="py-2 pr-4">tumbling, sliding, rolling</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4"><Code>slide</Code></td>
                  <td className="py-2 pr-4">Duration or integer, same domain as the size, smaller than it</td>
                  <td className="py-2 pr-4">sliding (required)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4"><Code>gap</Code></td>
                  <td className="py-2 pr-4">Duration literal</td>
                  <td className="py-2 pr-4">session (required)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4"><Code>lag</Code></td>
                  <td className="py-2 pr-4">Duration literal</td>
                  <td className="py-2 pr-4">rolling with a <Code>duration</Code> size only</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 pr-4"><Code>lateness</Code></td>
                  <td className="py-2 pr-4">Duration literal</td>
                  <td className="py-2 pr-4">Any kind over an event-time source</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4"><Code>immutable</Code></td>
                  <td className="py-2 pr-4"><Code>true</Code> or a duration literal</td>
                  <td className="py-2 pr-4">Any kind</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mb-4">
            Duration values are bare literals here (<Code>5s</Code>, <Code>500ms</Code>,{' '}
            <Code>1m</Code>). A window sized with neither <Code>duration</Code> nor{' '}
            <Code>count</Code> is rejected.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What the view holds</h2>
          <p className="text-text-secondary mb-4">
            The view's rows are the buckets. A tumbling window over three rows with{' '}
            <Code>count: 3</Code> holds one row; five rows hold one closed bucket and one
            open one. Buckets are live: deleting a source row from an open bucket
            re-aggregates it, and deleting every row in a bucket removes the bucket's
            row from the view. Because a deferred view updates after commit, a query
            issued immediately after an insert may not see the new bucket yet - see{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>{' '}
            for the visibility rules.
          </p>
        </section>

        <Callout variant="note" title="window versus aggregate">
          Use{' '}
          <Link to="/docs/rql/transforms/aggregate" className="text-primary hover:text-primary-light font-medium transition-colors">aggregate</Link>{' '}
          when the group is defined by the data (one row per region, per customer).
          Use <Code>window</Code> when the group is defined by time or arrival order
          (one row per five seconds, per burst of activity, per batch of three).
          Both share the <Code>by</Code> clause and the same set of aggregate
          functions.
        </Callout>
      </div>
    </Layout>
  );
}
