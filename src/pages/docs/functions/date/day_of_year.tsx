import { dateDayOfYearInlineExample as dateDayOfYearInline } from './day_of_year.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function DateDayOfYearPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/date" className="font-bold hover:text-primary-color">date</Link>
            {' module'}
          </div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">date::day_of_year</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">Get the day of the year (1-366) from a date.</p>
        </div>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Syntax</h2><RqlCodeBlock code={`date::day_of_year(date_value)`} /></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Parameters</h2>
          <div className="dialog overflow-x-auto"><table className="w-full">
            <thead className="bg-[#efedfb]"><tr><th className="text-left p-2 sm:p-3 font-bold">Name</th><th className="text-left p-2 sm:p-3 font-bold">Type</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody><tr className="border-t border-border-light"><td className="p-2 sm:p-3"><code>date_value</code></td><td className="p-2 sm:p-3">Date</td><td className="p-2 sm:p-3">The date to extract the day of the year from.</td></tr></tbody>
          </table></div>
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Return Value</h2><p className="text-text-secondary">Returns an Integer representing the day of the year (1-366).</p></section>
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Examples</h2>
          <ExecutableSnippet title={dateDayOfYearInline.title} initialCode={dateDayOfYearInline.code} />
        </section>
        <section><h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Related Functions</h2><div className="flex gap-3 flex-wrap"><Link to="/docs/functions/date/day" className="text-primary-color hover:underline">date::day</Link><Link to="/docs/functions/date/day_of_week" className="text-primary-color hover:underline">date::day_of_week</Link></div></section>
      </div>
    </Layout>
  );
}
