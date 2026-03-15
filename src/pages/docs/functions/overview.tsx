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
              to="/docs/functions/blob"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">blob</h3>
              <p className="text-text-secondary text-sm">
                Binary encoding and decoding: b58, b64, b64url, hex, utf8.
              </p>
            </Link>

            <Link
              to="/docs/functions/clock"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">clock</h3>
              <p className="text-text-secondary text-sm">
                System clock access: now, set, advance.
              </p>
            </Link>

            <Link
              to="/docs/functions/date"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date</h3>
              <p className="text-text-secondary text-sm">
                Work with dates: year, month, day, quarter, week, add, subtract, diff, format.
              </p>
            </Link>

            <Link
              to="/docs/functions/datetime"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">datetime</h3>
              <p className="text-text-secondary text-sm">
                Full datetime manipulation: extraction, construction, arithmetic, epoch conversion, formatting.
              </p>
            </Link>

            <Link
              to="/docs/functions/duration"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">duration</h3>
              <p className="text-text-secondary text-sm">
                Create and manipulate durations: years, months, days, hours, minutes, seconds.
              </p>
            </Link>

            <Link
              to="/docs/functions/identity"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">identity</h3>
              <p className="text-text-secondary text-sm">
                Record identifier functions: id.
              </p>
            </Link>

            <Link
              to="/docs/functions/is"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">is</h3>
              <p className="text-text-secondary text-sm">
                Type and value checking: some, none, type, root, anonymous.
              </p>
            </Link>

            <Link
              to="/docs/functions/json"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">json</h3>
              <p className="text-text-secondary text-sm">
                Build and serialize JSON: array, object, serialize, pretty.
              </p>
            </Link>

            <Link
              to="/docs/functions/math"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">math</h3>
              <p className="text-text-secondary text-sm">
                Numbers and aggregations: sum, avg, min, max, count, abs, round, trig, logarithms.
              </p>
            </Link>

            <Link
              to="/docs/functions/meta"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">meta</h3>
              <p className="text-text-secondary text-sm">
                Value metadata inspection: type.
              </p>
            </Link>

            <Link
              to="/docs/functions/text"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">text</h3>
              <p className="text-text-secondary text-sm">
                String operations: lower, upper, trim, contains, replace, pad, format.
              </p>
            </Link>

            <Link
              to="/docs/functions/time"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">time</h3>
              <p className="text-text-secondary text-sm">
                Time-of-day functions: hour, minute, second, add, subtract, diff, format.
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
