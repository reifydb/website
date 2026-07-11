import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { CodeBlock, Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function DocLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">
      {children}
    </Link>
  );
}

export function PythonClientPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Python</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The Python binding is an early prototype, version 0.0.1. It is a PyO3 module
            that embeds the engine inside the Python process - the same shape as{' '}
            <DocLink to="/docs/clients/rust-embedded">Rust (Embedded)</DocLink>, not a
            remote client - and it was written against an engine API that has since been
            replaced. This page documents what the prototype is, why you should not build
            on it yet, and how to use ReifyDB from Python today while it waits for its
            rewrite.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What exists today</h2>
          <p className="text-text-secondary mb-4">
            The package lives at <Code>pkg/python/reifydb</Code> in the engine repository
            and is built with maturin (PyO3, abi3, Python 3.10+). It exposes exactly one
            class with one method:
          </p>
          <CodeBlock
            language="python"
            code={`from reifydb import Embedded

db = Embedded()               # in-memory engine, in-process
results = db.tx('FROM app::users')`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>Embedded()</Code> starts a blocking in-memory engine as the root
            identity; there is no persistence option and no way to run as another
            identity. <Code>tx(rql)</Code> executes RQL and returns a list with one plain
            dict per statement result, tagged by kind: a query result is{' '}
            <Code>{"{'type': 'Query', 'headers': [...], 'rows': [...]}"}</Code>, and
            schema and insert statements return{' '}
            <Code>CreateNamespace</Code>/<Code>CreateTable</Code>/
            <Code>InsertIntoTable</Code> dicts naming what they touched. Every cell in{' '}
            <Code>rows</Code> is a string - the prototype formats values on the way out
            rather than mapping engine types to Python types. There is no query/command
            split, no parameters, no subscriptions, and no error surface beyond the
            exception PyO3 raises.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">How it was meant to be used</h2>
          <p className="text-text-secondary mb-4">
            The repository ships one example, a hello world that pretty-prints a query
            result with <Code>tabulate</Code>. It is reproduced here as a record of
            intent - note that even its RQL predates the current syntax:
          </p>
          <CodeBlock
            language="python"
            code={`from reifydb import Embedded
from tabulate import tabulate

db = Embedded()
r = db.tx('map 1, 1 + 4')

print(tabulate(r[0]['rows'], headers=r[0]['headers']))`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The development notes describe the standard maturin workflow -{' '}
            <Code>maturin build</Code>, <Code>pip install .</Code> - but that workflow
            does not currently produce a working module, for the reasons below. The
            package is not published; there is no <Code>pip install reifydb</Code> from
            PyPI.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Current status</h2>
          <Callout variant="warning" title="Stale prototype - do not build on it">
            The binding was written against engine APIs that no longer exist. Its Rust
            source calls <Code>ReifyDB::embedded_blocking()</Code> and{' '}
            <Code>reifydb::variant::Embedded</Code>, both long gone from the crate (the
            current embedded surface is <Code>embedded::memory()</Code> and sessions, see{' '}
            <DocLink to="/docs/clients/rust-embedded">Rust (Embedded)</DocLink>). The
            crate is excluded from the engine workspace, its dependency on the engine is
            commented out, and its entire implementation sits behind an{' '}
            <Code>include-python-workspace</Code> feature flag - it does not compile
            against the current engine. The API will change completely when it is brought
            up to date.
          </Callout>
          <p className="text-text-secondary mt-4 mb-4">
            Concretely, as of engine 0.8.1: embedded only, no remote client; in-memory
            only, no persistence; root identity only; results are stringified, not typed;
            and the shipped type stubs do not even match the module (they declare a{' '}
            <Code>ReifyDB</Code> class with <Code>query()</Code>, while the module exposes{' '}
            <Code>Embedded</Code> with <Code>tx()</Code>). Treat the whole package as a
            preview of intent, not a foundation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Using ReifyDB from Python today</h2>
          <p className="text-text-secondary mb-4">
            Until the binding is rewritten, the practical route is to run the server and
            speak the HTTP wire protocol directly - it is plain JSON over POST, so the
            standard <Code>requests</Code> package is all you need. This is not an
            official SDK, just the protocol every client uses underneath. Statements go
            to <Code>/v1/query</Code> (reads) and <Code>/v1/command</Code> (writes) on
            the application port <Code>8090</Code>; <Code>?format=json</Code> asks for
            row-shaped JSON, one list of row dicts per result frame:
          </p>
          <CodeBlock
            language="python"
            code={`import requests

resp = requests.post(
    'http://localhost:8090/v1/query',
    params={'format': 'json'},
    json={'rql': 'FROM app::users FILTER age >= $min', 'params': {
        # Parameters travel as typed pairs; the value is always a string.
        'min': {'type': 'Int4', 'value': '18'},
    }},
)
resp.raise_for_status()

frames = resp.json()          # one entry per result frame
for row in frames[0]:         # each row is a plain dict
    print(row['id'], row['name'])`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Positional parameters (<Code>$1</Code>, <Code>$2</Code>, ...) are a JSON
            array of the same typed pairs, and omitting <Code>params</Code> means none.
            To run as a real identity, POST the login to <Code>/v1/authenticate</Code>{' '}
            and send the returned token as an{' '}
            <Code>Authorization: Bearer &lt;token&gt;</Code> header on every request.
            Admin statements need the loopback-only admin listener on port{' '}
            <Code>9090</Code> - ports and the login flow are covered on{' '}
            <DocLink to="/docs/connect">Connect</DocLink>, and the full request and
            response encodings on{' '}
            <DocLink to="/docs/clients/wire-formats">Wire Formats</DocLink>. HTTP has no
            subscriptions; live data needs the WebSocket protocol.
          </p>
        </section>

        <Callout variant="tip" title="Where next">
          The <DocLink to="/docs/clients/overview">clients overview</DocLink> maps every
          way into the engine and each client's maturity.{' '}
          <DocLink to="/docs/connect">Connect</DocLink> gets a server running to point
          Python at, and <DocLink to="/docs/clients/wire-formats">Wire Formats</DocLink>{' '}
          is the reference if you go further down the protocol route.
        </Callout>
      </div>
    </Layout>
  );
}
