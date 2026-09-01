import { scriptingCreateProcedureExample as scriptingCreateProcedure, scriptingProcedureParamsExample as scriptingProcedureParams, spOvArgumentsExample as spOvArguments, spOvBadBatchCallExample as spOvBadBatchCall, spOvBadBatchCreateExample as spOvBadBatchCreate, spOvBadBatchVerifyExample as spOvBadBatchVerify, spOvCallDroppedExample as spOvCallDropped, spOvDropExample as spOvDrop, spOvDropIfExistsExample as spOvDropIfExists, spOvDuplicateExample as spOvDuplicate, spOvLastStatementExample as spOvLastStatement, spOvNoResultExample as spOvNoResult, spOvNotAFunctionExample as spOvNotAFunction, spOvOptionParamExample as spOvOptionParam, spOvPipeRejectedExample as spOvPipeRejected, spOvPipelineExample as spOvPipeline, spOvRedefineExample as spOvRedefine, spOvReturningExample as spOvReturning, spOvTestProcedureExample as spOvTestProcedure, spOvWriteResultExample as spOvWriteResult } from './overview.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function ProceduresOverviewPage() {
  return (
    <Layout
      title="Procedures"
      description="How to define a procedure with create procedure, call it, read what a call returns, and what happens when a body fails, is redefined, or is dropped."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Procedures</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A procedure is a named block of RQL statements stored in the catalog and run
            with <Code>call</Code>. Define it once, next to the data it touches; call it
            from any request, from a script loop, or from another procedure. A{' '}
            <Link to="/docs/scripting" className="text-primary hover:text-primary-light font-medium transition-colors">script</Link>{' '}
            lives for one request - a procedure is the same logic kept in the database
            and given a name. This page covers defining, calling, results, what a body
            may contain, and how failures behave;{' '}
            <Link to="/docs/scripting/procedures/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">Parameters &amp; Control Flow</Link>{' '}
            covers what happens inside a body.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Defining a procedure</h2>
          <p className="text-text-secondary mb-4">
            The name is namespace-qualified, the parameters are an optional typed record,
            and the body is a list of statements separated by semicolons:
          </p>
          <RqlCodeBlock code={`create procedure ns::name { param: type, other: type } as {
  statement;
  statement
}`} />
          <p className="text-text-secondary mt-4 mb-4">
            The{' '}
            <Link to="/docs/concepts/data-model/namespaces" className="text-primary hover:text-primary-light font-medium transition-colors">namespace</Link>{' '}
            must already exist. The confirmation names the procedure and nothing else -
            no catalog id, unlike a table. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={scriptingCreateProcedure.title} initialCode={scriptingCreateProcedure.code} />
          <p className="text-text-muted text-sm mt-3">
            Keywords are case-insensitive; the rest of this page writes them in lower
            case.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary mb-4">
            Parameters are declared as a typed record, <Code>{'{'} id: int4, name: utf8 {'}'}</Code>,
            and the body reads each one as a <Code>$</Code>-prefixed variable. A call
            passes arguments in the same order, in parentheses:
          </p>
          <ExecutableSnippet title={scriptingProcedureParams.title} initialCode={scriptingProcedureParams.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An argument is any expression: a literal, a variable bound earlier in the
            request, or arithmetic over either. It is evaluated by the caller before the
            body runs:
          </p>
          <ExecutableSnippet title={spOvArguments.title} initialCode={spOvArguments.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A parameter declared <Code>Option(type)</Code> accepts <Code>none</Code>{' '}
            as well as a value, the same way an optional column does:
          </p>
          <ExecutableSnippet title={spOvOptionParam.title} initialCode={spOvOptionParam.code} />
          <p className="text-text-secondary mt-4">
            How arguments bind to parameters, and what happens when the count or the
            type does not match, is on{' '}
            <Link to="/docs/scripting/procedures/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">Parameters &amp; Control Flow</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What a call returns</h2>
          <p className="text-text-secondary mb-4">
            A call returns the result of the last statement in the body that produced
            one. A <Code>let</Code> or an assignment produces nothing and never replaces
            an earlier result. End with a query and the caller gets rows:
          </p>
          <ExecutableSnippet title={spOvLastStatement.title} initialCode={spOvLastStatement.code} />
          <p className="text-text-secondary mt-4 mb-4">
            End with a write and the caller gets the write's confirmation, exactly as if
            it had run the <Code>insert</Code> itself:
          </p>
          <ExecutableSnippet title={spOvWriteResult.title} initialCode={spOvWriteResult.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A write with <Code>returning</Code> hands back the affected rows instead of a
            count - the usual way to get a generated id or a post-update value out of a
            procedure:
          </p>
          <ExecutableSnippet title={spOvReturning.title} initialCode={spOvReturning.code} />
          <p className="text-text-secondary mt-4 mb-4">
            When no statement produced anything - a body of only <Code>let</Code>s, an
            empty body - the call returns a single <Code>value</Code> column holding{' '}
            <Code>none</Code>, never an empty result:
          </p>
          <ExecutableSnippet title={spOvNoResult.title} initialCode={spOvNoResult.code} />
          <p className="text-text-secondary mt-4">
            To leave the body before its last statement, use <Code>return</Code>; see{' '}
            <Link to="/docs/scripting/procedures/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">Parameters &amp; Control Flow</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What a body may contain</h2>
          <p className="text-text-secondary mb-4">
            Any statement a request may run: reads with <Code>filter</Code>,{' '}
            <Code>map</Code>, <Code>sort</Code>, and <Code>aggregate</Code>; writes with{' '}
            <Code>insert</Code>, <Code>update</Code>, and <Code>delete</Code>;{' '}
            <Code>call</Code> of another procedure; variables and control flow; even
            schema changes, which then require an admin transaction (below). Inside a
            body, pipeline stages chain with whitespace or newlines:
          </p>
          <ExecutableSnippet title={spOvPipeline.title} initialCode={spOvPipeline.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The <Code>|</Code> separator that works at the top level of a request is not
            accepted inside a procedure body. The <Code>create</Code> fails to parse:
          </p>
          <ExecutableSnippet title={spOvPipeRejected.title} initialCode={spOvPipeRejected.code} />
          <Callout variant="warning" title="No | inside a body">
            Write <Code>from t filter {'{'} ... {'}'} map {'{'} ... {'}'}</Code> inside a
            procedure, never <Code>from t | filter ...</Code>. The pipe form fails with{' '}
            <Code>AST_006</Code> at <Code>create</Code> time, so the procedure is never
            stored.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Failures roll back the call</h2>
          <p className="text-text-secondary mb-4">
            The body is parsed when the procedure is created, so a syntax error fails
            the <Code>create</Code>. Everything else - a missing table, a type mismatch,
            an undefined variable - is checked when the procedure is called, not when it
            is defined. This body creates fine even though its second insert can never
            succeed:
          </p>
          <ExecutableSnippet title={spOvBadBatchCreate.title} initialCode={spOvBadBatchCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A call runs inside the calling request's{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">transaction</Link>.
            If any statement in the body fails, the call fails, and every write the body
            made before that point rolls back - together with everything else the
            request had done:
          </p>
          <ExecutableSnippet title={spOvBadBatchCall.title} initialCode={spOvBadBatchCall.code} />
          <ExecutableSnippet title={spOvBadBatchVerify.title} initialCode={spOvBadBatchVerify.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Because the body runs in the caller's transaction, it also inherits the
            caller's kind. A body that only reads can be called from a query; a body
            that writes needs a command; a body that changes schema needs an admin
            transaction, and so does <Code>create procedure</Code> itself. A body
            that writes, called from a query, fails with{' '}
            <em>Mutation operations cannot be executed in a query transaction</em>; the
            runnable snippets here execute as admin requests, which is why they can do
            all three.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Redefining and dropping</h2>
          <p className="text-text-secondary mb-4">
            A name can be defined once per namespace. Creating it again fails with{' '}
            <Code>CA_080</Code>, and there is no <Code>if not exists</Code> form for
            procedures:
          </p>
          <ExecutableSnippet title={spOvDuplicate.title} initialCode={spOvDuplicate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            To change a body, drop it and create it again. Put both statements in one
            request and the swap is atomic - no caller can observe the gap between them:
          </p>
          <ExecutableSnippet title={spOvRedefine.title} initialCode={spOvRedefine.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>drop procedure</Code> reports the namespace, the name, and whether
            anything was removed. With <Code>if exists</Code>, a missing procedure is
            reported as <Code>dropped: false</Code> instead of an error:
          </p>
          <ExecutableSnippet title={spOvDrop.title} initialCode={spOvDrop.code} />
          <ExecutableSnippet title={spOvDropIfExists.title} initialCode={spOvDropIfExists.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Calling a name that does not exist - never created, or dropped - fails with{' '}
            <Code>PROCEDURE_001</Code>:
          </p>
          <ExecutableSnippet title={spOvCallDropped.title} initialCode={spOvCallDropped.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">A procedure is not a function</h2>
          <p className="text-text-secondary mb-4">
            <Code>call</Code> is a statement. A procedure cannot be used where a value is
            expected - inside <Code>map</Code>, <Code>filter</Code>, or any expression -
            because the engine resolves names there as{' '}
            <Link to="/docs/routines" className="text-primary hover:text-primary-light font-medium transition-colors">functions</Link>,
            and a procedure is not one:
          </p>
          <ExecutableSnippet title={spOvNotAFunction.title} initialCode={spOvNotAFunction.code} />
          <p className="text-text-secondary mt-4">
            For the same reason, <Code>let $x = call ns::proc()</Code> is not supported
            in the playground engine. To get a value out of a procedure, end its body
            with the query or <Code>map</Code> that produces it and use the call's
            result directly. For a reusable computation inside expressions, define a
            request-scoped function instead; see{' '}
            <Link to="/docs/rql/control-flow/closures" className="text-primary hover:text-primary-light font-medium transition-colors">Closures &amp; Functions</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Test procedures</h2>
          <p className="text-text-secondary mb-4">
            <Code>create test procedure</Code> defines a procedure that only a test may
            call - a fixture that seeds rows, for example. Calling one from an ordinary
            request fails with <Code>PROCEDURE_001</Code>, so a fixture can never leak
            into production data:
          </p>
          <ExecutableSnippet title={spOvTestProcedure.title} initialCode={spOvTestProcedure.code} />
          <p className="text-text-secondary mt-4">
            Tests, test procedures, and <Code>run tests</Code> are covered on{' '}
            <Link to="/docs/scripting/testing" className="text-primary hover:text-primary-light font-medium transition-colors">Testing</Link>.
          </p>
        </section>

        <Callout variant="note" title="Where procedures fit">
          Who may call a procedure is governed by a{' '}
          <Link to="/docs/concepts/data-model/policies" className="text-primary hover:text-primary-light font-medium transition-colors">policy</Link>{' '}
          with the <Code>call</Code> operation. If the logic computes state from other
          state, a{' '}
          <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>{' '}
          keeps it correct on its own; reach for a procedure when the operation is an
          action - several writes that belong together, validation with branching, or
          an entry point you want to expose to clients. The data-model view of
          procedures, including native and WASM-backed kinds, is on{' '}
          <Link to="/docs/concepts/data-model/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">Procedures</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
