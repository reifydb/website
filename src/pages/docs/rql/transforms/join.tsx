import { joinAggregateExample as joinAggregate, joinDefaultIsInnerExample as joinDefaultIsInner, joinDotAccessExample as joinDotAccess, joinFlattenedColumnsExample as joinFlattenedColumns, joinInnerExample as joinInner, joinLeftExample as joinLeft, joinMultiKeyExample as joinMultiKey, joinNaturalExample as joinNatural, joinNaturalLeftExample as joinNaturalLeft, joinOrKeysExample as joinOrKeys } from './join.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

const subqueryFilter = `from tf_join::employees
left join { from tf_join::departments filter { name != "Marketing" } } as d using (dept_id, d.id)
map { id, name, department: d_name }`;

export function JoinPage() {
  return (
    <Layout
      title="join"
      description="How inner, left, and natural joins combine rows from two sources in RQL, how joined columns are named, and the key-typing rules that make a join silently match nothing."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">join</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>join</Code> pairs each row flowing through the pipeline with matching
            rows from a second source. The second source is written as a braced
            subquery, given an alias with <Code>as</Code>, and matched with{' '}
            <Code>using</Code>, which names one column from each side. Three kinds
            exist: <Code>inner</Code> (only pairs that match), <Code>left</Code> (every
            left row, matched or not), and <Code>natural</Code> (match on every column
            name the two sides share).
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Inner join</h2>
          <p className="text-text-secondary mb-4">
            In <Code>using (dept_id, d.id)</Code>, the first name is a column of the
            left side and the second is a column of the joined side, qualified by its
            alias. Rows that find no partner are dropped from both sides. Run the
            snippets on this page in order:
          </p>
          <ExecutableSnippet title={joinInner.title} initialCode={joinInner.code} />
          <p className="text-text-muted text-sm mt-3">
            Ken (department 9) has no department row and Sales has no employees, so
            neither appears.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Left join</h2>
          <p className="text-text-secondary mb-4">
            A left join keeps every row from the left side. Where the joined side has
            no match, its columns are <Code>none</Code>:
          </p>
          <ExecutableSnippet title={joinLeft.title} initialCode={joinLeft.code} />
          <p className="text-text-secondary mt-4 mb-4">
            There is no right join; put the side you want to keep in full on the left.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">How joined columns are named</h2>
          <p className="text-text-secondary mb-4">
            The joined side's columns are flattened into the row under{' '}
            <Code>alias_column</Code>: with <Code>as d</Code>, the department's{' '}
            <Code>id</Code> becomes <Code>d_id</Code> and its <Code>name</Code> becomes{' '}
            <Code>d_name</Code>. Left-side columns keep their plain names. Without a{' '}
            <Code>map</Code> you see the whole thing:
          </p>
          <ExecutableSnippet title={joinFlattenedColumns.title} initialCode={joinFlattenedColumns.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The dotted form <Code>d.id</Code> is only valid inside <Code>using</Code>.
            In every later stage the column is <Code>d_id</Code>; writing{' '}
            <Code>d.name</Code> in a <Code>map</Code> is an error:
          </p>
          <ExecutableSnippet title={joinDotAccess.title} initialCode={joinDotAccess.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The prefix is also what keeps the two <Code>name</Code> columns apart - the
            employee's stays <Code>name</Code>, the department's is <Code>d_name</Code>.
            Pick short aliases; they become part of every column name downstream.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Bare join</h2>
          <p className="text-text-secondary mb-4">
            <Code>join</Code> with no kind keyword is an inner join:
          </p>
          <ExecutableSnippet title={joinDefaultIsInner.title} initialCode={joinDefaultIsInner.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Joins compose with the rest of the pipeline</h2>
          <p className="text-text-secondary mb-4">
            After the join, the row is an ordinary row. Aggregate it, sort it, filter
            it - using the flattened names:
          </p>
          <ExecutableSnippet title={joinAggregate.title} initialCode={joinAggregate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The joined side is itself a pipeline in newer engine builds, so it can be
            narrowed before the match with a <Code>filter</Code> inside the braces:
          </p>
          <RqlCodeBlock code={subqueryFilter} />
          <Callout variant="info" title="Needs a newer engine than the playground runs">
            The engine source accepts a full pipeline inside the join braces. The
            WASM build on this site only accepts a bare <Code>from</Code> there and
            rejects the <Code>filter</Code> with <Code>AST_005</Code>. Until it is
            updated, filter the joined rows after the join instead.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Composite keys</h2>
          <p className="text-text-secondary mb-4">
            Chain several <Code>using</Code> pairs with <Code>and</Code> to require that
            all of them match:
          </p>
          <ExecutableSnippet title={joinMultiKey.title} initialCode={joinMultiKey.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>or</Code> is also accepted, and it means what it says: a pair of rows
            matches if either key pair agrees, which usually produces more pairs than
            you expect:
          </p>
          <ExecutableSnippet title={joinOrKeys.title} initialCode={joinOrKeys.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Natural join</h2>
          <p className="text-text-secondary mb-4">
            <Code>natural join</Code> needs no <Code>using</Code>. It matches on every
            column name both sides share and keeps a single copy of each shared column,
            un-prefixed. Here the only shared name is <Code>id</Code>:
          </p>
          <ExecutableSnippet title={joinNatural.title} initialCode={joinNatural.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>natural left join</Code> keeps unmatched left rows, and{' '}
            <Code>natural inner join</Code> spells out the default:
          </p>
          <ExecutableSnippet title={joinNaturalLeft.title} initialCode={joinNaturalLeft.code} />
          <Callout variant="warning" title="Shared names, not shared meaning">
            A natural join matches on <em>every</em> shared column name, including
            coincidental ones. Two tables that each happen to have an <Code>id</Code>{' '}
            and a <Code>name</Code> will be matched on both, even if one{' '}
            <Code>name</Code> is a person and the other a department. Check the shared
            columns before trusting a natural join's output; when in doubt, use{' '}
            <Code>using</Code>.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Key types must agree</h2>
          <p className="text-text-secondary mb-4">
            Keys are compared by value <em>and</em> type. Both sides of a join in this
            build should be real stored sources - tables, views, ring buffers - whose
            columns carry a concrete type such as <Code>int4</Code>. An inline record
            literal like <Code>{'{ dept_id: 1 }'}</Code> types its number as a generic{' '}
            <Code>Int</Code>, which never equals an <Code>int4</Code> column, so a join
            against it silently matches nothing; and an inline array used as the
            joined side hits an unimplemented path and crashes the engine rather than
            returning an error. Load the data into a table first, or pin the type with{' '}
            <Link to="/docs/rql/transforms/cast" className="text-primary hover:text-primary-light font-medium transition-colors">cast</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Joins inside views</h2>
          <p className="text-text-secondary mb-4">
            Inside a{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>,
            a join is maintained incrementally: the flow engine keeps both sides'
            rows keyed by the join columns and re-pairs them as either source changes.
            A trailing <Code>with</Code> block tunes that state -{' '}
            <Code>snapshot: true</Code>, <Code>latest: true</Code>, and a per-side{' '}
            <Code>ttl</Code> - and is described on{' '}
            <Link to="/docs/rql/transforms/with" className="text-primary hover:text-primary-light font-medium transition-colors">the with clause</Link>{' '}
            page. Any other key there is rejected with the list of valid ones.
          </p>
        </section>
      </div>
    </Layout>
  );
}
