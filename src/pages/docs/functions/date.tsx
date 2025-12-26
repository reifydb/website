import { DocsLayout } from '../docs-layout';
import { RqlCodeBlock } from '../components';

export function DateFunctionsPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            date Functions
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">date</code> module
            provides functions for date and time manipulation.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Date Extraction</h2>

          <h3 className="text-lg font-bold mt-6 mb-3">date::year</h3>
          <p className="text-text-secondary mb-4">
            Extract the year from a date.
          </p>
          <RqlCodeBlock
            code={`from app.events
filter date::year(created_at) == 2024`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">date::month</h3>
          <p className="text-text-secondary mb-4">
            Extract the month (1-12) from a date.
          </p>
          <RqlCodeBlock
            code={`from app.orders
aggregate math::sum(total) by date::month(order_date)`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">date::day</h3>
          <p className="text-text-secondary mb-4">
            Extract the day of the month from a date.
          </p>
          <RqlCodeBlock
            code={`from app.logs
filter date::day(timestamp) == 1`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">date::hour / date::minute / date::second</h3>
          <p className="text-text-secondary mb-4">
            Extract time components from a timestamp.
          </p>
          <RqlCodeBlock
            code={`from app.events
extend {
  hour: date::hour(timestamp),
  minute: date::minute(timestamp)
}`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Date Manipulation</h2>

          <h3 className="text-lg font-bold mt-6 mb-3">date::now</h3>
          <p className="text-text-secondary mb-4">
            Get the current timestamp.
          </p>
          <RqlCodeBlock
            code={`from app.tasks
filter due_date < date::now()`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">date::add</h3>
          <p className="text-text-secondary mb-4">
            Add time to a date.
          </p>
          <RqlCodeBlock
            code={`from app.subscriptions
extend { expires: date::add(start_date, days: 30) }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">date::diff</h3>
          <p className="text-text-secondary mb-4">
            Calculate the difference between two dates.
          </p>
          <RqlCodeBlock
            code={`from app.orders
extend { days_since: date::diff(date::now(), created_at, unit: "days") }`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Formatting</h2>

          <h3 className="text-lg font-bold mt-6 mb-3">date::format</h3>
          <p className="text-text-secondary mb-4">
            Format a date as a string.
          </p>
          <RqlCodeBlock
            code={`from app.events
extend { formatted: date::format(created_at, "%Y-%m-%d") }`}
          />
        </section>

      </div>
    </DocsLayout>
  );
}
