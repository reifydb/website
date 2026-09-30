import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

const features: { name: string; where: string; state: string }[] = [
  {
    name: 'Raft consensus',
    where: 'sub-raft crate, a per-node raft binary, a raft() accessor on the embedded API',
    state: 'In development. The raft binary is excluded from the default build; RQL run on a leader replicates to followers in a local cluster.',
  },
  {
    name: 'CDC-based replication',
    where: 'sub-replication crate: a replica tails the primary\'s change log and applies the deltas',
    state: 'In development. A replica can keep writes the primary loses in a crash; see the durability caveat.',
  },
  {
    name: 'Sources, sinks, and bindings',
    where: 'create source ... from <connector> { ... } to ns::table, create sink, create binding ... with { method, path, ... }',
    state: 'In development. The parser knows the statements (its tests name postgres and kafka connectors); only a handful of golden scripts exist and nothing runs end to end.',
  },
  {
    name: 'Queues',
    where: 'create queue in the parser and planner',
    state: 'In development. No golden scripts; in the playground engine (0.8.1) the statement traps with a bare unreachable instead of an error.',
  },
  {
    name: 'Relationships',
    where: 'create relationship in the parser',
    state: 'In development. No golden scripts; in the playground engine the statement traps with a bare unreachable.',
  },
  {
    name: 'Remote namespaces',
    where: 'create remote namespace plus the remote-proxy crate, which subscribes a local engine to a remote instance',
    state: 'Experimental. A few golden scripts; the statement parses in the playground engine but is not documented.',
  },
  {
    name: 'Extensions: custom operators, procedures, transforms',
    where: 'sdk crate (the contract), extension crate (host loader for native libraries, WASM modules, and in-tree Rust), wasm crate (wasmtime sandbox)',
    state: 'Experimental. Operators are statically linked into the host today, there is no RQL statement to register one, and the ABI is versioned but still changing.',
  },
  {
    name: 'Wallet and OAuth sign-in',
    where: 'auth crate: a Solana provider that auto-provisions an identity from a public key, and a GitHub provider; @reifydb/auth-solana on npm',
    state: 'Experimental.',
  },
  {
    name: 'GraphQL subset',
    where: 'rql-graphql crate compiles a GraphQL subset to RQL',
    state: 'Experimental. Used by one built-in explain procedure; there is no GraphQL endpoint.',
  },
  {
    name: 'gRPC server and OpenTelemetry export',
    where: 'sub-server-grpc and sub-server-otel crates, behind cargo features like the HTTP and WebSocket servers',
    state: 'Experimental. Buildable; no documentation page yet.',
  },
  {
    name: 'Python client',
    where: 'pkg/python, a pyo3 binding built with maturin',
    state: 'Early. Package version 0.0.1.',
  },
  {
    name: 'Deterministic simulation',
    where: 'a test harness inside the transaction crate (bank, counter, and deterministic scenarios)',
    state: 'Internal. It exercises the transaction layer; it is not a client.',
  },
];

