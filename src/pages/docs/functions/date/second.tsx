import { Link } from 'react-router-dom';
import { DocsLayout } from '../../docs-layout';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function DateSecondPage() {
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
            date::second
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Extract the second from a timestamp.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`date::second(timestamp)`} />
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
                  <td className="p-3"><code>timestamp</code></td>
                  <td className="p-3">Timestamp</td>
                  <td className="p-3">The timestamp to extract the second from</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns an integer from 0-59 representing the second.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Extract precise time</h3>
          <ExecutableSnippet
            title="Extract precise time"
            initialCode={`from app.events
extend {
  hour: date::hour(timestamp),
  minute: date::minute(timestamp),
  second: date::second(timestamp)
}`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Filter by exact second</h3>
          <ExecutableSnippet
            title="Filter by exact second"
            initialCode={`from app.logs
filter date::second(timestamp) == 0`}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/date/hour" className="text-primary-color hover:underline">
              date::hour
            </Link>
            <Link to="/docs/functions/date/minute" className="text-primary-color hover:underline">
              date::minute
            </Link>
            <Link to="/docs/functions/date/format" className="text-primary-color hover:underline">
              date::format
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
