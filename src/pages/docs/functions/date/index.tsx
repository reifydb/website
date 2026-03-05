import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function DateModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            date Module
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Everything you need to work with dates and timestamps in RQL.
          </p>
        </div>

        {/* Quick Example */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Example</h2>
          <ExecutableSnippet
            title="Quick Example"
            initialCode={getExampleById('date-overview-quick')!.code}
          />
        </section>

        {/* Date Extraction Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Date Extraction</h2>
          <p className="text-text-secondary mb-4">
            Pull out the parts you need from any date or timestamp.
          </p>
          <div className="grid gap-3">
            <Link
              to="/docs/functions/date/year"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::year</h3>
              <p className="text-text-secondary text-sm">
                Extract the year from a date
              </p>
            </Link>

            <Link
              to="/docs/functions/date/month"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::month</h3>
              <p className="text-text-secondary text-sm">
                Extract the month (1-12) from a date
              </p>
            </Link>

            <Link
              to="/docs/functions/date/day"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::day</h3>
              <p className="text-text-secondary text-sm">
                Extract the day of the month from a date
              </p>
            </Link>

            <Link
              to="/docs/functions/date/day_of_year"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::day_of_year</h3>
              <p className="text-text-secondary text-sm">
                Get the day of the year (1-366)
              </p>
            </Link>

            <Link
              to="/docs/functions/date/day_of_week"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::day_of_week</h3>
              <p className="text-text-secondary text-sm">
                Get the day of the week (1=Monday, 7=Sunday)
              </p>
            </Link>

            <Link
              to="/docs/functions/date/quarter"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::quarter</h3>
              <p className="text-text-secondary text-sm">
                Get the quarter (1-4)
              </p>
            </Link>

            <Link
              to="/docs/functions/date/week"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::week</h3>
              <p className="text-text-secondary text-sm">
                Get the ISO week number (1-53)
              </p>
            </Link>
          </div>
        </section>

        {/* Date Properties */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Date Properties</h2>
          <p className="text-text-secondary mb-4">
            Inspect properties and boundaries of dates.
          </p>
          <div className="grid gap-3">
            <Link
              to="/docs/functions/date/is_leap_year"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::is_leap_year</h3>
              <p className="text-text-secondary text-sm">
                Check if a date falls in a leap year
              </p>
            </Link>

            <Link
              to="/docs/functions/date/days_in_month"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::days_in_month</h3>
              <p className="text-text-secondary text-sm">
                Get the number of days in the month
              </p>
            </Link>

            <Link
              to="/docs/functions/date/start_of_month"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::start_of_month</h3>
              <p className="text-text-secondary text-sm">
                Get the first day of the month
              </p>
            </Link>

            <Link
              to="/docs/functions/date/end_of_month"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::end_of_month</h3>
              <p className="text-text-secondary text-sm">
                Get the last day of the month
              </p>
            </Link>

            <Link
              to="/docs/functions/date/start_of_year"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::start_of_year</h3>
              <p className="text-text-secondary text-sm">
                Get the first day of the year
              </p>
            </Link>
          </div>
        </section>

        {/* Date Manipulation Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Date Manipulation</h2>
          <p className="text-text-secondary mb-4">
            Add time, compute differences, or grab the current timestamp.
          </p>
          <div className="grid gap-3">
            <Link
              to="/docs/functions/date/new"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::new</h3>
              <p className="text-text-secondary text-sm">
                Create a new date from year, month, and day
              </p>
            </Link>

            <Link
              to="/docs/functions/date/now"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::now</h3>
              <p className="text-text-secondary text-sm">
                Get the current timestamp
              </p>
            </Link>

            <Link
              to="/docs/functions/date/add"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::add</h3>
              <p className="text-text-secondary text-sm">
                Add time to a date
              </p>
            </Link>

            <Link
              to="/docs/functions/date/subtract"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::subtract</h3>
              <p className="text-text-secondary text-sm">
                Subtract a duration from a date
              </p>
            </Link>

            <Link
              to="/docs/functions/date/diff"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::diff</h3>
              <p className="text-text-secondary text-sm">
                Calculate the difference between two dates
              </p>
            </Link>

            <Link
              to="/docs/functions/date/trunc"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::trunc</h3>
              <p className="text-text-secondary text-sm">
                Truncate a date to a specified precision
              </p>
            </Link>

            <Link
              to="/docs/functions/date/age"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::age</h3>
              <p className="text-text-secondary text-sm">
                Calculate the duration between two dates
              </p>
            </Link>
          </div>
        </section>

        {/* Formatting Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Formatting</h2>
          <p className="text-text-secondary mb-4">
            Turn dates into readable strings.
          </p>
          <div className="grid gap-3">
            <Link
              to="/docs/functions/date/format"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::format</h3>
              <p className="text-text-secondary text-sm">
                Format a date as a string
              </p>
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
                  <th className="text-left p-2 sm:p-3 font-bold">Category</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::year</code></td>
                  <td className="p-2 sm:p-3">Extraction</td>
                  <td className="p-2 sm:p-3">Extract the year from a date</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::month</code></td>
                  <td className="p-2 sm:p-3">Extraction</td>
                  <td className="p-2 sm:p-3">Extract the month (1-12) from a date</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::day</code></td>
                  <td className="p-2 sm:p-3">Extraction</td>
                  <td className="p-2 sm:p-3">Extract the day of the month from a date</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::day_of_year</code></td>
                  <td className="p-2 sm:p-3">Extraction</td>
                  <td className="p-2 sm:p-3">Get the day of the year (1-366)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::day_of_week</code></td>
                  <td className="p-2 sm:p-3">Extraction</td>
                  <td className="p-2 sm:p-3">Get the day of the week (1=Monday, 7=Sunday)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::quarter</code></td>
                  <td className="p-2 sm:p-3">Extraction</td>
                  <td className="p-2 sm:p-3">Get the quarter (1-4)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::week</code></td>
                  <td className="p-2 sm:p-3">Extraction</td>
                  <td className="p-2 sm:p-3">Get the ISO week number (1-53)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::is_leap_year</code></td>
                  <td className="p-2 sm:p-3">Properties</td>
                  <td className="p-2 sm:p-3">Check if a date falls in a leap year</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::days_in_month</code></td>
                  <td className="p-2 sm:p-3">Properties</td>
                  <td className="p-2 sm:p-3">Get the number of days in the month</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::start_of_month</code></td>
                  <td className="p-2 sm:p-3">Properties</td>
                  <td className="p-2 sm:p-3">Get the first day of the month</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::end_of_month</code></td>
                  <td className="p-2 sm:p-3">Properties</td>
                  <td className="p-2 sm:p-3">Get the last day of the month</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::start_of_year</code></td>
                  <td className="p-2 sm:p-3">Properties</td>
                  <td className="p-2 sm:p-3">Get the first day of the year</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::new</code></td>
                  <td className="p-2 sm:p-3">Manipulation</td>
                  <td className="p-2 sm:p-3">Create a new date from components</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::now</code></td>
                  <td className="p-2 sm:p-3">Manipulation</td>
                  <td className="p-2 sm:p-3">Get the current timestamp</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::add</code></td>
                  <td className="p-2 sm:p-3">Manipulation</td>
                  <td className="p-2 sm:p-3">Add time to a date</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::subtract</code></td>
                  <td className="p-2 sm:p-3">Manipulation</td>
                  <td className="p-2 sm:p-3">Subtract a duration from a date</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::diff</code></td>
                  <td className="p-2 sm:p-3">Manipulation</td>
                  <td className="p-2 sm:p-3">Calculate the difference between two dates</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::trunc</code></td>
                  <td className="p-2 sm:p-3">Manipulation</td>
                  <td className="p-2 sm:p-3">Truncate a date to a specified precision</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::age</code></td>
                  <td className="p-2 sm:p-3">Manipulation</td>
                  <td className="p-2 sm:p-3">Calculate the duration between two dates</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::format</code></td>
                  <td className="p-2 sm:p-3">Formatting</td>
                  <td className="p-2 sm:p-3">Format a date as a string</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
