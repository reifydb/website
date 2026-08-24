import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout, CodeBlock, RqlCodeBlock } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function L({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">
      {children}
    </Link>
  );
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-primary font-mono">--</span>
      <span>{children}</span>
    </li>
  );
}

const systemPrompt = `ReifyDB uses RQL, which is not a SQL dialect. Never write SELECT, WHERE,
GROUP BY, ORDER BY, LIMIT, or NULL. A query is a pipeline that starts with
\`from ns::object\` and continues one operator per line: filter, map, extend,
aggregate { ... } by { ... }, sort { col: asc }, take, join, distinct.
The missing value is \`none\`; test it with is::none(x), never \`== none\`.
Objects and routines are namespaced with \`::\` (app::users, math::sum).
Keywords are lowercase. Variables start with \`$\`. Statements end with \`;\`.
Before answering, read https://reifydb.com/llms.txt and then the page that
covers the operator or statement you are about to use.`;

const exampleScript = `create namespace shop;
create table shop::orders { id: int4, customer: utf8, amount: int8 };
insert shop::orders [
  { id: 1, customer: "ada", amount: 40 },
  { id: 2, customer: "grace", amount: 25 },
  { id: 3, customer: "ada", amount: 10 }
];
from shop::orders
filter { amount > 15 }
aggregate { total: math::sum(amount), orders: math::count(id) } by { customer }
sort { total: desc }`;

