import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';

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
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">date</code> module
            provides functions for date and time manipulation and extraction.
          </p>
        </div>

        {/* Quick Example */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Example</h2>
          <ExecutableSnippet
            title="Quick Example"
            initialCode={`from app.events
filter date::year(created_at) == 2024
extend {
  month: date::month(created_at),
  formatted: date::format(created_at, "%Y-%m-%d")
}`}
          />
        </section>

        {/* Date Extraction Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Date Extraction</h2>
          <p className="text-text-secondary mb-4">
            Extract individual components from dates and timestamps.
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
              to="/docs/functions/date/hour"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::hour</h3>
              <p className="text-text-secondary text-sm">
                Extract the hour from a timestamp
              </p>
            </Link>

            <Link
              to="/docs/functions/date/minute"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::minute</h3>
              <p className="text-text-secondary text-sm">
                Extract the minute from a timestamp
              </p>
            </Link>

            <Link
              to="/docs/functions/date/second"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::second</h3>
              <p className="text-text-secondary text-sm">
                Extract the second from a timestamp
              </p>
            </Link>
          </div>
        </section>

        {/* Date Manipulation Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Date Manipulation</h2>
          <p className="text-text-secondary mb-4">
            Create, modify, and calculate with dates and timestamps.
          </p>
          <div className="grid gap-3">
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
              to="/docs/functions/date/diff"
              className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors"
            >
              <h3 className="font-bold text-primary-color mb-1">date::diff</h3>
              <p className="text-text-secondary text-sm">
                Calculate the difference between two dates
              </p>
            </Link>
          </div>
        </section>

        {/* Formatting Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Formatting</h2>
          <p className="text-text-secondary mb-4">
            Convert dates to formatted strings for display.
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
                  <td className="p-2 sm:p-3"><code>date::hour</code></td>
                  <td className="p-2 sm:p-3">Extraction</td>
                  <td className="p-2 sm:p-3">Extract the hour from a timestamp</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::minute</code></td>
                  <td className="p-2 sm:p-3">Extraction</td>
                  <td className="p-2 sm:p-3">Extract the minute from a timestamp</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>date::second</code></td>
                  <td className="p-2 sm:p-3">Extraction</td>
                  <td className="p-2 sm:p-3">Extract the second from a timestamp</td>
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
                  <td className="p-2 sm:p-3"><code>date::diff</code></td>
                  <td className="p-2 sm:p-3">Manipulation</td>
                  <td className="p-2 sm:p-3">Calculate the difference between two dates</td>
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
