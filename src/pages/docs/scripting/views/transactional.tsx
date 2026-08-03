import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { Callout } from '../../components';
import {
  createTransactionalViewExample,
  insertIntoTransactionalSourceExample,
  queryTransactionalViewExample,
} from './transactional.examples';

export function TransactionalViewsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Transactional Views
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Transactional views update as part of the same transaction as the write to their
            source table. Once that write commits, the next query against the view is
            guaranteed to reflect it, with no propagation delay to wait out.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Transactional View</h2>
          <ExecutableSnippet
            title={createTransactionalViewExample.title}
            initialCode={createTransactionalViewExample.code}
          />
          <p className="text-text-secondary mt-4">
            Use{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">
              create transactional view
            </code>{' '}
            to declare the view's schema and its{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">as {'{ ... }'}</code>{' '}
            pipeline. The source table starts out empty.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Insert Into the Source Table</h2>
          <ExecutableSnippet
            title={insertIntoTransactionalSourceExample.title}
            initialCode={insertIntoTransactionalSourceExample.code}
          />
          <p className="text-text-secondary mt-4">
            Two rows go into{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">vw_t::users</code>,
            one active and one not.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Query the Transactional View</h2>
          <ExecutableSnippet
            title={queryTransactionalViewExample.title}
            initialCode={queryTransactionalViewExample.code}
          />
          <p className="text-text-secondary mt-4">
            Only Alice appears. Unlike a deferred view, there is no incremental catch-up to
            wait for. This query runs as the very next call after the insert commits, and the
            view is already correct.
          </p>
        </section>

        <Callout variant="tip" title="Next Steps">
          Transactional views keep every reader consistent, but that consistency is paid for at
          write time. When that cost matters more than immediacy, reach for a{' '}
          <Link to="/docs/scripting/views/deferred" className="text-primary-color hover:underline font-medium">
            deferred view
          </Link>{' '}
          instead.
        </Callout>
      </div>
    </Layout>
  );
}
