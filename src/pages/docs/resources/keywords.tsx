import { resKeywordsBacktickExample as resKeywordsBacktick, resKeywordsBareFailsExample as resKeywordsBareFails, resKeywordsColumnsExample as resKeywordsColumns, resKeywordsSoftExample as resKeywordsSoft, resKeywordsTableNameExample as resKeywordsTableName } from './keywords.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function L({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">
      {children}
    </Link>
  );
}

type Bare = 'yes' | 'no' | 'traps';

type KeywordRow = [string, React.ReactNode, Bare];

const groups: { title: string; rows: KeywordRow[] }[] = [
  {
    title: 'Pipeline operators',
    rows: [
      ['from', <L to="/docs/rql/transforms/from">Starts a pipeline</L>, 'no'],
      ['filter', <L to="/docs/rql/transforms/filter">Keeps matching rows</L>, 'no'],
      ['map', <L to="/docs/rql/transforms/map">Projects columns</L>, 'no'],
      ['extend', <L to="/docs/rql/transforms/extend">Adds columns</L>, 'no'],
      ['patch', <>Like <Code>extend</Code>, but a name collision replaces the column</>, 'no'],
      ['aggregate', <L to="/docs/rql/transforms/aggregate">Groups rows</L>, 'no'],
      ['by', <>Group keys in <Code>aggregate</Code>, partition keys in <Code>partition</Code></>, 'yes'],
      ['sort', <L to="/docs/rql/transforms/sort">Orders rows</L>, 'no'],
      ['asc', <>Sort direction</>, 'yes'],
      ['desc', <>Sort direction</>, 'yes'],
      ['distinct', <L to="/docs/rql/transforms/distinct">Removes duplicate rows</L>, 'traps'],
      ['take', <L to="/docs/rql/transforms/take">Limits the row count</L>, 'no'],
      ['join', <L to="/docs/rql/transforms/join">Combines two pipelines</L>, 'no'],
      ['left', <>Join kind</>, 'no'],
      ['inner', <>Join kind</>, 'no'],
      ['natural', <>Join kind</>, 'no'],
      ['using', <>Join keys</>, 'yes'],
      ['on', <>Target of <Code>create primary key on</Code> and <Code>create table policy ... on</Code></>, 'yes'],
      ['apply', <L to="/docs/rql/transforms/apply">Runs a registered operator</L>, 'no'],
      ['window', <L to="/docs/rql/transforms/window">Buckets a stream inside a deferred view</L>, 'no'],
      ['cast', <L to="/docs/rql/transforms/cast">Converts a value to another type</L>, 'no'],
      ['append', <>The append operator; accepts an <L to="/docs/concepts/ttl">operator TTL</L></>, 'no'],
      ['with', <L to="/docs/rql/transforms/with">Attaches an options block</L>, 'yes'],
      ['describe', <L to="/docs/rql/describe">The describe statement</L>, 'no'],
      ['rownum', <>The <Code>#rownum</Code> <L to="/docs/concepts/data-model/tables">system column</L></>, 'yes'],
      ['gate', <L to="/docs/concepts/data-model/views">Explicit membership in a view</L>, 'no'],
      ['output', <>Reserved</>, 'yes'],
    ],
  },
  {
    title: 'Writes',
    rows: [
      ['insert', <L to="/docs/scripting/dml/insert">Adds rows</L>, 'yes'],
      ['update', <L to="/docs/scripting/dml/update">Changes matching rows</L>, 'yes'],
      ['delete', <L to="/docs/scripting/dml/delete">Removes matching rows</L>, 'yes'],
      ['returning', <>Hands back the affected rows</>, 'yes'],
      ['set', <><Code>alter sequence ... set value</Code></>, 'yes'],
      ['value', <><Code>alter sequence ... set value</Code></>, 'yes'],
      ['truncate', <L to="/docs/scripting/schema/alter"><Code>alter table ... truncate partition</Code></L>, 'yes'],
      ['replace', <>Reserved</>, 'yes'],
    ],
  },
  {
    title: 'Scripting and control flow',
    rows: [
      ['let', <L to="/docs/rql/variables">Binds a variable</L>, 'no'],
      ['if', <L to="/docs/rql/control-flow/conditionals">Conditional</L>, 'no'],
      ['else', <>Fallback branch of <Code>if</Code> and <Code>match</Code></>, 'yes'],
      ['match', <L to="/docs/rql/control-flow/match">Multi-way branch</L>, 'no'],
      ['loop', <L to="/docs/rql/control-flow/loop">Unbounded loop</L>, 'no'],
      ['while', <L to="/docs/rql/control-flow/while">Conditional loop</L>, 'no'],
      ['for', <L to="/docs/rql/control-flow/for">Iterates a frame</L>, 'no'],
      ['in', <><Code>for $row in $rows</Code>, and the <L to="/docs/rql/expressions/operators"><Code>in</Code> membership operator</L></>, 'yes'],
      ['break', <>Leaves a loop</>, 'traps'],
      ['continue', <>Skips to the next iteration</>, 'traps'],
      ['return', <>Leaves a procedure or closure</>, 'traps'],
      ['udf', <L to="/docs/rql/control-flow/closures">Declares a named function in a script</L>, 'yes'],
      ['call', <L to="/docs/concepts/data-model/procedures">Invokes a procedure</L>, 'no'],
      ['between', <L to="/docs/rql/expressions/operators">Range test</L>, 'yes'],
      ['contains', <L to="/docs/rql/expressions/operators">List containment</L>, 'yes'],
      ['is', <><L to="/docs/concepts/data-model/enums">Variant test</L>: <Code>x is ns::enum::Variant</Code></>, 'yes'],
      ['assert', <L to="/docs/scripting/testing">Test assertion</L>, 'no'],
      ['test', <L to="/docs/scripting/testing"><Code>create test</Code></L>, 'yes'],
      ['tests', <><Code>run tests</Code></>, 'yes'],
      ['run', <><Code>run tests</Code></>, 'no'],
      ['error', <L to="/docs/scripting/testing"><Code>assert error</Code></L>, 'yes'],
    ],
  },
  {
    title: 'Schema statements',
    rows: [
      ['create', <L to="/docs/scripting">Creates an object</L>, 'traps'],
      ['alter', <>Changes an object in place</>, 'no'],
      ['drop', <L to="/docs/scripting/schema/drop">Removes an object</L>, 'no'],
      ['add', <><Code>alter table ... add column</Code></>, 'yes'],
      ['column', <><Code>add column</Code>, <Code>drop column</Code>, <Code>rename column</Code>, <Code>create column property</Code></>, 'yes'],
      ['rename', <><Code>rename column a to b</Code></>, 'yes'],
      ['to', <><Code>rename column a to b</Code>, <Code>grant role to identity</Code></>, 'yes'],
      ['exists', <><Code>if not exists</Code>, <Code>if exists</Code></>, 'yes'],
      ['cascade', <>Drop modifier; parsed, see <L to="/docs/scripting/schema/drop">Drop</L></>, 'yes'],
      ['restrict', <>Drop modifier; parsed but not enforced</>, 'yes'],
      ['namespace', <L to="/docs/scripting/schema/namespaces">Object kind</L>, 'yes'],
      ['table', <L to="/docs/scripting/schema/tables">Object kind</L>, 'yes'],
      ['view', <L to="/docs/scripting/views">Object kind</L>, 'yes'],
      ['deferred', <L to="/docs/scripting/views/deferred">View kind</L>, 'yes'],
      ['transactional', <L to="/docs/scripting/views/transactional">View kind</L>, 'yes'],
      ['ringbuffer', <L to="/docs/scripting/storage/ringbuffers">Object kind</L>, 'yes'],
      ['series', <L to="/docs/scripting/storage/series">Object kind</L>, 'yes'],
      ['dictionary', <L to="/docs/scripting/schema/dictionaries">Object kind</L>, 'yes'],
      ['enum', <L to="/docs/scripting/schema/enums">Object kind</L>, 'yes'],
      ['tag', <L to="/docs/concepts/data-model/tags">Object kind</L>, 'yes'],
      ['sequence', <L to="/docs/concepts/data-model/sequences"><Code>alter sequence</Code></L>, 'yes'],
      ['primary', <L to="/docs/concepts/data-model/tables"><Code>create primary key</Code></L>, 'yes'],
      ['key', <><Code>create primary key</Code>, <Code>with {'{'} key: col {'}'}</Code> on a series</>, 'yes'],
      ['index', <L to="/docs/scripting/schema/indexes">Index declarations</L>, 'yes'],
      ['unique', <L to="/docs/scripting/schema/indexes">Index declarations</L>, 'yes'],
      ['partition', <><Code>partition: {'{'} by: {'{'} col {'}'} {'}'}</Code> on ring buffers and series</>, 'yes'],
      ['property', <><Code>create column property</Code></>, 'yes'],
      ['procedure', <L to="/docs/scripting/procedures">Object kind</L>, 'yes'],
      ['function', <>Policy target kind: <Code>create function policy</Code></>, 'yes'],
      ['event', <L to="/docs/concepts/data-model/events">Object kind</L>, 'yes'],
      ['handler', <L to="/docs/concepts/data-model/handlers">Object kind</L>, 'yes'],
      ['dispatch', <L to="/docs/concepts/data-model/events">Raises an event</L>, 'no'],
      ['subscription', <L to="/docs/scripting/subscriptions">Object kind</L>, 'yes'],
      ['policy', <L to="/docs/concepts/data-model/policies">Object kind</L>, 'yes'],
      ['migration', <L to="/docs/scripting/migrations"><Code>create migration</Code></L>, 'yes'],
      ['migrate', <L to="/docs/scripting/migrations">Applies registered migrations</L>, 'traps'],
      ['rollback', <L to="/docs/scripting/migrations">Reverts a migration</L>, 'no'],
    ],
  },
  {
    title: 'Access control',
    rows: [
      ['user', <L to="/docs/scripting/access-control">Identity kind</L>, 'yes'],
      ['role', <L to="/docs/scripting/access-control">Groups identities</L>, 'yes'],
      ['grant', <>Adds an identity to a role</>, 'no'],
      ['revoke', <>Removes an identity from a role</>, 'no'],
      ['require', <>Policy predicate block</>, 'no'],
      ['enable', <><Code>alter table policy ... enable</Code></>, 'yes'],
      ['disable', <><Code>alter table policy ... disable</Code></>, 'yes'],
      ['attribute', <>Identity attributes</>, 'yes'],
      ['authentication', <><Code>create authentication for</Code></>, 'yes'],
      ['session', <L to="/docs/concepts/data-model/policies"><Code>create session policy</Code></L>, 'yes'],
      ['feature', <>Policy target kind: <Code>create feature policy</Code></>, 'yes'],
    ],
  },
  {
    title: 'Experimental',
    rows: [
      ['remote', <L to="/docs/resources/roadmap">Experimental</L>, 'yes'],
      ['source', <L to="/docs/resources/roadmap">Experimental</L>, 'yes'],
      ['sink', <L to="/docs/resources/roadmap">Experimental</L>, 'yes'],
      ['binding', <L to="/docs/resources/roadmap">Experimental</L>, 'yes'],
      ['http', <L to="/docs/resources/roadmap">Experimental</L>, 'yes'],
      ['grpc', <L to="/docs/resources/roadmap">Experimental</L>, 'yes'],
      ['ws', <L to="/docs/resources/roadmap">Experimental</L>, 'yes'],
    ],
  },
];

const bareLabel: Record<Bare, { text: string; className: string }> = {
  yes: { text: 'yes', className: 'text-text-secondary' },
  no: { text: 'no, use backticks', className: 'text-text-secondary' },
  traps: { text: 'traps the engine, use backticks', className: 'text-status-warning font-bold' },
};

export function KeywordsPage() {
  return (
    <Layout
      title="Keywords"
      description="Every RQL keyword in the playground engine, grouped by what it does, with a live check of which ones can still be used as a namespace, table, or column name."
    >
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2 font-bold">Resources</div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Keywords</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            RQL reserves 111 words. They are case-insensitive: <Code>from</Code>,{' '}
            <Code>FROM</Code>, and <Code>From</Code> are the same token, and these docs
            write every keyword in lowercase. A keyword is only a keyword as a whole
            word - <Code>from_date</Code> and <Code>map2</Code> are ordinary
            identifiers - and <Code>select</Code> is not a keyword at all. Every row on
            this page was checked against the playground engine (<Code>@reifydb/wasm</Code>{' '}
            0.8.1) by creating a namespace, a table, and a column with that exact name
            and then referencing the column.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Using a keyword as a name</h2>
          <p className="text-text-secondary mb-4">
            The rules are looser than in most databases. Every keyword can name a table
            or a column, and every keyword but <Code>if</Code> and <Code>policy</Code>{' '}
            can name a namespace. Declaring the column and inserting into it always
            works, because the tokenizer reads a keyword followed by <Code>:</Code> or{' '}
            <Code>.</Code> as a plain identifier - which is exactly how a column appears
            in a declaration, a record literal, or a <Code>sort</Code> key:
          </p>
          <ExecutableSnippet title={resKeywordsColumns.title} initialCode={resKeywordsColumns.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Referencing the column bare inside an expression is where it splits. A{' '}
            <em>hard</em> keyword such as <Code>from</Code> or <Code>filter</Code> is
            read as the start of a new clause, so the parser stops:
          </p>
          <ExecutableSnippet title={resKeywordsBareFails.title} initialCode={resKeywordsBareFails.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Backticks make any keyword a name, in <Code>map</Code>, <Code>filter</Code>,
            and everywhere else an expression is read. This works for all 111 keywords
            without exception:
          </p>
          <ExecutableSnippet title={resKeywordsBacktick.title} initialCode={resKeywordsBacktick.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A <em>soft</em> keyword - <Code>key</Code>, <Code>to</Code>,{' '}
            <Code>value</Code>, <Code>user</Code>, <Code>table</Code>, and most words
            that only mean something inside a DDL statement - is accepted bare, no
            backticks needed:
          </p>
          <ExecutableSnippet title={resKeywordsSoft.title} initialCode={resKeywordsSoft.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Object names never need backticks. A table or namespace called{' '}
            <Code>user</Code>, <Code>from</Code>, or <Code>filter</Code> is created and
            scanned like any other:
          </p>
          <ExecutableSnippet title={resKeywordsTableName.title} initialCode={resKeywordsTableName.code} />
          <Callout variant="warning" title="Six keywords trap the engine when used bare">
            <Code>distinct</Code>, <Code>break</Code>, <Code>continue</Code>,{' '}
            <Code>return</Code>, <Code>create</Code>, and <Code>migrate</Code> do not
            return a parse error when they appear bare as a column reference in{' '}
            <Code>map</Code> or <Code>filter</Code>; they hit an unreachable branch and
            the engine traps. In the playground that means a bare{' '}
            <Code>unreachable</Code> instead of a diagnostic. The one exception is{' '}
            <Code>return</Code> inside <Code>filter</Code>, which fails cleanly with{' '}
            <Code>AST_006</Code>. Always write them in backticks, or pick another name.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">All keywords</h2>
          <p className="text-text-secondary mb-4">
            The last column answers one question: can this keyword be referenced bare
            as a column inside an expression? "Reserved" marks a keyword the tokenizer
            knows but no documented statement in this build uses.
          </p>
          <div className="space-y-6">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-bold tracking-tight mb-2">{group.title}</h3>
                <div className="dialog overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#efedfb]">
                      <tr>
                        <th className="text-left p-2 sm:p-3 font-bold">Keyword</th>
                        <th className="text-left p-2 sm:p-3 font-bold">Where it appears</th>
                        <th className="text-left p-2 sm:p-3 font-bold">Bare in expressions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map(([keyword, use, bare]) => (
                        <tr key={keyword} className="border-t border-border-light">
                          <td className="p-2 sm:p-3 whitespace-nowrap"><Code>{keyword}</Code></td>
                          <td className="p-2 sm:p-3 text-text-secondary">{use}</td>
                          <td className={`p-2 sm:p-3 whitespace-nowrap ${bareLabel[bare].className}`}>{bareLabel[bare].text}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Callout variant="note" title="Source of truth">
          The list is the keyword table in the engine's tokenizer, and it grows as
          statements are added. A newer engine may reserve words this page does not
          list, or accept bare references this page says it rejects; the playground
          engine is what was measured here. The current engine source already adds{' '}
          <Code>queue</Code>, <Code>service</Code>, <Code>relationship</Code>,{' '}
          <Code>references</Code>, and <Code>through</Code>, none of which the playground
          build knows. Experimental keywords are covered by{' '}
          <L to="/docs/resources/roadmap">Roadmap &amp; Experimental</L>.
        </Callout>
      </div>
    </Layout>
  );
}
