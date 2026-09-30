import { tstAssertErrorCaptureExample as tstAssertErrorCapture, tstAssertErrorExample as tstAssertError, tstAssertErrorNoErrorExample as tstAssertErrorNoError, tstAssertFailsExample as tstAssertFails, tstAssertPipelineExample as tstAssertPipeline, tstAssertStandaloneExample as tstAssertStandalone, tstChangedExample as tstChanged, tstCreateExample as tstCreate, tstCreateSecondExample as tstCreateSecond, tstDropExample as tstDrop, tstFailMessageExample as tstFailMessage, tstIsolationCheckExample as tstIsolationCheck, tstIsolationTestExample as tstIsolationTest, tstOutcomesExample as tstOutcomes, tstParameterizedExample as tstParameterized, tstProcedureExample as tstProcedure, tstProcedureOutsideExample as tstProcedureOutside, tstProcedureUseExample as tstProcedureUse, tstReplaceExample as tstReplace, tstRunExample as tstRun, tstRunSingleExample as tstRunSingle } from './overview.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function TestingOverviewPage() {
  return (
    <Layout
      title="Testing"
      description="ReifyDB's built-in test framework: assert, create test, test procedures, parameterized cases, assert error, and run tests, with every test isolated in its own rolled-back transaction."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Testing</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Tests are catalog objects, written in RQL and stored next to the schema they
            check. A test is a block of statements that ends in assertions;{' '}
            <Code>run tests</Code> executes each one inside a transaction that is
            always rolled back, so a test can insert, update, and dispatch freely
            without leaving a trace. No external harness, no fixtures directory: the
            database tests itself.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Assertions</h2>
          <p className="text-text-secondary mb-4">
            <Code>assert {'{'} condition {'}'}</Code> is an ordinary pipeline operator.
            It evaluates the condition against every row that reaches it, passes the
            rows through unchanged when all hold, and fails the request when any does
            not. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={tstAssertPipeline.title} initialCode={tstAssertPipeline.code} />
          <p className="text-text-secondary mt-4 mb-4">
            It also works as a standalone statement over a bare expression, with an
            optional message after the block. A passing assertion produces no rows:
          </p>
          <ExecutableSnippet title={tstAssertStandalone.title} initialCode={tstAssertStandalone.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A failing assertion raises an <Code>ASSERT</Code> error. The message is
            your text if you gave one, otherwise{' '}
            <Code>assertion failed: &lt;expression&gt;</Code>. The condition must
            evaluate to a boolean; <Code>assert {'{'} 42 {'}'}</Code> is an error too.
            Like any error, it rolls back the whole request:
          </p>
          <ExecutableSnippet title={tstAssertFails.title} initialCode={tstAssertFails.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Defining tests</h2>
          <p className="text-text-secondary mb-4">
            <Code>create test ns::name {'{'} ... {'}'}</Code> stores a body of
            statements under a namespace. The body is not executed at creation; it is
            only parsed. A test sees whatever committed data exists when it runs, so
            reference rows can be inserted once, outside the test:
          </p>
          <ExecutableSnippet title={tstCreate.title} initialCode={tstCreate.code} />
          <ExecutableSnippet title={tstCreateSecond.title} initialCode={tstCreateSecond.code} />
          <p className="text-text-muted text-sm mt-3">
            Statements inside the body are separated by semicolons, pipeline stages by{' '}
            <Code>|</Code>. The namespace must already exist (<Code>CA_002</Code>{' '}
            otherwise).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Running tests</h2>
          <p className="text-text-secondary mb-4">
            <Code>run tests ns</Code> runs every test in a namespace, in name order, and
            returns one row per test with <Code>name</Code>, <Code>namespace</Code>,{' '}
            <Code>outcome</Code>, <Code>duration</Code>, and <Code>message</Code>. The
            examples project the duration away because it varies run to run:
          </p>
          <ExecutableSnippet title={tstRun.title} initialCode={tstRun.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>run test ns::name</Code> runs a single test, and a bare{' '}
            <Code>run tests</Code> runs every test in the database. When nothing
            matches, the result is a single row named <Code>(no tests found)</Code>{' '}
            with outcome <Code>skip</Code>:
          </p>
          <ExecutableSnippet title={tstRunSingle.title} initialCode={tstRunSingle.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Outcomes</h2>
          <p className="text-text-secondary mb-4">
            There are three outcomes. <Code>pass</Code>: every statement ran and every
            assertion held. <Code>fail</Code>: an assertion did not hold; the message
            column carries the assertion message. <Code>error</Code>: something other
            than an assertion went wrong - a missing table, a type error, a parse error -
            and the message carries the full error text. The distinction tells you
            whether the data is wrong or the test is:
          </p>
          <ExecutableSnippet title={tstOutcomes.title} initialCode={tstOutcomes.code} />
          <ExecutableSnippet title={tstFailMessage.title} initialCode={tstFailMessage.code} />
          <p className="text-text-muted text-sm mt-3">
            A test stops at its first failure or error; later statements in the body do
            not run. A failing test never fails the <Code>run tests</Code> request
            itself - the request succeeds and reports the outcomes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Every test is isolated</h2>
          <p className="text-text-secondary mb-4">
            Each test (and each parameterized case, below) runs in its own transaction
            that is rolled back when the test finishes, pass or fail. Inside the test,
            its own writes are visible - an insert followed by a count sees the new
            row. Outside, nothing changed, and the next test starts from the same
            committed state. This includes writes made by{' '}
            <Link to="/docs/concepts/data-model/handlers" className="text-primary hover:text-primary-light font-medium transition-colors">handlers</Link>{' '}
            a test triggers with <Code>dispatch</Code>:
          </p>
          <ExecutableSnippet title={tstIsolationTest.title} initialCode={tstIsolationTest.code} />
          <ExecutableSnippet title={tstIsolationCheck.title} initialCode={tstIsolationCheck.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Test procedures</h2>
          <p className="text-text-secondary mb-4">
            Setup that several tests share goes in a{' '}
            <Code>create test procedure ns::name as {'{'} ... {'}'}</Code>. It is
            called like any{' '}
            <Link to="/docs/scripting/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">procedure</Link>,
            with <Code>call</Code>, but only from inside a test; its writes are part of
            the test's transaction and disappear with it:
          </p>
          <ExecutableSnippet title={tstProcedure.title} initialCode={tstProcedure.code} />
          <ExecutableSnippet title={tstProcedureUse.title} initialCode={tstProcedureUse.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Outside a test, the call is refused - test-only seed data cannot leak into
            production paths by accident:
          </p>
          <ExecutableSnippet title={tstProcedureOutside.title} initialCode={tstProcedureOutside.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Parameterized tests</h2>
          <p className="text-text-secondary mb-4">
            A list of records between the name and the body turns one test into one
            case per record. Each record's fields are bound as <Code>$</Code>{' '}
            variables inside the body, each case runs in its own isolated transaction,
            and the report names each case by its values:
          </p>
          <ExecutableSnippet title={tstParameterized.title} initialCode={tstParameterized.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Expecting errors</h2>
          <p className="text-text-secondary mb-4">
            <Code>assert error {'{'} ... {'}'}</Code> runs a block and passes only if
            the block fails. Use it to pin down that a constraint, a policy, or a
            missing object is actually enforced:
          </p>
          <ExecutableSnippet title={tstAssertError.title} initialCode={tstAssertError.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Bind the result with <Code>let</Code> and the caught error becomes a value
            with <Code>code</Code>, <Code>message</Code>, <Code>label</Code>, and{' '}
            <Code>help</Code> fields, so a test can assert on the exact error:
          </p>
          <ExecutableSnippet title={tstAssertErrorCapture.title} initialCode={tstAssertErrorCapture.code} />
          <ExecutableSnippet title={tstAssertErrorNoError.title} initialCode={tstAssertErrorNoError.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Inspecting what a test did</h2>
          <p className="text-text-secondary mb-4">
            Inside a test body, the <Code>testing::</Code> functions expose a log of the
            test's own side effects as queryable frames.{' '}
            <Code>testing::tables::changed("ns::table")</Code> lists the mutations the
            test made to a table - one row per change with <Code>op</Code>{' '}
            (<Code>insert</Code>, <Code>update</Code>, <Code>delete</Code>),{' '}
            <Code>target</Code>, and the row's columns prefixed <Code>new_</Code>.
            Called with no argument it covers every table:
          </p>
          <ExecutableSnippet title={tstChanged.title} initialCode={tstChanged.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same family covers the event system:{' '}
            <Code>testing::events::dispatched()</Code> lists each event the test
            dispatched (with <Code>sequence</Code>, <Code>event</Code>,{' '}
            <Code>variant</Code>, <Code>depth</Code>, and the payload fields by name)
            and <Code>testing::handlers::invoked()</Code> lists each handler run with its{' '}
            <Code>outcome</Code>. Both accept an optional name to filter by. Outside a
            test body these functions fail with <Code>PROCEDURE_003</Code>: they need
            the test transaction's change log.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Managing tests</h2>
          <p className="text-text-secondary mb-4">
            <Code>drop test ns::name</Code> removes a test. There is no{' '}
            <Code>alter</Code>; to change a test, create it again under the same name -
            the new body silently replaces the old one:
          </p>
          <ExecutableSnippet title={tstDrop.title} initialCode={tstDrop.code} />
          <ExecutableSnippet title={tstReplace.title} initialCode={tstReplace.code} />
          <Callout variant="warning" title="Re-creating a test overwrites it without warning">
            <Code>create test</Code> on an existing name reports <Code>created: true</Code>{' '}
            and replaces the body. Unlike tables, there is no duplicate error, and unlike
            migrations, no content hash. Treat test names as unique keys you own.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Where tests fit</h2>
          <p className="text-text-secondary mb-4">
            Tests are admin objects: creating and running them needs an admin request,
            the same as DDL. A typical setup registers tests in the same{' '}
            <Link to="/docs/scripting/migrations" className="text-primary hover:text-primary-light font-medium transition-colors">migration</Link>{' '}
            that creates the objects they cover, then runs <Code>run tests</Code> from
            CI or a deploy hook and fails the pipeline on any row whose outcome is not{' '}
            <Code>pass</Code>:
          </p>
          <RqlCodeBlock code={`run tests shop
| filter { outcome != "pass" }
| map { name, outcome, message }`} />
          <p className="text-text-muted text-sm mt-3">
            Separate consecutive <Code>run test</Code> statements with semicolons;
            without them the parser reports <Code>SYNTAX_001</Code>.
          </p>
        </section>

        <Callout variant="note" title="Control flow inside a test body">
          A test body is a script, so <Code>let</Code>, <Code>if</Code>, and loops all
          work in it - with the same{' '}
          <Link to="/docs/rql/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">sharp edges</Link>.
          In particular, an <Code>if</Code> branch only executes its first statement,
          inside a test exactly as outside one.
        </Callout>
      </div>
    </Layout>
  );
}
