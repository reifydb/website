import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function DateMinutePage() {
  return (
    <Layout>
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
            date::minute
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Extract the minute from a timestamp.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`date::minute(timestamp)`} />
        </section>

        {/* Parameters */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Name</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Type</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>timestamp</code></td>
                  <td className="p-2 sm:p-3">Timestamp</td>
                  <td className="p-2 sm:p-3">The timestamp to extract the minute from</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns an integer from 0-59 representing the minute.
          </p>
        </section>

        {/* TODO: Examples commented out - date::minute not implemented yet */}
        {/* <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Extract time components</h3>
          <ExecutableSnippet
            title={getExampleById('date-minute-extract')!.title}
            initialCode={getExampleById('date-minute-extract')!.code}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Filter by specific time</h3>
          <ExecutableSnippet
            title={getExampleById('date-minute-filter')!.title}
            initialCode={getExampleById('date-minute-filter')!.code}
          />
        </section> */}

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/date/hour" className="text-primary-color hover:underline">
              date::hour
            </Link>
            <Link to="/docs/functions/date/second" className="text-primary-color hover:underline">
              date::second
            </Link>
            <Link to="/docs/functions/date/format" className="text-primary-color hover:underline">
              date::format
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
