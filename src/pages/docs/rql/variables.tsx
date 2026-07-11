import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RqlVariablesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Variables</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A variable binds a value to a name with <Code>let</Code> and is referenced
            as <Code>$name</Code> anywhere in the request - in expressions, in
            pipelines, in later statements. Variables are what turn a one-shot query
            into a script: compute a value once, then filter, branch, or write with it,
            all without leaving RQL.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Bind once, use anywhere</h2>
          <p className="text-text-secondary mb-4">
            A <Code>let</Code> statement ends with a semicolon like any other
            statement, and the binding is visible to everything after it in the same
            request. Here the threshold is named once instead of being repeated through
            the pipeline. Run the snippets on this page in order:
          </p>
          <ExampleSnippet id="rql-variables-let" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Reassignment</h2>
          <p className="text-text-secondary mb-4">
            After a <Code>let</Code>, plain assignment (<Code>$x = ...</Code>) replaces
            the value. This is what loop bodies use to accumulate - see{' '}
            <Link to="/docs/rql/control-flow/for" className="text-primary hover:text-primary-light font-medium transition-colors">for</Link>{' '}
            and its siblings:
          </p>
          <ExampleSnippet id="rql-variables-reassign" />
          <p className="text-text-secondary mt-4 mb-4">
            Assignment does not declare. Writing to a name that was never bound with{' '}
            <Code>let</Code> is an error, so a typo in a variable name fails loudly
            instead of silently creating a second variable:
          </p>
          <ExampleSnippet id="rql-variables-undeclared" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Frame variables</h2>
          <p className="text-text-secondary mb-4">
            A variable can hold a whole query result, not just a scalar. Binding{' '}
            <Code>let $items = from cf_var::items;</Code> captures the frame; a later{' '}
            <Code>from $items</Code> reads it like any other source, with the usual
            transforms applied after it:
          </p>
          <ExampleSnippet id="rql-variables-frame" />
          <p className="text-text-secondary mt-4 mb-4">
            When the frame has a single row, a field access reads one value out of it.
            This is the idiom for configuration tables - fetch the row once, then use
            its fields as scalars:
          </p>
          <ExampleSnippet id="rql-variables-frame-field" />
          <Callout variant="note" title="Capture with a bare from">
            Capture frame variables with a bare <Code>from source</Code> and apply
            transforms after <Code>from $var</Code>. In the current build, putting
            transforms inside the <Code>let</Code> itself
            (<Code>let $x = from t filter {'{'} ... {'}'}</Code>) is not supported.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Scoping</h2>
          <p className="text-text-secondary mb-4">
            Every block (<Code>{'{ ... }'}</Code>) is a scope. A <Code>let</Code>{' '}
            inside an{' '}
            <Link to="/docs/rql/control-flow/conditionals" className="text-primary hover:text-primary-light font-medium transition-colors">if</Link>{' '}
            or loop body declares a new variable that shadows the outer one until the
            block ends - it does not overwrite it. To change an outer variable from
            inside a block, assign (<Code>$x = ...</Code>) instead of re-declaring:
          </p>
          <ExampleSnippet id="rql-variables-scope" />
          <p className="text-text-secondary mb-4">
            <Link to="/docs/rql/control-flow/closures" className="text-primary hover:text-primary-light font-medium transition-colors">Closures</Link>{' '}
            interact with scopes too: they capture the variables visible where they are
            defined.
          </p>
        </section>

        <Callout variant="note" title="Variables live for one request">
          A variable exists from its <Code>let</Code> to the end of the request -
          there is no session state to clean up, and nothing leaks between requests.
          For the rest of the scripting toolkit, start at the{' '}
          <Link to="/docs/rql/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">Control Flow overview</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
