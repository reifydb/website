import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function TransactionsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Transactions</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Every request you send to ReifyDB runs inside a transaction, automatically.
            Writes commit atomically with serializable snapshot isolation, reads see a consistent
            snapshot, and conflicts are retried for you. There is no <Code>BEGIN</Code>,{' '}
            <Code>COMMIT</Code>, or <Code>ROLLBACK</Code> to manage - transaction handling
            is the engine's job, not yours.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Queries, commands, and admin</h2>
          <p className="text-text-secondary mb-4">
            ReifyDB splits work into three kinds of transactions, and the clients expose
            them as three entry points:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A <strong>query transaction</strong> (<Code>query</Code>) only reads. It
                runs under <strong>snapshot isolation</strong>: it pins the latest
                committed state when it starts and sees exactly that state for its entire
                run - never a half-applied write, no matter how many writers are active.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A <strong>command transaction</strong> (<Code>command</Code>) writes data:
                inserts, updates, deletes, procedure calls. It runs under{' '}
                <strong>serializable snapshot isolation</strong> - the engine tracks what
                each command reads and writes, and only lets it commit if the result is
                equivalent to the commands running one after another. A command cannot
                change schema.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                An <strong>admin transaction</strong> (<Code>admin</Code>) is the only kind
                that can execute DDL - <Code>create</Code>, <Code>alter</Code>,{' '}
                <Code>drop</Code>, migrations, access control. It can also write data, so a
                schema change and the writes that go with it commit as one atomic unit.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary mb-4">
            Keeping schema changes out of command transactions means day-to-day application
            traffic physically cannot alter the schema - evolving it is a deliberate,
            separately privileged operation. There is no isolation level to configure and
            no weaker mode to fall back to.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">One request, one transaction</h2>
          <p className="text-text-secondary mb-4">
            Each request is exactly one transaction. A request may contain many statements -
            they all commit together, or none of them do. This transfer touches two rows in
            two separate <Code>update</Code> statements, and no reader can ever observe the
            state between them (the runnable snippets on this page execute as admin
            requests, which is why they can mix <Code>create</Code> statements with
            writes):
          </p>
          <ExampleSnippet id="txn-atomic-script" />
          <p className="text-text-secondary mt-4 mb-4">
            If any statement fails, the whole request rolls back. Here the{' '}
            <Code>update</Code> executes first and the <Code>cast</Code> fails afterwards:
          </p>
          <ExampleSnippet id="txn-rollback-error" />
          <p className="text-text-secondary mt-4 mb-4">
            The update was rolled back with everything else - the balances are untouched:
          </p>
          <ExampleSnippet id="txn-rollback-verify" />
          <Callout variant="note" title="No BEGIN, no COMMIT - by design">
            ReifyDB has no statement to hold a transaction open across requests. Frontends
            talk to the database directly, and an open transaction owned by a browser tab
            is a liability: it pins resources until a client that may have disappeared
            decides to finish it. Bundling each request into one atomic transaction removes
            that failure mode and is what makes automatic conflict retry safe - nothing is
            committed until the whole request succeeds. The <Code>rollback</Code> keyword
            you may encounter in{' '}
            <Link to="/docs/scripting/migrations" className="text-primary hover:text-primary-light font-medium transition-colors">migrations</Link>{' '}
            is unrelated: it declares compensating statements for reverting a migration,
            not transaction control.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Readers never block writers</h2>
          <p className="text-text-secondary mb-4">
            ReifyDB uses multi-version concurrency control (MVCC). Every commit produces a
            new version of the rows it touched instead of overwriting them in place, and
            every committed transaction is stamped with a monotonically increasing commit
            version. A query simply reads as of the newest committed version at the moment
            it starts. It takes no locks, blocks no command, and is blocked by none - long
            analytical reads and high-frequency writes coexist without queueing on each
            other.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Conflicts and automatic retries</h2>
          <p className="text-text-secondary mb-4">
            Commands are optimistic: they do not lock rows up front. Instead, each command
            works against its own snapshot, and at commit the engine validates that no
            other transaction has committed a change that overlaps with what this command
            read or wrote. If validation fails, the command aborts with a conflict error
            (<Code>TXN_001</Code>) - and the server retries it automatically with backoff,
            up to 10 attempts by default. Each retry re-executes the request from scratch
            against the newest state, so the retried command sees the data that beat it to
            the commit.
          </p>
          <p className="text-text-secondary mb-4">
            In practice you rarely see conflicts at all: queries never conflict with
            anything, and commands only conflict when they genuinely race over the same
            data. If a command still fails with <Code>TXN_001</Code> after all retries,
            the client receives the error and can decide whether to resubmit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Views, handlers, and transactions</h2>
          <p className="text-text-secondary mb-4">
            Derived state participates in the same guarantees.{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">Transactional views</Link>{' '}
            are maintained inside the commit of the write that affects them - the table and
            the view change in the same atomic step:
          </p>
          <ExampleSnippet id="txn-view-setup" />
          <p className="text-text-secondary mt-4 mb-4">
            Write to the source table:
          </p>
          <ExampleSnippet id="txn-view-write" />
          <p className="text-text-secondary mt-4 mb-4">
            The view is already current - there is no window in which the table shows the
            new order but the view shows the old revenue:
          </p>
          <ExampleSnippet id="txn-view-read" />
          <p className="text-text-secondary mb-4">
            That timing has one consequence worth knowing: once a request writes to a
            view's source data, reading that view later in the same request is an error
            (<Code>TXN_015</Code>), and the whole request fails and rolls back. Mid-request
            the view still holds its pre-request contents, and ReifyDB fails loudly rather
            than hand you stale data:
          </p>
          <ExampleSnippet id="txn-view-read-after-write" />
          <p className="text-text-secondary mt-4 mb-4">
            The failed request committed nothing, and reading the view in its own request
            works as before:
          </p>
          <ExampleSnippet id="txn-view-unchanged" />
          <p className="text-text-secondary mt-4 mb-4">
            The rule applies to transactional and deferred views alike, and it follows
            view chains - a view built on top of another view is protected too. Reading a
            view <em>before</em> writing to its sources is fine. The remedy depends on the
            view kind: a transactional view is current the moment the write returns, so
            split the write and the read into separate requests, or read the source tables
            directly. A deferred view updates asynchronously after commit, so read the
            source tables directly, or consume the view through a{' '}
            <Link to="/docs/concepts/data-model/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscription</Link>:
          </p>
          <ExampleSnippet id="txn-deferred-setup" />
          <p className="text-text-secondary mt-4 mb-4">
            Writing upstream of the deferred view and reading it in the same request fails
            the same way:
          </p>
          <ExampleSnippet id="txn-deferred-read-after-write" />
          <p className="text-text-secondary mt-4 mb-4">
            <Link to="/docs/concepts/data-model/handlers" className="text-primary hover:text-primary-light font-medium transition-colors">Handlers</Link>{' '}
            run synchronously inside the writing transaction too - if a handler fails, the
            write that triggered it rolls back. Deferred views and{' '}
            <Link to="/docs/concepts/data-model/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscriptions</Link>{' '}
            are the asynchronous side: they consume committed changes after the fact,
            ordered by commit version, and are eventually consistent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Under the hood</h2>
          <p className="text-text-secondary mb-4">
            A command buffers its writes locally and records the keys and ranges it reads.
            At commit, a central coordinator checks that read/write set against every
            transaction that committed since the command's snapshot; if nothing overlaps,
            it allocates the next commit version and publishes the write-set - to storage,
            to transactional view maintenance, and to the change log that feeds
            subscriptions, all under that one version. For the full mechanics - the commit
            pipeline, conflict windows, and watermarks - see{' '}
            <Link to="/docs/contributors/internals/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transaction Internals</Link>.
          </p>
        </section>

        <Callout variant="note" title="Commit and the disk">
          Committed data is immediately visible to every subsequent transaction, and is
          persisted to disk asynchronously. What that means for crash recovery is covered
          in{' '}
          <Link to="/docs/concepts/durability" className="text-primary hover:text-primary-light font-medium transition-colors">Durability &amp; Storage</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
