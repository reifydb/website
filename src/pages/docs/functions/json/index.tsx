import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function JsonModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            json Module
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Build and serialize JSON values directly in your queries.
          </p>
        </div>

        {/* Quick Example */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Example</h2>
          <ExecutableSnippet
            title="Quick Example"
            initialCode={getExampleById('json-overview-quick')!.code}
          />
        </section>

        {/* Available Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Available Functions</h2>
          <div className="space-y-3">
            <Link to="/docs/functions/json/array" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">json::array</h3>
              <p className="text-text-secondary text-sm">Build a JSON array from a list of values</p>
            </Link>
            <Link to="/docs/functions/json/object" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">json::object</h3>
              <p className="text-text-secondary text-sm">Build a JSON object from key-value pairs</p>
            </Link>
            <Link to="/docs/functions/json/serialize" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">json::serialize</h3>
              <p className="text-text-secondary text-sm">Serialize a JSON value to a compact string</p>
            </Link>
            <Link to="/docs/functions/json/pretty" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">json::pretty</h3>
              <p className="text-text-secondary text-sm">Serialize a JSON value to a pretty-printed string</p>
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
                  <th className="text-left p-2 sm:p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>json::array</code></td>
                  <td className="p-2 sm:p-3">Build a JSON array from a list of values</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>json::object</code></td>
                  <td className="p-2 sm:p-3">Build a JSON object from key-value pairs</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>json::serialize</code></td>
                  <td className="p-2 sm:p-3">Serialize a JSON value to a compact string</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>json::pretty</code></td>
                  <td className="p-2 sm:p-3">Serialize a JSON value to a pretty-printed string</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
