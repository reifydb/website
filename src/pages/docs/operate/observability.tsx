import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { AsciiDiagram, Callout, CodeBlock, RqlCodeBlock } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function Table({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-border">
            {headers.map((h) => <th key={h} className="py-2 pr-4 font-bold">{h}</th>)}
          </tr>
        </thead>
        <tbody className="text-text-secondary">
          {rows.map((cells, i) => (
            <tr key={i} className="border-b border-border/50">
              {cells.map((cell, j) => (
                <td key={j} className={j === 0 ? 'py-2 pr-4 font-mono whitespace-nowrap' : 'py-2 pr-4'}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const logging = `server::sqlite(config)
    .with_tracing(|tracing| {
        tracing
            .with_console(|console| console.color(false).stderr_for_errors(true))
            .with_filter("info,reifydb=debug,reifydb_flow=trace")
            .with_span_events(false)
    })`;

const otel = `server::sqlite(config)
    .with_tracing_otel(
        |otel| {
            otel.service_name("reifydb-prod")
                .endpoint("http://tempo:4317")
                .sample_ratio(0.1)
        },
        |tracing| tracing.with_filter("info,reifydb=debug"),
    )`;

const localStack = `cd infra/tracing
docker compose up -d
# Tempo receives OTLP on 4317 (gRPC) and 4318 (HTTP)
# Grafana is on http://localhost:3000 with anonymous admin access`;

export function ObservabilityPage() {
  return (
    <Layout
      title="Observability"
      description="Logs, traces, and the metrics ReifyDB keeps about itself: console log filters, OpenTelemetry trace export, and the system::metrics tables you can query like any other data."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Observability</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB gives you three views into a running server. <strong>Logs</strong> go
            to the console through a filterable tracing subscriber.{' '}
            <strong>Traces</strong> can be exported over OpenTelemetry to any OTLP
            collector. <strong>Metrics</strong> are not exported at all - the engine
            samples itself and writes the numbers into tables under{' '}
            <Code>system::metrics</Code>, so the tool for watching a ReifyDB server is
            RQL. There is no Prometheus endpoint yet; scrape the tables instead.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Is it up?</h2>
          <p className="text-text-secondary mb-4">
            Every HTTP listener answers <Code>GET /health</Code> with{' '}
            <Code>{'{"status":"ok"}'}</Code> once it is bound. It reports that the listener
            is serving, nothing more; for "is the engine keeping up" read the watermarks
            below. The admin console on the loopback port (<Code>127.0.0.1:9092</Code> in
            the reference binary) serves a small web UI over the same catalog.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Logs</h2>
          <p className="text-text-secondary mb-4">
            Logging is the tracing subsystem, added to the builder with{' '}
            <Code>with_tracing</Code>. By default it prints to the console with colour,
            sends error-level lines to stderr and everything else to stdout, and uses the
            filter from the <Code>RUST_LOG</Code> environment variable, falling back to{' '}
            <Code>info</Code> when the variable is unset or invalid. Setting a filter in
            code replaces the environment variable entirely.
          </p>
          <CodeBlock code={logging} language="rust" />
          <p className="text-text-secondary mt-4 mb-4">
            The filter uses the standard directive syntax: a default level, then{' '}
            <Code>target=level</Code> overrides, where targets are crate names such as{' '}
            <Code>reifydb</Code>, <Code>reifydb_flow</Code>, or{' '}
            <Code>reifydb_sub_server_http</Code>. <Code>with_span_events(true)</Code> adds a
            line when each instrumented span opens and closes, which is useful when
            chasing a slow request and far too loud otherwise. Turn colour off when the
            output goes to a log shipper. <Code>without_console()</Code> drops the console
            layer so you can install a layer of your own with <Code>with_layer</Code>.
          </p>
          <Callout variant="note" title="The reference binary is a development server">
            <Code>reifydb-server</Code> hard-codes <Code>debug,reifydb=trace</Code>. That is
            useful on a laptop and will fill a disk in production. Any binary that runs
            unattended should set its own filter as above.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Traces</h2>
          <p className="text-text-secondary mb-4">
            Request handlers and engine stages are instrumented with tracing spans. To ship
            them, add the OpenTelemetry subsystem. Use <Code>with_tracing_otel</Code> rather
            than separate <Code>with_otel</Code> and <Code>with_tracing</Code> calls: it
            makes sure the exporter exists before the log subscriber is installed, so the
            first spans are not lost.
          </p>
          <CodeBlock code={otel} language="rust" />
          <Table
            headers={['Setting', 'Default', 'Meaning']}
            rows={[
              ['service_name', 'reifydb', 'service.name resource attribute'],
              ['service_version', 'crate version', 'service.version resource attribute'],
              ['endpoint', 'http://localhost:4317', 'OTLP gRPC collector'],
              ['sample_ratio', '1.0', 'share of traces exported, clamped to 0..1'],
              ['max_export_batch_size', '512', 'spans per export request'],
              ['scheduled_delay', '5s', 'time between exports'],
              ['max_queue_size', '2048', 'spans buffered before dropping'],
              ['export_timeout', '30s', 'per-export deadline'],
            ]}
          />
          <p className="text-text-secondary mb-4">
            The exporter sends traces only; there is no OTLP metrics or logs pipeline. For
            a local collector the repository ships a Grafana Tempo stack:
          </p>
          <CodeBlock code={localStack} language="bash" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Metrics are tables</h2>
          <p className="text-text-secondary mb-4">
            The metrics subsystem samples the engine every 10 seconds
            (<Code>METRICS_SAMPLE_INTERVAL</Code>) and keeps the latest sample in a{' '}
            <Code>current</Code> virtual table per domain. Request-level counters are
            collected on every request by an interceptor that is always installed. Nothing
            has to be enabled, and the numbers are read with the same client, identity,
            and RQL as everything else.
          </p>
          <Table
            headers={['Table', 'What is in it']}
            rows={[
              ['system::metrics::runtime::memory::current', 'allocator, SQLite, dictionary, and deferred-view operator memory, one row per scope and metric'],
              ['system::metrics::runtime::watermarks::current', 'commit, query, and change-log watermarks and the lag between them'],
              ['system::metrics::runtime::operators::current', 'window state entries and bytes per deferred-view operator node'],
              ['system::metrics::storage::current', 'live and superseded bytes and row counts per table, view, or series, per storage tier'],
              ['system::metrics::cdc::current', 'change-log bytes and entry counts per source'],
              ['system::metrics::store::*', 'commit, read, and persistent-tier counters for the data, operator, single, and change-log stores'],
              ['system::metrics::proc::process::*', 'the process: memory, I/O, scheduling, from /proc'],
              ['system::metrics::proc::cgroup::*', 'the container: CPU, memory, I/O, and pressure from cgroups'],
              ['system::metrics::epoch, ::lifecycle, ::instruments', 'epoch bookkeeping, start/stop events, and internal instruments'],
              ['system::metrics::flow::state', 'per-view processing state'],
              ['system::metrics::request_history', 'ring buffer of the last 10 000 requests: operation, fingerprint, durations, success, statement count, normalised RQL'],
              ['system::metrics::statement_stats', 'ring buffer of the last 5 000 per-statement aggregates: calls, mean, max, min, rows, errors'],
              ['system::metrics::profiler::spans', 'span timings when the profiler subsystem is enabled with with_profiler'],
            ]}
          />
          <p className="text-text-secondary mb-4">
            Runtime tables use one long shape, <Code>ts | scope | metric | value | unit | kind</Code>,
            so a query names the scope and metric it wants:
          </p>
          <RqlCodeBlock code={`from system::metrics::runtime::memory::current
filter { scope == "allocator" }
map { metric, value, unit }`} />
          <p className="text-text-secondary mt-4 mb-4">
            A few metrics are worth an alert. In the watermarks table,{' '}
            <Code>watermark_lag</Code> (scope <Code>mvcc</Code>) and <Code>cdc_lag</Code>{' '}
            (scope <Code>cdc</Code>) say how far readers and change-log consumers trail the
            newest commit, and a rising <Code>oracle_window_count</Code> means commits are
            piling up in conflict detection. In the memory table,{' '}
            <Code>heap_live_bytes</Code> (scope <Code>allocator</Code>) and{' '}
            <Code>resident_bytes</Code> (scope <Code>flow_operators</Code>) show where memory
            goes. Storage growth per object comes from the storage table:
          </p>
          <RqlCodeBlock code={`from system::metrics::storage::current
filter { tier == "persistent" }
sort { total_bytes: desc }
take 10`} />
          <p className="text-text-secondary mt-4 mb-4">
            The slowest statements of the last few minutes are one query away, without any
            external tooling:
          </p>
          <RqlCodeBlock code={`from system::metrics::statement_stats
sort { max_duration: desc }
take 5
map { normalized_rql, calls, mean_duration, max_duration, errors }`} />
          <Callout variant="info" title="The playground predates some of these tables">
            The in-browser engine on this site is older than the server build. It has{' '}
            <Code>request_history</Code>, <Code>statement_stats</Code>, and{' '}
            <Code>system::configs</Code>, but not the <Code>current</Code> tables, which is
            why the queries above are shown rather than runnable. On a server,{' '}
            <Code>from system::virtual_tables</Code> lists every table that exists.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">History and retention</h2>
          <p className="text-text-secondary mb-4">
            <Code>current</Code> holds only the latest sample. To keep history, set{' '}
            <Code>METRICS_SNAPSHOT_INTERVAL</Code> (a restart-time key, at least the sample
            interval); each domain then appends every snapshot to a{' '}
            <Code>snapshots</Code>{' '}
            <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>{' '}
            keyed by timestamp, for example{' '}
            <Code>system::metrics::runtime::memory::snapshots</Code>. Those series carry a
            row TTL of 7 days, profiler spans 1 hour, so the engine's own telemetry is
            bounded by the same{' '}
            <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL</Link>{' '}
            mechanism as your data. A dashboard is then a{' '}
            <Link to="/docs/concepts/data-model/subscriptions" className="text-primary hover:text-primary-light font-medium transition-colors">subscription</Link>{' '}
            on a snapshot series, or a deferred view that windows it.
          </p>
          <AsciiDiagram label="signals and where they land">
{`engine ---- tracing spans/events ----> console (stdout/stderr)
        \\                                ^ filter: RUST_LOG or with_filter
         \\--- OTLP gRPC (traces only) --> collector (Tempo, Jaeger, ...)

engine ---- sampler every 10s --------> system::metrics::*::current
        \\                                 \\--> ::snapshots series (if METRICS_SNAPSHOT_INTERVAL)
         \\--- request interceptor ------> request_history, statement_stats`}
          </AsciiDiagram>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Catalog views for operators</h2>
          <p className="text-text-secondary mb-4">
            Beyond metrics, the catalog exposes the engine's moving parts as virtual
            tables: <Code>system::flow_watermarks</Code> and{' '}
            <Code>system::subscription_watermarks</Code> for how far each deferred view and
            subscription has consumed, <Code>system::cdc_consumers</Code> for who is
            reading the change log, <Code>system::versions</Code> for the commit version,
            and <Code>system::configs</Code> for every runtime setting and whether it is at
            its default. See{' '}
            <Link to="/docs/operate/configuration" className="text-primary hover:text-primary-light font-medium transition-colors">Configuration</Link>{' '}
            for the settings that shape the numbers on this page.
          </p>
        </section>
      </div>
    </Layout>
  );
}
