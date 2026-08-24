import { svdAggregateExample as svdAggregate, svdAggregateReadExample as svdAggregateRead, svdBackfillReadExample as svdBackfillRead, svdChainExample as svdChain, svdChainReadExample as svdChainRead, svdCreateExample as svdCreate, svdInsertExample as svdInsert, svdInsertReadExample as svdInsertRead, svdJoinExample as svdJoin, svdJoinReadExample as svdJoinRead, svdJoinRightInsertExample as svdJoinRightInsert, svdJoinRightReadExample as svdJoinRightRead, svdLeaveExample as svdLeave, svdLeaveReadExample as svdLeaveRead, svdSameRequestExample as svdSameRequest } from './deferred.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DeferredViewsPage() {
  return (
    <Layout
      title="Deferred Views"
      description="Creating deferred views with RQL: asynchronous maintenance from the change log, backfill of existing rows, propagation of inserts, updates and deletes, aggregates, joins, chains, and the same-request read rule."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Deferred Views</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A deferred view is maintained after the fact. Writes to its sources commit
            on their own; the view consumes those changes from the change log and
            updates its materialized rows asynchronously. Writers never pay for the
            view, and the view is eventually consistent - usually within moments. This
            makes it the right shape for expensive pipelines and anything where a short
            lag is acceptable: dashboards, counters, denormalized read models.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a deferred view</h2>
          <p className="text-text-secondary mb-4">
            <Code>create deferred view</Code> takes the qualified name, the column
            list, and the pipeline. The source table here already holds rows when the
            view is created. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={svdCreate.title} initialCode={svdCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A deferred view starts by working through the change log, so rows written
            before it existed are already in it on the next request. The closed order
            was filtered out on the way:
          </p>
          <ExecutableSnippet title={svdBackfillRead.title} initialCode={svdBackfillRead.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Propagation</h2>
          <p className="text-text-secondary mb-4">
            From then on every committed change to the source is applied to the view in
            commit order. An insert that matches the filter appears:
          </p>
          <ExecutableSnippet title={svdInsert.title} initialCode={svdInsert.code} />
          <ExecutableSnippet title={svdInsertRead.title} initialCode={svdInsertRead.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Membership follows the predicate: an update that makes a row stop matching
            removes it from the view, and one that makes it match adds it. Deletes
            remove their rows the same way.
          </p>
          <ExecutableSnippet title={svdLeave.title} initialCode={svdLeave.code} />
          <ExecutableSnippet title={svdLeaveRead.title} initialCode={svdLeaveRead.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Aggregations</h2>
          <p className="text-text-secondary mb-4">
            An <Code>aggregate</Code> in the pipeline is maintained incrementally: the
            view holds one row per group and adjusts it as source rows come and go,
            instead of rescanning. Note that this view is over all orders, not just the
            open ones, so the closed orders count too:
          </p>
          <ExecutableSnippet title={svdAggregate.title} initialCode={svdAggregate.code} />
          <ExecutableSnippet title={svdAggregateRead.title} initialCode={svdAggregateRead.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Joins</h2>
          <p className="text-text-secondary mb-4">
            A join inside a view is the way to keep a denormalized read model without
            application code. The joined side's columns flatten to{' '}
            <Code>alias_column</Code> - <Code>as d</Code> makes the department name{' '}
            <Code>d_name</Code> - and a <Code>left join</Code> column must be declared{' '}
            <Code>Option(type)</Code> because unmatched rows carry <Code>none</Code>:
          </p>
          <ExecutableSnippet title={svdJoin.title} initialCode={svdJoin.code} />
          <ExecutableSnippet title={svdJoinRead.title} initialCode={svdJoinRead.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Both sides are tracked. Inserting the missing department repairs Carol's row
            without touching the employees table:
          </p>
          <ExecutableSnippet title={svdJoinRightInsert.title} initialCode={svdJoinRightInsert.code} />
          <ExecutableSnippet title={svdJoinRightRead.title} initialCode={svdJoinRightRead.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Chains</h2>
          <p className="text-text-secondary mb-4">
            A deferred view can read another deferred view. Each level is fed by the
            change log of the level below it, and a new level backfills from the
            existing contents of its source just like a view over a table:
          </p>
          <ExecutableSnippet title={svdChain.title} initialCode={svdChain.code} />
          <ExecutableSnippet title={svdChainRead.title} initialCode={svdChainRead.code} />
          <p className="text-text-secondary mt-4">
            A{' '}
            <Link to="/docs/scripting/views/transactional" className="text-primary hover:text-primary-light font-medium transition-colors">transactional view</Link>{' '}
            may also read a deferred view; it then inherits the lag of everything
            upstream of it.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Reading in the request that wrote the source</h2>
          <p className="text-text-secondary mb-4">
            A deferred view only changes after commit, so inside a request that has
            written to its source the view still holds the old contents. Rather than
            return them, the engine fails the read with <Code>TXN_015</Code> and rolls
            the whole request back:
          </p>
          <ExecutableSnippet title={svdSameRequest.title} initialCode={svdSameRequest.code} />
          <p className="text-text-secondary mt-4">
            Read the source tables in that request instead, or consume the view through
            a{' '}
            <Link to="/docs/scripting/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscription</Link>{' '}
            and let the changes come to you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Where the rows live</h2>
          <p className="text-text-secondary mb-4">
            By default a deferred view materializes into table storage. It can instead
            keep only the newest N derived rows (<Code>create deferred ringbuffer view
            ... with {'{'} capacity: N {'}'}</Code>) or record them as a keyed history
            (<Code>create deferred series view ... with {'{'} key: col {'}'}</Code>).
            Row settings such as a TTL go in the same <Code>with</Code> block. See{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">backing storage</Link>{' '}
            and{' '}
            <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL &amp; Row Settings</Link>.
          </p>
        </section>

        <Callout variant="note" title="Lag on a server versus the playground">
          On a server the change log is consumed by a background flow, so a read issued
          right after a commit may briefly miss it. The in-browser engine behind these
          snippets processes the log between requests, which is why every read here is
          already current. Code that must never see stale derived state belongs on a{' '}
          <Link to="/docs/scripting/views/transactional" className="text-primary hover:text-primary-light font-medium transition-colors">transactional view</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
