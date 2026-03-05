import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';


export function ClockNowPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header with breadcrumb */}
        <div>
          <div className="text-sm text-text-muted mb-2">
            <Link to="/docs/functions/clock" className="font-bold hover:text-primary-color">
              clock
            </Link>
            {' module'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            clock::now
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Get the current clock timestamp.
          </p>
        </div>

        {/* Syntax */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`clock::now()`} />
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
            The current timestamp from the system clock.
          </p>
        </section>

        {/* Related Functions */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/date/now" className="text-primary-color hover:underline">
              date::now
            </Link>
            <Link to="/docs/functions/datetime/now" className="text-primary-color hover:underline">
              datetime::now
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
