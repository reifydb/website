import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

const variants: { suffix: string; signature: string; onOverflow: string; onDivZero: string }[] = [
  {
    suffix: '(none)',
    signature: 'math::add(a, b)',
    onOverflow: 'Fails the statement (NUMBER_002)',
    onDivZero: 'Fails the statement (NUMBER_007)',
  },
  {
    suffix: '_saturate',
    signature: 'math::add_saturate(a, b)',
    onOverflow: "Clamps to the result type's minimum or maximum",
    onDivZero: 'Returns 0',
  },
  {
    suffix: '_wrap',
    signature: 'math::add_wrap(a, b)',
    onOverflow: "Wraps around (two's complement)",
    onDivZero: 'Returns 0',
  },
  {
    suffix: '_zero',
    signature: 'math::add_zero(a, b)',
    onOverflow: 'Returns 0',
    onDivZero: 'Returns 0',
  },
  {
    suffix: '_none',
    signature: 'math::add_none(a, b)',
    onOverflow: 'Returns none',
    onDivZero: 'Returns none',
  },
  {
    suffix: '_default',
    signature: 'math::add_default(a, b, fallback)',
    onOverflow: 'Returns fallback for that row',
    onDivZero: 'Returns fallback for that row',
  },
  {
    suffix: '_strict',
    signature: "math::add_strict(a, b, message)",
    onOverflow: 'Fails the statement with your message (FUNCTION_007)',
    onDivZero: 'Fails the statement with your message (FUNCTION_007)',
  },
];

