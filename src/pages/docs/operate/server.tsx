import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { AsciiDiagram, Callout, CodeBlock } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

const buildAndRun = `git clone <your fork or checkout of reifydb>
cd reifydb
cargo build --release --bin reifydb-server
./target/release/reifydb-server`;

const healthCheck = `curl -s localhost:8090/health
{"status":"ok"}`;

const firstQuery = `curl -s -X POST 'localhost:8090/v1/query?format=json' \\
  -H 'content-type: application/json' \\
  -d '{"rql": "map { answer: 42 }"}'`;

const firstAdmin = `curl -s -X POST 'localhost:9090/v1/admin?format=json' \\
  -H 'content-type: application/json' \\
  -d '{"rql": "create namespace app"}'`;

const ownBinary = `use reifydb::{server, SqliteConfig, WithSubsystem};

fn main() {
    let mut db = server::sqlite(SqliteConfig::new("/var/lib/reifydb"))
        .with_http(|http| http.bind_addr("0.0.0.0:8090").admin_bind_addr("127.0.0.1:9090"))
        .with_ws(|ws| ws.bind_addr("0.0.0.0:8091").admin_bind_addr("127.0.0.1:9091"))
        .with_admin(|admin| admin.bind_addr("127.0.0.1:9092"))
        .with_tracing(|tracing| tracing.with_filter("info,reifydb=info"))
        .build()
        .unwrap();

    db.start_and_await_signal().unwrap();
}`;

const rootToken = `db.admin_as_root(
    "create authentication for root { method: token; token: 'change-me' }",
    Params::None,
).unwrap();`;

const systemdUnit = `[Unit]
Description=ReifyDB
After=network-online.target

[Service]
ExecStart=/usr/local/bin/reifydb-server
Restart=on-failure
KillSignal=SIGTERM
TimeoutStopSec=30
LimitNOFILE=1048576
User=reifydb

[Install]
WantedBy=multi-user.target`;

