import { datetimeAgeExample as datetimeAge } from './age.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function DatetimeAgePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/datetime" className="font-bold hover:text-primary-color">datetime</Link>
            {' module'}
          </div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">datetime::age</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">Calculate the duration between two datetimes.</p>
        </div>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Syntax</h2>
          <RqlCodeBlock code={`datetime::age(datetime_a, datetime_b)`} />
        </section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Parameters</h2>
          <div className="dialog overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#efedfb]"><tr>
                <th className="text-left p-2 sm:p-3 font-bold">Name</th>
                <th className="text-left p-2 sm:p-3 font-bold">Type</th>
                <th className="text-left p-2 sm:p-3 font-bold">Description</th>
              </tr></thead>
              <tbody>
                <tr className="border-t border-border-light">
                  <td className="p-2 sm:p-3"><code>datetime_a</code></td>
                  <td className="p-2 sm:p-3">Datetime</td>
                  <td className="p-2 sm:p-3">The first datetime</td>
                </tr>
                <tr className="border-t border-border-light">
                  <td className="p-2 sm:p-3"><code>datetime_b</code></td>
                  <td className="p-2 sm:p-3">Datetime</td>
                  <td className="p-2 sm:p-3">The second datetime</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Return Value</h2>
          <p className="text-text-secondary">Returns a Duration representing the time between the two datetimes.</p>
        </section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Examples</h2>
          <ExecutableSnippet title={datetimeAge.title} initialCode={datetimeAge.code} />
        </section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/datetime/diff" className="text-primary-color hover:underline">datetime::diff</Link>
            <Link to="/docs/functions/datetime/now" className="text-primary-color hover:underline">datetime::now</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
