import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { RqlCodeBlock } from '../../components';
import { ExecutableSnippet } from '@/components/ui';
import { clockNowDefaultExample, clockNowAfterSetExample, clockNowMultiRowExample } from './now.examples';

export function ClockNowPage() {
  return (
    <Layout>
      <div className="space-y-8">
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
            Read the current value of the mock clock.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Syntax</h2>
          <RqlCodeBlock code={`clock::now()`} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary">
            This function takes no parameters.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Return Value</h2>
          <p className="text-text-secondary">
            An integer: milliseconds since the Unix epoch, according to the mock clock, not the real
            system clock. It starts at <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">0</code>{' '}
            and only moves when something calls{' '}
            <Link to="/docs/functions/clock/set" className="text-primary-color hover:underline">
              clock::set
            </Link>{' '}
            or{' '}
            <Link to="/docs/functions/clock/advance" className="text-primary-color hover:underline">
              clock::advance
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Examples</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-3">{clockNowDefaultExample.title}</h3>
              <ExecutableSnippet title={clockNowDefaultExample.title} initialCode={clockNowDefaultExample.code} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">{clockNowAfterSetExample.title}</h3>
              <ExecutableSnippet title={clockNowAfterSetExample.title} initialCode={clockNowAfterSetExample.code} />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">{clockNowMultiRowExample.title}</h3>
              <ExecutableSnippet title={clockNowMultiRowExample.title} initialCode={clockNowMultiRowExample.code} />
              <p className="text-text-muted text-sm mt-3">
                Every row sees the same value in the same statement, because the mock clock only changes
                when you explicitly move it.{' '}
                <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">date::now()</code> and{' '}
                <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">datetime::now()</code> read
                the real wall clock instead, which is not safe to call across multiple rows in this build.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Related Functions</h2>
          <div className="flex gap-3 flex-wrap">
            <Link to="/docs/functions/clock/set" className="text-primary-color hover:underline">
              clock::set
            </Link>
            <Link to="/docs/functions/clock/advance" className="text-primary-color hover:underline">
              clock::advance
            </Link>
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
