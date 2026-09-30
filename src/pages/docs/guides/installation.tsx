import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout, CodeBlock } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function DocLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">{children}</Link>;
}

const packageRows: Array<[string, string, string]> = [
  ['Embed the engine in a Rust program', 'crate reifydb', '0.9.0'],
  ['Talk to a server from Rust', 'crate reifydb-client', '0.9.0'],
  ['Talk to a server from TypeScript or Node', 'npm @reifydb/client', '0.9.0'],
  ['Run the engine inside a browser', 'npm @reifydb/wasm', '0.9.0'],
  ['Use it from React', 'npm @reifydb/react', '0.9.0'],
  ['Embed the engine in Python', 'PyPI reifydb', '0.0.1'],
  ['Run a standalone server or a shell', 'reifydb-server, reifydb-cli', 'build from source'],
];

const featureRows: Array<[string, string]> = [
  ['sub_flow', 'Views and subscriptions (the flow engine)'],
  ['sub_server_http', 'HTTP listener; pulls in sub_server'],
  ['sub_server_ws', 'WebSocket listener; pulls in sub_server'],
  ['sub_server_grpc', 'gRPC listener; pulls in sub_server'],
  ['sub_server_admin', 'Admin endpoint; pulls in sub_server'],
  ['sub_server_otel', 'OpenTelemetry export; pulls in sub_server'],
  ['sub_tracing', 'Structured tracing subsystem'],
  ['sub_raft', 'Raft consensus'],
  ['sub_replication', 'Replication'],
  ['testing', 'Test harness, chaos and SDK helpers'],
];

const portRows: Array<[string, string, string]> = [
  ['HTTP', '0.0.0.0:8090', '127.0.0.1:9090'],
  ['WebSocket', '0.0.0.0:8091', '127.0.0.1:9091'],
  ['Admin', '-', '127.0.0.1:9092'],
];

const envRows: Array<[string, string, string]> = [
  ['REIFYDB_HOST', '--host', '127.0.0.1'],
  ['REIFYDB_PORT', '--port', '8090'],
  ['REIFYDB_TOKEN', '--token', 'none'],
];

