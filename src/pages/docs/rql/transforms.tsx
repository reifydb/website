import { transformAggregateExample as transformAggregate, transformOrderMattersExample as transformOrderMatters, transformPipelineExample as transformPipeline, transformShapeExample as transformShape, transformTableExample as transformTable } from './transforms.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { AsciiDiagram, Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function DocLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">{children}</Link>;
}

const th = 'text-left px-4 py-2 border-b border-border-light font-bold';
const td = 'px-4 py-2 border-b border-border-default';
const tdMono = 'px-4 py-2 border-b border-border-default font-mono text-xs';

const operators: Array<{ name: string; href?: string; purpose: string }> = [
  { name: 'from', href: '/docs/rql/transforms/from', purpose: 'Start the pipeline from a table, view, system vtable, or inline rows.' },
  { name: 'filter', href: '/docs/rql/transforms/filter', purpose: 'Keep only the rows whose predicate is true.' },
  { name: 'map', href: '/docs/rql/transforms/map', purpose: 'Replace the column set: pick, rename, and compute columns.' },
  { name: 'extend', href: '/docs/rql/transforms/extend', purpose: 'Add computed columns next to the existing ones; a name clash is an error.' },
  { name: 'patch', purpose: 'Set columns in place; an existing name is overwritten instead of rejected.' },
  { name: 'aggregate', href: '/docs/rql/transforms/aggregate', purpose: 'Collapse rows into one row per group with sums, counts, and averages.' },
  { name: 'sort', href: '/docs/rql/transforms/sort', purpose: 'Order rows by one or more columns, ascending or descending.' },
  { name: 'distinct', href: '/docs/rql/transforms/distinct', purpose: 'Drop rows that repeat an earlier row on the listed columns.' },
  { name: 'take', href: '/docs/rql/transforms/take', purpose: 'Stop after the first N rows.' },
  { name: 'join', href: '/docs/rql/transforms/join', purpose: 'Combine rows from two sources on matching keys: inner, left, or natural.' },
  { name: 'window', href: '/docs/rql/transforms/window', purpose: 'Group rows into time buckets and aggregate each bucket, inside a view.' },
  { name: 'apply', href: '/docs/rql/transforms/apply', purpose: 'Run an operator the embedding application or a plugin registered under that name, as a pipeline stage.' },
];

export function RqlTransformsPage() {
  return (
    <Layout
      title="Transforms"
      description="The RQL pipeline operators at a glance: how rows flow from one stage to the next, what each operator does, and where its dedicated page is."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Transforms</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            An RQL query is a pipeline. It starts with a source, and every operator after
            it takes the rows the previous stage produced, transforms them, and hands the
            result to the next stage. You read a query top to bottom in the order it runs.
            This page lists every operator with a one-line purpose and links to its own
            page; the snippets run on their own, in order.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">How a pipeline runs</h2>
          <AsciiDiagram label="pipeline" className="mb-4">
{`from [...]                    4 rows
  |
  v
filter { salary > 85 }        3 rows: Ada, Grace, Linus
  |
  v
extend { bonus: salary / 10 } 3 rows, one more column
  |
  v
sort { salary: desc }         Grace, Ada, Linus
  |
  v
take 2                        Grace, Ada`}
          </AsciiDiagram>
          <ExecutableSnippet title={transformPipeline.title} initialCode={transformPipeline.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Each stage sees exactly the columns the stage above it emitted. That is why{' '}
            <Code>sort</Code> here could have ordered by <Code>bonus</Code> but not by a
            column that <Code>map</Code> had already dropped, and why there is no{' '}
            <Code>select</Code> to read inside out: the shape of the data at any point is
            the shape after the line above.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The operators</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border border-border-light text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className={th}>Operator</th>
                  <th className={th}>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {operators.map((op) => (
                  <tr key={op.name}>
                    <td className={tdMono}>
                      {op.href ? <DocLink to={op.href}>{op.name}</DocLink> : op.name}
                    </td>
                    <td className={td}>{op.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mb-4">
            Three more pages sit in this section because they are used inside operators
            rather than as stages of their own:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border border-border-light text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className={th}>Page</th>
                  <th className={th}>What it is</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={tdMono}><DocLink to="/docs/rql/transforms/cast">cast</DocLink></td><td className={td}>A function, <Code>cast(value, type)</Code>, used inside expressions to convert types.</td></tr>
                <tr><td className={tdMono}><DocLink to="/docs/rql/transforms/match">match</DocLink></td><td className={td}>An expression that picks a value by condition; the RQL form of <Code>case</Code>.</td></tr>
                <tr><td className={tdMono}><DocLink to="/docs/rql/transforms/with">with</DocLink></td><td className={td}>An options block attached to the operator or statement before it, never a stage on its own.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Shaping rows and reducing them</h2>
          <p className="text-text-secondary mb-4">
            <Code>map</Code>, <Code>extend</Code>, and <Code>patch</Code> change columns
            without changing the row count. <Code>map</Code> starts from nothing and keeps
            only what you list; <Code>extend</Code> keeps everything and adds; <Code>patch</Code>{' '}
            keeps everything and overwrites. Expressions in all three follow the rules on the{' '}
            <DocLink to="/docs/rql/expressions">Expressions</DocLink> page.
          </p>
          <ExecutableSnippet title={transformShape.title} initialCode={transformShape.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>aggregate</Code> is the one operator that changes the row count downward
            by design: one output row per distinct <Code>by</Code> key, with the aggregate
            calls as the other columns. Whatever follows sees only those columns:
          </p>
          <ExecutableSnippet title={transformAggregate.title} initialCode={transformAggregate.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Tables and inline data</h2>
          <p className="text-text-secondary mb-4">
            The operators do not care where rows come from. The same stages that ran over
            an inline frame above run over a{' '}
            <DocLink to="/docs/concepts/data-model/tables">table</DocLink>,
            a <DocLink to="/docs/concepts/data-model/views">view</DocLink>, or a system
            vtable, and inside a view definition they become the incremental program that
            maintains the view:
          </p>
          <ExecutableSnippet title={transformTable.title} initialCode={transformTable.code} />
          <p className="text-text-muted text-sm mt-3">
            A bare <Code>from ns::table</Code> returns the newest rows first. Inline frames
            keep the order they were written in.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Order matters</h2>
          <p className="text-text-secondary mb-4">
            Because each stage consumes the previous stage's output, swapping two operators
            usually changes the result. <Code>take 2</Code> before <Code>sort</Code> keeps
            whichever two rows the scan delivered first and then orders those; <Code>sort</Code>{' '}
            before <Code>take 2</Code> orders everything and keeps the top two. Over the
            table from the previous snippet, latest-first, the difference is visible:
          </p>
          <ExecutableSnippet title={transformOrderMatters.title} initialCode={transformOrderMatters.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same reasoning says where to put a <Code>filter</Code>: as early as its
            columns exist. Filtering before a <Code>join</Code> or an <Code>aggregate</Code>{' '}
            shrinks the work every later stage does; filtering after one is sometimes the
            only option, because the column you need did not exist yet.
          </p>
        </section>

        <Callout variant="warning" title="Write the sort direction">
          In the engine build the playground runs, <Code>sort {'{ column }'}</Code> with no
          direction sorts descending, not ascending. Always write{' '}
          <Code>sort {'{ column: asc }'}</Code> or <Code>sort {'{ column: desc }'}</Code>.
        </Callout>
      </div>
    </Layout>
  );
}
