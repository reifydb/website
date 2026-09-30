import { datetimeTimeExample as datetimeTime } from './time.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function DatetimeTimePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/datetime" className="font-bold hover:text-primary-color">datetime</Link>
            {' module'}
          </div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">datetime::time</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">Extract the time component from a datetime.</p>
        </div>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Syntax</h2>
          <RqlCodeBlock code={`datetime::time(datetime_value)`} />
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
                  <td className="p-2 sm:p-3"><code>datetime_value</code></td>
                  <td className="p-2 sm:p-3">Datetime</td>
                  <td className="p-2 sm:p-3">The datetime to extract the time component from</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Return Value</h2>
          <p className="text-text-secondary">Returns a Time representing the time component of the datetime.</p>
        </section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Examples</h2>
          <ExecutableSnippet title={datetimeTime.title} initialCode={datetimeTime.code} />
        </section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/datetime/date" className="text-primary-color hover:underline">datetime::date</Link>
            <Link to="/docs/functions/datetime/hour" className="text-primary-color hover:underline">datetime::hour</Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