export function InstallationPage() {
  return (
    <Layout
      title="Installation"
      description="How to get ReifyDB: the reifydb and reifydb-client crates, the @reifydb npm packages, the Python package, and building the server and CLI binaries from source."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Installation</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB is a library first and a server second. Most programs embed the engine
            directly and never run a separate process; the server exists for the cases where
            several processes, or a browser, need to share one database. Pick the row that
            matches how your code will talk to it.
          </p>
        </div>

        <Callout variant="warning" title="Pre-release software">
          ReifyDB is at version 0.9.0 and under active development. There are no prebuilt
          binaries, no Docker image, and no <Code>cargo install</Code> target: the{' '}
          <Code>reifydb</Code> crate is a library, and the server and CLI are built from the
          source tree. APIs and RQL syntax still change between minor versions.
        </Callout>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Pick your package</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-bold">You want to</th>
                  <th className="text-left py-2 pr-4 font-bold">Install</th>
                  <th className="text-left py-2 font-bold">Version</th>
                </tr>
              </thead>
              <tbody>
                {packageRows.map(([goal, pkg, version]) => (
                  <tr key={pkg} className="border-b border-border/50">
                    <td className="py-2 pr-4 text-text-secondary">{goal}</td>
                    <td className="py-2 pr-4"><Code>{pkg}</Code></td>
                    <td className="py-2 text-text-secondary">{version}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Rust, embedded</h2>
          <p className="text-text-secondary mb-4">
            Add the <Code>reifydb</Code> crate. The workspace pins Rust 1.92.0 and edition
            2024, so you need a toolchain at least that new.
          </p>
          <CodeBlock language="toml" code={`[dependencies]
reifydb = "0.9"`} />
          <p className="text-text-secondary mt-4 mb-4">
            The default feature set is empty: you get the engine, the embedded API
            (<Code>reifydb::embedded::memory()</Code> and{' '}
            <Code>reifydb::embedded::sqlite(...)</Code>), and nothing else. Everything that
            runs as a subsystem is opt-in:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-bold">Feature</th>
                  <th className="text-left py-2 font-bold">Enables</th>
                </tr>
              </thead>
              <tbody>
                {featureRows.map(([feature, what]) => (
                  <tr key={feature} className="border-b border-border/50">
                    <td className="py-2 pr-4"><Code>{feature}</Code></td>
                    <td className="py-2 text-text-secondary">{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            An embedded program that defines views and also serves them over WebSocket
            would ask for both:
          </p>
          <CodeBlock language="toml" code={`[dependencies]
reifydb = { version = "0.9", features = ["sub_flow", "sub_server_ws"] }`} />
          <p className="text-text-secondary mt-4">
            The first program, and the difference between in-memory and SQLite storage, is on
            the <DocLink to="/docs/clients/rust-embedded">Rust embedded</DocLink> page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Rust, client</h2>
          <p className="text-text-secondary mb-4">
            To talk to a running server without linking the engine, use{' '}
            <Code>reifydb-client</Code>. It ships with no transport enabled; turn on the
            one you connect with (<Code>ws</Code>, <Code>http</Code>, or <Code>grpc</Code>):
          </p>
          <CodeBlock language="toml" code={`[dependencies]
reifydb-client = { version = "0.9", features = ["ws"] }`} />
          <p className="text-text-secondary mt-4">
            See the <DocLink to="/docs/clients/rust">Rust client</DocLink> page for connecting
            and running your first request.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">TypeScript and the browser</h2>
          <p className="text-text-secondary mb-4">
            The npm packages live under the <Code>@reifydb</Code> scope and share one version
            number. <Code>@reifydb/client</Code> connects to a server over WebSocket or HTTP
            from Node or a browser and depends on <Code>@reifydb/core</Code> for the value
            types, so you only need to add the client:
          </p>
          <CodeBlock language="bash" code={`pnpm add @reifydb/client`} />
          <p className="text-text-secondary mt-4 mb-4">
            Two optional packages sit on top of it. <Code>@reifydb/react</Code> wraps the
            client in hooks, and <Code>@reifydb/wasm</Code> is the whole engine compiled to
            WebAssembly, which is what the runnable examples on this site use: an in-memory
            database that lives in the page and needs no server at all.
          </p>
          <CodeBlock language="bash" code={`pnpm add @reifydb/react
pnpm add @reifydb/wasm`} />
          <p className="text-text-secondary mt-4">
            Details are on the <DocLink to="/docs/clients/typescript">TypeScript client</DocLink>{' '}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Python</h2>
          <p className="text-text-secondary mb-4">
            The Python package embeds the engine as a native extension and requires Python
            3.10 or newer. It is the youngest binding and is published at 0.0.1.
          </p>
          <CodeBlock language="bash" code={`pip install reifydb`} />
          <p className="text-text-secondary mt-4">
            The entry point is the <Code>Embedded</Code> class; see the{' '}
            <DocLink to="/docs/clients/python">Python client</DocLink> page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Server from source</h2>
          <p className="text-text-secondary mb-4">
            The server binary is the <Code>server</Code> package in the main repository. The
            tree is self-contained: every dependency is vendored, and the checked-in{' '}
            <Code>.cargo/config.toml</Code> tells Cargo to build offline from that copy, so
            no crates.io access is needed. The same file also assumes three tools you may
            not have: <Code>clang</Code> and <Code>mold</Code> as the linker on x86_64 Linux,
            and <Code>sccache</Code> as a compiler wrapper. Install the first two; skip the
            third by clearing <Code>RUSTC_WRAPPER</Code> for the build.
          </p>
          <CodeBlock language="bash" code={`git clone https://github.com/reifydb/reifydb.git
cd reifydb

sudo apt-get install -y pkg-config libssl-dev clang mold build-essential

RUSTC_WRAPPER="" cargo build --release --package server

./target/release/reifydb-server`} />
          <p className="text-text-secondary mt-4 mb-4">
            The server takes no arguments and reads no config file. It starts an in-memory
            database and binds these addresses:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-bold">Listener</th>
                  <th className="text-left py-2 pr-4 font-bold">Public</th>
                  <th className="text-left py-2 font-bold">Admin</th>
                </tr>
              </thead>
              <tbody>
                {portRows.map(([listener, pub, admin]) => (
                  <tr key={listener} className="border-b border-border/50">
                    <td className="py-2 pr-4 text-text-secondary">{listener}</td>
                    <td className="py-2 pr-4"><Code>{pub}</Code></td>
                    <td className="py-2"><Code>{admin}</Code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mt-4">
            Changing storage, ports, or tracing means editing <Code>bin/server/src/main.rs</Code>{' '}
            or building your own binary on the embedded API; the{' '}
            <DocLink to="/docs/operate/server">Run a server</DocLink> page walks through that.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">The CLI</h2>
          <p className="text-text-secondary mb-4">
            <Code>reifydb-cli</Code> is the <Code>cli</Code> package from the same tree. It
            speaks to a server over WebSocket, either as a REPL or one request at a time, and
            can export a local SQLite database to an RQL script and import one back.
          </p>
          <CodeBlock language="bash" code={`RUSTC_WRAPPER="" cargo build --release --package cli
./target/release/reifydb-cli --version

./target/release/reifydb-cli ws repl --port 8091

./target/release/reifydb-cli ws query --port 8091 -c 'map { hello: 1 + 1 }'

./target/release/reifydb-cli local export --db ./data.sqlite --out ./dump.rql
./target/release/reifydb-cli local import --db ./data.sqlite --file ./dump.rql`} />
          <p className="text-text-secondary mt-4 mb-4">
            The <Code>ws</Code> subcommands come in four flavours matching the transaction
            kinds: <Code>query</Code> (read), <Code>command</Code> (write),{' '}
            <Code>admin</Code> (schema and access control), and <Code>repl</Code>. Connection
            settings can come from flags or the environment:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-bold">Variable</th>
                  <th className="text-left py-2 pr-4 font-bold">Flag</th>
                  <th className="text-left py-2 font-bold">Default</th>
                </tr>
              </thead>
              <tbody>
                {envRows.map(([env, flag, def]) => (
                  <tr key={env} className="border-b border-border/50">
                    <td className="py-2 pr-4"><Code>{env}</Code></td>
                    <td className="py-2 pr-4"><Code>{flag}</Code></td>
                    <td className="py-2 text-text-secondary">{def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout variant="warning" title="The CLI defaults to the wrong port">
            The CLI's default port is 8090, which is where the stock server listens for HTTP,
            not WebSocket. Every <Code>ws</Code> command against an unmodified server needs{' '}
            <Code>--port 8091</Code> or <Code>REIFYDB_PORT=8091</Code>.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Check that it works</h2>
          <p className="text-text-secondary mb-4">
            With the server running in one terminal, ask it for something in another. A
            frame with one row and one column named <Code>hello</Code> means the whole chain
            is up:
          </p>
          <CodeBlock language="bash" code={`REIFYDB_PORT=8091 ./target/release/reifydb-cli ws query -c 'map { hello: 1 + 1 }'`} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Next steps</h2>
          <p className="text-text-secondary">
            The <DocLink to="/docs/quick-start">quick start</DocLink> creates a namespace,
            a table, and a view in a few requests, and the{' '}
            <DocLink to="/docs/clients">client overview</DocLink> compares the bindings side
            by side.
          </p>
        </section>
      </div>
    </Layout>
  );
}
