import { opArithmeticExample as opArithmetic, opCompareMismatchExample as opCompareMismatch, opCompareTypesExample as opCompareTypes, opComparisonExample as opComparison, opConcatExample as opConcat, opDivideByZeroExample as opDivideByZero, opDivisionExample as opDivision, opLogicalExample as opLogical, opLogicalPrecedenceExample as opLogicalPrecedence, opMembershipExample as opMembership, opNoneArithExample as opNoneArith, opNoneLogicExample as opNoneLogic, opNotScopeExample as opNotScope, opPrecedenceExample as opPrecedence, opPromotionExample as opPromotion, opSymbolicAndExample as opSymbolicAnd } from './operators.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

const th = 'text-left px-4 py-2 border-b border-border-light font-bold';
const td = 'px-4 py-2 border-b border-border-default';
const tdMono = 'px-4 py-2 border-b border-border-default font-mono text-xs';

function OpTable({ rows }: { rows: Array<[string, string, string]> }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border border-border-light text-sm">
        <thead>
          <tr className="bg-bg-tertiary">
            <th className={th}>Operator</th>
            <th className={th}>Meaning</th>
            <th className={th}>Example</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([op, meaning, example]) => (
            <tr key={op}>
              <td className={tdMono}>{op}</td>
              <td className={td}>{meaning}</td>
              <td className={tdMono}>{example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function OperatorsPage() {
  return (
    <Layout
      title="Operators"
      description="Every operator in RQL expressions: arithmetic, comparison, membership, and logical operators, their precedence, how they treat none, and which familiar symbols do not exist."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Operators</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Operators combine literals, column references, and function results into a
            new value per row. RQL has four groups: arithmetic, comparison, membership,
            and logical. Logical operators are words (<Code>and</Code>, <Code>or</Code>,{' '}
            <Code>xor</Code>, <Code>not</Code>), not symbols, and every operator
            propagates <Code>none</Code> the same way. Each snippet on this page runs
            on its own.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Arithmetic</h2>
          <OpTable rows={[
            ['+', 'Addition, or text concatenation', 'price + tax'],
            ['-', 'Subtraction, or prefix negation', 'total - discount, -total'],
            ['*', 'Multiplication', 'quantity * price'],
            ['/', 'Division', 'total / count'],
            ['%', 'Remainder', 'id % 2'],
          ]} />
          <ExecutableSnippet title={opArithmetic.title} initialCode={opArithmetic.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>/</Code> truncates toward zero when both operands are integers
            (<Code>-7 / 2</Code> is <Code>-3</Code>) and produces a decimal as soon as
            either side is one. The sign of <Code>%</Code> follows the left operand.
            There is no separate integer-division operator:
          </p>
          <ExecutableSnippet title={opDivision.title} initialCode={opDivision.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Dividing by zero is an error, not <Code>none</Code> and not infinity:
          </p>
          <ExecutableSnippet title={opDivideByZero.title} initialCode={opDivideByZero.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Plus on text</h2>
          <p className="text-text-secondary mb-4">
            When either operand of <Code>+</Code> is text, the result is text and the
            other side is rendered into it. Evaluation is left to right, so{' '}
            <Code>"abc" + 1 + 2</Code> concatenates twice while{' '}
            <Code>1 + 2 + "abc"</Code> adds first. A text that looks like a number is
            still text: <Code>"5" + 5</Code> is <Code>"55"</Code>. Use{' '}
            <Link to="/docs/rql/transforms/cast" className="text-primary hover:text-primary-light font-medium transition-colors">cast</Link>{' '}
            when you mean the number.
          </p>
          <ExecutableSnippet title={opConcat.title} initialCode={opConcat.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Result types widen</h2>
          <p className="text-text-secondary mb-4">
            Integer arithmetic never overflows silently. The result type is wider than the
            inputs (<Code>int1 + int1</Code> is <Code>int2</Code>, <Code>int4 + int4</Code>{' '}
            is <Code>int8</Code>), up to <Code>int16</Code>; only a value that does not fit
            in <Code>int16</Code> fails with <Code>NUMBER_002</Code>. Mixing an integer with
            a decimal yields a decimal. <Code>meta::type()</Code> shows the type of any
            expression:
          </p>
          <ExecutableSnippet title={opPromotion.title} initialCode={opPromotion.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Comparison</h2>
          <OpTable rows={[
            ['==', 'Equal', 'status == "active"'],
            ['!=', 'Not equal', 'role != "guest"'],
            ['<', 'Less than', 'price < 100'],
            ['<=', 'Less than or equal', 'stock <= 5'],
            ['>', 'Greater than', 'age > 18'],
            ['>=', 'Greater than or equal', 'count >= 10'],
            ['between', 'Inclusive range', 'price between 40 and 50'],
          ]} />
          <p className="text-text-secondary mb-4">
            Comparisons yield a boolean. Text compares byte by byte and is case sensitive,
            so <Code>"Widget" == "widget"</Code> is <Code>false</Code>. Equality is a single{' '}
            <Code>==</Code>; a lone <Code>=</Code> is rejected. There is no pattern-match
            operator; use <Code>text::contains()</Code>, <Code>text::starts_with()</Code>,
            and <Code>text::ends_with()</Code> from the{' '}
            <Link to="/docs/functions/text" className="text-primary hover:text-primary-light font-medium transition-colors">text module</Link>.
          </p>
          <ExecutableSnippet title={opComparison.title} initialCode={opComparison.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Numbers compare across widths and across integer/decimal, temporal values
            compare within their kind, and booleans order <Code>false</Code> before{' '}
            <Code>true</Code>:
          </p>
          <ExecutableSnippet title={opCompareTypes.title} initialCode={opCompareTypes.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Text never compares with a number. The engine does not coerce and does not
            return <Code>false</Code>; it raises a typed error:
          </p>
          <ExecutableSnippet title={opCompareMismatch.title} initialCode={opCompareMismatch.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Membership</h2>
          <OpTable rows={[
            ['in', 'Value is one of the listed values', 'region in ["North", "East"]'],
            ['not in', 'Value is none of the listed values', 'status not in ["closed"]'],
            ['contains', 'Left list holds every value of the right list', '[1, 2, 3] contains [2, 3]'],
          ]} />
          <p className="text-text-secondary mb-4">
            <Code>in</Code> and <Code>not in</Code> take a{' '}
            <Link to="/docs/rql/expressions/literals" className="text-primary hover:text-primary-light font-medium transition-colors">list literal</Link>{' '}
            on the right. <Code>contains</Code> is list-to-list: it is <Code>true</Code>{' '}
            only if every element on the right appears on the left, which makes an empty
            right-hand list trivially <Code>true</Code>. It does not search inside text.
          </p>
          <ExecutableSnippet title={opMembership.title} initialCode={opMembership.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Logical</h2>
          <OpTable rows={[
            ['and', 'Both sides true', 'active and verified'],
            ['or', 'Either side true', 'admin or moderator'],
            ['xor', 'Exactly one side true', 'trial xor paid'],
            ['not', 'Negation (! is an alias)', 'not active'],
          ]} />
          <ExecutableSnippet title={opLogical.title} initialCode={opLogical.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>and</Code> binds tighter than <Code>or</Code> and <Code>xor</Code>, which
            share one level and associate left to right:
          </p>
          <ExecutableSnippet title={opLogicalPrecedence.title} initialCode={opLogicalPrecedence.code} />
          <Callout variant="warning" title="not takes everything to its right">
            <Code>not</Code> is parsed at the lowest precedence of all: it negates the
            whole expression that follows it, comparisons and <Code>and</Code>/<Code>or</Code>{' '}
            included. <Code>not paid and shipped</Code> means{' '}
            <Code>not (paid and shipped)</Code>, not <Code>(not paid) and shipped</Code>.
            Parenthesize the operand whenever anything follows it.
          </Callout>
          <div className="mt-4">
            <ExecutableSnippet title={opNotScope.title} initialCode={opNotScope.code} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Operators and none</h2>
          <p className="text-text-secondary mb-4">
            Logic is three-valued. <Code>and</Code> and <Code>or</Code> short-circuit on
            the value that decides the result (<Code>none and false</Code> is{' '}
            <Code>false</Code>, <Code>none or true</Code> is <Code>true</Code>) and
            otherwise stay <Code>none</Code>; <Code>xor</Code> and <Code>not</Code> with a{' '}
            <Code>none</Code> input are always <Code>none</Code>:
          </p>
          <ExecutableSnippet title={opNoneLogic.title} initialCode={opNoneLogic.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Arithmetic, comparison, and membership propagate <Code>none</Code>: any{' '}
            <Code>none</Code> operand makes the result <Code>none</Code>. That includes{' '}
            <Code>qty == none</Code>, which is never <Code>true</Code>. Test for absence
            with <Code>is::none()</Code> instead. A <Code>filter</Code> keeps only rows
            whose predicate is definitely <Code>true</Code>, so <Code>none</Code> rows drop
            out of <Code>filter {'{'} qty &gt; 2 {'}'}</Code> and its negation alike.
            See{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">Working with none</Link>.
          </p>
          <ExecutableSnippet title={opNoneArith.title} initialCode={opNoneArith.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Precedence</h2>
          <p className="text-text-secondary mb-4">
            From tightest to loosest. Operators on one level associate left to right.
            Parentheses override everything:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border border-border-light text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className={th}>Level</th>
                  <th className={th}>Operators</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={td}>1 (tightest)</td><td className={tdMono}>( ) &nbsp; module::function( ) &nbsp; ns::table</td></tr>
                <tr><td className={td}>2</td><td className={tdMono}>prefix - &nbsp; prefix +</td></tr>
                <tr><td className={td}>3</td><td className={tdMono}>* &nbsp; / &nbsp; %</td></tr>
                <tr><td className={td}>4</td><td className={tdMono}>+ &nbsp; -</td></tr>
                <tr><td className={td}>5</td><td className={tdMono}>== &nbsp; != &nbsp; &lt; &nbsp; &lt;= &nbsp; &gt; &nbsp; &gt;= &nbsp; between &nbsp; in &nbsp; not in &nbsp; contains</td></tr>
                <tr><td className={td}>6</td><td className={tdMono}>and</td></tr>
                <tr><td className={td}>7</td><td className={tdMono}>or &nbsp; xor</td></tr>
                <tr><td className={td}>8 (loosest)</td><td className={tdMono}>not &nbsp; !</td></tr>
              </tbody>
            </table>
          </div>
          <ExecutableSnippet title={opPrecedence.title} initialCode={opPrecedence.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What is not an operator</h2>
          <p className="text-text-secondary mb-4">
            Symbols borrowed from other languages are rejected at parse time with{' '}
            <Code>AST_006</Code> (or <Code>AST_001</Code> for characters the tokenizer
            does not know):
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border border-border-light text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className={th}>Not RQL</th>
                  <th className={th}>Write instead</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={tdMono}>&amp;&amp; &nbsp; ||</td><td className={td}><Code>and</Code>, <Code>or</Code></td></tr>
                <tr><td className={tdMono}>=</td><td className={td}><Code>==</Code> for equality; <Code>:</Code> assigns a column in <Code>map</Code>, <Code>extend</Code>, and record literals</td></tr>
                <tr><td className={tdMono}>?? &nbsp; ?:</td><td className={td}>No coalescing operator; see <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">replacing none</Link></td></tr>
                <tr><td className={tdMono}>// &nbsp; ** &nbsp; ^</td><td className={td}><Code>/</Code> already truncates for integers; use <Code>math::power()</Code> for powers</td></tr>
                <tr><td className={tdMono}>&amp; &nbsp; | &nbsp; &lt;&lt; &nbsp; &gt;&gt;</td><td className={td}>No bitwise operators</td></tr>
                <tr><td className={tdMono}>~= &nbsp; like</td><td className={td}><Code>text::contains()</Code>, <Code>text::starts_with()</Code>, <Code>text::ends_with()</Code></td></tr>
                <tr><td className={tdMono}>-&gt;</td><td className={td}>Joined columns flatten to <Code>alias_column</Code>; there is no field access</td></tr>
                <tr><td className={tdMono}>=&gt;</td><td className={td}>Only inside <Link to="/docs/rql/transforms/match" className="text-primary hover:text-primary-light font-medium transition-colors">match</Link>, separating a condition from its value</td></tr>
                <tr><td className={tdMono}>::</td><td className={td}>Not an operator on values: it joins a module to a function or a namespace to a table</td></tr>
              </tbody>
            </table>
          </div>
          <ExecutableSnippet title={opSymbolicAnd.title} initialCode={opSymbolicAnd.code} />
        </section>

        <Callout variant="note" title="A filter predicate must be a boolean">
          <Code>filter</Code> does not coerce. Its expression has to evaluate to a boolean
          (or <Code>none</Code>, which drops the row); a numeric or text predicate is not
          supported. Comparisons, membership tests, boolean columns, and{' '}
          <Code>is::none()</Code>/<Code>is::some()</Code> are the building blocks.
        </Callout>
      </div>
    </Layout>
  );
}
