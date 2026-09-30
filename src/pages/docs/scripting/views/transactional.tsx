import { svtAggregateAfterExample as svtAggregateAfter, svtAggregateReadExample as svtAggregateRead, svtChainExample as svtChain, svtChainReadExample as svtChainRead, svtChainWriteExample as svtChainWrite, svtCreateExample as svtCreate, svtEnterExample as svtEnter, svtEnterReadExample as svtEnterRead, svtLeaveExample as svtLeave, svtLeaveReadExample as svtLeaveRead, svtNoBackfillExample as svtNoBackfill, svtNoBackfillReadExample as svtNoBackfillRead, svtReadExample as svtRead, svtSameRequestExample as svtSameRequest, svtSameRequestVerifyExample as svtSameRequestVerify, svtTouchExample as svtTouch, svtTouchReadExample as svtTouchRead, svtWriteExample as svtWrite } from './transactional.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function TransactionalViewsPage() {
  return (
    <Layout
      title="Transactional Views"
      description="Creating transactional views with RQL: maintenance inside the writing transaction, the three-request pattern, membership changes, aggregates, the same-request read rule, no backfill, and chains."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Transactional Views</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A transactional view is maintained inside the transaction that writes its
            source. The table and the view change in one atomic step, so no reader can
            ever observe the table with the new row and the view without it. That
            guarantee is what you want for derived state an invariant depends on -
            balances, stock levels, anything a decision is made on - and it is paid for
            by the write, which does the view's work before it commits.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Create the view with the table</h2>
          <p className="text-text-secondary mb-4">
            <Code>create transactional view</Code> (or just <Code>create view</Code>)
            declares the columns and the pipeline. Because the view tracks writes from
            the moment it exists, create it in the same request as the table, before
            any data is written. This request creates one table and two views over it -
            a filter and an aggregate. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={svtCreate.title} initialCode={svtCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Write to the table in a second request. There is nothing to refresh: both
            views are maintained as part of this commit.
          </p>
          <ExecutableSnippet title={svtWrite.title} initialCode={svtWrite.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Read in a third request. The view is current, with no propagation delay to
            wait out:
          </p>
          <ExecutableSnippet title={svtRead.title} initialCode={svtRead.code} />
          <ExecutableSnippet title={svtAggregateRead.title} initialCode={svtAggregateRead.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Membership follows the predicate</h2>
          <p className="text-text-secondary mb-4">
            A <Code>filter</Code> in the pipeline decides which source rows are in the
            view, and the engine tracks each row across updates. When a row starts
            matching it enters the view in the same commit:
          </p>
          <ExecutableSnippet title={svtEnter.title} initialCode={svtEnter.code} />
          <ExecutableSnippet title={svtEnterRead.title} initialCode={svtEnterRead.code} />
          <p className="text-text-secondary mt-4 mb-4">
            When it stops matching it leaves. Deletes remove their rows the same way:
          </p>
          <ExecutableSnippet title={svtLeave.title} initialCode={svtLeave.code} />
          <ExecutableSnippet title={svtLeaveRead.title} initialCode={svtLeaveRead.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The aggregate was adjusted by each of those updates too. Every write to the
            source is applied incrementally, not by recomputing the view:
          </p>
          <ExecutableSnippet title={svtAggregateAfter.title} initialCode={svtAggregateAfter.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Reading in the request that wrote the source</h2>
          <p className="text-text-secondary mb-4">
            The view is updated at commit, not statement by statement. So inside a
            request that has already written to the source, the view still holds its
            pre-request contents. The engine refuses to return them: the read fails with{' '}
            <Code>TXN_015</Code>, and because a request is one transaction, the write is
            rolled back with it:
          </p>
          <ExecutableSnippet title={svtSameRequest.title} initialCode={svtSameRequest.code} />
          <ExecutableSnippet title={svtSameRequestVerify.title} initialCode={svtSameRequestVerify.code} />
          <p className="text-text-secondary mt-4">
            Reading the view <em>before</em> writing in the same request is fine. When
            you need the post-write value, read the source table in that request, or
            read the view in the next one - it is current the moment the write returns.
            See{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>{' '}
            for the rule in full.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">No backfill</h2>
          <p className="text-text-secondary mb-4">
            A transactional view is fed by the commits that happen after it is created.
            It does not scan its source on creation. Ada's balance has been at least 100
            since the first insert, but a view created now does not contain her:
          </p>
          <ExecutableSnippet title={svtNoBackfill.title} initialCode={svtNoBackfill.code} />
          <ExecutableSnippet title={svtNoBackfillRead.title} initialCode={svtNoBackfillRead.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Only a later write to her row is seen, and that write brings the row in:
          </p>
          <ExecutableSnippet title={svtTouch.title} initialCode={svtTouch.code} />
          <ExecutableSnippet title={svtTouchRead.title} initialCode={svtTouchRead.code} />
          <p className="text-text-secondary mt-4">
            This is why the table and its transactional views belong in one request. If
            you need a view over data that already exists, create a{' '}
            <Link to="/docs/scripting/views/deferred" className="text-primary hover:text-primary-light font-medium transition-colors">deferred view</Link>,
            which backfills from the change log.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Chains</h2>
          <p className="text-text-secondary mb-4">
            A transactional view can read another transactional view. The chain is
            maintained in dependency order inside the one commit, so a single insert
            lands in both levels atomically:
          </p>
          <ExecutableSnippet title={svtChain.title} initialCode={svtChain.code} />
          <ExecutableSnippet title={svtChainWrite.title} initialCode={svtChainWrite.code} />
          <ExecutableSnippet title={svtChainRead.title} initialCode={svtChainRead.code} />
          <p className="text-text-secondary mt-4">
            Linus is overdrawn too, but he was already in <Code>svt::overdrawn</Code>{' '}
            when the chain view was created - the no-backfill rule applies at every
            level. A transactional view may also read a deferred view; it then updates
            when that upstream view does, and inherits its lag.
          </p>
        </section>

        <Callout variant="tip" title="Choosing the maintenance mode">
          Every write to a source table runs the pipelines of all transactional views
          over it before it commits, and the write's latency includes that work. Keep
          transactional views for derived state that reads must never see stale. Put
          heavy aggregations, joins, and anything a dashboard can afford to see a moment
          late on a{' '}
          <Link to="/docs/scripting/views/deferred" className="text-primary hover:text-primary-light font-medium transition-colors">deferred view</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