export function AiAgentsPage() {
  return (
    <Layout
      title="For AI Agents"
      description="Machine-readable entry points for coding assistants working with ReifyDB: the llms.txt index, the full-text dump, and the rules that stop an agent from inventing RQL syntax."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">For AI Agents</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Coding assistants get ReifyDB wrong in one predictable way: they treat RQL as
            a SQL dialect and fill gaps in their knowledge with SQL. This page gives an
            agent two machine-readable entry points to these docs, the order to read them
            in, and the short list of rules that prevents most invented syntax. If you
            are a human wiring an assistant up, the block at the bottom is the system
            prompt to start from.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Two files</h2>
          <p className="text-text-secondary mb-4">
            Both are generated from the docs at deploy time, so they never lag the site.
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <Item>
              <Code>/llms.txt</Code> is the index: a one-paragraph description of ReifyDB,
              the key RQL reminders, and one link per documentation page grouped by
              section. It is small enough to read whole.
            </Item>
            <Item>
              <Code>/llms-full.txt</Code> is the plain text of every published page,
              sorted by URL. Each page starts with a line of 79 <Code>=</Code> characters,
              a <Code>URL: https://reifydb.com/...</Code> line, and another rule, so a
              page can be located by its URL header.
            </Item>
          </ul>
          <CodeBlock
            language="bash"
            code={`curl -s https://reifydb.com/llms.txt
curl -s https://reifydb.com/llms-full.txt

# index the full dump by page, then print one page by its line range
curl -s https://reifydb.com/llms-full.txt | grep -n '^URL: '`}
          />
          <p className="text-text-muted text-sm mt-3">
            The index lists every page in the navigation, but the full dump contains only
            published pages, so a URL can appear in <Code>/llms.txt</Code> and have no
            block in <Code>/llms-full.txt</Code> yet; fetch the page URL directly in that
            case.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Reading order</h2>
          <ol className="space-y-2 text-text-secondary list-decimal pl-6">
            <li>
              Read <Code>/llms.txt</Code> whole. Its header carries the rules below, and
              its link list tells you which page exists for the thing you are about to
              write.
            </li>
            <li>
              Fetch the page for each operator, statement, or function you plan to use
              (the page URL with a trailing slash), or cut it out of{' '}
              <Code>/llms-full.txt</Code> by its <Code>URL:</Code> header. Every example on
              those pages is verified against the real engine, so the rendered output
              under an example is the ground truth for what a statement returns.
            </li>
            <li>
              Before generating anything that mutates schema or data, read{' '}
              <L to="/docs/concepts/transactions">Transactions</L> (one request is one
              atomic transaction) and{' '}
              <L to="/docs/resources/caveats">Caveats &amp; Limitations</L> (the sharp
              edges, one sentence each).
            </li>
            <li>
              If you know SQL, read{' '}
              <L to="/docs/rql/for-sql-users">RQL for SQL Users</L> once; it maps every
              SQL clause to its RQL operator.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Ground rules for generated RQL</h2>
          <p className="text-text-secondary mb-4">
            These are the mistakes that show up most in generated RQL. Each one is a
            hard rule, not a style preference.
          </p>
          <ul className="space-y-2 text-text-secondary">
            <Item>
              <strong>RQL is not SQL.</strong> There is no <Code>select</Code>,{' '}
              <Code>where</Code>, <Code>group by</Code>, <Code>order by</Code>, or{' '}
              <Code>limit</Code>. Projection is <Code>map</Code>, filtering is{' '}
              <Code>filter</Code>, grouping is <Code>aggregate {'{'} ... {'}'} by {'{'} ... {'}'}</Code>,
              ordering is <Code>sort</Code>, limiting is <Code>take</Code>.
            </Item>
            <Item>
              <strong>A query is a pipeline.</strong> It starts with{' '}
              <Code>from ns::object</Code> and reads top to bottom, one operator per
              line; there are no nested clauses.
            </Item>
            <Item>
              <strong>The missing value is <Code>none</Code>, never null.</strong>{' '}
              <Code>x == none</Code> evaluates to <Code>none</Code> and matches nothing;
              use <Code>is::none(x)</Code> and <Code>is::some(x)</Code>. Optional columns
              are declared <Code>Option(type)</Code>. See{' '}
              <L to="/docs/concepts/none">Working with none</L>.
            </Item>
            <Item>
              <strong>Everything is namespaced with <Code>::</Code>.</strong> Objects are{' '}
              <Code>app::users</Code>; routines are <Code>math::sum</Code>,{' '}
              <Code>text::concat</Code>, <Code>date::now</Code>. Create the namespace
              before the table.
            </Item>
            <Item>
              <strong>Always give <Code>sort</Code> a direction.</strong> A bare{' '}
              <Code>sort {'{'} col {'}'}</Code> sorts descending; write{' '}
              <Code>sort {'{'} col: asc {'}'}</Code> or <Code>desc</Code>. A bare{' '}
              <Code>from</Code> returns newest rows first.
            </Item>
            <Item>
              <strong>Logic is <Code>and</Code>, <Code>or</Code>, <Code>not</Code>.</strong>{' '}
              <Code>&amp;&amp;</Code>, <Code>||</Code>, <Code>??</Code>, <Code>//</Code>,{' '}
              <Code>~=</Code>, and <Code>-&gt;</Code> do not exist. Integer <Code>/</Code>{' '}
              truncates.
            </Item>
            <Item>
              <strong>Variables start with <Code>$</Code></strong> (<Code>let $n = 1</Code>),
              and a searched <Code>match</Code> uses <Code>{'=>'}</Code> arms with an{' '}
              <Code>else</Code> arm.
            </Item>
            <Item>
              <strong>Inserts are record arrays</strong>:{' '}
              <Code>insert ns::t [{'{'} a: 1 {'}'}, {'{'} a: 2 {'}'}]</Code>. Mutations
              require a <Code>filter</Code>; <Code>update</Code> and <Code>delete</Code>{' '}
              without one are errors.
            </Item>
            <Item>
              <strong>Keywords are lowercase</strong> in these docs, statements end with{' '}
              <Code>;</Code>, and the value of a DDL statement is a confirmation frame
              (for example <Code>id | namespace | table | created</Code>), not silence.
            </Item>
            <Item>
              <strong>Do not hand-maintain derived state.</strong> A total, a count, or a
              denormalized copy belongs in a{' '}
              <L to="/docs/concepts/data-model/views">view</L>, not in an update you
              schedule yourself.
            </Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">A minimal correct script</h2>
          <p className="text-text-secondary mb-4">
            Namespace, table, three rows, then a filtered aggregate sorted explicitly.
            Every construct in it appears on a documented page:
          </p>
          <RqlCodeBlock code={exampleScript} />
          <p className="text-text-muted text-sm mt-3">
            Run as one request, everything above commits together; if the last statement
            failed, the namespace and table would be rolled back too.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What the playground can and cannot tell you</h2>
          <p className="text-text-secondary mb-4">
            The runnable snippets and the{' '}
            <a href="/playground" className="text-primary hover:text-primary-light font-medium transition-colors">playground</a>{' '}
            run <Code>@reifydb/wasm</Code> 0.8.1 in the browser; the engine source is at
            0.9.0. An agent that probes the playground should read the results with that
            gap in mind:
          </p>
          <ul className="space-y-2 text-text-secondary">
            <Item>
              A statement the playground rejects with a parse error may still be valid
              on a newer engine; pages mark such syntax as "needs a newer engine than the
              playground runs".
            </Item>
            <Item>
              Subscriptions, server configuration, metrics, and remote clients do not
              exist in the browser build at all; do not conclude they are missing from
              ReifyDB.
            </Item>
            <Item>
              A bare <Code>unreachable</Code> error is a trap in the engine, not an RQL
              error; the shared instance may need a reload afterwards. The known cases
              are listed on{' '}
              <L to="/docs/resources/caveats">Caveats &amp; Limitations</L>.
            </Item>
          </ul>
        </section>

        <Callout variant="tip" title="A system prompt to start from">
          <p className="mb-3">
            Paste this into the instructions of any assistant that will write RQL. It is
            deliberately short; the docs carry the detail.
          </p>
          <CodeBlock language="text" code={systemPrompt} />
        </Callout>
      </div>
    </Layout>
  );
}
