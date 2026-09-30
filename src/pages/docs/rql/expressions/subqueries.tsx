import { subqAggregateInsideExample as subqAggregateInside, subqAppendViewCreateExample as subqAppendViewCreate, subqAppendViewQueryExample as subqAppendViewQuery, subqFilterInsideExample as subqFilterInside, subqInBracesExample as subqInBraces, subqJoinViewExample as subqJoinView, subqLeftFilterAfterExample as subqLeftFilterAfter, subqLeftFilterInsideExample as subqLeftFilterInside, subqLetPipedExample as subqLetPiped, subqMapInsideExample as subqMapInside, subqNestedExample as subqNested, subqNoPipeExample as subqNoPipe, subqSetupExample as subqSetup, subqSortTakeInsideExample as subqSortTakeInside, subqViewCreateExample as subqViewCreate, subqViewJoinCreateExample as subqViewJoinCreate, subqViewJoinQueryExample as subqViewJoinQuery } from './subqueries.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

const th = 'text-left px-4 py-2 border-b border-border-light font-bold';
const td = 'px-4 py-2 border-b border-border-default';
const tdMono = 'px-4 py-2 border-b border-border-default font-mono text-xs';

export function SubqueriesPage() {
  return (
    <Layout
      title="Subqueries"
      description="Where a nested query can appear in RQL: the right side of a join and an append inside a view, how stages are chained inside the braces, and which familiar subquery positions do not exist."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Subqueries</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A subquery is a query pipeline wrapped in braces and placed inside another
            query: <Code>{'{'} from ns::table | filter {'{'} ... {'}'} {'}'}</Code>. RQL
            has two positions for one: the right side of a{' '}
            <Link to="/docs/rql/transforms/join" className="text-primary hover:text-primary-light font-medium transition-colors">join</Link>{' '}
            and the source of an <Code>append</Code> inside a view. There is no scalar
            subquery, no <Code>in {'{'} ... {'}'}</Code>, and no <Code>exists</Code>; a
            row-level lookup is a join. Run the snippets on this page in order.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Where a subquery can appear</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border border-border-light text-sm">
              <thead>
                <tr className="bg-[#efedfb]">
                  <th className={th}>Position</th>
                  <th className={th}>Syntax</th>
                  <th className={th}>In this engine</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={td}>Right side of a join</td><td className={tdMono}>join {'{'} from ns::t | ... {'}'} as x using (...)</td><td className={td}>Works, in queries and in view bodies</td></tr>
                <tr><td className={td}>Source of append</td><td className={tdMono}>append {'{'} from ns::t | ... {'}'}</td><td className={td}>Works inside a view body only</td></tr>
                <tr><td className={td}>Source of insert</td><td className={tdMono}>insert ns::t from ns::s</td><td className={td}>A bare table or view; adding stages fails with <Code>QUERY_005</Code></td></tr>
                <tr><td className={td}>Value of let</td><td className={tdMono}>let $x = {'{'} from ns::t | ... {'}'}</td><td className={td}>Newer engine; write it without the braces</td></tr>
                <tr><td className={td}>Source of append into a variable</td><td className={tdMono}>append $x from {'{'} from ns::t {'}'}</td><td className={td}>Newer engine</td></tr>
                <tr><td className={td}>Source of a for loop</td><td className={tdMono}>for $row in {'{'} from ns::t {'}'}</td><td className={td}>Newer engine; bind a variable first</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mb-4">
            The braces around a view body (<Code>create deferred view ... as {'{'} ... {'}'}</Code>)
            hold a query too, but that is the view's definition rather than a subquery;
            see{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">views</Link>.
            The forms marked "newer engine" are covered at the end of this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">The shape of a subquery</h2>
          <p className="text-text-secondary mb-4">
            A subquery starts with <Code>from</Code> naming a table or a view. Stages
            after it are chained with <Code>|</Code>: inside the braces the pipe is
            required, where a top-level pipeline can chain on whitespace alone. Every
            column the subquery produces reaches the outer query as{' '}
            <Code>alias_column</Code>, the same flattening every join applies. Create
            the tables first:
          </p>
          <ExecutableSnippet title={subqSetup.title} initialCode={subqSetup.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Now narrow the right side before the join sees it. Only orders from northern
            customers survive, because the other customers never enter the join:
          </p>
          <ExecutableSnippet title={subqFilterInside.title} initialCode={subqFilterInside.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Leave out the pipe and the parser stops at <Code>filter</Code>, expecting
            the closing brace:
          </p>
          <ExecutableSnippet title={subqNoPipe.title} initialCode={subqNoPipe.code} />
          <Callout variant="warning" title="Only a table or view may open the braces">
            In the engine build the playground runs, a subquery whose first stage is
            not <Code>from ns::table</Code> or <Code>from ns::view</Code> does not
            fail cleanly - an inline row list (<Code>from [ ... ]</Code>), a frame
            variable (<Code>from $rows</Code>), a table path without <Code>from</Code>{' '}
            (<Code>{'{'} ns::table {'}'}</Code>), or empty braces each trap the engine.
            A plain name (<Code>{'{'} customers {'}'}</Code>) fails cleanly, with{' '}
            <Code>CA_004</Code> against the default namespace. The playground shares one
            engine instance across every snippet, so do not run the trapping forms; put
            the rows in a table first.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Shaping the right side</h2>
          <p className="text-text-secondary mb-4">
            Any pipeline stage works inside the braces. A <Code>map</Code> decides which
            columns the join brings in and under which names; the alias prefix is added
            afterwards:
          </p>
          <ExecutableSnippet title={subqMapInside.title} initialCode={subqMapInside.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An{' '}
            <Link to="/docs/rql/transforms/aggregate" className="text-primary hover:text-primary-light font-medium transition-colors">aggregate</Link>{' '}
            inside the braces turns the right side into a derived table. This is the
            RQL form of joining against a grouped result - the sum is computed once per
            customer, then matched by key:
          </p>
          <ExecutableSnippet title={subqAggregateInside.title} initialCode={subqAggregateInside.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>sort</Code> and{' '}
            <Link to="/docs/rql/transforms/take" className="text-primary hover:text-primary-light font-medium transition-colors">take</Link>{' '}
            inside the braces cut the right side down before matching. Here the join
            sees exactly one order, so exactly one customer comes out:
          </p>
          <ExecutableSnippet title={subqSortTakeInside.title} initialCode={subqSortTakeInside.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Filter inside or after</h2>
          <p className="text-text-secondary mb-4">
            With a <Code>left join</Code> the position of a <Code>filter</Code> changes
            the result. Inside the braces it limits which right rows are available to
            match; every left row still comes out, with <Code>none</Code> where nothing
            matched:
          </p>
          <ExecutableSnippet title={subqLeftFilterInside.title} initialCode={subqLeftFilterInside.code} />
          <p className="text-text-secondary mt-4 mb-4">
            After the join, the same predicate runs on the joined row. Unmatched rows
            carry <Code>none</Code> in <Code>o_status</Code>, a comparison with{' '}
            <Code>none</Code> is <Code>none</Code>, and <Code>filter</Code> drops them:
          </p>
          <ExecutableSnippet title={subqLeftFilterAfter.title} initialCode={subqLeftFilterAfter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Put a condition on the right side inside the braces when the left rows must
            survive; put it after the join when it should decide which rows survive.
            See{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">Working with none</Link>{' '}
            for how <Code>none</Code> moves through a predicate.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Nesting</h2>
          <p className="text-text-secondary mb-4">
            A subquery can itself contain a join, with its own braces, alias, and{' '}
            <Code>using</Code>. Prefixes stack: a column named <Code>manager</Code> joined
            in as <Code>r</Code> inside a subquery aliased <Code>c</Code> comes out as{' '}
            <Code>c_r_manager</Code>:
          </p>
          <ExecutableSnippet title={subqNested.title} initialCode={subqNested.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>natural join</Code> takes the same braces and the same piped stages; it
            just has no <Code>using</Code> clause.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Views as named subqueries</h2>
          <p className="text-text-secondary mb-4">
            A subquery that several queries need is a{' '}
            <Link to="/docs/scripting/views/deferred" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>.
            The view holds the pipeline once, the engine keeps its rows current, and a
            join reads it exactly like a table:
          </p>
          <ExecutableSnippet title={subqViewCreate.title} initialCode={subqViewCreate.code} />
          <div className="mt-4">
            <ExecutableSnippet title={subqJoinView.title} initialCode={subqJoinView.code} />
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            The reverse holds as well: a view body may contain a join with a subquery,
            with the same rule that stages inside the braces are piped:
          </p>
          <ExecutableSnippet title={subqViewJoinCreate.title} initialCode={subqViewJoinCreate.code} />
          <div className="mt-4">
            <ExecutableSnippet title={subqViewJoinQuery.title} initialCode={subqViewJoinQuery.code} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">append</h2>
          <p className="text-text-secondary mb-4">
            <Code>append</Code> adds the rows of a subquery below the rows of the current
            pipeline, the way a union does. Columns line up by position, not by name: the
            right side must produce the same number of columns, in the same order as the
            left, and a <Code>map</Code> inside the braces usually does the lining up.
            The names on the right side are ignored. When the counts differ nothing
            fails - the view is created and never gets a row:
          </p>
          <ExecutableSnippet title={subqAppendViewCreate.title} initialCode={subqAppendViewCreate.code} />
          <div className="mt-4">
            <ExecutableSnippet title={subqAppendViewQuery.title} initialCode={subqAppendViewQuery.code} />
          </div>
          <Callout variant="warning" title="append runs only inside a view">
            The query executor in this build has no <Code>append</Code> operator; it is
            implemented by the flow engine that maintains views. In a plain query,{' '}
            <Code>from ns::a append {'{'} from ns::b {'}'}</Code> parses, then traps the
            engine with "Append operator is only supported in deferred views and requires
            the flow engine". Do not run it in the playground. To read the union once,
            define the view and query it.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Frame variables</h2>
          <p className="text-text-secondary mb-4">
            A{' '}
            <Link to="/docs/rql/variables" className="text-primary hover:text-primary-light font-medium transition-colors">frame variable</Link>{' '}
            names a query result for the rest of a script, which covers most of what a
            named subquery is for. Its value is written without braces; stages after the{' '}
            <Code>from</Code> are chained with <Code>|</Code>, as inside a subquery:
          </p>
          <ExecutableSnippet title={subqLetPiped.title} initialCode={subqLetPiped.code} />
          <Callout variant="warning" title="Two forms that trap this engine">
            Chaining the stages of a <Code>let</Code> value on whitespace instead of a
            pipe (<Code>let $x = from ns::t filter {'{'} ... {'}'}</Code>) parses and then
            traps the engine while planning, and so does using the variable as the right
            side of a join (<Code>join {'{'} from $x {'}'} as x using (...)</Code>). Pipe
            the stages, and join against tables and views only.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Forms that need a newer engine</h2>
          <p className="text-text-secondary mb-4">
            The current engine source accepts a braced query in three more places:
          </p>
          <RqlCodeBlock code={`let $north = { from expr_subq::customers | filter { region == "north" } };
append $north from { from expr_subq::customers | filter { region == "south" } };
for $row in { from expr_subq::customers } { insert expr_subq::log [{ name: $row.name }] }`} />
          <p className="text-text-muted text-sm mt-3">
            These need a newer engine than the playground runs; here each one fails with{' '}
            <Code>AST_005</Code> ("expected Operator(Colon)"), because the parser reads
            the opening brace as a record literal. Write <Code>let $x = from ...</Code>{' '}
            without braces, and iterate a bound variable with{' '}
            <Link to="/docs/rql/control-flow/for" className="text-primary hover:text-primary-light font-medium transition-colors">for</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">What is not a subquery position</h2>
          <p className="text-text-secondary mb-4">
            Braces are a record literal everywhere an expression is expected, so a query
            inside an expression is a parse error, not a feature that is switched off:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border border-border-light text-sm">
              <thead>
                <tr className="bg-[#efedfb]">
                  <th className={th}>Not RQL</th>
                  <th className={th}>Fails with</th>
                  <th className={th}>Write instead</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={tdMono}>from {'{'} from ns::t {'}'}</td><td className={td}><Code>AST_005</Code>, expected identifier or variable</td><td className={td}><Code>from ns::t</Code>, or a view</td></tr>
                <tr><td className={tdMono}>filter {'{'} id in {'{'} from ns::t | map {'{'} id {'}'} {'}'} {'}'}</td><td className={td}><Code>AST_005</Code>, expected <Code>[</Code></td><td className={td}>An <Code>inner join</Code> on <Code>id</Code></td></tr>
                <tr><td className={tdMono}>map {'{'} total: {'{'} from ns::t | aggregate ... {'}'} {'}'}</td><td className={td}><Code>AST_005</Code>, expected <Code>:</Code></td><td className={td}>An <Code>aggregate</Code> inside the braces of a join</td></tr>
                <tr><td className={tdMono}>filter {'{'} exists {'{'} from ns::t {'}'} {'}'}</td><td className={td}><Code>AST_005</Code></td><td className={td}>A <Code>left join</Code> plus <Code>is::some()</Code> on a joined column</td></tr>
              </tbody>
            </table>
          </div>
          <ExecutableSnippet title={subqInBraces.title} initialCode={subqInBraces.code} />
        </section>
      </div>
    </Layout>
  );
}
