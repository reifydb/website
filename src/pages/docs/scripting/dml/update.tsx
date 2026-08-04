import { updAllRowsExample as updAllRows, updBasicExample as updBasic, updMultiFieldExample as updMultiField, updNoFilterExample as updNoFilter, updScanExample as updScan, updViewErrorExample as updViewError, updViewInsertExample as updViewInsert, updViewMaintainExample as updViewMaintain, updViewReadExample as updViewRead, updViewSetupExample as updViewSetup } from './update.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DmlUpdatePage() {
  return (
    <Layout
      title="Update"
      description="How update rewrites matching rows in place: partial field lists, expressions over current values, the mandatory filter, returning, and how updates flow into views."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Update</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>update</Code> rewrites rows in place. It names a target, a record of
            fields to set, and a <Code>filter</Code> that selects which rows change:{' '}
            <Code>{'update ns::table { field: value } filter { ... }'}</Code>. Only the
            listed fields are touched - every other column keeps its current value - and
            the filter is not optional.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Set a field on matching rows</h2>
          <p className="text-text-secondary mb-4">
            The field record is a partial row, not a replacement row. Here only{' '}
            <Code>price</Code> is listed, so <Code>name</Code> and <Code>stocked</Code>{' '}
            survive untouched, and the confirmation frame reports how many rows matched
            the filter:
          </p>
          <ExecutableSnippet title={updBasic.title} initialCode={updBasic.code} />
          <ExecutableSnippet title={updScan.title} initialCode={updScan.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Multiple fields and expressions</h2>
          <p className="text-text-secondary mb-4">
            Several fields can change in one statement, and a field's new value may be an
            expression over the row's current values - <Code>price: price + 5</Code>{' '}
            reads the old price and writes the new one. Append <Code>returning</Code> to
            get the post-update rows back instead of a count:
          </p>
          <ExecutableSnippet title={updMultiField.title} initialCode={updMultiField.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The filter is mandatory</h2>
          <p className="text-text-secondary mb-4">
            An <Code>update</Code> without a <Code>filter</Code> does not quietly rewrite
            the whole table - it is rejected outright with <Code>UPDATE_003</Code>. A
            forgotten filter is a classic way to destroy data, so ReifyDB makes the
            all-rows case impossible to reach by accident:
          </p>
          <ExecutableSnippet title={updNoFilter.title} initialCode={updNoFilter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            When you really do mean every row, say so explicitly with a filter that is
            always true:
          </p>
          <ExecutableSnippet title={updAllRows.title} initialCode={updAllRows.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Updates flow into views</h2>
          <p className="text-text-secondary mb-4">
            An update to a table is also an update to everything derived from it.{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">Transactional views</Link>{' '}
            are maintained inside the same commit as the update, so a view is never
            observably behind its source:
          </p>
          <ExecutableSnippet title={updViewSetup.title} initialCode={updViewSetup.code} />
          <ExecutableSnippet title={updViewInsert.title} initialCode={updViewInsert.code} />
          <ExecutableSnippet title={updViewMaintain.title} initialCode={updViewMaintain.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The order's total went from 40 to 100, and the aggregate follows:
          </p>
          <ExecutableSnippet title={updViewRead.title} initialCode={updViewRead.code} />
          <Callout variant="warning" title="Do not read a view you just wrote under">
            Once a request has updated a view's source table, reading that view later in
            the same request fails with <Code>TXN_015</Code> and rolls the whole request
            back. Split the write and the read into separate requests, or read the source
            directly - see{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
          </Callout>
          <p className="text-text-secondary mt-4 mb-4">
            The flow is strictly one-way. A view itself is not an update target - naming
            one fails with <Code>CA_004</Code>, because derived state is owned by the
            engine, not by writers:
          </p>
          <ExecutableSnippet title={updViewError.title} initialCode={updViewError.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Other shapes, same verb</h2>
          <p className="text-text-secondary mb-4">
            <Code>update</Code> works identically on{' '}
            <Link to="/docs/scripting/storage/ringbuffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffers</Link>{' '}
            and{' '}
            <Link to="/docs/scripting/storage/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>{' '}
            - the confirmation frame names the shape (<Code>ringbuffer</Code>,{' '}
            <Code>series</Code>) instead of <Code>table</Code>.{' '}
            <Link to="/docs/scripting/schema/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">Dictionaries</Link>{' '}
            are the exception: interned entries are immutable, so they accept only{' '}
            <Code>insert</Code> and reads.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Concurrency</h2>
          <p className="text-text-secondary mb-4">
            Updates run inside automatic transactions with serializable snapshot
            isolation. Two updates racing over the same rows cannot silently interleave:
            the loser aborts with a conflict and is retried automatically against the
            winner's committed state. The mechanics - snapshots, conflict validation,
            retry limits - live in{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
          </p>
        </section>
      </div>
    </Layout>
  );
}
