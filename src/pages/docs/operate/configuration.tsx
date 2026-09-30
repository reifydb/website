import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { AsciiDiagram, Callout, CodeBlock, RqlCodeBlock } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function Row({ cells }: { cells: React.ReactNode[] }) {
  return (
    <tr className="border-b border-border/50">
      {cells.map((cell, i) => (
        <td key={i} className={i === 0 ? 'py-2 pr-4 font-mono whitespace-nowrap' : 'py-2 pr-4'}>{cell}</td>
      ))}
    </tr>
  );
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
          {rows.map((cells, i) => <Row key={i} cells={cells} />)}
        </tbody>
      </table>
    </div>
  );
}

const storeChoice = `use reifydb::{server, SqliteConfig};

let memory = server::memory();
let durable = server::sqlite(SqliteConfig::new("/var/lib/reifydb"));
let strict = server::sqlite(SqliteConfig::safe("/var/lib/reifydb"));`;

const storeTuned = `use reifydb::sqlite::{JournalMode, SynchronousMode};

let config = SqliteConfig::new("/var/lib/reifydb")
    .journal_mode(JournalMode::Wal)
    .synchronous_mode(SynchronousMode::Full)
    .read_pool_size(8);`;

const listeners = `server::sqlite(config)
    .with_http(|http| {
        http.bind_addr("0.0.0.0:8090")
            .admin_bind_addr("127.0.0.1:9090")
            .max_connections(2_000)
            .query_timeout(Duration::from_secs(10))
    })
    .with_ws(|ws| ws.bind_addr("0.0.0.0:8091").admin_bind_addr("127.0.0.1:9091"))
    .with_admin(|admin| admin.bind_addr("127.0.0.1:9092").with_auth("console-token".to_string()))
    .with_auth(|auth| auth.session_ttl(Duration::from_secs(8 * 3600)))`;

const pinned = `use reifydb::{ConfigKey, Value};

server::sqlite(config)
    .with_config(ConfigKey::QueryMemoryLimit, Value::Uint8(4 * 1024 * 1024 * 1024))
    .with_config(ConfigKey::MultiFlushInterval, Value::duration_seconds(1))
    .with_config(ConfigKey::ThreadsCompute, Value::Uint2(8))`;