export function RoadmapPage() {
  return (
    <Layout
      title="Roadmap & Experimental"
      description="What exists in the ReifyDB source tree but is not stable enough to document yet: experimental features, in-development statements, and engine work in progress."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Roadmap &amp; Experimental</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            ReifyDB is pre-1.0 (the source tree is at 0.9.0) and in active development.
            The documented pages describe what works today. This page lists what exists
            in the source but is not stable enough to get a page of its own, so you can
            tell "not built" from "built, not finished". It is sourced from the crate
            list and the engineering plans in the repository, carries no dates, and
            makes no promises about order or delivery.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">How to read the states</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Documented</strong>: has a page in these docs, is covered by the
                engine's golden test scripts, and runs in the playground. Not listed here.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Experimental</strong>: in the source tree and exercisable, with
                partial tests. Syntax, API, and behavior can change without notice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>In development</strong>: a crate, parser rule, or planner arm
                exists, but the feature cannot be used end to end.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Experimental and in-development features</h2>
          <div className="dialog overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#efedfb]">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Feature</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Where it lives</th>
                  <th className="text-left p-2 sm:p-3 font-bold">State</th>
                </tr>
              </thead>
              <tbody>
                {features.map((item) => (
                  <tr key={item.name} className="border-t border-border-light align-top">
                    <td className="p-2 sm:p-3 font-medium whitespace-nowrap">{item.name}</td>
                    <td className="p-2 sm:p-3 text-text-secondary">{item.where}</td>
                    <td className="p-2 sm:p-3 text-text-secondary">{item.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-text-muted text-sm mt-3">
            Statements in the "In development" rows parse in the playground engine and
            then fail with a clean error or, for <Code>create queue</Code> and{' '}
            <Code>create relationship</Code>, a trap. Do not build on them.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Engine work in progress</h2>
          <p className="text-text-secondary mb-4">
            These are open engineering plans in the repository. They change behavior you
            can observe today, so they are worth knowing about even though none of them
            is a feature you switch on.
          </p>
          <ul className="space-y-3 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Crash recovery.</strong> A commit is written to the change log
                (CDC) synchronously but reaches the row store on a flush interval (5
                seconds by default). Replaying the change log into the row store at boot
                is designed, with an open question about sequences that were consumed by
                the replayed rows, but not built. Today the gap is accepted and pinned by
                tests. See{' '}
                <Link to="/docs/concepts/durability" className="text-primary hover:text-primary-light font-medium transition-colors">Durability &amp; Storage</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Operator state store tiers.</strong> The store that holds view
                operator state (join entries, window buckets, distinct keys) is being split
                into a memory tier and a SQLite tier, so an embedded memory-only profile
                opens no file and the WASM build keeps operator state instead of dropping
                writes. The code has landed; the memory tier's tests have not.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Window sealing.</strong> Windows that admit late rows keep a sealed
                part and an amendable tail. The <Code>first</Code>/<Code>last</Code>{' '}
                aggregates on that path have no independent test oracle yet, a seal lag
                tighter than the lateness bound is untested, and a group that has sealed
                anything never reports empty again.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Columnar operator execution.</strong> Windowed operators process
                one row at a time. A batch-level, column-slice path is planned but not
                started; it waits on a single row-time source (<Code>#time</Code>) for
                every flow.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Interceptor hooks (embedded Rust API).</strong> Of 62 hook chains,
                12 are wired end to end (row-level insert/update/delete on tables and ring
                buffers). 16 can be registered through the builder but never fire, and 22
                fire but cannot be registered. Whether to wire or remove the dead halves
                is undecided.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <strong>Event-time and TTL syntax.</strong> The source tree declares an
                event-time column with <Code>with {'{'} time: event, ts: col {'}'}</Code>{' '}
                and a TTL with <Code>announce</Code>; the playground engine (0.8.1) rejects
                both and uses <Code>mode</Code>. Pages mark such syntax as needing a newer
                engine. See{' '}
                <Link to="/docs/concepts/ttl" className="text-primary hover:text-primary-light font-medium transition-colors">TTL &amp; Row Settings</Link>{' '}
                and{' '}
                <Link to="/docs/rql/transforms/window" className="text-primary hover:text-primary-light font-medium transition-colors">window</Link>.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">How a feature graduates</h2>
          <p className="text-text-secondary mb-4">
            A feature gets a documentation page when it can be exercised end to end in a
            released build, is covered by golden test scripts, and its examples run in the
            playground. Until then it stays on this page, so the docs never describe
            behavior you cannot run. The list above is revised when the source changes,
            not on a schedule.
          </p>
          <p className="text-text-secondary">
            The known sharp edges of what <em>is</em> documented live on{' '}
            <Link to="/docs/resources/caveats" className="text-primary hover:text-primary-light font-medium transition-colors">Caveats &amp; Limitations</Link>.
            Bugs and feature requests go to{' '}
            <a href="https://github.com/reifydb/reifydb/issues" className="text-primary hover:text-primary-light font-medium transition-colors">GitHub Issues</a>.
          </p>
        </section>

        <Callout variant="note" title="Three versions in the wild">
          The source tree and the npm client packages are at 0.9.0; the in-browser engine
          behind the playground and the runnable snippets is <Code>@reifydb/wasm</Code>{' '}
          0.8.1. When a page shows syntax that "needs a newer engine than the playground
          runs", that is the gap. A statement the playground rejects is not proof the
          engine lacks it, and a statement the playground accepts is not proof it is
          stable.
        </Callout>
      </div>
    </Layout>
  );
}
