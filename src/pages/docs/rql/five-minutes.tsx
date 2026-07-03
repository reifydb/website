import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

function Snippet({ id }: { id: string }) {
  const example = getExampleById(id)!;
  return <ExecutableSnippet title={example.title} initialCode={example.code} />;
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RqlFiveMinutesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            RQL in Five Minutes
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            RQL is ReifyDB's query language. A query is a pipeline: it starts from data and
            flows top to bottom, one transformation per line. Every snippet on this page runs
            in your browser.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The pipeline</h2>
          <p className="text-text-secondary mb-4">
            <Code>from</Code> names the source. <Code>filter</Code> keeps matching rows.{' '}
            <Code>map</Code> picks the shape of the output. <Code>sort</Code> orders it.
            Each step consumes the previous step's rows, so you read a query the same way
            it executes:
          </p>
          <Snippet id="rql5-pipeline" />
          <p className="text-text-muted text-sm mt-3">
            There is no <Code>SELECT</Code> in RQL, and no inside-out reading order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Start from any data</h2>
          <p className="text-text-secondary mb-4">
            A pipeline usually starts from a table or view, but it can start from inline
            records too. Handy for prototyping an expression before you have a schema:
          </p>
          <Snippet id="rql5-inline" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Shape rows with map</h2>
          <p className="text-text-secondary mb-4">
            <Code>map</Code> selects columns and computes new ones. <Code>take</Code> caps the
            result. Combined with <Code>sort</Code>, that is SQL's{' '}
            <Code>SELECT ... ORDER BY ... LIMIT</Code> in three readable lines:
          </p>
          <Snippet id="rql5-map-computed" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Aggregate by group</h2>
          <p className="text-text-secondary mb-4">
            <Code>aggregate ... by</Code> groups rows and reduces each group. Aggregation
            functions are namespaced, like everything callable in RQL:{' '}
            <Code>math::sum</Code>, <Code>math::avg</Code>, <Code>math::count</Code>:
          </p>
          <Snippet id="rql5-aggregate" />
          <p className="text-text-muted text-sm mt-3">
            An empty <Code>by {'{}'}</Code> aggregates the whole input into a single row.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Missing values are none</h2>
          <p className="text-text-secondary mb-4">
            RQL has no null. A missing value is written <Code>none</Code>, and it is typed:
            a missing <Code>int4</Code> is still an <Code>int4</Code>. Arithmetic propagates
            it instead of failing:
          </p>
          <Snippet id="rql5-none-propagates" />
          <p className="text-text-secondary mt-4 mb-4">
            Test for it explicitly with <Code>is::some</Code> and <Code>is::none</Code>:
          </p>
          <Snippet id="rql5-none-filter" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Variables</h2>
          <p className="text-text-secondary mb-4">
            <Code>let</Code> binds a value you can reuse anywhere in the statement. RQL also has
            control flow (<Code>if</Code>, <Code>loop</Code>, <Code>match</Code>) for scripting
            beyond single queries:
          </p>
          <Snippet id="rql5-let" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Where RQL goes further</h2>
          <p className="text-text-secondary mb-4">
            The same pipeline syntax defines derived state that ReifyDB maintains for you:
            transactional and deferred views, windowed aggregation over live data, and rows
            that expire via TTL. That is the point of an application state database: queries
            you would otherwise re-run become state the database keeps current.
          </p>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/quick-start" className="text-primary hover:text-primary-light font-medium transition-colors">Quickstart</Link>{' '}
                - build a live view and watch it maintain itself
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/rql/for-sql-users" className="text-primary hover:text-primary-light font-medium transition-colors">RQL for SQL users</Link>{' '}
                - a direct translation table from SQL
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/rql/transforms" className="text-primary hover:text-primary-light font-medium transition-colors">Pipeline operators</Link>{' '}
                - the full operator reference
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="Terminology">
          RQL is not a SQL dialect. Keywords are case-insensitive, statements are separated
          by semicolons, and the missing value is always called none.
        </Callout>
      </div>
    </Layout>
  );
}
