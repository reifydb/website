import { Link } from 'react-router-dom';
import { DocsLayout } from '../../docs-layout';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function DateDiffPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header with breadcrumb */}
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/date" className="font-bold hover:text-primary-color">
              date
            </Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            date::diff
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Calculate the difference between two dates.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`date::diff(date1, date2, unit: "days")`} />
        </section>

        {/* Parameters */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-3 font-bold">Name</th>
                  <th className="text-left p-3 font-bold">Type</th>
                  <th className="text-left p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>date1</code></td>
                  <td className="p-3">Date/Timestamp</td>
                  <td className="p-3">The first (later) date</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>date2</code></td>
                  <td className="p-3">Date/Timestamp</td>
                  <td className="p-3">The second (earlier) date</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>unit</code></td>
                  <td className="p-3">String</td>
                  <td className="p-3">The unit of time to return (e.g., "days", "hours")</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns a number representing the difference between the two dates in the specified unit.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Calculate days since creation</h3>
          <ExecutableSnippet
            initialCode={`from app.orders
extend { days_since: date::diff(date::now(), created_at, unit: "days") }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Filter by age</h3>
          <ExecutableSnippet
            initialCode={`from app.records
filter date::diff(date::now(), created_at, unit: "days") > 30`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Calculate hours between events</h3>
          <ExecutableSnippet
            initialCode={`from app.sessions
extend { duration_hours: date::diff(end_time, start_time, unit: "hours") }`}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/date/add" className="text-primary-color hover:underline">
              date::add
            </Link>
            <Link to="/docs/functions/date/now" className="text-primary-color hover:underline">
              date::now
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
