import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function JsonArrayPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header with breadcrumb */}
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/json" className="font-bold hover:text-primary-color">
              json
            </Link>
            {' module · Function'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            json::array
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Build a JSON array from a list of values.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`json::array(value1, value2, ...)`} />
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
                  <td className="p-2 sm:p-3"><code>value1, value2, ...</code></td>
                  <td className="p-2 sm:p-3">Any</td>
                  <td className="p-2 sm:p-3">Values to include in the array</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns a JSON array containing the provided values.
          </p>
        </section>

        {/* Examples */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>

          <h3 className="text-lg font-bold mb-3">Build a JSON array</h3>
          <ExecutableSnippet
            title={getExampleById('json-array-basic')!.title}
            initialCode={getExampleById('json-array-basic')!.code}
          />

          <h3 className="text-lg font-bold mt-6 mb-3">Mixed types</h3>
          <ExecutableSnippet
            title={getExampleById('json-array-inline')!.title}
            initialCode={getExampleById('json-array-inline')!.code}
          />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/json/object" className="text-primary-color hover:underline">
              json::object
            </Link>
            <Link to="/docs/functions/json/serialize" className="text-primary-color hover:underline">
              json::serialize
            </Link>
            <Link to="/docs/functions/json/pretty" className="text-primary-color hover:underline">
              json::pretty
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
