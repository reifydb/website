import { exprAggregateExample as exprAggregate, exprColumnChainExample as exprColumnChain, exprFunctionTypeErrorExample as exprFunctionTypeError, exprFunctionsExample as exprFunctions, exprFunctionsTableExample as exprFunctionsTable, exprMatchExample as exprMatch, exprNonePropagatesExample as exprNonePropagates, exprPipelineExample as exprPipeline, exprResultTypesExample as exprResultTypes, exprUnknownColumnExample as exprUnknownColumn, exprVariableExample as exprVariable } from './expressions.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function DocLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">{children}</Link>;
}

const th = 'text-left px-4 py-2 border-b border-border-light font-bold';
const td = 'px-4 py-2 border-b border-border-default';
const tdMono = 'px-4 py-2 border-b border-border-default font-mono text-xs';

export function RqlExpressionsPage() {
  return (
    <Layout
      title="Expressions"
      description="What an RQL expression is made of - column references, literals, operators, function calls, match, and variables - and where expressions appear in a pipeline."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Expressions</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            An expression computes one value per row. It is what goes inside the braces
            of <Code>filter</Code>, <Code>map</Code>, <Code>extend</Code>, and{' '}
            <Code>aggregate</Code>, on the right of a <Code>let</Code>, and in the fields
            of an <Code>insert</Code> or <Code>update</Code>. Expressions are built from
            six things: column references, literals, operators, function calls,{' '}
            <Code>match</Code>, and variables. Each snippet on this page runs on its own.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Where expressions appear</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border border-border-light text-sm">
              <thead>
                <tr className="bg-[#efedfb]">
                  <th className={th}>Clause</th>
                  <th className={th}>The expression must yield</th>
                  <th className={th}>Example</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={tdMono}>filter {'{ ... }'}</td><td className={td}>a boolean; only rows where it is <Code>true</Code> pass</td><td className={tdMono}>filter {'{ total > 25 }'}</td></tr>
                <tr><td className={tdMono}>map {'{ name: ... }'}</td><td className={td}>the value of a new output column</td><td className={tdMono}>map {'{ label: item + ": " + total }'}</td></tr>
                <tr><td className={tdMono}>extend {'{ name: ... }'}</td><td className={td}>a column added next to the existing ones</td><td className={tdMono}>extend {'{ total: price * qty }'}</td></tr>
                <tr><td className={tdMono}>aggregate {'{ name: ... }'}</td><td className={td}>a single aggregate function call per entry</td><td className={tdMono}>aggregate {'{ n: math::count(id) }'} by {'{ region }'}</td></tr>
                <tr><td className={tdMono}>sort {'{ ... }'}</td><td className={td}>a column name plus <Code>:asc</Code> or <Code>:desc</Code></td><td className={tdMono}>sort {'{ total: desc }'}</td></tr>
                <tr><td className={tdMono}>let $x = ...</td><td className={td}>any value, bound for the rest of the request</td><td className={tdMono}>let $limit = 100</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mb-4">
            A column computed in one stage is an ordinary column in every later stage, so
            an expression can be built once in <Code>extend</Code> and reused by the{' '}
            <Code>filter</Code> and <Code>map</Code> that follow:
          </p>
          <ExecutableSnippet title={exprPipeline.title} initialCode={exprPipeline.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Column references</h2>
          <p className="text-text-secondary mb-4">
            A bare identifier names a column of the current row. Columns come from the
            source (<Code>from</Code>), from earlier <Code>extend</Code>, <Code>map</Code>,
            or <Code>aggregate</Code> stages, and from joins, where the right side's columns
            arrive flattened as <Code>alias_column</Code>. Engine-maintained columns such as{' '}
            <Code>#rownum</Code> are referenced with their <Code>#</Code> prefix.
          </p>
          <ExecutableSnippet title={exprColumnChain.title} initialCode={exprColumnChain.code} />
          <Callout variant="warning" title="An unknown name is not an error">
            Inside <Code>map</Code> and <Code>extend</Code>, a name that matches no column
            evaluates to <Code>none</Code>. That includes a column defined earlier in the
            same block: entries of one <Code>map</Code> do not see each other, only the
            input row. Split dependent computations across stages, and treat an unexpected{' '}
            <Code>none</Code> column as a likely typo.
          </Callout>
          <div className="mt-4">
            <ExecutableSnippet title={exprUnknownColumn.title} initialCode={exprUnknownColumn.code} />
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Literals and operators</h2>
          <p className="text-text-secondary mb-4">
            Constants are written as{' '}
            <DocLink to="/docs/rql/expressions/literals">literals</DocLink>: numbers
            (<Code>42</Code>, <Code>3.5</Code>), text in either quote style, <Code>true</Code>{' '}
            and <Code>false</Code>, <Code>none</Code>, lists (<Code>[1, 2, 3]</Code>), and
            temporal values with an <Code>@</Code> prefix (<Code>@2024-03-15</Code>,{' '}
            <Code>@PT2H</Code>). Values combine through{' '}
            <DocLink to="/docs/rql/expressions/operators">operators</DocLink>: arithmetic
            (<Code>+ - * / %</Code>), comparison (<Code>== != &lt; &lt;= &gt; &gt;=</Code>,{' '}
            <Code>between</Code>), membership (<Code>in</Code>, <Code>not in</Code>,{' '}
            <Code>contains</Code>), and logic (<Code>and</Code>, <Code>or</Code>,{' '}
            <Code>xor</Code>, <Code>not</Code>). Precedence follows the usual arithmetic
            rules, with <Code>and</Code> above <Code>or</Code>; parentheses override it. Two
            things differ from most languages and are worth reading about before writing a
            long predicate: logical operators are words, never <Code>&amp;&amp;</Code> or{' '}
            <Code>||</Code>, and <Code>not</Code> negates everything to its right.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Function calls</h2>
          <p className="text-text-secondary mb-4">
            Functions live in modules and are called as{' '}
            <Code>module::function(arg, ...)</Code> with positional arguments. Calls nest,
            and a call can appear anywhere a value can - in <Code>filter</Code> as much as
            in <Code>map</Code>. The modules are{' '}
            <DocLink to="/docs/functions/math">math</DocLink>,{' '}
            <DocLink to="/docs/functions/text">text</DocLink>,{' '}
            <DocLink to="/docs/functions/date">date</DocLink>,{' '}
            <DocLink to="/docs/functions/datetime">datetime</DocLink>,{' '}
            <DocLink to="/docs/functions/time">time</DocLink>,{' '}
            <DocLink to="/docs/functions/duration">duration</DocLink>,{' '}
            <DocLink to="/docs/functions/is">is</DocLink>,{' '}
            <DocLink to="/docs/functions/meta">meta</DocLink>,{' '}
            <DocLink to="/docs/functions/blob">blob</DocLink>,{' '}
            <DocLink to="/docs/functions/json">json</DocLink>,{' '}
            <DocLink to="/docs/functions/clock">clock</DocLink>, and{' '}
            <DocLink to="/docs/functions/identity">identity</DocLink>.
          </p>
          <ExecutableSnippet title={exprFunctions.title} initialCode={exprFunctions.code} />
          <div className="mt-4">
            <ExecutableSnippet title={exprFunctionsTable.title} initialCode={exprFunctionsTable.code} />
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            Names, argument counts, and argument types are checked before anything runs:
          </p>
          <ExecutableSnippet title={exprFunctionTypeError.title} initialCode={exprFunctionTypeError.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Scalar functions, like operators, pass <Code>none</Code> through: a missing
            input gives a missing output, and the expression still type-checks. See{' '}
            <DocLink to="/docs/concepts/none">Working with none</DocLink>.
          </p>
          <ExecutableSnippet title={exprNonePropagates.title} initialCode={exprNonePropagates.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Conditional values</h2>
          <p className="text-text-secondary mb-4">
            <Code>match</Code> is an expression: each arm pairs a condition with a value
            using <Code>=&gt;</Code>, arms are tried top to bottom, and <Code>else</Code>{' '}
            catches the rest. Because it yields a value, it fits directly inside{' '}
            <Code>map</Code> or <Code>extend</Code>. The value-match form and the full
            syntax are on the{' '}
            <DocLink to="/docs/rql/transforms/match">match</DocLink> page.
          </p>
          <ExecutableSnippet title={exprMatch.title} initialCode={exprMatch.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Aggregates</h2>
          <p className="text-text-secondary mb-4">
            Inside <Code>aggregate {'{ ... }'}</Code> each entry must be exactly one
            aggregate function call - <Code>math::sum(amount)</Code>,{' '}
            <Code>math::count(id)</Code>, <Code>math::avg(amount)</Code>. Arithmetic around
            the call (<Code>math::sum(amount) * 2</Code>) is not accepted there. Do the
            arithmetic in the next stage, where the aggregate results are plain columns:
          </p>
          <ExecutableSnippet title={exprAggregate.title} initialCode={exprAggregate.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Variables</h2>
          <p className="text-text-secondary mb-4">
            A <Code>$</Code>-prefixed name bound with <Code>let</Code> can stand in for a
            value anywhere in an expression. The binding is typed like a literal and lives
            for the rest of the request. See{' '}
            <DocLink to="/docs/rql/variables">Variables</DocLink> for frames, reassignment,
            and scoping.
          </p>
          <ExecutableSnippet title={exprVariable.title} initialCode={exprVariable.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Result types</h2>
          <p className="text-text-secondary mb-4">
            Every expression has a static type. Integer arithmetic widens (an{' '}
            <Code>int4</Code> sum is an <Code>int8</Code>), integer division stays integer,
            anything involving a decimal is a <Code>Decimal</Code>, comparisons are booleans,
            and <Code>+</Code> with a text operand is text. <Code>meta::type()</Code>{' '}
            reports the type of any expression, which is the fastest way to see why a join
            key or a cast behaves as it does:
          </p>
          <ExecutableSnippet title={exprResultTypes.title} initialCode={exprResultTypes.code} />
        </section>

        <Callout variant="note" title="Where to go next">
          <DocLink to="/docs/rql/expressions/operators">Operators</DocLink> lists every
          operator with its precedence and <Code>none</Code> behavior;{' '}
          <DocLink to="/docs/rql/expressions/literals">Literals</DocLink> covers each
          literal form and the type it gets;{' '}
          <DocLink to="/docs/rql/transforms">Transforms</DocLink> shows the pipeline
          stages these expressions live in.
        </Callout>
      </div>
    </Layout>
  );
}
