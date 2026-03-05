import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';

export function FunctionsOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Functions
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            RQL comes with built-in function modules for the operations you use most.
            Call them with the{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">::</code> syntax.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Available Modules</h2>
          <div className="space-y-4">
            <Link
              to="/docs/functions/date"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date</h3>
              <p className="text-text-secondary text-sm">
                Work with dates and times: year, month, day, hour, now, add, diff, format.
              </p>
            </Link>

            <Link
              to="/docs/functions/math"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math</h3>
              <p className="text-text-secondary text-sm">
                Numbers and aggregations: sum, avg, min, max, count, abs, round.
              </p>
            </Link>

            <Link
              to="/docs/functions/text"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">text</h3>
              <p className="text-text-secondary text-sm">
                String operations: lower, upper, trim, length, concat, substring.
              </p>
            </Link>
          </div>
        </section>

        <Callout variant="tip" title="Syntax">
          Call any module function with{' '}
          <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">module::function(args)</code>.
          For example: <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">text::lower(name)</code>.
        </Callout>
      </div>
    </Layout>
  );
}
