import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function DateAddPage() {
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
            date::add
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Add time to a date.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`date::add(date_value, days: n)`} />
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
                  <td className="p-2 sm:p-3"><code>date_value</code></td>
                  <td className="p-2 sm:p-3">Date/Timestamp</td>
                  <td className="p-2 sm:p-3">The base date to add time to</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>days</code></td>
                  <td className="p-2 sm:p-3">Integer</td>
                  <td className="p-2 sm:p-3">Number of days to add (can be negative to subtract)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns a new date/timestamp with the specified time added.
          </p>
        </section>

        {/* TODO: Examples commented out - date::add not implemented yet */}
        {/* <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Calculate expiration date</h3>
          <ExecutableSnippet
            title={getExampleById('date-add-expiration')!.title}
            initialCode={getExampleById('date-add-expiration')!.code}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Add days to current date</h3>
          <ExecutableSnippet
            title={getExampleById('date-add-current')!.title}
            initialCode={getExampleById('date-add-current')!.code}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Subtract days</h3>
          <ExecutableSnippet
            title={getExampleById('date-add-subtract')!.title}
            initialCode={getExampleById('date-add-subtract')!.code}
          />
        </section> */}

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/date/diff" className="text-primary-color hover:underline">
              date::diff
            </Link>
            <Link to="/docs/functions/date/now" className="text-primary-color hover:underline">
              date::now
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
