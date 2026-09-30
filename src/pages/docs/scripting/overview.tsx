import { scriptingAssertExample as scriptingAssert, scriptingBindExample as scriptingBind, scriptingLoopWriteExample as scriptingLoopWrite, scriptingMigrationExample as scriptingMigration, scriptingTestExample as scriptingTest } from './overview.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function Item({ to, label, children }: { to: string; label: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-primary font-mono">--</span>
      <span>
        <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">{label}</Link>{' '}
        {children}
      </span>
    </li>
  );
}

export function ScriptingOverviewPage() {
  return (
    <Layout
      title="Scripting"
      description="What scripting in RQL is - variables, control flow, assertions, tests, and migrations in one transactional request - when to use it, and where each piece is documented."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Scripting</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            RQL is not only a query language. A request can bind variables, branch,
            loop, assert invariants, define tests, and register migrations - and all of
            it runs inside the same single transaction as the queries around it. There
            is no second language to learn and no round trip to an application server
            between the read and the write it decides.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What a script is</h2>
          <p className="text-text-secondary mb-4">
            A script is a sequence of statements separated by semicolons. Variables are{' '}
            <Code>$</Code>-prefixed, bound once with <Code>let</Code> and reassigned
            with plain <Code>=</Code>. The last statement's result is what the request
            returns:
          </p>
          <ExecutableSnippet title={scriptingBind.title} initialCode={scriptingBind.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The point of scripting is to keep a read and the writes it decides in one
            place. Bind a result set with <Code>let $rows = from ...</Code>, walk it
            with <Code>for</Code>, test each row with <Code>if</Code>, and write. The
            whole thing commits atomically or not at all:
          </p>
          <ExecutableSnippet title={scriptingLoopWrite.title} initialCode={scriptingLoopWrite.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Checks that live in the database</h2>
          <p className="text-text-secondary mb-4">
            <Code>assert</Code> is a pipeline operator that fails the request when a
            condition does not hold for every row. On its own it turns any query into
            a guard; a failed assertion rolls back everything the request did before
            it:
          </p>
          <ExecutableSnippet title={scriptingAssert.title} initialCode={scriptingAssert.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Wrap the same check in <Code>create test</Code> and it becomes a stored
            test that <Code>run tests</Code> executes in an isolated, rolled-back
            transaction:
          </p>
          <ExecutableSnippet title={scriptingTest.title} initialCode={scriptingTest.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Schema changes ship the same way. <Code>create migration</Code> registers a
            named, hashed body; <Code>migrate</Code> applies whatever is still pending
            and records it:
          </p>
          <ExecutableSnippet title={scriptingMigration.title} initialCode={scriptingMigration.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">When to script</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A write that depends on a read: read the rows, decide per row, write -
                without a network hop in the middle and without a stale snapshot.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Setup and backfills: batch inserts, conditional schema changes, data
                fixes that must apply completely or not at all.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Guarantees you want enforced by the database: assertions in requests,
                tests in the catalog, migrations in the ledger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Not for computation that never touches data. If nothing is read or
                written, it belongs in your application. And state derived from other
                state belongs in a{' '}
                <Link to="/docs/scripting/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>,
                not in a loop that recomputes it.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The pages in this section</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item to="/docs/rql/variables" label="Variables">
              - <Code>let</Code>, reassignment, frame variables that capture a query
              result, and scoping.
            </Item>
            <Item to="/docs/rql/control-flow" label="Control Flow">
              - the map of{' '}
              <Link to="/docs/rql/control-flow/conditionals" className="text-primary hover:text-primary-light font-medium transition-colors">conditionals</Link>,{' '}
              <Link to="/docs/rql/control-flow/match" className="text-primary hover:text-primary-light font-medium transition-colors">match</Link>,{' '}
              <Link to="/docs/rql/control-flow/for" className="text-primary hover:text-primary-light font-medium transition-colors">for</Link>,{' '}
              <Link to="/docs/rql/control-flow/while" className="text-primary hover:text-primary-light font-medium transition-colors">while</Link>,{' '}
              <Link to="/docs/rql/control-flow/loop" className="text-primary hover:text-primary-light font-medium transition-colors">loop</Link>, and{' '}
              <Link to="/docs/rql/control-flow/closures" className="text-primary hover:text-primary-light font-medium transition-colors">closures</Link>,
              plus the sharp edges they share.
            </Item>
            <Item to="/docs/rql/transforms/match" label="Match">
              - the <Code>match</Code> transform for classifying rows inside a pipeline.
            </Item>
            <Item to="/docs/scripting/testing" label="Testing">
              - <Code>assert</Code>, <Code>create test</Code>, test procedures,
              parameterized cases, <Code>assert error</Code>, and <Code>run tests</Code>.
            </Item>
            <Item to="/docs/scripting/migrations" label="Migrations">
              - <Code>create migration</Code>, <Code>migrate</Code>, rollback bodies,
              the <Code>system::migrations</Code> ledger, and loading migrations from
              files.
            </Item>
          </ul>
          <p className="text-text-secondary mt-4">
            Scripts live for one request. Logic that should persist in the database and
            be called by name is a{' '}
            <Link to="/docs/scripting/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">procedure</Link>;
            the statements that create schema and write data are covered under{' '}
            <Link to="/docs/scripting/schema/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Defining Schema</Link>{' '}
            and{' '}
            <Link to="/docs/scripting/dml/insert" className="text-primary hover:text-primary-light font-medium transition-colors">Writing Data</Link>.
          </p>
        </section>

        <Callout variant="warning" title="Three things that bite">
          Variables need the <Code>$</Code> prefix everywhere, including on the left of
          an assignment. Statements need semicolons between them; a missing one is a{' '}
          <Code>SYNTAX_001</Code> parse error. And an <Code>if</Code> branch executes
          only its first statement in the current engine - see{' '}
          <Link to="/docs/rql/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">Control Flow</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
