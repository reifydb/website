import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { AsciiDiagram, Callout, RqlCodeBlock } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function WindowedAggregationGuidePage() {
  return (
    <Layout
      title="Windowed Aggregation"
      description="A step-by-step guide to per-window totals with a deferred view: declare event time on the table, write the window, feed it events, and read and trust the results."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Windowed Aggregation</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A windowed aggregation cuts a stream of timestamped rows into buckets of time
            and keeps one aggregate per bucket, updated as rows arrive. In ReifyDB it is a{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">deferred view</Link>{' '}
            with a <Code>window</Code> operator in it: you declare which column carries
            time, write the aggregate once, and the engine maintains every bucket, including
            the ones that late or deleted rows change after the fact. This guide builds a
            per-category, five-second sales total from scratch.
          </p>
        </div>

        <Callout variant="warning" title="Needs a newer engine than the playground runs">
          The in-browser engine on this site rejects the table-level time declaration in
          step 1 (<Code>AST_005</Code>), so the snippets on this page are shown, not
          runnable. Every result below is taken from the engine's own test scripts and runs
          unchanged on a current server.
        </Callout>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Goal</h2>
          <p className="text-text-secondary mb-4">
            Events land in a table with a timestamp, a category, and a value. We want a
            table of totals: one row per category per five-second window, current as soon
            as an event commits, corrected if an event is deleted, and tolerant of events
            that arrive a little out of order.
          </p>
          <AsciiDiagram label="what we are building">
{`shop::events                          shop::totals (deferred view)
id | category | ts     | value          category | total
---+----------+--------+------          ---------+------
1  | A        | 1.000s | 10    window   B        | 70      <- 0s..5s, B
2  | A        | 2.000s | 20    tumbling A        | 30      <- 0s..5s, A
3  | B        | 3.000s | 30    5s by
4  | B        | 4.000s | 40    category`}
          </AsciiDiagram>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">1. Declare where time comes from</h2>
          <p className="text-text-secondary mb-4">
            A window needs a clock. The table declares it with a <Code>time</Code> setting:{' '}
            <Code>event(ts)</Code> says that the <Code>ts</Code> column is the event's
            time, and every window over this table buckets by that column rather than by
            when the row happened to be inserted.
          </p>
          <RqlCodeBlock code={`create namespace shop;
create table shop::events {
  id: int4,
  category: utf8,
  ts: datetime,
  value: int4
} with { time: event(ts) }`} />
          <p className="text-text-secondary mt-4 mb-4">
            The alternative is <Code>with {'{'} time: processing {'}'}</Code>, which buckets
            rows by the engine's clock at the moment they are processed. Processing time is
            the right choice when rows carry no meaningful timestamp of their own; event
            time is the right choice whenever they do, because it gives the same answer no
            matter how late a row shows up.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">2. The view</h2>
          <RqlCodeBlock code={`create deferred view shop::totals { category: utf8, total: int8 } as {
  from shop::events
  window tumbling { total: math::sum(value) } with { duration: 5s } by { category }
}`} />
          <p className="text-text-secondary mt-4 mb-4">
            Read the operator left to right. <Code>tumbling</Code> is the window kind:
            fixed, back-to-back buckets that do not overlap. The block holds the
            aggregates, named like <Code>map</Code> fields; only aggregate expressions are
            allowed here (<Code>math::count</Code>, <Code>sum</Code>, <Code>avg</Code>,{' '}
            <Code>min</Code>, <Code>max</Code>, and arithmetic over them), and a bare
            column is rejected with <Code>FLOW_013</Code>. <Code>with</Code> carries the
            window's parameters; a tumbling window takes <Code>duration</Code>. The
            optional <Code>by</Code> keys the window, so each category gets its own set of
            buckets.
          </p>
          <p className="text-text-secondary mb-4">
            The view's declared columns are the <Code>by</Code> keys followed by the
            aggregates. There is no window-start column: a row in the view is identified by
            its group and its position in time, not by a timestamp you can select.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">3. Feed it</h2>
          <p className="text-text-secondary mb-4">
            Insert events with explicit timestamps. <Code>datetime::from_epoch_millis</Code>{' '}
            keeps the example readable; in an application the timestamp comes from the
            client or the source system.
          </p>
          <RqlCodeBlock code={`insert shop::events [
  { id: 1, category: "A", ts: datetime::from_epoch_millis(1000), value: 10 },
  { id: 2, category: "A", ts: datetime::from_epoch_millis(2000), value: 20 },
  { id: 3, category: "B", ts: datetime::from_epoch_millis(3000), value: 30 },
  { id: 4, category: "B", ts: datetime::from_epoch_millis(4000), value: 40 }
]`} />
          <p className="text-text-secondary mt-4 mb-4">
            All four events fall in the first five-second window, so the view holds one row
            per category:
          </p>
          <RqlCodeBlock code={`from shop::totals`} />
          <AsciiDiagram label="result">
{`category | total
---------+------
B        | 70
A        | 30`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            The view is deferred: it is maintained asynchronously after each commit, so
            read it in a separate request from the insert. Reading it in the same request
            that wrote its source fails with <Code>TXN_015</Code>, as explained in{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">4. Reading results across windows</h2>
          <p className="text-text-secondary mb-4">
            When events cross a boundary, the view grows a row per window. With a plain
            count and no grouping, three events at 1 s, 3 s, and 6 s give two rows: two
            events in the window that starts at 0 s, one in the window that starts at 5 s.
          </p>
          <RqlCodeBlock code={`create deferred view shop::event_count { total: int8 } as {
  from shop::events
  window tumbling { total: math::count(id) } with { duration: 5s }
}`} />
          <AsciiDiagram label="events at 1s, 3s, 6s">
{`total
-----
1
2`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            The newest window comes first: a bare scan lists rows newest-first, and the
            most recently opened window has the highest row number. Until an event lands
            in a window, that window has no row at all - an empty stream gives an empty
            view, and gaps in time give gaps in the view rather than zero rows.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">5. Corrections: deletes and late events</h2>
          <p className="text-text-secondary mb-4">
            The aggregates are maintained incrementally, so a delete on the source table
            retracts the event from its window. A window summing 10, 20, and 30 shows 60;
            delete the third event and it shows 30:
          </p>
          <RqlCodeBlock code={`delete shop::events filter { id == 3 }`} />
          <AsciiDiagram label="the window after the delete">
{`total
-----
30`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            Out-of-order arrival is handled by a watermark. The engine tracks the largest
            event time it has seen; a window is sealed once the watermark passes the
            window's end plus an allowance you set with <Code>lateness</Code>. An event
            whose timestamp falls in a still-open window is folded in wherever it belongs,
            even if it arrives after later events. A change aimed at a window that has
            already been sealed is ignored: its total has been handed downstream as final.
            A second option, <Code>immutable</Code>, must be shorter than{' '}
            <Code>lateness</Code> and freezes a window's result even earlier for
            corrections, so a delete of an event in a frozen window is a no-op.
          </p>
          <RqlCodeBlock code={`create deferred view shop::minute_range { lo: int4, hi: int4 } as {
  from shop::events
  window tumbling { lo: math::min(value), hi: math::max(value) }
  with { duration: 1m, lateness: 500ms }
}`} />
          <p className="text-text-secondary mt-4 mb-4">
            Here an event stamped at 1 s that arrives after one stamped at 2 s still counts:
            the minute window is open, so <Code>lo</Code> becomes 5 when the late row with
            value 5 lands. Pick <Code>lateness</Code> from how disordered your source
            really is; larger values keep windows open longer and hold more state.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Other window kinds</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-bold">Kind</th>
                  <th className="py-2 pr-4 font-bold">with</th>
                  <th className="py-2 font-bold">Buckets</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">tumbling</td><td className="py-2 pr-4 font-mono">duration: 5s</td><td className="py-2">fixed, non-overlapping spans of time</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">tumbling</td><td className="py-2 pr-4 font-mono">count: 3</td><td className="py-2">fixed groups of N events, regardless of time</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">sliding</td><td className="py-2 pr-4 font-mono">duration: 10s, slide: 5s</td><td className="py-2">overlapping spans; each event lands in several windows</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">session</td><td className="py-2 pr-4 font-mono">gap: 5s</td><td className="py-2">a window per burst of activity, closed after a gap of silence</td></tr>
                <tr><td className="py-2 pr-4 font-mono">rolling</td><td className="py-2 pr-4 font-mono">duration: 5s, lag: 5s</td><td className="py-2">a trailing span behind the newest event; the optional lag shifts it back to an earlier span</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mb-4">
            <Code>lateness</Code> and <Code>by</Code> work with every kind. The full option
            list is on the{' '}
            <Link to="/docs/rql/transforms/window" className="text-primary hover:text-primary-light font-medium transition-colors">window</Link>{' '}
            reference page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Pitfalls</h2>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Event time does not advance on its own.</strong> The watermark only
                moves when an event with a later timestamp arrives, so a window over a quiet
                stream stays open, and its row stays provisional, until the next event. If
                you need windows to close on the wall clock, declare{' '}
                <Code>time: processing</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Sealed means sealed.</strong> A late insert or a delete that lands
                in a window the watermark has already closed is dropped without an error,
                so the view keeps the total it published. If your source is that disordered,
                the fix is a larger <Code>lateness</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Only aggregates in the block.</strong> Selecting a column such as{' '}
                <Code>{'{'} category, total: math::sum(value) {'}'}</Code> is a{' '}
                <Code>FLOW_013</Code> error; put the column in <Code>by</Code> instead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Write, then read, in separate requests.</strong> The view is
                deferred, so a same-request read after the insert fails with{' '}
                <Code>TXN_015</Code>; consuming the view through a{' '}
                <Link to="/docs/concepts/data-model/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscription</Link>{' '}
                avoids the question altogether.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>The parameter is <Code>duration</Code>, not <Code>interval</Code>.</strong>{' '}
                Older examples write <Code>with {'{'} interval: '5s' {'}'}</Code>; the engine
                takes an unquoted duration literal under <Code>duration</Code>.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
