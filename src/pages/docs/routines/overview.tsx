import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function RoutinesOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Routines</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Everything callable in ReifyDB is a routine, and there are two kinds.{' '}
            <strong>Functions</strong> are pure computations used inside expressions;{' '}
            <strong>procedures</strong> run statements, may write, and are invoked
            with <Code>CALL</Code>. Both answer to the same{' '}
            <Code>namespace::name</Code> addressing. This page is the map; the
            linked references go deep.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">One naming scheme</h2>
          <p className="text-text-secondary mb-4">
            Every routine has a qualified name of the form{' '}
            <Code>namespace::name</Code> - <Code>math::abs</Code>,{' '}
            <Code>text::upper</Code>, <Code>clock::now</Code>. Built-ins register
            under fixed namespaces when the engine boots, and those names are stable:
            they appear in stored queries, scripts, and client code, so ReifyDB adds
            new routines rather than renaming existing ones. Your own procedures live
            in your own{' '}
            <Link to="/docs/concepts/data-model/namespaces" className="text-primary hover:text-primary-light font-medium transition-colors">namespaces</Link>,
            addressed exactly like your tables.
          </p>
          <p className="text-text-secondary mb-4">
            Variants of a function are separate flat names with underscore suffixes,
            not deeper namespaces: the saturating sibling of <Code>math::add</Code> is{' '}
            <Code>math::add_saturate</Code>, and the none-on-overflow one is{' '}
            <Code>math::add_none</Code>. The arithmetic policy suffixes
            (<Code>_saturate</Code>, <Code>_wrap</Code>, <Code>_zero</Code>,{' '}
            <Code>_none</Code>, <Code>_default</Code>, <Code>_strict</Code>) are the
            largest such family; see{' '}
            <Link to="/docs/functions/arithmetic-policies" className="text-primary hover:text-primary-light font-medium transition-colors">Arithmetic Policies</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Functions: values in, values out</h2>
          <p className="text-text-secondary mb-4">
            Functions are pure. They transform input values into output values and
            touch nothing else, which is what makes them safe anywhere an expression
            is expected: in <Code>map</Code>, <Code>filter</Code>,{' '}
            <Code>extend</Code>, <Code>aggregate</Code>. Nearly 200 built-ins ship in
            domain modules - <Code>math</Code>, <Code>text</Code>, <Code>date</Code>,{' '}
            <Code>datetime</Code>, <Code>duration</Code>, <Code>time</Code>,{' '}
            <Code>blob</Code>, <Code>json</Code>, <Code>is</Code>, and more - each
            documented in the{' '}
            <Link to="/docs/functions" className="text-primary hover:text-primary-light font-medium transition-colors">function reference</Link>.
          </p>
          <ExampleSnippet id="routines-overview-function-call" />
          <p className="text-text-secondary mt-4">
            Most functions are scalar: one output value per row. Some are aggregates
            - <Code>math::sum</Code>, <Code>math::avg</Code>,{' '}
            <Code>math::count</Code> - and fold a whole group into one value inside{' '}
            <Code>aggregate</Code>. A few are generators that produce rows instead of
            transforming them, such as <Code>series::generate</Code> standing as a{' '}
            <Code>FROM</Code> source.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Procedures: statements with a name</h2>
          <p className="text-text-secondary mb-4">
            Procedures are imperative. A procedure body runs statements, can read and
            write data, and is invoked as a statement of its own with{' '}
            <Code>CALL</Code>. Define one with <Code>CREATE PROCEDURE</Code>: it is
            stored in the catalog next to your data, takes typed parameters, and
            references them as <Code>$param</Code> in the body.
          </p>
          <ExampleSnippet id="routines-overview-procedure-roundtrip" />
          <p className="text-text-secondary mt-4">
            Built-in procedures answer to the same naming scheme and call syntax:{' '}
            <Code>clock::set</Code> and <Code>clock::advance</Code> steer the engine
            clock in tests, <Code>rql::explain</Code> inspects query plans. See{' '}
            <Link to="/docs/scripting/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">Procedures</Link>{' '}
            for definitions and{' '}
            <Link to="/docs/scripting/procedures/control-flow" className="text-primary hover:text-primary-light font-medium transition-colors">Parameters &amp; Control Flow</Link>{' '}
            for conditionals and loops inside bodies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Request-scoped functions</h2>
          <p className="text-text-secondary mb-4">
            RQL scripts can also define functions on the fly: anonymous closures bound
            to variables with <Code>let</Code>, and named functions declared with{' '}
            <Code>udf</Code>. These are not registered routines - they exist only for
            the request that defines them. Reach for them to factor a repeated
            computation inside one script; reach for a procedure when the logic should
            be stored in the database and callable by name. See{' '}
            <Link to="/docs/rql/control-flow/closures" className="text-primary hover:text-primary-light font-medium transition-colors">Closures &amp; Functions</Link>.
          </p>
        </section>

        <Callout variant="tip" title="Where to go next">
          Browse the{' '}
          <Link to="/docs/functions" className="text-primary hover:text-primary-light font-medium transition-colors">function reference</Link>{' '}
          module by module, read{' '}
          <Link to="/docs/functions/arithmetic-policies" className="text-primary hover:text-primary-light font-medium transition-colors">Arithmetic Policies</Link>{' '}
          before doing math on untrusted numbers, and start{' '}
          <Link to="/docs/scripting/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">Procedures</Link>{' '}
          when application logic should live next to the data it touches.
        </Callout>
      </div>
    </Layout>
  );
}
