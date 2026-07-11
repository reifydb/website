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

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">{children}</th>
  );
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-4 py-2 border-b border-border-default align-top">{children}</td>;
}

export function WireFormatsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Wire Formats</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Every remote client speaks the same protocol: a statement request over HTTP
            or WebSocket, a result encoded as <Code>frames</Code>, <Code>json</Code>, or{' '}
            <Code>rbcf</Code>. This page specifies that protocol from the server
            implementation outward - request shapes, response shapes, and the exact
            byte and JSON layouts of each encoding. It is the reference for debugging
            with curl and for writing a client in a language ReifyDB does not cover
            yet. Ports and the login flow are introduced on{' '}
            <DocLink to="/docs/connect">Connect</DocLink>; this page assumes a server
            on <Code>8090</Code> (HTTP) and <Code>8091</Code> (WebSocket).
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">One protocol, three encodings</h2>
          <p className="text-text-secondary mb-4">
            A request carries RQL plus optional parameters and is tagged as a{' '}
            <em>query</em> (read), a <em>command</em> (write), or an <em>admin</em>{' '}
            statement (schema and identities, admin listeners only). The result is one
            or more <em>frames</em> - columnar tables, one per statement that produces
            output. What varies is only how those frames are encoded on the way back:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-2 border-border-default text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <Th>Format</Th>
                  <Th>Content type</Th>
                  <Th>Shape</Th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr>
                  <Td>
                    <Code>frames</Code> (default)
                  </Td>
                  <Td>
                    <Code>application/vnd.reifydb.frames</Code>
                  </Td>
                  <Td>
                    Columnar JSON: <Code>{'{"frames": [...]}'}</Code>, every cell a
                    string, column types included
                  </Td>
                </tr>
                <tr>
                  <Td>
                    <Code>json</Code>
                  </Td>
                  <Td>
                    <Code>application/vnd.reifydb.json</Code>
                  </Td>
                  <Td>
                    Row-shaped JSON: <Code>{'[[{col: value}, ...], ...]'}</Code>, one
                    array of row objects per frame
                  </Td>
                </tr>
                <tr>
                  <Td>
                    <Code>rbcf</Code>
                  </Td>
                  <Td>
                    <Code>application/vnd.reifydb.rbcf</Code>
                  </Td>
                  <Td>Binary columnar format, compact and typed</Td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mb-4">
            The encoding is chosen per request - a <Code>?format=</Code> query
            parameter on HTTP, a <Code>format</Code> field on WebSocket - and never
            changes what a statement means or returns. When no format is given, the
            server defaults to <Code>frames</Code>. The official clients pick one per
            connection: the TypeScript client's <Code>format</Code> option defaults to{' '}
            <Code>'frames'</Code>, and the Rust client's <Code>WireFormat::Json</Code>{' '}
            (its default) also asks for <Code>frames</Code> on the wire -{' '}
            <Code>WireFormat::Rbcf</Code> is the binary alternative in both.
          </p>
          <p className="text-text-secondary">
            Rule of thumb: <Code>frames</Code> when you want types and column order
            preserved (it is what the client libraries decode), <Code>json</Code> when
            a human or a JSON-native tool reads the output, <Code>rbcf</Code> when
            results are large and decode cost matters.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Statements and parameters</h2>
          <p className="text-text-secondary mb-4">
            A statement request has two fields: <Code>rql</Code> (the statement text,
            possibly several statements separated by <Code>;</Code> - each result
            arrives as its own frame) and an optional <Code>params</Code>. Parameters
            travel as typed pairs, and the <Code>value</Code> is always a JSON string,
            whatever the type:
          </p>
          <CodeBlock
            language="json"
            code={`{
  "rql": "FROM app::users FILTER age >= $min AND name == $name",
  "params": {
    "min":  { "type": "Int4", "value": "18" },
    "name": { "type": "Utf8", "value": "alice" }
  }
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Named parameters are an object keyed by name (referenced as{' '}
            <Code>$name</Code>); positional parameters are an array of the same pairs
            (referenced as <Code>$1</Code>, <Code>$2</Code>, ...). The accepted type
            names are exactly the engine's value types: <Code>None</Code>,{' '}
            <Code>Boolean</Code>, <Code>Float4</Code>, <Code>Float8</Code>,{' '}
            <Code>Int1</Code> through <Code>Int16</Code>, <Code>Uint1</Code> through{' '}
            <Code>Uint16</Code>, <Code>Utf8</Code>, <Code>Uuid4</Code>,{' '}
            <Code>Uuid7</Code>, <Code>Date</Code>, <Code>DateTime</Code>,{' '}
            <Code>Time</Code>, <Code>Duration</Code>, <Code>Blob</Code> (hex string),{' '}
            <Code>Decimal</Code>, and <Code>IdentityId</Code>. An unknown type name or
            an unparseable value is rejected with <Code>INVALID_PARAMS</Code> before
            anything executes.
          </p>
          <p className="text-text-secondary">
            This is what the client libraries produce under the hood: the TypeScript
            encoder maps a JS number to the narrowest fitting <Code>Int</Code> type, a
            string to <Code>Utf8</Code> (UUID-shaped strings to <Code>Uuid4</Code>/
            <Code>Uuid7</Code>), <Code>null</Code> to <Code>None</Code>, and so on. A
            hand-rolled client just writes the pairs directly - the parameter's
            declared type carries through to the result, so <Code>MAP {'{'} answer: $n{' '}
            {'}'}</Code> with an <Code>Int4</Code> parameter returns an{' '}
            <Code>Int4</Code> column.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">HTTP endpoints</h2>
          <p className="text-text-secondary mb-4">
            The HTTP listener exposes a small, fixed surface. All statement endpoints
            take a JSON body and the optional <Code>format</Code> and{' '}
            <Code>unwrap</Code> query parameters:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-2 border-border-default text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <Th>Route</Th>
                  <Th>Purpose</Th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr>
                  <Td>
                    <Code>GET /health</Code>
                  </Td>
                  <Td>
                    Liveness check; returns <Code>{'{"status":"ok"}'}</Code>
                  </Td>
                </tr>
                <tr>
                  <Td>
                    <Code>POST /v1/query</Code>
                  </Td>
                  <Td>Execute a read</Td>
                </tr>
                <tr>
                  <Td>
                    <Code>POST /v1/command</Code>
                  </Td>
                  <Td>Execute a write</Td>
                </tr>
                <tr>
                  <Td>
                    <Code>POST /v1/admin</Code>
                  </Td>
                  <Td>
                    Schema and identity statements; registered only on the loopback
                    admin listener (<Code>127.0.0.1:9090</Code>), plain 404 elsewhere
                  </Td>
                </tr>
                <tr>
                  <Td>
                    <Code>POST /v1/authenticate</Code>
                  </Td>
                  <Td>Log in, get a session token</Td>
                </tr>
                <tr>
                  <Td>
                    <Code>POST /v1/logout</Code>
                  </Td>
                  <Td>Revoke the bearer token</Td>
                </tr>
                <tr>
                  <Td>
                    <Code>ANY /api/*</Code>
                  </Td>
                  <Td>
                    HTTP bindings: <DocLink to="/docs/routines">procedures</DocLink>{' '}
                    published at custom paths, parameters from the URL
                  </Td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mb-4">
            Identity rides in the <Code>Authorization: Bearer &lt;token&gt;</Code>{' '}
            header. No header means the request runs as the <em>anonymous</em>{' '}
            identity - what anonymous may do is a policy decision, not a transport one.
            The simplest possible exchange, with the default <Code>frames</Code>{' '}
            encoding:
          </p>
          <CodeBlock
            language="bash"
            code={`curl -s http://localhost:8090/v1/query \\
  -H 'Content-Type: application/json' \\
  -d '{"rql": "MAP { answer: $n }", "params": {"n": {"type": "Int4", "value": "42"}}}'`}
          />
          <CodeBlock
            className="mt-4"
            language="json"
            code={`{"frames":[{"row_numbers":[],"created_at":[],"updated_at":[],
  "columns":[{"name":"answer","type":"Int4","payload":["42"]}]}]}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The same request with <Code>?format=json</Code> returns the row shape
            instead - one array of row objects per frame:
          </p>
          <CodeBlock
            language="bash"
            code={`curl -s 'http://localhost:8090/v1/query?format=json' \\
  -H 'Content-Type: application/json' \\
  -d '{"rql": "MAP { answer: $n }", "params": {"n": {"type": "Int4", "value": "42"}}}'

# [[{"answer":"42"}]]`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Every statement response also carries two metadata headers:{' '}
            <Code>x-fingerprint</Code> (a stable hex fingerprint of the normalized
            request, useful for correlating logs) and <Code>x-duration</Code> (total
            execution time, e.g. <Code>412us</Code>).
          </p>
          <p className="text-text-secondary mb-4">
            Logging in is a plain POST. Password users send their name as{' '}
            <Code>identifier</Code>; token users send <Code>method: "token"</Code>{' '}
            with a <Code>token</Code> credential. Creating users and credentials is
            covered on <DocLink to="/docs/connect">Connect</DocLink>:
          </p>
          <CodeBlock
            language="bash"
            code={`curl -s http://localhost:8090/v1/authenticate \\
  -H 'Content-Type: application/json' \\
  -d '{"method": "password", "credentials": {"identifier": "alice", "password": "alice-pass"}}'

# {"status":"authenticated","token":"<session-token>","identity":"<identity-id>"}

curl -s 'http://localhost:8090/v1/query?format=json' \\
  -H 'Authorization: Bearer <session-token>' \\
  -H 'Content-Type: application/json' \\
  -d '{"rql": "FROM app::users"}'`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            A failed login answers <Code>401</Code> with{' '}
            <Code>{'{"status":"failed","reason":"..."}'}</Code>; multi-step methods
            answer <Code>{'{"status":"challenge","challenge_id":...,"payload":...}'}</Code>{' '}
            and expect a second <Code>/v1/authenticate</Code> call that includes the{' '}
            <Code>challenge_id</Code> in the credentials. <Code>POST /v1/logout</Code>{' '}
            with the bearer header revokes the token server-side and returns{' '}
            <Code>{'{"status":"ok"}'}</Code>.
          </p>
          <p className="text-text-secondary">
            Errors come in two shapes. Engine errors - bad RQL, type errors, policy
            denials - return <Code>400</Code> (or <Code>403</Code> for{' '}
            <Code>POLICY_*</Code> codes) with a full diagnostic:{' '}
            <Code>{'{"diagnostic": {"code", "message", "rql", "fragment", "label", "help", "notes", ...}}'}</Code>.
            Transport-level failures return{' '}
            <Code>{'{"error": "...", "code": "..."}'}</Code> with the matching status:{' '}
            <Code>AUTH_REQUIRED</Code>/<Code>INVALID_TOKEN</Code>/
            <Code>TOKEN_EXPIRED</Code> (401), <Code>BAD_REQUEST</Code>/
            <Code>INVALID_PARAMS</Code> (400), <Code>FORBIDDEN</Code> (403),{' '}
            <Code>NOT_FOUND</Code> (404), <Code>METHOD_NOT_ALLOWED</Code> (405),{' '}
            <Code>QUERY_TIMEOUT</Code> (504), <Code>INTERNAL_ERROR</Code> (500).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The frames encoding</h2>
          <p className="text-text-secondary mb-4">
            <Code>frames</Code> is the columnar result as JSON, and the shape the
            official clients decode. Each frame has three optional metadata arrays and
            a list of columns; each column carries its name, its engine type, and its
            cells as strings:
          </p>
          <CodeBlock
            language="json"
            code={`{
  "frames": [
    {
      "row_numbers": [5, 4, 3],
      "created_at": ["1970-01-01T00:00:00.000000000Z", "...", "..."],
      "updated_at": ["1970-01-01T00:00:00.000000000Z", "...", "..."],
      "columns": [
        { "name": "id",     "type": "Int2", "payload": ["5", "4", "3"] },
        { "name": "name",   "type": "Utf8", "payload": ["eve", "dan", "cid"] },
        { "name": "active", "type": { "Option": "Boolean" },
          "payload": ["true", "false", "\u27EAnone\u27EB"] }
      ]
    }
  ]
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The rules, straight from the encoder:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>row_numbers</Code>, <Code>created_at</Code>, and{' '}
                <Code>updated_at</Code> are per-row metadata. Results that read stored
                rows carry them; computed results (a bare <Code>MAP</Code>) leave them
                as empty arrays.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>type</Code> is the engine value type, PascalCase:{' '}
                <Code>Boolean</Code>, <Code>Int4</Code>, <Code>Utf8</Code>,{' '}
                <Code>DateTime</Code>, and so on - the same names parameters use. A
                nullable column wraps its type as an object,{' '}
                <Code>{'{"Option": "Boolean"}'}</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Every cell in <Code>payload</Code> is a string: the value's canonical
                text rendering. Missing values are the sentinel string{' '}
                <Code>{'\u27EAnone\u27EB'}</Code> (U+27EA, "none", U+27EB) - a decoder
                must treat that exact string as absent, not as text. Blobs are
                rendered as hex.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Column order is the statement's output order, and all payload arrays
                have the same length as <Code>row_numbers</Code> would (the frame's
                row count). Pivoting to rows is a simple zip across columns.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary">
            On HTTP the body is the <Code>{'{"frames": [...]}'}</Code> object shown
            above; on WebSocket the same object appears as the response's{' '}
            <Code>body</Code> field.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The json encoding</h2>
          <p className="text-text-secondary mb-4">
            <Code>json</Code> trades type fidelity for readability: the result is an
            array of frames, each frame an array of row objects. It is the format to
            reach for with curl, <Code>jq</Code>, or any consumer that just wants
            values keyed by column name. Its rendering rules differ from{' '}
            <Code>frames</Code> in ways that matter to a consumer:
          </p>
          <ul className="space-y-2 text-text-secondary mb-4">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Booleans are JSON booleans and missing values are JSON{' '}
                <Code>null</Code>, but <strong>numbers are JSON strings</strong>{' '}
                (<Code>{'{"answer": "42"}'}</Code>): Int16/Uint16/Decimal exceed what
                JSON numbers can represent, so everything numeric is stringified
                uniformly. Non-finite floats become <Code>null</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Keys within a row object are sorted alphabetically, not in column
                order, and row metadata (row numbers, timestamps) is not included.
                When order or metadata matters, use <Code>frames</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Code>unwrap=true</Code> (query parameter on HTTP, request field on
                WebSocket) strips the nesting when the result is exactly one frame
                with one row: <Code>{'[[{"answer":"42"}]]'}</Code> becomes{' '}
                <Code>{'{"answer":"42"}'}</Code>. Handy for endpoints that return a
                single object.
              </span>
            </li>
          </ul>
          <p className="text-text-secondary">
            One special case: if the first result frame contains a column named{' '}
            <Code>body</Code>, the response is built from that column alone - string
            values are embedded as raw, pre-rendered JSON rather than quoted. This
            exists for <DocLink to="/docs/routines">procedures</DocLink> that
            construct a JSON payload themselves and want it returned verbatim from an
            HTTP binding. Avoid naming an ordinary result column <Code>body</Code>{' '}
            when requesting <Code>json</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">RBCF, the binary encoding</h2>
          <p className="text-text-secondary mb-4">
            RBCF ("ReifyDB binary columnar format",{' '}
            <Code>application/vnd.reifydb.rbcf</Code>) carries the same frames as
            compact binary. Requests are unchanged - only the response bytes differ.
            On HTTP the body is one RBCF message; on WebSocket it arrives inside a
            small binary envelope (next section). All integers are little-endian. A
            message is a 16-byte header followed by frames back to back:
          </p>
          <CodeBlock
            language="text"
            code={`Message header (16 bytes)
  offset 0   u32  magic        0x46434252 (bytes on the wire: "RBCF")
  offset 4   u16  version      1
  offset 6   u16  reserved     0
  offset 8   u32  frame count
  offset 12  u32  total message size in bytes

Frame (repeated, frame count times)
  offset 0   u32  row count
  offset 4   u16  column count
  offset 6   u8   meta flags   bit 0 row numbers, bit 1 created_at, bit 2 updated_at
  offset 7   u8   reserved
  offset 8   u32  frame size in bytes (including this header)
  then, for each meta flag set, one array of row-count values:
    row numbers as u64, created_at / updated_at as i64 nanoseconds
  then column count columns back to back`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Each column is a 28-byte descriptor, a padded name, and up to four data
            sections:
          </p>
          <CodeBlock
            language="text"
            code={`Column descriptor (28 bytes)
  offset 0   u8   type code    engine value type (see below)
  offset 1   u8   encoding     0 plain, 1 dict, 2 rle, 3 delta, 4 bitpack, 5 delta-rle
  offset 2   u8   flags        bit 0: none-bitmap present; bits 4-5: dict index width
  offset 3   u8   reserved
  offset 4   u16  name length in bytes
  offset 6   u16  reserved
  offset 8   u32  row count
  offset 12  u32  nones section length
  offset 16  u32  data section length
  offset 20  u32  offsets section length
  offset 24  u32  extra section length

followed by:
  name bytes (UTF-8), zero-padded to a 4-byte boundary
  nones    - bitmap of missing values (present iff flags bit 0)
  data     - the encoded values
  offsets  - end offsets for variable-length values (utf8, blob, ...)
  extra    - encoding-specific side data (e.g. the dictionary)`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            The server chooses an encoding per column by heuristics (sorted integers
            get delta, repetitive strings get a dictionary, and so on), so a decoder
            must handle all of them; an encoder may always emit plain. Type codes are
            pinned by the golden fixture <Code>crates/codec/golden/tag/kinds.json</Code>{' '}
            in the engine repository (<Code>None</Code> 0, <Code>Boolean</Code> 1, ...,{' '}
            <Code>Utf8</Code> 9, ..., <Code>Blob</Code> 22, ...), and{' '}
            <Code>crates/codec/golden/frames/</Code> holds byte-exact sample messages
            to validate a decoder against.
          </p>
          <p className="text-text-secondary">
            Two reference implementations exist: the Rust codec at{' '}
            <Code>crates/codec/src/frame</Code> and the TypeScript port at{' '}
            <Code>pkg/typescript/client/src/rbcf</Code>, both in the engine
            repository, both tested against the same golden vectors. Clients opt in
            with <Code>WireFormat::Rbcf</Code> (Rust) or{' '}
            <Code>format: 'rbcf'</Code> (TypeScript).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The WebSocket protocol</h2>
          <p className="text-text-secondary mb-4">
            WebSocket wraps the same requests in a persistent, multiplexed connection
            and adds subscriptions. Every client-to-server message is a text frame
            containing one JSON object with a client-chosen <Code>id</Code> (echoed in
            the matching response, so requests may overlap), a <Code>type</Code>, and
            a <Code>payload</Code>. Binary frames from the client are rejected.
          </p>
          <CodeBlock
            language="json"
            code={`{
  "id": "1",
  "type": "Query",
  "payload": {
    "rql": "MAP { answer: $n }",
    "params": { "n": { "type": "Int4", "value": "42" } },
    "format": "frames"
  }
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Request types are <Code>Auth</Code>, <Code>Query</Code>,{' '}
            <Code>Command</Code>, <Code>Admin</Code> (admin listener{' '}
            <Code>127.0.0.1:9091</Code> only; on the application listener it answers{' '}
            <Code>NOT_FOUND</Code>), <Code>Subscribe</Code>, <Code>Unsubscribe</Code>,{' '}
            <Code>BatchSubscribe</Code>, <Code>BatchUnsubscribe</Code>,{' '}
            <Code>Call</Code> (invoke a bound procedure by name, named params only),
            and <Code>Logout</Code> (no payload). <Code>Query</Code>,{' '}
            <Code>Command</Code>, and <Code>Admin</Code> payloads take{' '}
            <Code>rql</Code>, <Code>params</Code>, <Code>format</Code>, and{' '}
            <Code>unwrap</Code> with the same semantics as HTTP. A statement response
            mirrors the request type and wraps the encoded result:
          </p>
          <CodeBlock
            language="json"
            code={`{
  "id": "1",
  "type": "Query",
  "payload": {
    "content_type": "application/vnd.reifydb.frames",
    "body": { "frames": [ { "row_numbers": [], "created_at": [], "updated_at": [],
      "columns": [ { "name": "answer", "type": "Int4", "payload": ["42"] } ] } ] },
    "meta": { "fingerprint": "9f3ac2...", "duration": "412us" }
  }
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            With <Code>format: "json"</Code> the <Code>body</Code> is the row shape
            and <Code>content_type</Code> is{' '}
            <Code>application/vnd.reifydb.json</Code>. With{' '}
            <Code>format: "rbcf"</Code> the response is not text at all: it arrives as
            a binary WebSocket frame laid out as{' '}
            <Code>[u8 kind][u32 id-length][id][u32 meta-length][meta JSON][RBCF message]</Code>,
            all lengths little-endian, where <Code>kind</Code> is <Code>0x00</Code>{' '}
            for a statement response, <Code>0x01</Code> for a subscription change, and{' '}
            <Code>0x02</Code> for a batch change.
          </p>
          <p className="text-text-secondary mb-4">
            A fresh connection runs as <em>anonymous</em> - authentication is
            optional, not a handshake. To log in, send <Code>Auth</Code> with either a
            token (<Code>{'{"token": "..."}'}</Code>, acknowledged with an empty
            payload) or credentials, which returns the session token like HTTP does:
          </p>
          <CodeBlock
            language="json"
            code={`{"id": "1", "type": "Auth", "payload": {"method": "password",
  "credentials": {"identifier": "alice", "password": "alice-pass"}}}

{"id": "1", "type": "Auth", "payload": {"status": "authenticated",
  "token": "<session-token>", "identity": "<identity-id>"}}`}
          />
          <p className="text-text-secondary mt-4">
            Errors are a single shape: <Code>{'{"id", "type": "Err", "payload": {"diagnostic": {...}}}'}</Code>{' '}
            with the same diagnostic object HTTP returns. Engine errors carry their
            full code, message, fragment, and help text; transport failures use codes
            like <Code>PARSE_ERROR</Code>, <Code>AUTH_FAILED</Code>,{' '}
            <Code>AUTH_REQUIRED</Code>, <Code>INVALID_PARAMS</Code>,{' '}
            <Code>NOT_FOUND</Code>, <Code>QUERY_TIMEOUT</Code>, and{' '}
            <Code>INTERNAL_ERROR</Code> in the diagnostic's <Code>code</Code> field.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Subscriptions on the wire</h2>
          <p className="text-text-secondary mb-4">
            <Code>Subscribe</Code> registers a live query; the server acknowledges
            with an id and then pushes changes as they happen. Pushed messages carry
            no <Code>id</Code> - they are server-initiated and correlated by{' '}
            <Code>subscription_id</Code> instead:
          </p>
          <CodeBlock
            language="json"
            code={`{"id": "2", "type": "Subscribe", "payload": {"rql": "FROM app::orders", "format": "frames"}}

{"id": "2", "type": "Subscribed", "payload": {"subscription_id": "12"}}

{"type": "Change", "payload": {"subscription_id": "12",
  "content_type": "application/vnd.reifydb.frames",
  "body": {"frames": [ ... ]}}}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            Change frames contain the affected rows plus one synthetic column,{' '}
            <Code>_op</Code>, coding the change kind: <Code>1</Code> insert,{' '}
            <Code>2</Code> update, <Code>3</Code> remove. The official clients read
            and strip that column before handing rows to your callbacks - a
            hand-rolled client should do the same. <Code>Unsubscribe</Code> with the{' '}
            <Code>subscription_id</Code> stops the stream and is acknowledged with{' '}
            <Code>Unsubscribed</Code>.
          </p>
          <p className="text-text-secondary mb-4">
            Batch subscriptions group several queries so their changes arrive
            atomically: <Code>BatchSubscribe</Code> with{' '}
            <Code>{'{"queries": ["...", "..."], "format": ...}'}</Code> answers{' '}
            <Code>BatchSubscribed</Code> with a <Code>batch_id</Code> and one{' '}
            <Code>subscription_id</Code> per query, pushes arrive as{' '}
            <Code>BatchChange</Code> (a list of per-member entries), and the server
            signals <Code>BatchMemberClosed</Code> / <Code>BatchClosed</Code> when
            members or the whole batch end. With <Code>rbcf</Code>, batch pushes use
            the <Code>0x02</Code> binary envelope:{' '}
            <Code>[u8 0x02][u32 batch-id-length][batch id][u32 entry count]</Code>{' '}
            followed by <Code>[u32 sub-id-length][sub id][u32 rbcf-length][RBCF message]</Code>{' '}
            per entry.
          </p>
          <Callout variant="note" title="Subscriptions in the official clients are columnar">
            The server will encode subscription pushes in any of the three formats,
            but the Rust and TypeScript clients always subscribe with{' '}
            <Code>frames</Code> or <Code>rbcf</Code> - their change pipelines decode
            the columnar layout. If you write your own client, <Code>json</Code>{' '}
            pushes work; just note no shipped client exercises that path.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What about gRPC?</h2>
          <p className="text-text-secondary">
            A gRPC subsystem (protobuf-encoded frames,{' '}
            <Code>application/vnd.reifydb.proto</Code>) exists behind feature flags in
            the engine repository, but the stock server binary wires up only HTTP and
            WebSocket - it is relevant only if you assemble your own server with the
            gRPC subsystem enabled, as noted on{' '}
            <DocLink to="/docs/clients/rust">Rust (Client)</DocLink>.
          </p>
        </section>

        <Callout variant="tip" title="Where next">
          <DocLink to="/docs/connect">Connect</DocLink> covers ports, users, and
          logins; the <DocLink to="/docs/clients/overview">clients overview</DocLink>{' '}
          maps the official libraries so you only need this page when curling or
          building your own. The engine repository's <Code>crates/codec</Code> golden
          fixtures are the ground truth for byte-level RBCF work.
        </Callout>
      </div>
    </Layout>
  );
}
