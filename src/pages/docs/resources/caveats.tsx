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

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-primary font-mono">--</span>
      <span>{children}</span>
    </li>
  );
}

export function CaveatsPage() {
  return (
    <Layout
      title="Caveats & Limitations"
      description="Known sharp edges of ReifyDB, stated plainly and grouped by area: durability, transactions, query semantics, scripting, schema, types, streaming, and the playground."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Caveats &amp; Limitations</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB is in development and not yet recommended for production. This page
            is the consolidated list of things that will surprise you: deliberate
            tradeoffs, gaps that are known and accepted for now, and behavior that
            differs from what the syntax suggests. Each line is one sentence and links to
            the page that explains it. Every line was verified against the playground
            engine (<Code>@reifydb/wasm</Code> 0.8.1) or read from the engine source at
            0.9.0.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Status</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item>Syntax, APIs, and guarantees can change between releases, and breaking changes are not yet gated by a deprecation cycle.</Item>
            <Item>The source tree is at 0.9.0 while the in-browser engine is 0.8.1, so some syntax shown in these docs is marked as needing a newer engine than the playground runs; see <L to="/docs/resources/roadmap">Roadmap &amp; Experimental</L>.</Item>
            <Item>Code contributions are not yet accepted; bugs go to <a href="https://github.com/reifydb/reifydb/issues" className="text-primary hover:text-primary-light font-medium transition-colors">GitHub Issues</a>.</Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Durability</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item>Commits reach disk on a background flush (5 seconds by default), so a hard crash loses up to roughly one flush interval of committed writes; a clean stop loses nothing. See <L to="/docs/concepts/durability">Durability &amp; Storage</L>.</Item>
            <Item>The change log is written synchronously at commit while the row store is not, so after a crash a deferred view, a replica, or a subscriber may have seen writes the tables no longer contain; replaying the log at boot is designed but not built.</Item>
            <Item>There is no write-ahead log for user commits; the memory tier is the record of recent commits and the flush is the only path to disk, and <Code>sqlite_without_buffer</Code> trades write latency for durability at commit.</Item>
            <Item>TTL expiry in <Code>drop</Code> mode removes rows silently, with no change-log event, so views and subscriptions over a TTL store are not notified, and <Code>mode: delete</Code> is accepted but never collected. See <L to="/docs/concepts/ttl">TTL &amp; Row Settings</L>.</Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Transactions and concurrency</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item>One request is one transaction, so if the last statement in a request fails, every earlier statement in it rolls back, including <Code>create</Code> and <Code>drop</Code>. See <L to="/docs/concepts/transactions">Transactions</L>.</Item>
            <Item>Write conflicts are retried up to 10 times with jittered backoff, then surface as <Code>TXN_001</Code>.</Item>
            <Item>Reading a view after writing one of its sources in the same request fails with <Code>TXN_015</Code> and rolls the request back; a transactional view is current from the next request, a deferred view shortly after.</Item>
            <Item>The transactions that maintain views do not track their read sets, which is safe only because the scheduler never runs two flows over overlapping keys in parallel; it is not a general-purpose concurrency guarantee.</Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Query semantics</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item>A bare <Code>from table</Code> returns rows newest-first, while a bare scan of a ring buffer returns them oldest-first. See <L to="/docs/rql/transforms/from">from</L>.</Item>
            <Item><Code>sort {'{'} col {'}'}</Code> with no direction sorts descending; always write <Code>:asc</Code> or <Code>:desc</Code>. See <L to="/docs/rql/transforms/sort">sort</L>.</Item>
            <Item><Code>distinct {'{'}{'}'}</Code> and a bare <Code>distinct</Code> dedupe on zero columns, so every row survives, and <Code>distinct</Code> keeps whichever row its input delivers first. See <L to="/docs/rql/transforms/distinct">distinct</L>.</Item>
            <Item><Code>extend</Code> rejects a column name that already exists (<Code>EXTEND_002</Code>); use <Code>map</Code> to replace a column. See <L to="/docs/rql/transforms/extend">extend</L>.</Item>
            <Item>Joined columns flatten to <Code>alias_column</Code> (an <Code>as d</Code> side yields <Code>d_name</Code>), and dot access only works inside the <Code>using</Code> clause. See <L to="/docs/rql/transforms/join">join</L>.</Item>
            <Item>A join key on an inline record literal is a generic <Code>Int</Code>, not <Code>int4</Code>, so joining it against a real column silently matches nothing; cast it or use a table.</Item>
            <Item>A natural join matches on every shared column name, including coincidental ones like <Code>id</Code>.</Item>
            <Item><Code>x == none</Code> evaluates to <Code>none</Code>, never <Code>true</Code>; test with <Code>is::none(x)</Code>. See <L to="/docs/concepts/none">Working with none</L>.</Item>
            <Item><Code>/</Code> truncates when both operands are integers (<Code>7 / 2</Code> is <Code>3</Code>), and <Code>//</Code>, <Code>??</Code>, <Code>&amp;&amp;</Code>, <Code>||</Code>, <Code>~=</Code>, and <Code>-&gt;</Code> do not exist; use <Code>and</Code>, <Code>or</Code>, <Code>not</Code>. See <L to="/docs/rql/expressions/operators">Operators</L>.</Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Scripting</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item>Variables must be <Code>$</Code>-prefixed (<Code>let $x = 1</Code>); <Code>let x</Code> is a parse error. See <L to="/docs/rql/variables">Variables</L>.</Item>
            <Item>An <Code>if</Code> branch used as a statement runs only its first statement and silently drops the rest, and a pipeline inside a branch ignores its <Code>filter</Code>; keep each branch to one statement. See <L to="/docs/rql/control-flow/conditionals">Conditionals</L>.</Item>
            <Item>In the playground engine a <Code>for</Code> loop must iterate a <Code>$</Code>-bound frame; the inline <Code>for $row in {'{'} from ... {'}'}</Code> form needs a newer engine. See <L to="/docs/rql/control-flow/for">For Loops</L>.</Item>
            <Item>A searched <Code>match</Code> uses <Code>{'=>'}</Code> arms with an <Code>else</Code> arm; there is no <Code>when</Code>/<Code>then</Code>. See <L to="/docs/rql/control-flow/match">Match</L>.</Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Schema and DDL</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item><Code>drop namespace</Code> is implicitly recursive, and <Code>cascade</Code> and <Code>restrict</Code> both parse but <Code>restrict</Code> is not enforced. See <L to="/docs/scripting/schema/drop">Drop &amp; Cleanup</L>.</Item>
            <Item><Code>if exists</Code> guards the object, not its namespace: <Code>drop table if exists gone::t</Code> still fails with <Code>CA_002</Code>.</Item>
            <Item><Code>if not exists</Code> on an existing object returns the existing id with <Code>created: false</Code> without checking that the new declaration matches the old one.</Item>
            <Item>Row settings (<Code>ttl</Code>, <Code>persistent</Code>) are fixed at creation, and <Code>persistent: false</Code> requires a TTL.</Item>
            <Item>An insert field that matches no column is silently ignored. See <L to="/docs/scripting/dml/insert">insert</L>.</Item>
            <Item><Code>update</Code> and <Code>delete</Code> without <Code>filter</Code> fail (<Code>UPDATE_003</Code>, <Code>DELETE_002</Code>); <Code>filter {'{'} true {'}'}</Code> is the explicit all-rows form.</Item>
            <Item>The <Code>create enum</Code> confirmation column is headed <Code>sumtype</Code> while <Code>drop enum</Code> says <Code>enum</Code>, and <Code>drop</Code> confirmations carry no <Code>id</Code> column.</Item>
            <Item>A misspelled enum variant path in an insert, a variant literal in <Code>filter</Code> or <Code>map</Code>, and a cast from text to an enum type trap the engine instead of returning an error. See <L to="/docs/scripting/schema/enums">Enums</L>.</Item>
            <Item>A dictionary with a non-<Code>uint</Code> id type is accepted at creation and traps on the first insert. See <L to="/docs/scripting/schema/dictionaries">Dictionaries</L>.</Item>
            <Item>Series tags do not round-trip visibly (the tag column scans as <Code>0</Code>) and <Code>precision: second</Code> truncates sub-second keys on write. See <L to="/docs/scripting/storage/series">Series</L>.</Item>
            <Item><Code>create queue</Code> and <Code>create relationship</Code> parse and then trap with a bare <Code>unreachable</Code>; neither is usable yet. See <L to="/docs/resources/roadmap">Roadmap &amp; Experimental</L>.</Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Types and functions</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item>A bare numeric literal is a generic <Code>Int</Code> distinct from every sized type, which is what makes the join-key case above silent; <Code>cast</Code> pins it. See <L to="/docs/rql/expressions/literals">Literals</L>.</Item>
            <Item>A <Code>float4</Code> column reads cleanly but shows float32 noise once it goes through arithmetic or a cast (<Code>19.99</Code> becomes <Code>19.9899997711182</Code>). See <L to="/docs/concepts/data-types">Data Types</L>.</Item>
            <Item><Code>date::now()</Code>, <Code>datetime::now()</Code>, and <Code>time::now()</Code> trap when the frame has two or more rows because the result is not broadcast; use them on single-row frames.</Item>
            <Item><Code>blob::b58</Code>, <Code>b64</Code>, <Code>b64url</Code>, <Code>hex</Code>, and <Code>utf8</Code> decode text into a blob only; feeding a blob back in fails with <Code>FUNCTION_004</Code>. See <L to="/docs/functions/blob">blob</L>.</Item>
            <Item><Code>is::type(x, int4)</Code> takes a bare type keyword; a string argument fails with <Code>FUNCTION_004</Code>. See <L to="/docs/functions/is/type">is::type</L>.</Item>
            <Item>Sorting an <Code>Any</Code>-typed column (such as <Code>system::identity_attribute_values.value</Code>) hits an unreachable branch in the engine rather than an error.</Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Views, windows, and subscriptions</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item>Deferred views are eventually consistent: they update on a tick after commit, not inside it. See <L to="/docs/scripting/views/deferred">Deferred Views</L>.</Item>
            <Item>A view over a TTL store keeps rows it already derived after the source rows expire, because expiry emits nothing.</Item>
            <Item>Subscriptions are ephemeral: a disconnected consumer's subscription is gone and nothing about it survives a restart. See <L to="/docs/concepts/data-model/subscriptions">Subscriptions</L>.</Item>
            <Item>The playground engine rejects the event-time table configuration, so a <Code>window</Code> in the browser cannot be shown bucketing by event time; treat that page as a syntax reference. See <L to="/docs/rql/transforms/window">window</L>.</Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Embedded Rust API</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item>Sixteen interceptor hooks (namespace, table, view, and ring buffer create/update/delete, the non-row chains) can be registered through the builder but never fire; only the row-level table and ring buffer hooks are wired end to end.</Item>
            <Item>A commit that is visible to the next transaction is not yet on disk; see the durability section above before treating a returned commit as safe.</Item>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">The playground</h2>
          <ul className="space-y-2 text-text-secondary">
            <Item>Every runnable snippet on this site shares one WASM engine instance in your tab, so a statement that traps (the enum, dictionary, <Code>now()</Code>, and <Code>create queue</Code> cases above) surfaces as a bare <Code>unreachable</Code> and leaves that instance in an unverified state; reload the page if later snippets misbehave.</Item>
            <Item>Subscriptions and everything that needs a server (WebSocket, HTTP, metrics, remote clients) do not exist in the browser build.</Item>
            <Item>Each snippet run is one admin request, so a transactional view created and written in the same run is not populated; split it into a second run.</Item>
          </ul>
        </section>

        <Callout variant="note" title="How this list is maintained">
          Lines are added when a behavior is verified live or in the source and removed
          when the engine changes; a fixed item becomes a plain example on its page. If
          you hit something that belongs here and is not, or something here that no
          longer happens, open an issue. For errors that are not caveats but simply
          unfamiliar, start with{' '}
          <L to="/docs/resources/faq">Troubleshooting &amp; FAQ</L>.
        </Callout>
      </div>
    </Layout>
  );
}