export function RunServerPage() {
  return (
    <Layout
      title="Running the Server"
      description="Build and start reifydb-server, what it listens on, how it logs and shuts down, and when to wrap the builder in a binary of your own."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Running the Server</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB runs as one process: the engine, its storage, and the network listeners
            all live in a single binary. <Code>reifydb-server</Code> is the reference binary
            that ships in the repository. It has no command-line flags and reads no
            configuration file; everything it does is fixed in a dozen lines of Rust, which
            makes it easy to read and easy to replace with a binary of your own when you
            need different settings.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Build and start</h2>
          <p className="text-text-secondary mb-4">
            The server is built from a checkout of the repository with a stable Rust
            toolchain. <Code>cargo install reifydb</Code> installs the command-line client,
            not the server; see{' '}
            <Link to="/docs/guides/installation" className="text-primary hover:text-primary-light font-medium transition-colors">Installation</Link>{' '}
            for the client.
          </p>
          <CodeBlock code={buildAndRun} language="bash" />
          <p className="text-text-secondary mt-4 mb-4">
            On start the process raises its file-descriptor limit, opens the store, boots
            the engine subsystems, binds the listeners, and then blocks until it receives a
            signal. It prints its log to the terminal; there is no daemon mode and no pid
            file, so run it under a supervisor when it should stay up.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">What it listens on</h2>
          <p className="text-text-secondary mb-4">
            The reference binary binds five ports. Two are <strong>application</strong>{' '}
            listeners on all interfaces; three are <strong>admin</strong> listeners bound to
            loopback, so schema changes are only reachable from the host itself (or through
            an SSH tunnel).
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-bold">Port</th>
                  <th className="py-2 pr-4 font-bold">Protocol</th>
                  <th className="py-2 pr-4 font-bold">Bound to</th>
                  <th className="py-2 font-bold">Accepts</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">8090</td><td className="py-2 pr-4">HTTP</td><td className="py-2 pr-4 font-mono">0.0.0.0</td><td className="py-2">queries, commands, procedure bindings, <Code>/health</Code></td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">8091</td><td className="py-2 pr-4">WebSocket</td><td className="py-2 pr-4 font-mono">0.0.0.0</td><td className="py-2">queries, commands, subscriptions</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">9090</td><td className="py-2 pr-4">HTTP admin</td><td className="py-2 pr-4 font-mono">127.0.0.1</td><td className="py-2">everything above, plus <Code>/v1/admin</Code></td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">9091</td><td className="py-2 pr-4">WebSocket admin</td><td className="py-2 pr-4 font-mono">127.0.0.1</td><td className="py-2">everything above, plus <Code>Admin</Code> messages</td></tr>
                <tr><td className="py-2 pr-4 font-mono">9092</td><td className="py-2 pr-4">Admin console</td><td className="py-2 pr-4 font-mono">127.0.0.1</td><td className="py-2">the bundled web UI</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mb-4">
            An application listener refuses admin statements outright: HTTP has no{' '}
            <Code>/v1/admin</Code> route there, and the WebSocket listener answers an{' '}
            <Code>Admin</Code> message with <Code>NOT_FOUND</Code>. Day-to-day traffic
            physically cannot change the schema. A gRPC listener exists as a subsystem but
            the reference binary does not enable it. Endpoint and message details are on the{' '}
            <Link to="/docs/clients/wire-formats" className="text-primary hover:text-primary-light font-medium transition-colors">wire formats</Link>{' '}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">First contact</h2>
          <p className="text-text-secondary mb-4">
            Every HTTP listener answers <Code>GET /health</Code> as soon as it is bound.
            Use it for liveness probes and load-balancer checks:
          </p>
          <CodeBlock code={healthCheck} language="bash" />
          <p className="text-text-secondary mt-4 mb-4">
            Requests carry RQL as JSON. <Code>?format=json</Code> asks for plain JSON rows
            instead of the default column frames:
          </p>
          <CodeBlock code={firstQuery} language="bash" />
          <p className="text-text-secondary mt-4 mb-4">
            Schema changes go to the admin listener on loopback:
          </p>
          <CodeBlock code={firstAdmin} language="bash" />
          <p className="text-text-secondary mt-4 mb-4">
            A request without an <Code>Authorization: Bearer</Code> header runs as the
            anonymous identity. The reference binary registers no credentials at all, so
            every request it serves is anonymous. To reach the server as{' '}
            <Code>root</Code> or as a named identity, a credential has to exist first, and
            the way to create one for root is from a process that embeds the engine (this
            is what the repository's test container does at start-up):
          </p>
          <CodeBlock code={rootToken} language="rust" />
          <p className="text-text-secondary mt-4 mb-4">
            Identities, tokens, and passwords are covered in{' '}
            <Link to="/docs/scripting/access-control" className="text-primary hover:text-primary-light font-medium transition-colors">Access Control</Link>;
            the client-side login flow is on the{' '}
            <Link to="/docs/connect" className="text-primary hover:text-primary-light font-medium transition-colors">Connect</Link>{' '}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Logs</h2>
          <p className="text-text-secondary mb-4">
            The server logs through the tracing subsystem to the console: normal lines go
            to stdout, errors to stderr, with ANSI colour on. The reference binary pins the
            filter to <Code>debug,reifydb=trace</Code>, which is the right setting for
            development and far too much for production; it also means the{' '}
            <Code>RUST_LOG</Code> environment variable is ignored, because an explicit
            filter always wins. Changing the level means building your own binary (below).
            Filter syntax, span events, and trace export are on the{' '}
            <Link to="/docs/operate/observability" className="text-primary hover:text-primary-light font-medium transition-colors">Observability</Link>{' '}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Stopping</h2>
          <p className="text-text-secondary mb-4">
            The process handles <Code>SIGINT</Code>, <Code>SIGTERM</Code>,{' '}
            <Code>SIGQUIT</Code>, and <Code>SIGHUP</Code> the same way: it stops accepting
            work and drains before exiting.
          </p>
          <AsciiDiagram label="graceful shutdown">
{`signal received
  |
  v
mark shutting down, stop accepting requests
  |
  v
drain change-log consumers (views, subscriptions)   up to 10s
persist view frontiers
flush pending writes to the store (blocking)
  |
  v
stop subsystems, runtime, group commit, stores, engine
  |
  v
exit 0`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            Because committed data is persisted asynchronously, the flush step is what
            guarantees that nothing acknowledged to a client is still only in memory when
            the process exits. Give the supervisor enough time for it. A binary built with{' '}
            <Code>with_fast_shutdown()</Code> skips the drain, which is only appropriate
            when the store is in-memory anyway. What survives a crash without this step is
            covered in{' '}
            <Link to="/docs/concepts/durability" className="text-primary hover:text-primary-light font-medium transition-colors">Durability &amp; Storage</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Storage</h2>
          <Callout variant="warning" title="The reference binary stores nothing on disk">
            <Code>reifydb-server</Code> opens the engine with <Code>server::memory()</Code>.
            Everything you write lives in RAM and is gone when the process stops. That is
            deliberate for a development server. For data that must survive a restart, use
            the SQLite backend from a binary of your own, as shown next.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">A binary of your own</h2>
          <p className="text-text-secondary mb-4">
            The server is a builder: <Code>server::memory()</Code> or{' '}
            <Code>server::sqlite(config)</Code> picks the store, and each{' '}
            <Code>with_*</Code> call adds a listener, a subsystem, or a setting. The
            reference binary is that builder plus a signal wait, so a production binary is
            the same shape with different arguments. Add <Code>reifydb</Code> as a
            dependency and write a <Code>main</Code>:
          </p>
          <CodeBlock code={ownBinary} language="rust" />
          <div className="overflow-x-auto mt-4 mb-4">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-bold">Builder call</th>
                  <th className="py-2 font-bold">What it configures</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">with_http / with_ws / with_grpc</td><td className="py-2">a listener: bind addresses, connection limits, timeouts</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">with_admin</td><td className="py-2">the admin console listener</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">with_auth</td><td className="py-2">session and challenge lifetimes, GitHub OAuth settings</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">with_config / with_configs</td><td className="py-2">runtime settings pinned at start-up</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">with_tracing / with_otel / with_tracing_otel</td><td className="py-2">log output and trace export</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">with_migrations</td><td className="py-2">migrations applied at start-up</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">with_routines / with_handlers / with_procedure_dir</td><td className="py-2">Rust routines, handlers, and procedure files compiled into the server</td></tr>
                <tr className="border-b border-border/50"><td className="py-2 pr-4 font-mono">with_flow / with_profiler / with_replication / with_raft</td><td className="py-2">optional subsystems</td></tr>
                <tr><td className="py-2 pr-4 font-mono">with_fast_shutdown</td><td className="py-2">skip the drain on stop</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mb-4">
            The settings behind each of these calls are listed on the{' '}
            <Link to="/docs/operate/configuration" className="text-primary hover:text-primary-light font-medium transition-colors">Configuration</Link>{' '}
            page. Request metrics are always collected; nothing needs enabling for the{' '}
            <Code>system::metrics</Code> tables to fill up.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Supervisors and containers</h2>
          <p className="text-text-secondary mb-4">
            A systemd unit needs nothing special beyond a stop timeout long enough for the
            drain and a generous file-descriptor limit:
          </p>
          <CodeBlock code={systemdUnit} language="ini" />
          <p className="text-text-secondary mt-4 mb-4">
            There is no published container image yet. The repository's{' '}
            <Code>bin/testcontainer/Dockerfile</Code> is the recipe to copy: a{' '}
            <Code>rust:1.92-slim</Code> build stage, a release build of the binary, and a
            runtime stage that runs it as an unprivileged user with the listener ports
            exposed. When you containerise, bind the admin listeners to{' '}
            <Code>0.0.0.0</Code> only if the container network itself is private, and mount
            the SQLite directory as a volume.
          </p>
        </section>
      </div>
    </Layout>
  );
}
