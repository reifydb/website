import { Layout } from '../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function TypesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Types & Expressions
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Everything in RQL is typed. The engine infers types automatically, promotes them
            when needed, and propagates <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">none</code> according
            to three-valued logic.
          </p>
        </div>

        {/* Type System */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Type System</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Category</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Types</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3">Signed Integers</td>
                  <td className="p-2 sm:p-3"><code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">int1</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">int2</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">int4</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">int8</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">int16</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">int</code></td>
                  <td className="p-2 sm:p-3"><code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">int</code> is arbitrary precision</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3">Unsigned Integers</td>
                  <td className="p-2 sm:p-3"><code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">uint1</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">uint2</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">uint4</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">uint8</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">uint16</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">uint</code></td>
                  <td className="p-2 sm:p-3"><code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">uint</code> is arbitrary precision</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3">Floats</td>
                  <td className="p-2 sm:p-3"><code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">float4</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">float8</code></td>
                  <td className="p-2 sm:p-3">IEEE 754</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3">Decimal</td>
                  <td className="p-2 sm:p-3"><code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">decimal</code></td>
                  <td className="p-2 sm:p-3">Arbitrary precision</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3">Temporal</td>
                  <td className="p-2 sm:p-3"><code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">date</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">datetime</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">time</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">duration</code></td>
                  <td className="p-2 sm:p-3">Calendar and clock types</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3">Text / Binary</td>
                  <td className="p-2 sm:p-3"><code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">utf8</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">blob</code></td>
                  <td className="p-2 sm:p-3">UTF-8 strings and raw bytes</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3">Identifiers</td>
                  <td className="p-2 sm:p-3"><code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">uuid4</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">uuid7</code></td>
                  <td className="p-2 sm:p-3">Universally unique identifiers</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3">Other</td>
                  <td className="p-2 sm:p-3"><code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">bool</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">Option(T)</code>, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">List(T)</code></td>
                  <td className="p-2 sm:p-3"><code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">Option</code> wraps nullable values</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Automatic Type Promotion */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Automatic Type Promotion</h2>
          <p className="text-text-secondary mb-4">
            When you mix types in an expression, the engine widens to the larger type.
            No data loss, no surprises.
          </p>
          <ExecutableSnippet
            title="Integer Widening"
            initialCode={getExampleById('types-integer-widening')!.code}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Same-family widening: <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">int1 → int2 → int4 → int8</code>.
            Cross-type: <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">int + float → float</code>.
          </p>
          <p className="text-text-secondary mb-4">
            Float4 promotes to float8 to prevent overflow during arithmetic.
          </p>
          <ExecutableSnippet
            title="Float Promotion"
            initialCode={getExampleById('types-float-promotion')!.code}
          />
        </section>

        {/* None Handling */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">None Handling</h2>
          <p className="text-text-secondary mb-4">
            RQL uses three-valued logic. <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">none</code> propagates
            through most operations — if any operand is <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">none</code>,
            the result is <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">none</code>.
          </p>
          <ExecutableSnippet
            title="None Propagation"
            initialCode={getExampleById('types-none-propagation')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">is::some()</code> and <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">is::none()</code> to
            test for presence. The null-coalescing operator <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">??</code> provides
            defaults: <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">value ?? fallback</code>.
          </p>
        </section>

        {/* String Concatenation */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">String Concatenation</h2>
          <p className="text-text-secondary mb-4">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">+</code> operator concatenates strings,
            and it auto-converts non-string types.
          </p>
          <ExecutableSnippet
            title="String Concatenation"
            initialCode={getExampleById('types-string-concat')!.code}
          />
          <p className="text-text-secondary mt-4">
            Works with bool, int, float, date, datetime, uuid, and blob values.
          </p>
        </section>

        {/* Type Casting */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Type Casting</h2>
          <p className="text-text-secondary mb-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">cast(value, type)</code> for explicit
            conversion between compatible types.
          </p>
          <ExecutableSnippet
            title="Type Casting"
            initialCode={getExampleById('types-cast-example')!.code}
          />
        </section>
      </div>
    </Layout>
  );
}
