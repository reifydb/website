import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';
import type { CodeExample } from '@/lib/examples/types';
import {
  ttlCreateTableExample,
  ttlCreateViewExample,
  ttlInsertExample,
  ttlQueryTableExample,
  ttlQueryViewExample,
} from './expire-with-ttl.examples';

function Snippet({ example }: { example: CodeExample }) {
  return <ExecutableSnippet title={example.title} initialCode={example.code} />;
}

export function TtlGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Expire Data with TTL
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Session tokens, rate-limit windows, one-time codes: plenty of application state is
            only valid for a while and should disappear on its own. Instead of a cron job that
            sweeps for stale rows, give the rows themselves a lifetime and let the engine drop
            them.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">1. Declare a row lifetime</h2>
          <p className="text-text-secondary mb-4">
            Row lifetime is a table setting, declared in the same{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">with</code> block
            you would use for anything else on a table. Here is a sessions table where every row
            expires one hour after its last write:
          </p>
          <Snippet example={ttlCreateTableExample} />
          <p className="text-text-muted text-sm mt-3">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">duration</code> is
            required. <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">mode</code>{' '}
            is optional and takes either{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">drop</code> (used
            here) or <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">delete</code>;
            leave it out and the engine picks the default for you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">2. TTL is just another row setting to downstream views</h2>
          <p className="text-text-secondary mb-4">
            A view built on a TTL'd table does not need to know the table expires rows; it
            reads the table like any other:
          </p>
          <Snippet example={ttlCreateViewExample} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">3. Write normally</h2>
          <p className="text-text-secondary mb-4">
            Inserting into a TTL'd table works exactly like inserting into any other table; the
            lifetime is enforced by the engine, not by anything you do at write time:
          </p>
          <Snippet example={ttlInsertExample} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">4. Rows are there until the clock runs out</h2>
          <p className="text-text-secondary mb-4">
            Query the table right after inserting and every row is exactly where you left it.
            TTL does not make rows harder to work with while they are alive; it only changes
            what happens when their time is up:
          </p>
          <Snippet example={ttlQueryTableExample} />
          <p className="text-text-secondary mt-4 mb-4">
            The view agrees, for the same reason it agrees about anything else in the table:
          </p>
          <Snippet example={ttlQueryViewExample} />
        </section>

        <Callout variant="note" title="What actually happens at expiry">
          <p>
            A row's TTL is anchored to its own last write, not to a fixed calendar time, so
            updating a row resets its clock the same way updating it changes anything else
            about it. This documentation build cannot demonstrate the expiry itself live: it
            would mean holding a browser tab open past the declared duration with nothing else
            happening in between, which is not a realistic thing to script into a page. Treat
            the behavior above, syntax that creates cleanly and data that reads back exactly as
            written, as the part you can rely on this page to prove; treat the expiry itself as
            documented, tested engine behavior you exercise by simply letting time pass.
          </p>
        </Callout>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Choosing a duration</h2>
          <p className="text-text-secondary mb-4">
            Pick the duration for the thing that has to be true while the row is alive, not a
            round number:
          </p>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A login session might genuinely need hours; an OTP code needs minutes, and
                leaving it at hours just widens the window an attacker gets to use it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A rate-limit counter's TTL <em>is</em> the rate-limit window; get this one
                exactly right, it is not just cleanup.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                If a row needs to survive edits without resetting its clock, TTL is the wrong
                tool: it is anchored to the last write to the row, by design.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Where next</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/rql/transforms/with" className="text-primary hover:text-primary-light font-medium transition-colors">
                  with
                </Link>{' '}
                - every construct that accepts a settings block, TTL included
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">
                  TTL & Row Settings
                </Link>{' '}
                - the full reference for row lifetime options
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/guides/model-application-state" className="text-primary hover:text-primary-light font-medium transition-colors">
                  Model Application State
                </Link>{' '}
                - where TTL'd tables fit alongside views and series
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
