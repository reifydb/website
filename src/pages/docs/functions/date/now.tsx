import { Link } from 'react-router-dom';
import { DocsLayout } from '../../docs-layout';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';

export function DateNowPage() {
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
            date::now
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Get the current timestamp.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`date::now()`} />
        </section>

        {/* Parameters */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary">
            This function takes no parameters.
          </p>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns a timestamp representing the current date and time.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Find overdue tasks</h3>
          <ExecutableSnippet
            title="Find overdue tasks"
            initialCode={`from app.tasks
filter due_date < date::now()`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Add created timestamp</h3>
          <ExecutableSnippet
            title="Add created timestamp"
            initialCode={`from app.records
extend { processed_at: date::now() }`}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Calculate time elapsed</h3>
          <ExecutableSnippet
            title="Calculate time elapsed"
            initialCode={`from app.orders
extend { days_since: date::diff(date::now(), created_at, unit: "days") }`}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/date/add" className="text-primary-color hover:underline">
              date::add
            </Link>
            <Link to="/docs/functions/date/diff" className="text-primary-color hover:underline">
              date::diff
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
