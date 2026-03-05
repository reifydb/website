import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function MathModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            math Module
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Number crunching and aggregations for your queries.
          </p>
        </div>

        {/* Quick Example */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Example</h2>
          <ExecutableSnippet
            title="Quick Example"
            initialCode={getExampleById('math-overview-quick')!.code}
          />
        </section>

        {/* Aggregation Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Aggregation Functions</h2>
          <p className="text-text-secondary mb-4">
            Use these with the <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm">aggregate</code> transform to summarize your data.
          </p>
          <div className="grid gap-3">
            <Link to="/docs/functions/math/sum" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::sum</h3>
              <p className="text-text-secondary text-sm">Calculate the sum of numeric values</p>
            </Link>
            <Link to="/docs/functions/math/avg" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::avg</h3>
              <p className="text-text-secondary text-sm">Calculate the average of numeric values</p>
            </Link>
            <Link to="/docs/functions/math/min" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::min</h3>
              <p className="text-text-secondary text-sm">Find the minimum value</p>
            </Link>
            <Link to="/docs/functions/math/max" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::max</h3>
              <p className="text-text-secondary text-sm">Find the maximum value</p>
            </Link>
          </div>
        </section>

        {/* Scalar Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Scalar Functions</h2>
          <p className="text-text-secondary mb-4">
            Apply math to individual values, row by row.
          </p>
          <div className="grid gap-3">
            <Link to="/docs/functions/math/abs" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::abs</h3>
              <p className="text-text-secondary text-sm">Get the absolute value of a number</p>
            </Link>
            <Link to="/docs/functions/math/round" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::round</h3>
              <p className="text-text-secondary text-sm">Round to the nearest integer or decimal place</p>
            </Link>
            <Link to="/docs/functions/math/floor" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::floor</h3>
              <p className="text-text-secondary text-sm">Round down to the nearest integer</p>
            </Link>
            <Link to="/docs/functions/math/ceil" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::ceil</h3>
              <p className="text-text-secondary text-sm">Round up to the nearest integer</p>
            </Link>
            <Link to="/docs/functions/math/power" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::power</h3>
              <p className="text-text-secondary text-sm">Raise a number to a power</p>
            </Link>
            <Link to="/docs/functions/math/sqrt" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::sqrt</h3>
              <p className="text-text-secondary text-sm">Compute the square root</p>
            </Link>
            <Link to="/docs/functions/math/sign" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::sign</h3>
              <p className="text-text-secondary text-sm">Return the sign of a number (-1, 0, or 1)</p>
            </Link>
            <Link to="/docs/functions/math/clamp" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::clamp</h3>
              <p className="text-text-secondary text-sm">Clamp a value within a range</p>
            </Link>
            <Link to="/docs/functions/math/mod" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::mod</h3>
              <p className="text-text-secondary text-sm">Compute the modulo (remainder)</p>
            </Link>
            <Link to="/docs/functions/math/truncate" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::truncate</h3>
              <p className="text-text-secondary text-sm">Truncate a number toward zero</p>
            </Link>
            <Link to="/docs/functions/math/gcd" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::gcd</h3>
              <p className="text-text-secondary text-sm">Greatest common divisor</p>
            </Link>
            <Link to="/docs/functions/math/lcm" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::lcm</h3>
              <p className="text-text-secondary text-sm">Least common multiple</p>
            </Link>
          </div>
        </section>

        {/* Trigonometric Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Trigonometric Functions</h2>
          <p className="text-text-secondary mb-4">
            Standard trigonometric functions operating in radians.
          </p>
          <div className="grid gap-3">
            <Link to="/docs/functions/math/sin" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::sin</h3>
              <p className="text-text-secondary text-sm">Compute the sine</p>
            </Link>
            <Link to="/docs/functions/math/cos" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::cos</h3>
              <p className="text-text-secondary text-sm">Compute the cosine</p>
            </Link>
            <Link to="/docs/functions/math/tan" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::tan</h3>
              <p className="text-text-secondary text-sm">Compute the tangent</p>
            </Link>
            <Link to="/docs/functions/math/asin" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::asin</h3>
              <p className="text-text-secondary text-sm">Compute the arcsine</p>
            </Link>
            <Link to="/docs/functions/math/acos" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::acos</h3>
              <p className="text-text-secondary text-sm">Compute the arccosine</p>
            </Link>
            <Link to="/docs/functions/math/atan" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::atan</h3>
              <p className="text-text-secondary text-sm">Compute the arctangent</p>
            </Link>
            <Link to="/docs/functions/math/atan2" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::atan2</h3>
              <p className="text-text-secondary text-sm">Two-argument arctangent</p>
            </Link>
          </div>
        </section>

        {/* Logarithmic & Exponential */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Logarithmic & Exponential</h2>
          <p className="text-text-secondary mb-4">
            Logarithms, exponentials, and mathematical constants.
          </p>
          <div className="grid gap-3">
            <Link to="/docs/functions/math/exp" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::exp</h3>
              <p className="text-text-secondary text-sm">Compute e raised to a power</p>
            </Link>
            <Link to="/docs/functions/math/log" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::log</h3>
              <p className="text-text-secondary text-sm">Natural logarithm (base e)</p>
            </Link>
            <Link to="/docs/functions/math/log2" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::log2</h3>
              <p className="text-text-secondary text-sm">Base-2 logarithm</p>
            </Link>
            <Link to="/docs/functions/math/log10" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::log10</h3>
              <p className="text-text-secondary text-sm">Base-10 logarithm</p>
            </Link>
            <Link to="/docs/functions/math/e" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::e</h3>
              <p className="text-text-secondary text-sm">Euler's number (~2.71828)</p>
            </Link>
            <Link to="/docs/functions/math/pi" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">math::pi</h3>
              <p className="text-text-secondary text-sm">Pi (~3.14159)</p>
            </Link>
          </div>
        </section>

        {/* Reference Table */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Function Reference</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Function</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Type</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::sum</code></td>
                  <td className="p-2 sm:p-3">Aggregation</td>
                  <td className="p-2 sm:p-3">Calculate the sum of numeric values</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::avg</code></td>
                  <td className="p-2 sm:p-3">Aggregation</td>
                  <td className="p-2 sm:p-3">Calculate the average of numeric values</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::min</code></td>
                  <td className="p-2 sm:p-3">Aggregation</td>
                  <td className="p-2 sm:p-3">Find the minimum value</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::max</code></td>
                  <td className="p-2 sm:p-3">Aggregation</td>
                  <td className="p-2 sm:p-3">Find the maximum value</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::abs</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Get the absolute value of a number</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::round</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Round to the nearest integer or decimal place</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::floor</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Round down to the nearest integer</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::ceil</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Round up to the nearest integer</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::power</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Raise a number to a power</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::sqrt</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Compute the square root</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::sign</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Return the sign of a number</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::clamp</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Clamp a value within a range</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::mod</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Compute the modulo (remainder)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::truncate</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Truncate a number toward zero</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::gcd</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Greatest common divisor</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::lcm</code></td>
                  <td className="p-2 sm:p-3">Scalar</td>
                  <td className="p-2 sm:p-3">Least common multiple</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::sin</code></td>
                  <td className="p-2 sm:p-3">Trigonometric</td>
                  <td className="p-2 sm:p-3">Compute the sine</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::cos</code></td>
                  <td className="p-2 sm:p-3">Trigonometric</td>
                  <td className="p-2 sm:p-3">Compute the cosine</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::tan</code></td>
                  <td className="p-2 sm:p-3">Trigonometric</td>
                  <td className="p-2 sm:p-3">Compute the tangent</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::asin</code></td>
                  <td className="p-2 sm:p-3">Trigonometric</td>
                  <td className="p-2 sm:p-3">Compute the arcsine</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::acos</code></td>
                  <td className="p-2 sm:p-3">Trigonometric</td>
                  <td className="p-2 sm:p-3">Compute the arccosine</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::atan</code></td>
                  <td className="p-2 sm:p-3">Trigonometric</td>
                  <td className="p-2 sm:p-3">Compute the arctangent</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::atan2</code></td>
                  <td className="p-2 sm:p-3">Trigonometric</td>
                  <td className="p-2 sm:p-3">Two-argument arctangent</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::exp</code></td>
                  <td className="p-2 sm:p-3">Exponential</td>
                  <td className="p-2 sm:p-3">Compute e raised to a power</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::log</code></td>
                  <td className="p-2 sm:p-3">Logarithmic</td>
                  <td className="p-2 sm:p-3">Natural logarithm (base e)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::log2</code></td>
                  <td className="p-2 sm:p-3">Logarithmic</td>
                  <td className="p-2 sm:p-3">Base-2 logarithm</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::log10</code></td>
                  <td className="p-2 sm:p-3">Logarithmic</td>
                  <td className="p-2 sm:p-3">Base-10 logarithm</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::e</code></td>
                  <td className="p-2 sm:p-3">Constant</td>
                  <td className="p-2 sm:p-3">Euler's number (~2.71828)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>math::pi</code></td>
                  <td className="p-2 sm:p-3">Constant</td>
                  <td className="p-2 sm:p-3">Pi (~3.14159)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