export function ArithmeticPoliciesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/math" className="font-bold hover:text-primary-color">math</Link>
            {' module · Scalar Functions'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Arithmetic Policies</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Sometimes an arithmetic result simply does not exist: the sum is too large
            for the result type, or the divisor is zero. By default ReifyDB fails the
            statement rather than silently producing a wrong number. When failing is
            not what you want, each arithmetic function family -{' '}
            <Code>math::add</Code>, <Code>math::sub</Code>, <Code>math::mul</Code>,{' '}
            <Code>math::div</Code>, <Code>math::rem</Code> - comes in six policy
            variants that name, in the query itself, what happens instead.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The default: fail loudly</h2>
          <p className="text-text-secondary mb-4">
            The bare operators (<Code>+</Code>, <Code>-</Code>, <Code>*</Code>,{' '}
            <Code>/</Code>, <Code>%</Code>) and the bare functions
            (<Code>math::add</Code> and friends) apply the same rule: a result that
            cannot be represented is an error, not a wrong answer. Overflow fails with{' '}
            <Code>NUMBER_002</Code> (number out of range):
          </p>
          <ExampleSnippet id="fn-arith-operator-overflow" />
          <p className="text-text-secondary mt-4 mb-4">
            and division or remainder by zero fails with <Code>NUMBER_007</Code>. The
            functions report it wrapped in a <Code>FUNCTION_007</Code> execution
            error; the cause is the same:
          </p>
          <ExampleSnippet id="fn-arith-function-divzero" />
          <p className="text-text-secondary mt-4">
            For floating-point inputs the same rule covers non-finite results: an
            operation that would produce infinity or NaN counts as overflow.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">One family, seven spellings</h2>
          <p className="text-text-secondary mb-4">
            Each policy is a separate function named with a suffix:{' '}
            <Code>math::add_saturate</Code>, <Code>math::div_none</Code>,{' '}
            <Code>math::mul_strict</Code>, and so on. All five families -{' '}
            <Code>add</Code>, <Code>sub</Code>, <Code>mul</Code>, <Code>div</Code>,{' '}
            <Code>rem</Code> - have all six variants. Shown here for{' '}
            <Code>math::add</Code>:
          </p>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Signature</th>
                  <th className="text-left p-2 sm:p-3 font-bold">On overflow</th>
                  <th className="text-left p-2 sm:p-3 font-bold">On division by zero</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v) => (
                  <tr key={v.suffix} className="border-t-2 border-border-default">
                    <td className="p-2 sm:p-3 font-mono text-xs whitespace-nowrap">{v.signature}</td>
                    <td className="p-2 sm:p-3 text-text-secondary">{v.onOverflow}</td>
                    <td className="p-2 sm:p-3 text-text-secondary">{v.onDivZero}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mt-4">
            The row-level policies (<Code>_saturate</Code>, <Code>_wrap</Code>,{' '}
            <Code>_zero</Code>, <Code>_none</Code>, <Code>_default</Code>) affect only
            the offending row; every other row computes normally. The failing policies
            (the bare function and <Code>_strict</Code>) abort the whole statement on
            the first impossible result.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">saturate: clamp to the type range</h2>
          <p className="text-text-secondary mb-4">
            <Code>_saturate</Code> pins an out-of-range result to the result type's
            minimum or maximum. Use it when "as large as representable" is a better
            answer than no answer - accumulating counters, scores with a cap:
          </p>
          <ExampleSnippet id="fn-arith-saturate" />
          <p className="text-text-secondary mt-4 mb-4">
            On unsigned types, subtracting below zero clamps to zero - a natural fit
            for "remaining quantity" arithmetic:
          </p>
          <ExampleSnippet id="fn-arith-saturate-floor" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">wrap and zero</h2>
          <p className="text-text-secondary mb-4">
            <Code>_wrap</Code> applies two's-complement wraparound, the behavior of
            unchecked machine arithmetic - useful for hash-style computations where
            wrapping is intended. <Code>_zero</Code> substitutes <Code>0</Code> for
            any result that does not exist:
          </p>
          <ExampleSnippet id="fn-arith-wrap-zero" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">none: make the result missing</h2>
          <p className="text-text-secondary mb-4">
            <Code>_none</Code> turns an impossible result into a missing value, which
            then flows through the rest of the query with the usual{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">none semantics</Link>:
            filters drop it, aggregates skip it. This is the honest choice for ratios
            with an empty denominator - an average over nothing is not zero, it is
            unknown:
          </p>
          <ExampleSnippet id="fn-arith-none" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">default: substitute your own value</h2>
          <p className="text-text-secondary mb-4">
            <Code>_default</Code> takes a third argument and returns it for the rows
            where the real result does not exist. The fallback is coerced to the
            result type; a <Code>none</Code> fallback yields <Code>none</Code>:
          </p>
          <ExampleSnippet id="fn-arith-fallback" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">strict: fail with your own message</h2>
          <p className="text-text-secondary mb-4">
            <Code>_strict</Code> also fails the statement, like the bare function, but
            the third argument replaces the generic diagnostic with a message that
            says what actually went wrong in your domain:
          </p>
          <ExampleSnippet id="fn-arith-strict" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Missing input is not a policy decision</h2>
          <p className="text-text-secondary mb-4">
            The policies decide what happens when a result <em>cannot exist</em>. A
            missing input is different: the result is simply missing too, in every
            variant - even <Code>_strict</Code> does not fail on a <Code>none</Code>{' '}
            input, and <Code>_zero</Code> does not invent a zero for one:
          </p>
          <ExampleSnippet id="fn-arith-none-propagates" />
          <p className="text-text-secondary mt-4">
            To replace missing inputs, handle them explicitly before the arithmetic -
            see{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">Working with none</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Types widen before they overflow</h2>
          <p className="text-text-secondary mb-4">
            Arithmetic first promotes both operands to a wider result type: two{' '}
            <Code>int4</Code> values add as <Code>int8</Code>, two <Code>float4</Code>{' '}
            values as <Code>float8</Code>, and mixed signed/unsigned operands promote
            to a signed type that holds both. Promotion caps at the 128-bit types
            (<Code>int16</Code>, <Code>uint16</Code>), so integer overflow only occurs
            at the extremes of those widest types - which is why the examples above
            use them. Division by zero, not overflow, is the case these policies
            handle day to day:
          </p>
          <ExampleSnippet id="fn-arith-promotion" />
        </section>

        <Callout variant="note" title="Not related to table policies">
          These function variants are unrelated to{' '}
          <Link to="/docs/concepts/data-model/policies" className="text-primary hover:text-primary-light font-medium transition-colors">policies</Link>{' '}
          in the data model, which are row-level security rules attached to tables and
          other objects. Arithmetic policies are purely a naming convention for scalar
          functions: the behavior is chosen per call site, visible in the query text.
        </Callout>
      </div>
    </Layout>
  );
}
