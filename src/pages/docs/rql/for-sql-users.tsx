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

const translations: { sql: string; rql: string }[] = [
  { sql: 'SELECT name, email FROM users', rql: 'from app::users map { name, email }' },
  { sql: "WHERE role = 'admin'", rql: 'filter { role == "admin" }' },
  { sql: 'ORDER BY name ASC', rql: 'sort { name: asc }' },
  { sql: 'LIMIT 10', rql: 'take 10' },
  { sql: 'GROUP BY region', rql: 'aggregate { total: math::sum(amount) } by { region }' },
  { sql: 'SELECT DISTINCT category', rql: 'distinct { category }' },
  { sql: 'NULL', rql: 'none' },
  { sql: 'INSERT INTO t VALUES (1, ...)', rql: 'INSERT app::t [{ id: 1, ... }]' },
  { sql: "UPDATE t SET x = 1 WHERE id = 2", rql: 'UPDATE app::t { x: 1 } FILTER { id == 2 }' },
  { sql: 'DELETE FROM t WHERE id = 2', rql: 'DELETE app::t FILTER { id == 2 }' },
];

export function RqlForSqlUsersPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            RQL for SQL Users
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Everything you know about querying still applies; the syntax reads in a different
            direction. SQL describes the result you want from the inside out. RQL describes the
            steps to get there, top to bottom.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Translation table</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">SQL</th>
                  <th className="text-left p-2 sm:p-3 font-bold">RQL</th>
                </tr>
              </thead>
              <tbody>
                {translations.map((row) => (
                  <tr key={row.sql} className="border-t-2 border-border-default">
                    <td className="p-2 sm:p-3 font-mono text-xs text-text-secondary">{row.sql}</td>
                    <td className="p-2 sm:p-3 font-mono text-xs text-text-secondary">{row.rql}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-text-muted text-sm mt-3">
            There is no <Code>SELECT</Code> keyword in RQL. Projection is a pipeline step
            (<Code>map</Code>), not the frame of the whole query.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Reading order</h2>
          <p className="text-text-secondary mb-4">
            A SQL query nests: <Code>SELECT ... FROM (SELECT ... FROM t WHERE ...) WHERE ...</Code>.
            The equivalent RQL is flat; each line is one step, and intermediate results never
            need names:
          </p>
          <Snippet id="rqlsql-select" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">GROUP BY becomes aggregate ... by</h2>
          <p className="text-text-secondary mb-4">
            The aggregation expressions and the grouping keys live in one step. Nothing like{' '}
            <Code>HAVING</Code> is needed; a <Code>filter</Code> after the aggregate does the
            same job:
          </p>
          <Snippet id="rqlsql-groupby" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">none is not NULL, mostly</h2>
          <p className="text-text-secondary mb-4">
            RQL's missing value is <Code>none</Code>. Like SQL's NULL, it never matches an
            equality comparison:
          </p>
          <Snippet id="rqlsql-eq-none" />
          <p className="text-text-secondary mt-4 mb-4">
            Unlike SQL, the test for it is an ordinary function, not special syntax
            (<Code>IS NULL</Code>). And <Code>none</Code> is typed: a missing{' '}
            <Code>int4</Code> still participates in type checking as an <Code>int4</Code>:
          </p>
          <Snippet id="rqlsql-is-none" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What has no SQL equivalent</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/scripting/views" className="text-primary hover:text-primary-light font-medium transition-colors">Transactional views</Link>{' '}
                - materialized views maintained inside the writing transaction, not on a refresh
                schedule
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/scripting" className="text-primary hover:text-primary-light font-medium transition-colors">Scripting</Link>{' '}
                - variables, control flow, and tests in the same language as queries
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Arithmetic with explicit overflow policy - <Code>math::add_saturate</Code>,{' '}
                <Code>math::add_none</Code>, and friends make numeric edge cases a choice
                instead of a surprise
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="tip" title="Try the full tour">
          <Link to="/docs/rql" className="text-primary-color hover:underline font-medium">
            RQL in five minutes
          </Link>{' '}
          walks the pipeline model end to end with runnable snippets.
        </Callout>
      </div>
    </Layout>
  );
}
