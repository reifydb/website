import { resErrorsCastExample as resErrorsCast, resErrorsCatalogExample as resErrorsCatalog, resErrorsConstraintExample as resErrorsConstraint, resErrorsDropInUseExample as resErrorsDropInUse, resErrorsFunctionArgExample as resErrorsFunctionArg, resErrorsParseExample as resErrorsParse, resErrorsQueryColumnExample as resErrorsQueryColumn, resErrorsSetupExample as resErrorsSetup, resErrorsTxnViewReadExample as resErrorsTxnViewRead, resErrorsUpdateNoFilterExample as resErrorsUpdateNoFilter, resErrorsViewSetupExample as resErrorsViewSetup } from './errors.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function L({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">
      {children}
    </Link>
  );
}

type CodeRow = [string, React.ReactNode, React.ReactNode];

function CodeTable({ rows }: { rows: CodeRow[] }) {
  return (
    <div className="dialog overflow-x-auto mb-4">
      <table className="w-full text-sm">
        <thead className="bg-[#efedfb]">
          <tr>
            <th className="text-left p-2 sm:p-3 font-bold">Code</th>
            <th className="text-left p-2 sm:p-3 font-bold">Meaning</th>
            <th className="text-left p-2 sm:p-3 font-bold">What to do</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([code, meaning, fix]) => (
            <tr key={code} className="border-t border-border-light align-top">
              <td className="p-2 sm:p-3 whitespace-nowrap"><Code>{code}</Code></td>
              <td className="p-2 sm:p-3 text-text-secondary">{meaning}</td>
              <td className="p-2 sm:p-3 text-text-secondary">{fix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const astRows: CodeRow[] = [
  ['AST_001', <>Tokenizer error: a character RQL has no token for, such as <Code>~</Code>.</>, <>Remove it. The operators RQL does have are listed under <L to="/docs/rql/expressions/operators">Operators</L>.</>],
  ['AST_002', <>Unexpected end of file: the statement stopped before it was complete. An unclosed brace in a <Code>filter</Code>, <Code>insert</Code>, or <Code>create</Code>, or a <Code>create ringbuffer</Code> with no <Code>with</Code> block. A <Code>map</Code> left open at the very end is accepted silently.</>, <>Finish the statement; check every <Code>{'{'}</Code> has its <Code>{'}'}</Code>.</>],
  ['AST_003', <>Expected an identifier, found a keyword such as <Code>call</Code> or <Code>grant</Code> in a name position.</>, <>Rename, or write the name in backticks. See <L to="/docs/resources/keywords">Keywords</L>.</>],
  ['AST_005', <>Unexpected token: the message says what was expected and what was found. Raised by <Code>&amp;&amp;</Code> inside a filter, a postfix <Code>if not exists</Code>, a bare hard keyword, a missing <Code>capacity</Code>.</>, <>Read the "expected ..." part; it names the token the parser wanted at that spot.</>],
  ['AST_006', <>Unsupported token: the token exists but is not allowed here. <Code>??</Code>, <Code>&amp;&amp;</Code> in a map, or a hard keyword such as <Code>filter</Code> used as a column reference.</>, <>Use <Code>and</Code>, <Code>or</Code>, <Code>not</Code>; wrap keyword-named columns in backticks.</>],
  ['AST_008', <>Cannot find type: a column type that does not exist, including <Code>Option(...)</Code> around an enum.</>, <>Use a type from <L to="/docs/concepts/data-types">Data Types</L>; an enum column is written without <Code>Option</Code>.</>],
  ['AST_009', <>Unsupported query syntax: a form the parser recognizes but cannot use here, such as <Code>for $row in (from ...)</Code> or a bare <Code>insert</Code>.</>, <>Bind the source to a variable first for <Code>for</Code>; give the statement its target.</>],
];

const shapeRows: CodeRow[] = [
  ['MAP_002', <><Code>map</Code> needs curly braces around its expressions.</>, <>Write <Code>map {'{'} a, b {'}'}</Code>.</>],
  ['SORT_001', <><Code>sort</Code> needs curly braces around its keys.</>, <>Write <Code>sort {'{'} a: asc {'}'}</Code>; always give a direction.</>],
  ['AGGREGATE_004', <><Code>aggregate</Code> needs curly braces around its aggregations and its <Code>by</Code> keys.</>, <>Write <Code>aggregate {'{'} n: math::count(id) {'}'} by {'{'} region {'}'}</Code>.</>],
  ['EXTEND_002', <>Either a missing brace pair on <Code>extend</Code>, or a new column whose name already exists on the row.</>, <>Add the braces, or use <Code>map</Code> to replace a column that exists.</>],
  ['INSERT_002', <><Code>insert</Code> named a table but no rows.</>, <>Add the record array: <Code>insert ns::t [{'{'} ... {'}'}]</Code>.</>],
  ['INSERT_003', <>Keyed <Code>{'{'} col: value {'}'}</Code> rows and positional <Code>(value, ...)</Code> rows mixed in one insert.</>, <>Use one form for the whole array.</>],
  ['INSERT_004', <>A positional row has the wrong number of values; the message lists the columns in order.</>, <>Give exactly one value per column, in declaration order.</>],
  ['UPDATE_001', <><Code>update</Code> has no assignments block.</>, <>Write <Code>update ns::t {'{'} col: value {'}'} filter {'{'} ... {'}'}</Code>.</>],
  ['UPDATE_002', <>The assignments block is empty.</>, <>Assign at least one column.</>],
  ['UPDATE_003', <><Code>update</Code> has no <Code>filter</Code>.</>, <>Add one; <Code>filter {'{'} true {'}'}</Code> is the explicit every-row form.</>],
  ['DELETE_002', <><Code>delete</Code> has no <Code>filter</Code>.</>, <>Same remedy as <Code>UPDATE_003</Code>.</>],
  ['SYNTAX_001', <>Several statements found where one was expected: a semicolon is missing between them.</>, <>End each statement with <Code>;</Code>.</>],
];

const catalogRows: CodeRow[] = [
  ['CA_001', <>Namespace already exists.</>, <>Use <Code>create namespace if not exists</Code>, or pick another name.</>],
  ['CA_002', <>Namespace not found, or a column type (enum, dictionary) not found. <Code>if exists</Code> on a drop does not cover a missing namespace.</>, <>Create the namespace or type first; check the <Code>ns::name</Code> spelling.</>],
  ['CA_003', <>Object already exists: table, view, or enum.</>, <>Drop it, or use <Code>if not exists</Code> on the create.</>],
  ['CA_004', <>Table or view not found. Writing to a view reports the view as a table that does not exist.</>, <>Check the name; views are not mutation targets, write to the source table.</>],
  ['CA_005', <>Ring buffer already exists, or <Code>add column</Code> named a column the table already has.</>, <>Pick another name.</>],
  ['CA_006', <>Ring buffer not found, or <Code>auto_increment</Code> on a non-integer column.</>, <>Check the name; use an integer type for the sequence column.</>],
  ['CA_007', <>Dictionary not found.</>, <>Create it first with <Code>create dictionary</Code>.</>],
  ['CA_032', <>Dictionary still referenced by a column.</>, <>Drop or alter the dependent columns first; the message names them.</>],
  ['CA_033', <>Enum still referenced by a column.</>, <>Drop or alter the dependent columns first.</>],
  ['CA_035', <>Table still read by a view; the message names the flow.</>, <>Drop the views first, leaf first, then the table. <Code>cascade</Code> is accepted but not honored.</>],
  ['CA_036', <>View still read by another view.</>, <>Drop the dependent view first.</>],
  ['CA_039', <>Column not found in the table, on <Code>alter table</Code>.</>, <>Check the column name; <Code>alter table</Code> does not create it.</>],
  ['CA_040', <>Identity already exists.</>, <>Choose another name or drop the existing identity.</>],
  ['CA_043', <>Identity not found on <Code>grant</Code> or <Code>revoke</Code>.</>, <>Create the user or service first.</>],
  ['CA_044', <>Role not found on <Code>grant</Code> or <Code>revoke</Code>.</>, <>Create the role first.</>],
  ['CA_048', <>Migration has no rollback body, so it cannot be reverted.</>, <>Only migrations declared with a <Code>rollback</Code> block can be rolled back. See <L to="/docs/scripting/migrations">Migrations</L>.</>],
  ['CA_049', <>Migration content changed since it was registered; the hashes differ.</>, <>Revert the edit, or register a new migration under a new name.</>],
  ['CA_050', <>Unknown config key, nested under <Code>PROCEDURE_003</Code> from <Code>system::config::set</Code>.</>, <>Query <Code>system::config</Code> for the registered keys.</>],
];

const castRows: CodeRow[] = [
  ['CAST_001', <>Unsupported type pair, such as <Code>bool</Code> to <Code>date</Code>.</>, <>Only some pairs are defined; see <L to="/docs/rql/transforms/cast">cast</L>.</>],
  ['CAST_002', <>Text that is not a number; wraps <Code>NUMBER_001</Code>.</>, <>Fix the input, or cast through a wider type.</>],
  ['CAST_003', <>Text that is not a date, time, or datetime; wraps a <Code>TEMPORAL_*</Code> cause such as <Code>TEMPORAL_012</Code> for a day that does not exist.</>, <>Use ISO format and a real calendar date.</>],
  ['CAST_004', <>Text that is not a boolean; wraps <Code>BOOLEAN_001</Code>.</>, <>Use <Code>true</Code> or <Code>false</Code>.</>],
  ['CAST_005', <>Text that is not a UUID; wraps <Code>UUID_001</Code>.</>, <>Check the format and the version.</>],
  ['CAST_006', <>Blob that is not valid UTF-8; wraps <Code>BLOB_004</Code>.</>, <>Only blobs that decode as text can become <Code>utf8</Code>.</>],
];

const exprRows: CodeRow[] = [
  ['OPERATOR_017', <><Code>+</Code> between incompatible types, such as a date and a duration.</>, <>Use the typed function instead: <L to="/docs/functions/date/add">date::add</L>.</>],
  ['OPERATOR_022', <><Code>==</Code> between incompatible types, such as text and a number.</>, <>Cast one side; comparisons across types are errors, not <Code>false</Code>.</>],
  ['NUMBER_001', <>Invalid number format, usually as the cause under <Code>CAST_002</Code>.</>, <>Fix the input text.</>],
  ['NUMBER_002', <>Number out of range for the column type, such as 300 into <Code>int1</Code>.</>, <>Widen the type or fix the value; nothing is clamped or wrapped.</>],
  ['NUMBER_007', <>Division by zero.</>, <>Guard the divisor, or use the <L to="/docs/functions/arithmetic-policies">arithmetic policies</L>.</>],
  ['FUNCTION_001', <>Unknown function name.</>, <>Check the <L to="/docs/functions">function index</L>; names are <Code>namespace::name</Code>.</>],
  ['FUNCTION_002', <>Wrong number of arguments.</>, <>The message states how many the function expects.</>],
  ['FUNCTION_004', <>Wrong argument type; the message lists the accepted types.</>, <>Cast the argument, or pick the function for that type.</>],
  ['FUNCTION_007', <>The function ran and failed; the real cause is nested, such as <Code>NUMBER_007</Code> under <Code>math::div</Code>.</>, <>Read the nested error first.</>],
  ['PROCEDURE_001', <>Unknown procedure on <Code>call</Code>.</>, <>Check the name; test procedures are not callable from an ordinary request.</>],
  ['PROCEDURE_003', <>A built-in procedure such as <Code>system::config::set</Code> ran and failed; the real cause is nested. A procedure written in RQL reports its own error directly, with no wrapper.</>, <>Read the nested error first.</>],
  ['RUNTIME_001', <>Variable not defined. Also what a <Code>call</Code> with too few arguments raises, naming the missing parameter.</>, <>Bind it with <Code>let</Code>, or pass every argument.</>],
  ['RUNTIME_006', <>Loop exceeded 10,000 iterations.</>, <>Add a <Code>break</Code> or a terminating <Code>while</Code> condition.</>],
];

const integrityRows: CodeRow[] = [
  ['CONSTRAINT_007', <><Code>none</Code> into a column that is not <Code>Option(...)</Code>. Also raised when an enum column receives a string literal instead of a variant path.</>, <>Declare the column <Code>Option(type)</Code>, or supply a value.</>],
  ['INDEX_001', <>Primary key violation: the insert repeats a key inserted since <Code>create primary key</Code> ran. Rows that existed before the key was declared are not indexed, so repeating one of them is accepted.</>, <>Make the key unique, or update the existing row. Declare the key before loading data.</>],
  ['SEQUENCE_002', <><Code>alter sequence</Code> on a column that has no <Code>auto_increment</Code>.</>, <>Only sequence-backed columns can be repositioned.</>],
  ['QUERY_001', <>Column not found in <Code>sort</Code>. A missing column in <Code>map</Code> silently yields <Code>none</Code>, and in <Code>filter</Code> silently matches nothing.</>, <>Check the name and the stage: a column dropped by an earlier <Code>map</Code> is gone.</>],
  ['RUNTIME_009', <>Field not found on a variable: dot access on a column, such as <Code>d.name</Code> after a join, is read as a variable with no fields. The engine source names this case <Code>QUERY_002</Code>; the playground build reports it here.</>, <>Dot access only works inside a join's <Code>using</Code> clause; joined columns flatten to <Code>alias_column</Code>. Never alias the source itself (<Code>from ns::t as i</Code>): that form traps the playground engine.</>],
];

const txnRows: CodeRow[] = [
  ['TXN_001 (source)', <>Write conflict: another transaction committed over what this one read or wrote. The server retries up to 10 times before surfacing it.</>, <>Resubmit the request. Not reproducible in the single-user playground; see <L to="/docs/concepts/transactions">Transactions</L>.</>],
  ['TXN_015', <>A view was read in the same request that wrote one of its sources; the request rolls back rather than return stale rows.</>, <>Split the write and the read into two requests, or read the source table.</>],
  ['TXN_002 (source)', <>Transaction rolled back and cannot be committed.</>, <>Start a new request.</>],
  ['TXN_003 (source)', <>Transaction contains too many writes.</>, <>Split the batch across requests.</>],
  ['TXN_004 (source)', <>Transaction open too long; its conflict history was evicted.</>, <>Keep requests short.</>],
];

export function ErrorsPage() {
  return (
    <Layout
      title="Error Reference"
      description="What the RQL diagnostic codes mean, family by family, and what to do about each one; every code was raised live against the playground engine unless marked otherwise."
    >
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2 font-bold">Resources</div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Error Reference</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Every error RQL returns carries a stable code, a message, usually a{' '}
            <Code>HELP</Code> line, and often the location that failed. The prefix names
            the part of the engine that raised it: <Code>AST_</Code> is the parser,{' '}
            <Code>CA_</Code> the catalog, <Code>CAST_</Code> the cast system,{' '}
            <Code>TXN_</Code> the transaction layer. This page lists the codes you will
            meet, grouped by family, with the fix for each. Every row was raised live
            against the playground engine (<Code>@reifydb/wasm</Code> 0.8.1) while
            writing this page, except the rows marked <em>source</em>, which are read
            from the engine source and cannot be triggered in a browser. For how a
            diagnostic is laid out, see{' '}
            <L to="/docs/resources/faq">Troubleshooting &amp; FAQ</L>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Reading a diagnostic</h2>
          <p className="text-text-secondary mb-4">
            Three habits cover most cases. First, when an error nests another under an
            arrow marker, the inner one is the cause: <Code>CAST_002</Code>{' '}
            wraps <Code>NUMBER_001</Code>, <Code>FUNCTION_007</Code> wraps whatever the
            function hit, <Code>PROCEDURE_003</Code> wraps whatever a built-in procedure
            hit.
            Second, an <Code>AST_005</Code> message names the token the parser wanted;
            that word is the fix. Third, a failed request commits nothing: if a{' '}
            <Code>create table</Code> and a failing <Code>insert</Code> share one
            request, the table is gone too. The snippets on this page run in order;
            start here:
          </p>
          <ExecutableSnippet title={resErrorsSetup.title} initialCode={resErrorsSetup.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Parsing: AST_*</h2>
          <p className="text-text-secondary mb-4">
            Raised before anything runs. Nothing in the catalog is consulted yet, so an
            AST error never depends on data.
          </p>
          <CodeTable rows={astRows} />
          <ExecutableSnippet title={resErrorsParse.title} initialCode={resErrorsParse.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Statement shape</h2>
          <p className="text-text-secondary mb-4">
            Each operator and write statement checks its own shape and reports under its
            own prefix. These are the ones a first week of RQL runs into.
          </p>
          <CodeTable rows={shapeRows} />
          <ExecutableSnippet title={resErrorsUpdateNoFilter.title} initialCode={resErrorsUpdateNoFilter.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Catalog: CA_*</h2>
          <p className="text-text-secondary mb-4">
            Anything about objects: names that do not exist, names that already do,
            and objects that cannot be dropped because something else depends on them.
            The numbers are scoped by object kind rather than unique: <Code>CA_003</Code>{' '}
            is "already exists" for a table, a view, and an enum alike, and{' '}
            <Code>CA_004</Code> is "not found" for a table or a view. Read the message,
            not just the number.
          </p>
          <CodeTable rows={catalogRows} />
          <ExecutableSnippet title={resErrorsCatalog.title} initialCode={resErrorsCatalog.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Casts: CAST_*</h2>
          <p className="text-text-secondary mb-4">
            <Code>CAST_001</Code> means the pair of types has no conversion at all. The
            other five mean the pair is fine but this particular value could not be
            converted, and each nests the parser that rejected it.
          </p>
          <CodeTable rows={castRows} />
          <ExecutableSnippet title={resErrorsCast.title} initialCode={resErrorsCast.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Expressions and routines</h2>
          <p className="text-text-secondary mb-4">
            Type checks on operators, range checks on numbers, and everything a
            function or procedure call can get wrong. RQL never coerces across types
            silently: text compared with a number is an error, not <Code>false</Code>.
          </p>
          <CodeTable rows={exprRows} />
          <ExecutableSnippet title={resErrorsFunctionArg.title} initialCode={resErrorsFunctionArg.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Data integrity and query resolution</h2>
          <CodeTable rows={integrityRows} />
          <ExecutableSnippet title={resErrorsConstraint.title} initialCode={resErrorsConstraint.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Only <Code>sort</Code> fails loudly on a column that does not exist. If a{' '}
            <Code>filter</Code> returns nothing you did not expect, check the column
            name before anything else:
          </p>
          <ExecutableSnippet title={resErrorsQueryColumn.title} initialCode={resErrorsQueryColumn.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Transactions: TXN_*</h2>
          <p className="text-text-secondary mb-4">
            The one you will see in the playground is <Code>TXN_015</Code>. Create a
            transactional view, then write to its source and read the view in the same
            request:
          </p>
          <ExecutableSnippet title={resErrorsViewSetup.title} initialCode={resErrorsViewSetup.code} />
          <ExecutableSnippet title={resErrorsTxnViewRead.title} initialCode={resErrorsTxnViewRead.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The insert rolled back with the rest of the request. The view now also
            protects its source from being dropped:
          </p>
          <ExecutableSnippet title={resErrorsDropInUse.title} initialCode={resErrorsDropInUse.code} />
          <CodeTable rows={txnRows} />
        </section>

        <Callout variant="note" title="A code that is not here">
          The engine defines more codes than this page lists: window, subscription,
          authentication, CDC, temporal, and blob families among them. The operator and function
          pages under <L to="/docs/rql/transforms">Pipeline Operators</L> and{' '}
          <L to="/docs/routines">Routines</L> document the failure modes specific to
          them, and <L to="/docs/resources/caveats">Caveats &amp; Limitations</L>{' '}
          covers the cases that trap the engine instead of returning a code. The
          engine source is newer than the playground build, so a code's wording, and
          occasionally its number, can differ on a newer server.
        </Callout>
      </div>
    </Layout>
  );
}
