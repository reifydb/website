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

export function TypeScriptClientPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            TypeScript / JavaScript
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>@reifydb/client</Code> talks to a running ReifyDB server from Node.js
            or the browser: WebSocket for long-lived connections with live
            subscriptions, HTTP for plain request/response. Around it sit three
            companions - <Code>@reifydb/core</Code> with the value types and the{' '}
            <Code>Shape</Code> system that turns frames into typed objects,{' '}
            <Code>@reifydb/react</Code> with hooks for queries, commands, and
            subscriptions, and <Code>@reifydb/wasm</Code> with the whole engine
            compiled to WebAssembly. All packages ship together at the engine version:
            pair 0.8.x packages with a 0.8.x server.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Installation</h2>
          <CodeBlock
            language="bash"
            code={`npm install @reifydb/client @reifydb/core

# React hooks (re-exports client and core):
npm install @reifydb/react

# In-browser engine, no server needed:
npm install @reifydb/wasm`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>@reifydb/client</Code> works unchanged in both runtimes: in the
            browser it uses the native <Code>WebSocket</Code> and <Code>fetch</Code>,
            in Node.js it dynamically loads the <Code>ws</Code> package for WebSocket
            connections. TypeScript is optional but is where the package earns its
            keep - the shape system gives every row a precise static type.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Connecting</h2>
          <p className="text-text-secondary mb-4">
            <Code>Client.connect_ws(url, options?)</Code> opens one persistent
            WebSocket that carries everything: queries, commands, logins, and
            subscription pushes. Against the default server the WebSocket endpoint is{' '}
            <Code>ws://localhost:8091</Code>;{' '}
            <DocLink to="/docs/connect">Connect</DocLink> covers the port layout and
            the loopback-only admin listeners:
          </p>
          <CodeBlock
            language="typescript"
            code={`import { Client } from '@reifydb/client';
import { Shape } from '@reifydb/core';

const client = await Client.connect_ws('ws://localhost:8091');

const frames = await client.query(
  'MAP { answer: 42 }',
  {},
  [Shape.object({ answer: Shape.number() })],
);

console.log(frames[0][0].answer); // 42

await client.disconnect();`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The options object tunes the connection; everything is optional:
          </p>
          <CodeBlock
            language="typescript"
            code={`const client = await Client.connect_ws('ws://localhost:8091', {
  timeout_ms: 10_000,         // per-request timeout, default 30_000
  token: session_token,       // authenticate the connection immediately
  format: 'frames',           // 'json' | 'frames' | 'rbcf', default 'frames'
  max_reconnect_attempts: 5,  // default 5
  reconnect_delay_ms: 1_000,  // base backoff delay, default 1_000
  signal: abort_controller.signal, // abort the connection attempt
});`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            If the socket drops, the client reconnects on its own: it retries up to{' '}
            <Code>max_reconnect_attempts</Code> times with exponential backoff starting
            at <Code>reconnect_delay_ms</Code>, re-sends the session token, and
            re-registers every active subscription. Requests that were in flight when
            the connection dropped fail with a <Code>CONNECTION_LOST</Code> error
            rather than hanging. <Code>disconnect()</Code> stops the reconnect loop and
            closes the socket for good.
          </p>
          <p className="text-text-secondary mb-4">
            <Code>Client.connect_http(url, options?)</Code> is the request/response
            equivalent - each statement is one HTTP POST against{' '}
            <Code>http://localhost:8090</Code>, which suits scripts, serverless
            functions, and anywhere a long-lived socket is awkward. It is synchronous
            (there is no connection to open) and carries the same query, command,
            admin, and login surface, but no subscriptions:
          </p>
          <CodeBlock
            language="typescript"
            code={`const http = Client.connect_http('http://localhost:8090');

const frames = await http.query(
  'MAP { answer: 42 }',
  {},
  [Shape.object({ answer: Shape.number() })],
);`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The HTTP methods additionally accept a per-request{' '}
            <Code>{'{ signal }'}</Code> as the fourth argument, so a single request can
            be cancelled with an <Code>AbortSignal</Code> without touching the client.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Authentication</h2>
          <p className="text-text-secondary mb-4">
            A fresh connection runs as the anonymous identity; what that identity may
            do is decided by policies on the server. To act as a real user, log in
            with whichever method the user has (creating users and their credentials
            is an admin operation, shown on{' '}
            <DocLink to="/docs/connect">Connect</DocLink>):
          </p>
          <CodeBlock
            language="typescript"
            code={`const client = await Client.connect_ws('ws://localhost:8091');

// Password login: returns the session token plus the identity UUID.
const { token, identity } = await client.login_with_password('alice', 'alice-pass');

// Token login for users with token credentials:
await client.login_with_token('bob-secret-token');

// Revoke the session token server-side:
await client.logout();

// Resume an existing session on a new connection:
const resumed = await Client.connect_ws('ws://localhost:8091', { token });`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Every statement after a successful login runs as that identity, and the
            client keeps the token so reconnections re-authenticate automatically.
            Logging in again replaces the current session - switching from alice to
            bob on the same connection is just a second login. The lower-level{' '}
            <Code>login(method, credentials)</Code> takes the method name and a plain
            object of credential fields directly. <Code>logout()</Code> without a
            token is a no-op, so it is always safe to call in cleanup paths.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Queries and commands</h2>
          <p className="text-text-secondary mb-4">
            <Code>query(rql, params, shapes)</Code> reads,{' '}
            <Code>command(rql, params, shapes)</Code> writes. The third argument is an
            array with one <Code>Shape</Code> per result frame; rows arrive as typed
            objects matching it. A statement returns one frame per pipeline, so most
            calls pass a single shape:
          </p>
          <CodeBlock
            language="typescript"
            code={`await client.command(
  \`INSERT app::users [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ]\`,
  null,
  [],
);

const users = Shape.object({ id: Shape.int4(), name: Shape.string() });

const frames = await client.query('FROM app::users', null, [users]);
for (const user of frames[0]) {
  console.log(user.id, user.name); // typed: number, string
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Passing <Code>[]</Code> skips the typed transformation: with the default{' '}
            <Code>frames</Code> format each row is then a plain object of value
            wrappers from <Code>@reifydb/core</Code> (an <Code>Int4Value</Code>, a{' '}
            <Code>Utf8Value</Code>, ...) keyed by column name - useful when you do not
            know the columns up front. Each method also has a <Code>_with_meta</Code>{' '}
            twin (<Code>query_with_meta</Code>, <Code>command_with_meta</Code>,{' '}
            <Code>admin_with_meta</Code>) that returns the frames together with
            server-reported metadata - a request fingerprint and the server-side
            execution duration:
          </p>
          <CodeBlock
            language="typescript"
            code={`const { frames, meta } = await client.query_with_meta('FROM app::users', null, [users]);
console.log(meta?.fingerprint, meta?.duration);`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Admin statements</h2>
          <p className="text-text-secondary mb-4">
            The application endpoints (8090/8091) accept queries and commands only;
            admin statements such as <Code>CREATE TABLE</Code> are rejected there. The
            client's <Code>admin(rql, params, shapes)</Code> method works when the
            connection points at an admin listener, which the default server keeps on
            loopback (<Code>ws://127.0.0.1:9091</Code> for WebSocket,{' '}
            <Code>http://127.0.0.1:9090</Code> for HTTP - see{' '}
            <DocLink to="/docs/connect">Connect</DocLink>):
          </p>
          <CodeBlock
            language="typescript"
            code={`// Same client type, admin listener. Loopback only by default.
const admin = await Client.connect_ws('ws://127.0.0.1:9091', { token });

await admin.admin('CREATE NAMESPACE app', null, []);
await admin.admin('CREATE TABLE app::users { id: Int4, name: Utf8 }', null, []);

await admin.disconnect();`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Admin listeners accept all three statement kinds, so a migration script
            can run its schema changes and seed data over one connection. The split
            exists so frontends can face the public ports while schema and identity
            changes stay reachable only from the machine itself.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Parameters</h2>
          <p className="text-text-secondary mb-4">
            The second argument carries parameters. An array binds positional
            parameters <Code>$1</Code>, <Code>$2</Code>, ...; a plain object binds
            named parameters <Code>$name</Code>; <Code>null</Code> means none:
          </p>
          <CodeBlock
            language="typescript"
            code={`// Positional: $1, $2, ...
const sums = await client.query(
  'MAP { total: $1 + $2 }',
  [40, 2],
  [Shape.object({ total: Shape.number() })],
);

// Named: $name
const alices = await client.query(
  'FROM app::users FILTER name == $name',
  { name: 'Alice' },
  [users],
);`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            JavaScript values are encoded automatically as typed{' '}
            <Code>{'{type, value}'}</Code> pairs, never as spliced RQL text - use
            parameters for anything that originates outside your program, exactly as
            you would to prevent SQL injection. The encoding picks a type from the
            value: integers become the smallest fitting <Code>Int</Code> type, other
            numbers <Code>Float8</Code>, strings <Code>Utf8</Code> (UUID-formatted
            strings become <Code>Uuid4</Code>/<Code>Uuid7</Code>), booleans{' '}
            <Code>Boolean</Code>, <Code>bigint</Code>s an unsigned or signed 64/128-bit
            integer, <Code>Date</Code>s <Code>DateTime</Code>,{' '}
            <Code>Uint8Array</Code>s <Code>Blob</Code>, and{' '}
            <Code>null</Code>/<Code>undefined</Code> <Code>None</Code>. When the exact
            engine type matters, pass a value wrapper from <Code>@reifydb/core</Code>{' '}
            instead:
          </p>
          <CodeBlock
            language="typescript"
            code={`import { Int4Value } from '@reifydb/core';

// Force Int4 instead of the auto-picked smallest integer type:
await client.query(
  'MAP { result: $1 }',
  [new Int4Value(42)],
  [Shape.object({ result: Shape.int4() })],
);`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Shapes and typed results</h2>
          <p className="text-text-secondary mb-4">
            A <Code>Shape</Code> describes the result you expect, and TypeScript
            infers the row type from it - <Code>Shape.object({'{ ... }'})</Code>{' '}
            produces an object per row, and each field builder maps an engine type to
            a JavaScript one. The mapping follows what fits without loss:{' '}
            <Code>int1</Code>/<Code>int2</Code>/<Code>int4</Code> and their unsigned
            versions become <Code>number</Code>, <Code>int8</Code>/<Code>int16</Code>/
            <Code>uint8</Code>/<Code>uint16</Code> become <Code>bigint</Code>,{' '}
            <Code>float4</Code>/<Code>float8</Code> become <Code>number</Code>,{' '}
            <Code>utf8</Code> becomes <Code>string</Code>, <Code>boolean</Code>{' '}
            becomes <Code>boolean</Code>, <Code>date</Code>/<Code>datetime</Code>{' '}
            become <Code>Date</Code>, and <Code>decimal</Code>, <Code>time</Code>,{' '}
            <Code>duration</Code>, and the UUID types arrive as strings. Convenience
            aliases exist for the common cases: <Code>Shape.string()</Code>,{' '}
            <Code>Shape.number()</Code>, <Code>Shape.int()</Code>,{' '}
            <Code>Shape.bool()</Code>.
          </p>
          <CodeBlock
            language="typescript"
            code={`const order = Shape.object({
  id: Shape.int8(),                 // bigint
  customer: Shape.string(),         // string
  total: Shape.float8(),            // number
  placed_at: Shape.datetime(),      // Date
  note: Shape.optional(Shape.string()), // string | undefined
});

const frames = await client.query('FROM app::orders', null, [order]);
const first = frames[0][0];
// first: { id: bigint; customer: string; total: number; placed_at: Date; note?: string }`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>Shape.optional(...)</Code> admits undefined for columns that can be
            missing, and <Code>Shape.array(...)</Code> types list-valued fields. Every
            primitive builder also has a <Code>Value</Code> twin
            (<Code>Shape.int4Value()</Code>, <Code>Shape.utf8Value()</Code>, ...) that
            keeps the wrapper object instead of unwrapping to a primitive - the right
            choice when you need lossless round-tripping, for example to pass a result
            back as a parameter with its exact engine type.
          </p>
          <Callout variant="note" title="Shapes are client-side">
            The shape never travels to the server and does not validate anything
            server-side; it directs how the client decodes and types the frames it
            receives. If the shape names a type the column does not have, you get
            whatever the coercion produces, not an error.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Subscriptions</h2>
          <p className="text-text-secondary mb-4">
            Subscriptions need the persistent connection, so they are WebSocket only.{' '}
            <Code>subscribe(rql, params, shape, callbacks, config?)</Code> registers a
            live{' '}
            <DocLink to="/docs/concepts/data-model/subscriptions">subscription</DocLink>{' '}
            over an RQL body and returns its id; from then on the server pushes
            changes and the client dispatches them to your callbacks as typed rows,
            with the change kind already split out:
          </p>
          <CodeBlock
            language="typescript"
            code={`const user_shape = Shape.object({ id: Shape.int4(), name: Shape.string() });

const subscription_id = await client.subscribe(
  'from app::users | map { id, name }',
  null,
  user_shape,
  {
    on_insert: (rows) => console.log('insert', rows),
    on_update: (rows) => console.log('update', rows),
    on_remove: (rows) => console.log('remove', rows),
  },
);

// Later:
await client.unsubscribe(subscription_id);`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            All three callbacks are optional. The client derives the kind from the{' '}
            <Code>_op</Code> column the server attaches and strips that column before
            invoking you, so the rows look exactly like query results. The optional
            fifth argument controls delivery: hydration is on by default, meaning the
            current contents of the source are delivered as inserts first, so
            subscribing to a populated table observes every existing row before
            forward changes. <Code>hydration.max_rows</Code> caps that snapshot, and{' '}
            <Code>throttle</Code> sets a minimum interval in milliseconds between
            pushes, with changes buffered and delivered together when the interval
            elapses:
          </p>
          <CodeBlock
            language="typescript"
            code={`// Only changes committed after the subscription exists,
// pushed at most every 250ms:
await client.subscribe('from app::users', null, user_shape, callbacks, {
  hydration: { enabled: false },
  throttle: 250,
});`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            A dashboard that watches ten queries does not want ten interleaved change
            streams. <Code>batch_subscribe(members, batch_callbacks?)</Code> registers
            several subscriptions as one group whose changes arrive as coalesced
            per-tick envelopes; each member brings its own rql, shape, callbacks, and
            config, and the group-level callbacks report members closing:
          </p>
          <CodeBlock
            language="typescript"
            code={`const { batch_id, subscription_ids } = await client.batch_subscribe(
  [
    { rql: 'from app::users', shape: user_shape, callbacks: { on_insert: render_users } },
    { rql: 'from app::orders', callbacks: { on_insert: render_orders } },
  ],
  { on_member_closed: (id) => console.log('member closed:', id) },
);

// Tears the whole group down server-side:
await client.batch_unsubscribe(batch_id);`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Under the hood the client wraps your query body in a{' '}
            <Code>CREATE SUBSCRIPTION WITH {'{ ... }'} AS {'{ body }'}</Code> statement,
            so the server-side semantics are exactly those of the{' '}
            <DocLink to="/docs/concepts/data-model/subscriptions">subscriptions</DocLink>{' '}
            concept page. After an automatic reconnect, the client re-registers every
            active subscription and batch - your callbacks keep firing, though the new
            subscription re-hydrates according to its config.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">React hooks</h2>
          <p className="text-text-secondary mb-4">
            <Code>@reifydb/react</Code> wraps the client in hooks and re-exports both{' '}
            <Code>@reifydb/client</Code> and <Code>@reifydb/core</Code>, so it is the
            only import a React app needs. Wrap your tree in a{' '}
            <Code>ConnectionProvider</Code>; it opens a single shared connection and
            every hook underneath uses it:
          </p>
          <CodeBlock
            language="typescript"
            code={`import { ConnectionProvider } from '@reifydb/react';

export function App() {
  return (
    <ConnectionProvider config={{ url: 'ws://localhost:8091' }}>
      <UserList />
    </ConnectionProvider>
  );
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>useQueryOne(rql, params?, shape?, options?)</Code> runs a query when
            the component mounts and again whenever <Code>rql</Code> or{' '}
            <Code>params</Code> change. It returns <Code>is_executing</Code>, the{' '}
            <Code>result</Code> (with typed <Code>rows</Code>), and an{' '}
            <Code>error</Code> string:
          </p>
          <CodeBlock
            language="typescript"
            code={`import { useQueryOne, Shape } from '@reifydb/react';

const user_shape = Shape.object({ id: Shape.int4(), name: Shape.string() });

export function UserList() {
  const { is_executing, result, error } = useQueryOne('FROM app::users', null, user_shape);

  if (error) return <p>{error}</p>;
  if (is_executing || !result) return <p>Loading...</p>;

  return (
    <ul>
      {result.rows.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>useQueryMany</Code> is the multi-statement variant: it takes an
            array of shapes and returns <Code>results</Code>, one entry per frame.{' '}
            <Code>useCommandOne</Code> and <Code>useCommandMany</Code> mirror the two
            for writes - note that they, too, execute on mount and on every{' '}
            <Code>rql</Code>/<Code>params</Code> change, which suits declarative
            writes. For event-driven writes (a button click), use{' '}
            <Code>useCommandExecutor</Code>, which hands you a <Code>command</Code>{' '}
            function to call when you choose; <Code>useQueryExecutor</Code> is the
            same for reads.
          </p>
          <p className="text-text-secondary mb-4">
            <Code>useSubscription(rql, params?, shape?, options?)</Code> subscribes on
            mount and unsubscribes on unmount. It exposes the accumulated{' '}
            <Code>changes</Code> - an append-only list of{' '}
            <Code>{'{ operation, rows, timestamp }'}</Code> events - plus{' '}
            <Code>is_subscribed</Code>, <Code>error</Code>, and the{' '}
            <Code>subscription_id</Code>. Derive your view state by reducing over the
            changes (the returned <Code>data</Code> array is currently always empty;
            do not rely on it):
          </p>
          <CodeBlock
            language="typescript"
            code={`import { useSubscription, Shape } from '@reifydb/react';

const user_shape = Shape.object({ id: Shape.int4(), name: Shape.string() });

export function LiveUsers() {
  const { changes, is_subscribed } = useSubscription(
    'from app::users | map { id, name }',
    null,
    user_shape,
  );

  // Fold the change log into current state. With hydration on (the
  // default), existing rows arrive as the first INSERT events.
  const users = new Map<number, string>();
  for (const change of changes) {
    for (const row of change.rows) {
      if (change.operation === 'REMOVE') users.delete(row.id);
      else users.set(row.id, row.name);
    }
  }

  return (
    <ul>
      {[...users].map(([id, name]) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>useConnection()</Code> exposes the shared connection itself:{' '}
            <Code>client</Code>, <Code>is_connected</Code>,{' '}
            <Code>is_connecting</Code>, <Code>connection_error</Code>, and{' '}
            <Code>connect</Code>/<Code>disconnect</Code>/<Code>reconnect</Code>{' '}
            functions - the escape hatch for anything the hooks do not cover, such as
            logging in.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">In-browser WASM</h2>
          <p className="text-text-secondary mb-4">
            <Code>@reifydb/wasm</Code> is not a client - it is the whole engine
            compiled to WebAssembly, running in the page with no server and no
            network. It is what powers the{' '}
            <DocLink to="/playground">playground</DocLink> and every runnable snippet
            in these docs. The API is synchronous and shape-free: statements return
            decoded value objects directly.
          </p>
          <CodeBlock
            language="typescript"
            code={`import { create_wasm_db } from '@reifydb/wasm';

const db = await create_wasm_db();

db.admin('CREATE NAMESPACE app');
db.admin('CREATE TABLE app::users { id: Int4, name: Utf8 }');

db.command("INSERT app::users [{ id: 1, name: 'Alice' }]");
const results = db.query('FROM app::users');

db.free();`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Because there is no network boundary, there are no ports and no admin
            split - <Code>admin</Code>, <Code>command</Code>, and <Code>query</Code>{' '}
            all run directly, with <Code>_with_params</Code> variants for
            parameterized statements and <Code>login_with_password</Code>/
            <Code>login_with_token</Code>/<Code>logout</Code> mirroring the identity
            flow when you want to exercise policies. State lives in browser memory and
            disappears when the page unloads; <Code>free()</Code> releases the engine
            explicitly. The right tool for demos, tests, tutorials, and evaluating RQL
            - not for data you intend to keep.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Wire formats</h2>
          <p className="text-text-secondary mb-4">
            The <Code>format</Code> option picks the result encoding for the whole
            connection, on both the WebSocket and the HTTP client:{' '}
            <Code>'frames'</Code> (the default) asks for columnar frames as JSON,{' '}
            <Code>'json'</Code> for row-shaped JSON, and <Code>'rbcf'</Code> for
            ReifyDB's binary columnar format - the compact choice for result-heavy
            workloads. Whatever you pick, the client decodes it before you see it: the
            encoding never changes what a statement means or returns. One nuance:
            subscription pushes are always columnar (<Code>frames</Code> or{' '}
            <Code>rbcf</Code>), because the change protocol rides on the columnar
            layout. The formats themselves are specified on{' '}
            <DocLink to="/docs/clients/wire-formats">Wire Formats</DocLink>. The
            package also exports <Code>JsonWsClient</Code> and{' '}
            <Code>JsonHttpClient</Code> (via <Code>Client.connect_json_ws</Code> and{' '}
            <Code>Client.connect_json_http</Code>) - shape-free variants whose{' '}
            <Code>query(rql, params?)</Code> returns plain JSON data, handy for quick
            scripts that just want to look at results.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Error handling</h2>
          <p className="text-text-secondary mb-4">
            Server-side failures - bad RQL, policy denials, transaction conflicts -
            reject the promise with a <Code>ReifyError</Code>, the same diagnostic
            wrapper every surface uses: a stable <Code>code</Code>, the offending RQL{' '}
            <Code>fragment</Code> with line and column, an optional{' '}
            <Code>help</Code> text, and <Code>notes</Code>:
          </p>
          <CodeBlock
            language="typescript"
            code={`import { ReifyError } from '@reifydb/client';

try {
  await client.query('FROM app::does_not_exist', null, []);
} catch (err) {
  if (err instanceof ReifyError) {
    console.error(err.code);     // stable diagnostic code
    console.error(err.message);  // '[CODE] message'
    console.error(err.fragment); // { text, line, column } of the offending RQL
    console.error(err.help);     // help text when the server provides one
  }
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Two failures are generated client-side: a request that outlives{' '}
            <Code>timeout_ms</Code> rejects with a plain{' '}
            <Code>Error('ReifyDB query timeout')</Code>, and a request sent while the
            socket is down rejects with a <Code>ReifyError</Code> whose code is{' '}
            <Code>CONNECTION_LOST</Code>. Note that the client has no built-in
            conflict retry: a transaction conflict comes back like any other error
            and retrying the command is up to you.
          </p>
        </section>

        <Callout variant="tip" title="Where next">
          <DocLink to="/docs/connect">Connect</DocLink> has the server-side half:
          starting the server, ports, and creating users to log in as. The{' '}
          <DocLink to="/docs/clients/wire-formats">Wire Formats</DocLink> page
          specifies the encodings if you need to go under the client, and the{' '}
          <DocLink to="/docs/quick-start">Quickstart</DocLink> runs RQL in your
          browser with no setup at all.
        </Callout>
      </div>
    </Layout>
  );
}