export function ConfigurationPage() {
  return (
    <Layout
      title="Configuration"
      description="Where ReifyDB's settings live: the storage backend and listeners chosen in the builder, and the runtime keys stored in the catalog and changed with system::config::set."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Configuration</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB has no configuration file and no command-line flags. Settings live in
            two places. <strong>Build-time choices</strong> - which store to open, which
            listeners to bind, how to log - are arguments to the server builder in your
            binary. <strong>Runtime settings</strong> - batch sizes, intervals, memory
            limits, thread counts - are rows in the catalog: read them with{' '}
            <Code>from system::configs</Code>, change them with{' '}
            <Code>system::config::set</Code>, and they persist with the data.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Storage backend</h2>
          <p className="text-text-secondary mb-4">
            The first builder call picks the store. <Code>server::memory()</Code> keeps
            everything in RAM and forgets it on exit. <Code>server::sqlite(config)</Code>{' '}
            persists to a directory of SQLite files, one per store (data, operator state,
            change log), and is what a server that must survive a restart should use.
          </p>
          <CodeBlock code={storeChoice} language="rust" />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>SqliteConfig</Code> has two presets. <Code>new</Code> is tuned for
            throughput; <Code>safe</Code> trades some of it for the strictest durability
            SQLite offers. Both use write-ahead logging.
          </p>
          <Table
            headers={['Knob', 'new(path)', 'safe(path)', 'Meaning']}
            rows={[
              ['journal_mode', 'Wal', 'Wal', 'SQLite journal; Wal lets readers and the writer overlap'],
              ['synchronous_mode', 'Normal', 'Full', 'how often SQLite fsyncs; Full syncs on every commit'],
              ['temp_store', 'Memory', 'File', 'where SQLite keeps temporary data'],
              ['cache_size', '2000 KiB', '2000 KiB', 'page cache per connection'],
              ['wal_autocheckpoint', '1000 pages', '1000 pages', 'WAL size that triggers a checkpoint'],
              ['page_size', '4096', '4096', 'SQLite page size, fixed once the file exists'],
              ['mmap_size', '64 MiB', '0', 'memory-mapped read window'],
              ['prepared_statement_cache_capacity', '1024', '128', 'cached prepared statements per connection'],
              ['read_pool_size', '4', '4', 'read connections per store'],
            ]}
          />
          <p className="text-text-secondary mb-4">
            Every knob is a builder method on the config, so a preset is only a starting
            point:
          </p>
          <CodeBlock code={storeTuned} language="rust" />
          <p className="text-text-secondary mt-4 mb-4">
            What each SQLite setting means for crash safety, and how the in-memory commit
            buffer in front of SQLite fits in, is explained in{' '}
            <Link to="/docs/concepts/durability" className="text-primary hover:text-primary-light font-medium transition-colors">Durability &amp; Storage</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Listeners and authentication</h2>
          <p className="text-text-secondary mb-4">
            Each listener is added with a closure over its configurator. A listener with no{' '}
            <Code>bind_addr</Code> is not started; setting only{' '}
            <Code>admin_bind_addr</Code> gives you an admin-only endpoint.
          </p>
          <CodeBlock code={listeners} language="rust" />
          <Table
            headers={['Setting', 'HTTP', 'WebSocket', 'gRPC', 'Admin console']}
            rows={[
              ['bind_addr', 'none', 'none', 'none', '127.0.0.1:9090'],
              ['admin_bind_addr', 'none', 'none', 'none', '-'],
              ['max_connections', '10 000', '10 000', '10 000', '1 000'],
              ['query_timeout', '30s', '30s', '30s', '-'],
              ['request_timeout', '60s', '-', '60s', '30s'],
              ['max_frame_size', '-', '16 MiB', '-', '-'],
              ['poll_batch_size', '-', '100', '100', '-'],
              ['with_auth(token)', '-', '-', '-', 'off'],
            ]}
          />
          <p className="text-text-secondary mb-4">
            Subscriptions over WebSocket and gRPC share three limits set on the server
            state: at most 10 000 rows are sent when a subscription first hydrates, updates
            are throttled to one batch per 50 ms, and no lingering is applied by default.
            The reference binary leaves the admin console open on loopback; give it a token
            with <Code>with_auth</Code> if it is reachable from anywhere else.
          </p>
          <p className="text-text-secondary mb-4">
            <Code>with_auth</Code> on the server builder configures the login service:
            sessions expire after 24 hours (<Code>session_ttl</Code>, or{' '}
            <Code>no_session_ttl()</Code> for sessions that never expire), challenge-based
            logins such as wallet signatures must complete within 60 seconds
            (<Code>challenge_ttl</Code>), and <Code>github(config)</Code> supplies the OAuth
            client for the <Code>github</Code> method. Which identities exist and what they
            may do is data, not configuration; see{' '}
            <Link to="/docs/scripting/access-control" className="text-primary hover:text-primary-light font-medium transition-colors">Access Control</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Runtime settings</h2>
          <p className="text-text-secondary mb-4">
            Runtime settings are catalog rows with a default, a current value, and a flag
            that says whether a change needs a restart. Read them like any table:
          </p>
          <RqlCodeBlock code={`from system::configs filter { key == "ORACLE_WINDOW_SIZE" }`} />
          <AsciiDiagram label="result">
{`key                | value | default_value | description                                           | requires_restart
-------------------+-------+---------------+-------------------------------------------------------+-----------------
ORACLE_WINDOW_SIZE | 500   | 500           | Number of transactions per conflict-detection window. | false`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            Change one with <Code>system::config::set</Code>. The call is root-only, the
            value is validated against the key's type and range, and the new value is
            persisted, so it is still in force after a restart:
          </p>
          <RqlCodeBlock code={`call system::config::set("ORACLE_WINDOW_SIZE", 1000)`} />
          <AsciiDiagram label="result">
{`key                | value
-------------------+------
ORACLE_WINDOW_SIZE | 1000`}
          </AsciiDiagram>
          <p className="text-text-secondary mt-4 mb-4">
            A key with <Code>requires_restart = false</Code> takes effect on the next
            request. A key with <Code>requires_restart = true</Code> is read once at boot -
            thread counts, buffer sizes, flush intervals - so the new value waits for the
            next start. To pin a setting from code, use <Code>with_config</Code> on the
            builder. It overwrites the persisted value on every start, which is the right
            tool for settings that belong to the deployment rather than to the data:
          </p>
          <CodeBlock code={pinned} language="rust" />
          <Callout variant="note" title="Precedence">
            <Code>with_config</Code> wins on every start; <Code>system::config::set</Code>{' '}
            wins until the next start that pins the same key. Do not manage one key both
            ways.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">The keys that matter most</h2>
          <p className="text-text-secondary mb-4">
            The full list, with descriptions, is <Code>from system::configs</Code>. These
            are the ones operators reach for. Sizes are bytes unless a unit is shown; the
            Rust name is the <Code>ConfigKey</Code> variant for <Code>with_config</Code>.
          </p>
          <Table
            headers={['Key', 'Default', 'Restart', 'What it controls']}
            rows={[
              ['QUERY_MEMORY_LIMIT', '1 GiB', 'no', 'memory one query may use before it fails with QUERY_006'],
              ['QUERY_ROW_BATCH_SIZE', '128', 'no', 'rows per batch in the query pipeline'],
              ['ORACLE_WINDOW_SIZE', '500', 'no', 'transactions per conflict-detection window'],
              ['COMMIT_GROUP_LINGER', 'none', 'yes', 'wait to batch commits together; none disables grouping'],
              ['COMMIT_GROUP_MAX_ENTRIES', '256', 'yes', 'commits per group when grouping is on'],
              ['MULTI_FLUSH_INTERVAL', '5s', 'yes', 'how often the commit buffer is drained into SQLite'],
              ['MULTI_WAL_AUTOCHECKPOINT', '10 000', 'yes', 'WAL pages between checkpoints of the data store'],
              ['CDC_WAL_AUTOCHECKPOINT', '10 000', 'yes', 'same for the change log'],
              ['CDC_TTL_DURATION', 'none', 'no', 'how long change-log entries are kept; none keeps them forever'],
              ['CDC_TTL_SCAN_INTERVAL', '30s', 'yes', 'how often expired change-log entries are collected'],
              ['RETENTION_EVICT_INTERVAL', '60s', 'yes', 'how often the row-TTL collector runs'],
              ['HISTORICAL_GC_INTERVAL', '30s', 'no', 'how often superseded row versions are reclaimed'],
              ['TOMBSTONE_REAP_INTERVAL', '1s', 'no', 'how often deleted rows are physically removed'],
              ['FLOW_TICK', '1s', 'no', 'how often deferred views pull new changes'],
              ['FLOW_BACKLOG_MEMORY_LIMIT', '64 MiB', 'yes', 'memory for changes waiting on deferred views'],
              ['CDC_CONSUME_WAIT_TIMEOUT', '30s', 'no', 'how long a consumer waits for the change log before giving up'],
              ['THREADS_COMPUTE', '2', 'yes', 'query execution threads'],
              ['THREADS_FLOW', '2', 'yes', 'deferred-view maintenance threads'],
              ['THREADS_TASK / THREADS_COORDINATION / THREADS_ASYNC', '2 / 2 / 1', 'yes', 'background, commit coordination, and async I/O threads'],
              ['SUBSCRIPTION_WORKER_THREADS', '0 (auto)', 'yes', 'threads serving subscriptions'],
              ['METRICS_SAMPLE_INTERVAL', '10s', 'yes', 'how often runtime metrics are sampled; always on'],
              ['METRICS_SNAPSHOT_INTERVAL', 'none', 'yes', 'how often samples are appended to the snapshot series'],
            ]}
          />
          <p className="text-text-secondary mb-4">
            Thread counts must be at least 1. <Code>METRICS_SNAPSHOT_INTERVAL</Code> must be
            at least the sample interval. Buffer and read-window sizes for each store
            (<Code>MULTI_READ_BUFFER_*</Code>, <Code>OPERATOR_*_BUFFER_BYTES</Code>,{' '}
            <Code>CDC_*_BUFFER_BYTES</Code>) all require a restart and are best left at
            their defaults until the{' '}
            <Link to="/docs/operate/observability" className="text-primary hover:text-primary-light font-medium transition-colors">metrics</Link>{' '}
            show a reason to move them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Environment</h2>
          <p className="text-text-secondary mb-4">
            The server itself reads one environment variable: <Code>RUST_LOG</Code>, and
            only when the binary sets no explicit log filter. The command-line client reads{' '}
            <Code>REIFYDB_HOST</Code>, <Code>REIFYDB_PORT</Code>, and{' '}
            <Code>REIFYDB_TOKEN</Code>. Everything else is in the builder or in the catalog.
          </p>
        </section>
      </div>
    </Layout>
  );
}
