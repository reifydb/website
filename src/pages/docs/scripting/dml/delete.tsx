import { delAllExample as delAll, delBasicExample as delBasic, delEmptyExample as delEmpty, delNoFilterExample as delNoFilter, delReturningExample as delReturning, delRingbufferExample as delRingbuffer, delRingbufferScanExample as delRingbufferScan, delScanExample as delScan, delSeriesExample as delSeries, delViewAfterExample as delViewAfter, delViewDeleteExample as delViewDelete, delViewInsertExample as delViewInsert, delViewReadExample as delViewRead, delViewSetupExample as delViewSetup } from './delete.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DmlDeletePage() {
  return (
    <Layout
      title="Delete"
      description="How delete removes rows from tables, ring buffers, and series: the mandatory filter, returning removed rows, emptying a table, and how deletes flow into views."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Delete</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>delete</Code> removes rows:{' '}
            <Code>{'delete ns::table filter { ... }'}</Code>. There is no field record -
            a row is either removed whole or kept whole - so the statement is just the
            target and a <Code>filter</Code> selecting what goes. The filter is not
            optional, and everything a deleted row fed into (views, subscriptions) is
            updated with it.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Delete what matches</h2>
          <p className="text-text-secondary mb-4">
            Every row the filter matches is removed in one atomic step, and the
            confirmation frame reports the count:
          </p>
          <ExecutableSnippet title={delBasic.title} initialCode={delBasic.code} />
          <ExecutableSnippet title={delScan.title} initialCode={delScan.code} />
          <p className="text-text-secondary mt-4 mb-4">
            When you need to know exactly which rows went, append{' '}
            <Code>returning</Code> - the removed rows come back in place of the count,
            which is the last chance to see them:
          </p>
          <ExecutableSnippet title={delReturning.title} initialCode={delReturning.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The filter is mandatory</h2>
          <p className="text-text-secondary mb-4">
            A bare <Code>delete ns::table</Code> does not empty the table - it fails with{' '}
            <Code>DELETE_002</Code>. As with <Code>update</Code>, the destructive
            all-rows case must be spelled out, never stumbled into:
          </p>
          <ExecutableSnippet title={delNoFilter.title} initialCode={delNoFilter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            To genuinely clear a table, pass a filter that is always true. The rows are
            gone; the table, its schema, and everything defined on it remain:
          </p>
          <ExecutableSnippet title={delAll.title} initialCode={delAll.code} />
          <ExecutableSnippet title={delEmpty.title} initialCode={delEmpty.code} />
          <Callout variant="note" title="Delete removes rows, drop removes the object">
            <Code>delete ... filter {'{ true }'}</Code> empties a table that keeps
            existing. To remove the table itself, use <Code>drop</Code> - see{' '}
            <Link to="/docs/scripting/schema/drop" className="text-primary hover:text-primary-light font-medium transition-colors">Drop</Link>.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Ring buffers and series</h2>
          <p className="text-text-secondary mb-4">
            <Code>delete</Code> works the same way on{' '}
            <Link to="/docs/scripting/storage/ringbuffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffers</Link>{' '}
            - useful when a bounded log needs selective cleanup ahead of its automatic
            eviction:
          </p>
          <ExecutableSnippet title={delRingbuffer.title} initialCode={delRingbuffer.code} />
          <ExecutableSnippet title={delRingbufferScan.title} initialCode={delRingbufferScan.code} />
          <p className="text-text-secondary mt-4 mb-4">
            And on{' '}
            <Link to="/docs/scripting/storage/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>,
            where the filter can select by key or by value:
          </p>
          <ExecutableSnippet title={delSeries.title} initialCode={delSeries.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Link to="/docs/scripting/schema/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">Dictionaries</Link>{' '}
            do not support <Code>delete</Code>: an interned entry may be referenced by
            any row that ever encoded against it, so entries are permanent once created.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Deletes flow into views</h2>
          <p className="text-text-secondary mb-4">
            Removing a source row also removes its contribution to every{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>{' '}
            derived from it. For a transactional view that happens inside the same
            commit as the delete - rows leave the view, aggregates shrink, in the same
            atomic step:
          </p>
          <ExecutableSnippet title={delViewSetup.title} initialCode={delViewSetup.code} />
          <ExecutableSnippet title={delViewInsert.title} initialCode={delViewInsert.code} />
          <ExecutableSnippet title={delViewRead.title} initialCode={delViewRead.code} />
          <ExecutableSnippet title={delViewDelete.title} initialCode={delViewDelete.code} />
          <ExecutableSnippet title={delViewAfter.title} initialCode={delViewAfter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Views themselves are not a delete target - naming one fails with{' '}
            <Code>CA_004</Code>, since derived state is maintained by the engine, only
            ever through its sources. And as with any write, a request that deletes from
            a view's source cannot read that view later in the same request
            (<Code>TXN_015</Code>) - see{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Atomicity</h2>
          <p className="text-text-secondary mb-4">
            A delete commits atomically with every other statement in its request, under
            the same automatic transaction and conflict-retry behavior as all writes.
            The full model is described in{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
          </p>
        </section>
      </div>
    </Layout>
  );
}
