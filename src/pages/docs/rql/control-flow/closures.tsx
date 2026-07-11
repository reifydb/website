import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RqlControlFlowClosuresPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Closures &amp; Functions</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            RQL scripts can define functions two ways: anonymous <strong>closures</strong>{' '}
            bound to variables (<Code>let $double = ($x) {'{'} $x * 2 {'}'}</Code>) and
            named functions declared with <Code>udf</Code>. Both turn a repeated
            computation into one definition, both live only for the request that
            defines them, and they differ in exactly one practical way: where they can
            be called.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Define a closure, call it</h2>
          <p className="text-text-secondary mb-4">
            A closure is a parenthesized parameter list followed by a block, assigned
            to a variable with{' '}
            <Link to="/docs/rql/variables" className="text-primary hover:text-primary-light font-medium transition-colors">let</Link>.
            Calling the variable runs the body; when the call is the final statement of
            a request, its result comes back as a one-value frame:
          </p>
          <ExampleSnippet id="cf-closures-basic" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Closures capture their scope</h2>
          <p className="text-text-secondary mb-4">
            The body can reference variables from the enclosing scope - that is what
            makes it a closure rather than just a function. Here <Code>$base</Code> is
            not a parameter; it is captured:
          </p>
          <ExampleSnippet id="cf-closures-capture" />
          <p className="text-text-secondary mt-4 mb-4">
            Parameters win over captures of the same name. Inside the body,{' '}
            <Code>$x</Code> is the argument, not the outer variable:
          </p>
          <ExampleSnippet id="cf-closures-shadow" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Bodies are blocks</h2>
          <p className="text-text-secondary mb-4">
            A closure body is a full block: it can declare its own variables, and its
            last expression is the return value:
          </p>
          <ExampleSnippet id="cf-closures-block-body" />
          <p className="text-text-secondary mt-4 mb-4">
            Closures compose - a closure can call another closure it captured:
          </p>
          <ExampleSnippet id="cf-closures-compose" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Using closures in queries</h2>
          <p className="text-text-secondary mb-4">
            To feed a closure's result into a pipeline, bind it with <Code>let</Code>{' '}
            and use the variable:
          </p>
          <ExampleSnippet id="cf-closures-into-query" />
          <p className="text-text-secondary mt-4 mb-4">
            What does <em>not</em> work is calling the closure variable inline inside a
            pipeline expression - <Code>map</Code> and <Code>filter</Code> do not
            resolve <Code>$f(4)</Code> as a callable:
          </p>
          <ExampleSnippet id="cf-closures-inline-fails" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Named functions with udf</h2>
          <p className="text-text-secondary mb-4">
            When the whole point is to call the function from inside a pipeline,
            declare it with <Code>udf</Code> instead. A named udf is callable anywhere
            a built-in function is:
          </p>
          <ExampleSnippet id="cf-closures-udf" />
          <p className="text-text-secondary mt-4 mb-4">
            udf bodies use explicit <Code>return</Code>, and <Code>return</Code> exits
            immediately - combined with{' '}
            <Link to="/docs/rql/control-flow/conditionals" className="text-primary hover:text-primary-light font-medium transition-colors">if</Link>{' '}
            that gives guard-clause style logic:
          </p>
          <ExampleSnippet id="cf-closures-udf-early-return" />
          <p className="text-text-secondary mt-4 mb-4">
            A udf returning a boolean works as a reusable predicate:
          </p>
          <ExampleSnippet id="cf-closures-udf-filter" />
          <p className="text-text-secondary mt-4 mb-4">
            And a udf can wrap statements, not just expressions - including writes.
            This is the pattern for "do this parameterized thing N times" inside one
            request:
          </p>
          <ExampleSnippet id="cf-closures-udf-dml" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">One request, then gone</h2>
          <p className="text-text-secondary mb-4">
            Closures and udfs are script constructs, not schema objects. They exist
            from their definition to the end of the request - the next request starts
            clean:
          </p>
          <ExampleSnippet id="cf-closures-request-scoped" />
        </section>

        <Callout variant="note" title="Need a function that persists?">
          A udf that several requests or several clients should share is a{' '}
          <Link to="/docs/concepts/data-model/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">stored procedure</Link>:
          declared with <Code>create procedure</Code>, stored in a namespace, and
          invoked with <Code>call</Code>. Reach for closures and udfs to structure the
          logic <em>inside</em> one script; reach for procedures to give that logic a
          permanent name in the database.
        </Callout>
      </div>
    </Layout>
  );
}
