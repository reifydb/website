import { ivTransactionalSetupExample, ivComposedSetupExample, ivTransactionalInsertExample, ivTransactionalQueryExample, ivComposedQueryExample, ivDeferredSetupExample, ivDeferredInsertExample, ivDeferredQueryExample } from './incremental-views.examples';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout, AsciiDiagram } from '../components';
import { ExecutableSnippet } from '@/components/ui';
import type { CodeExample } from '@/lib/examples/types';

function Snippet({ example }: { example: CodeExample }) {
  return <ExecutableSnippet title={example.title} initialCode={example.code} />;
}

export function IncrementalViewsGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Build Incremental Views
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A view declares a query once; ReifyDB keeps its result current as the source data
            changes, instead of you recomputing it on a timer or a cache-miss. This guide builds
            one of each kind, layers a second view on top, and covers how to pick between them.
          </p>
        </div>

        <AsciiDiagram label="write path">
{`  app
   |
   | insert
   v
 table  ------ derive ------>  view
                                 |
                                 | always current
                                 v
                               client
                              (query)`}
        </AsciiDiagram>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Transactional views: read-your-writes</h2>
          <p className="text-text-secondary mb-4">
            A transactional view updates inside the same transaction as any write that affects
            it, so a reader can never observe it lagging behind the table. Reach for this when
            the view backs a decision your application is about to act on, like an inventory
            count or an authorization check. Define the view before inserting data; it only
            picks up changes from the moment it exists:
          </p>
          <Snippet example={ivTransactionalSetupExample} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Composing: a view over a view</h2>
          <p className="text-text-secondary mb-4">
            Views can read from other views, not just tables. Here is a second transactional
            view that counts rows in the first one. It has to be created now, before any data
            exists, for the same reason as the view underneath it: a view only sees changes
            from its own creation point forward, and that includes changes flowing in from
            another view:
          </p>
          <Snippet example={ivComposedSetupExample} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Insert, then read both views</h2>
          <p className="text-text-secondary mb-4">
            Now that both views exist, insert into the table:
          </p>
          <Snippet example={ivTransactionalInsertExample} />
          <p className="text-text-secondary mt-4 mb-4">
            The first view already has the two open tickets, filtered and reshaped:
          </p>
          <Snippet example={ivTransactionalQueryExample} />
          <p className="text-text-secondary mt-4 mb-4">
            And the view built on top of that view already has the count. Nothing was
            recomputed from the table; the delta from the insert flowed through both views:
          </p>
          <Snippet example={ivComposedQueryExample} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Deferred views: cheaper writes</h2>
          <p className="text-text-secondary mb-4">
            A deferred view updates asynchronously through the same flow engine, off the write
            path. Writes to the source table do not wait on it, so it is the better fit for
            dashboards, rollups, and anything else that can tolerate a small, bounded
            propagation delay in exchange for not slowing down every insert. The declaration
            looks the same, with one keyword different:
          </p>
          <Snippet example={ivDeferredSetupExample} />
          <Snippet example={ivDeferredInsertExample} />
          <Snippet example={ivDeferredQueryExample} />
          <Callout variant="info" title="Same query shape, different consistency contract">
            <p>
              Both examples on this page insert and then query in separate steps, and both show
              up-to-date results, because both kinds of view are maintained by the same
              underlying flow engine. The difference is a guarantee, not a syntax: a
              transactional view is contractually never stale for a reader in the same
              transaction as the write; a deferred view is allowed to lag by a small, bounded
              amount so that writes to its source table stay cheap.
            </p>
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Picking one</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Use <strong>transactional</strong> when a query result gates a write, an
                authorization decision, or anything else where "slightly stale" is a
                correctness bug, not just a UX nit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Use <strong>deferred</strong> when the view is read far more often than its
                source is written, or the source is written at high volume and cannot afford to
                carry the view's maintenance cost on every write.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Either kind can read from tables or from other views. Compose them like the
                ticket count above when a report is really "an aggregate of a filter" rather
                than one query trying to do both.
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
                <Link to="/docs/guides/windowed-aggregation" className="text-primary hover:text-primary-light font-medium transition-colors">
                  Windowed Aggregation over Live Data
                </Link>{' '}
                - bucket a view's input by time instead of aggregating it all at once
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/rql/transforms/join" className="text-primary hover:text-primary-light font-medium transition-colors">
                  join
                </Link>{' '}
                - combine multiple sources inside a view definition
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/concepts/tables-and-views" className="text-primary hover:text-primary-light font-medium transition-colors">
                  Tables & Views
                </Link>{' '}
                - the mechanics of incremental maintenance
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
