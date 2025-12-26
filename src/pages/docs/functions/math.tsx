import { DocsLayout } from '../docs-layout';
import { RqlCodeBlock } from '../components';

export function MathFunctionsPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            math Functions
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">math</code> module
            provides mathematical functions and aggregations.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Aggregation Functions</h2>

          <h3 className="text-lg font-bold mt-6 mb-3">math::sum</h3>
          <p className="text-text-secondary mb-4">
            Calculate the sum of values.
          </p>
          <RqlCodeBlock
            code={`from app.orders
aggregate math::sum(total) by region`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">math::avg</h3>
          <p className="text-text-secondary mb-4">
            Calculate the average of values.
          </p>
          <RqlCodeBlock
            code={`from app.products
aggregate math::avg(price) by category`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">math::min / math::max</h3>
          <p className="text-text-secondary mb-4">
            Find minimum and maximum values.
          </p>
          <RqlCodeBlock
            code={`from app.sales
aggregate {
  lowest: math::min(amount),
  highest: math::max(amount)
} by month`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">math::count</h3>
          <p className="text-text-secondary mb-4">
            Count the number of rows.
          </p>
          <RqlCodeBlock
            code={`from app.users
aggregate math::count() by status`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Scalar Functions</h2>

          <h3 className="text-lg font-bold mt-6 mb-3">math::abs</h3>
          <p className="text-text-secondary mb-4">
            Get the absolute value.
          </p>
          <RqlCodeBlock
            code={`from app.transactions
extend { abs_amount: math::abs(amount) }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">math::round</h3>
          <p className="text-text-secondary mb-4">
            Round to the nearest integer or decimal place.
          </p>
          <RqlCodeBlock
            code={`from app.prices
extend { rounded: math::round(price, 2) }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">math::floor / math::ceil</h3>
          <p className="text-text-secondary mb-4">
            Round down or up to the nearest integer.
          </p>
          <RqlCodeBlock
            code={`from app.measurements
extend {
  floor_val: math::floor(value),
  ceil_val: math::ceil(value)
}`}
          />
        </section>

      </div>
    </DocsLayout>
  );
}
