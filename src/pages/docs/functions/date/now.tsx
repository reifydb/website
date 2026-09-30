import { dateNowInlineExample as dateNowInline } from './now.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';

export function DateNowPage() {
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
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">
            date::now
          </h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            Get the current timestamp.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Syntax</h2>
          <RqlCodeBlock code={`date::now()`} />
        </section>

        {/* Parameters */}
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Parameters</h2>
          <p className="text-text-secondary">
            This function takes no parameters.
          </p>
        </section>

        {/* Return Value */}
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Return Value</h2>
          <p className="text-text-secondary">
            Returns a timestamp representing the current date and time.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Examples</h2>
          <ExecutableSnippet title={dateNowInline.title} initialCode={dateNowInline.code} />
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Related Functions</h2>
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
    </Layout>
  );
}
