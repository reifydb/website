import { Link } from 'react-router-dom';
import { DocsLayout } from '../../docs-layout';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function DateFormatPage() {
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
            date::format
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Format a date as a string.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`date::format(date_value, format_string)`} />
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
                  <td className="p-3"><code>date_value</code></td>
                  <td className="p-3">Date/Timestamp</td>
                  <td className="p-3">The date to format</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-3"><code>format_string</code></td>
                  <td className="p-3">String</td>
                  <td className="p-3">Format string using strftime syntax (e.g., "%Y-%m-%d")</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns a string representing the formatted date.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Format as ISO date</h3>
          <ExecutableSnippet
            initialCode={`from app.events
extend { formatted: date::format(created_at, "%Y-%m-%d") }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Include time</h3>
          <ExecutableSnippet
            initialCode={`from app.logs
extend { timestamp_str: date::format(timestamp, "%Y-%m-%d %H:%M:%S") }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Custom format</h3>
          <ExecutableSnippet
            initialCode={`from app.orders
extend { order_date: date::format(created_at, "%B %d, %Y") }`}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/date/year" className="text-primary-color hover:underline">
              date::year
            </Link>
            <Link to="/docs/functions/date/month" className="text-primary-color hover:underline">
              date::month
            </Link>
            <Link to="/docs/functions/date/day" className="text-primary-color hover:underline">
              date::day
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
