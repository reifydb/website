import { ieCreateTableExample, ieBulkInsertExample, ieVerifyCountExample } from './import-export.examples';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout, CodeBlock } from '../components';
import { ExecutableSnippet } from '@/components/ui';
import type { CodeExample } from '@/lib/examples/types';

function Snippet({ example }: { example: CodeExample }) {
  return <ExecutableSnippet title={example.title} initialCode={example.code} />;
}

export function ImportExportGuidePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Import & Export Data
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Getting data into a running database and getting a whole database back out are two
            different problems. Loading rows your application already produces is ordinary
            RQL; moving an entire database between environments is a job for the CLI or the
            embedded Rust API, not a query.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">1. Load rows with INSERT</h2>
          <p className="text-text-secondary mb-4">
            There is no separate "bulk load" statement in RQL. <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">insert</code>{' '}
            already takes an array, so loading many rows is the same statement as loading one,
            just with more elements in the array:
          </p>
          <Snippet example={ieCreateTableExample} />
          <Snippet example={ieBulkInsertExample} />
          <Snippet example={ieVerifyCountExample} />
          <p className="text-text-muted text-sm mt-3">
            For data generated outside the database, the shape of the work is: read your source
            (a CSV file, another database, an API), turn each record into an RQL{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">insert</code> array
            in your application code, and send it through. There is no server-side "import a
            CSV" statement to reach for instead.
          </p>
        </section>

        <Callout variant="warning" title="Everything below this point is not RQL">
          <p>
            Moving a whole database, schema and data together, is a capability of the{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">reifydb-cli</code>{' '}
            binary and the embedded Rust SDK, not a statement you can type at the RQL prompt.
            Nothing in this section runs in the live snippets on this page; the code blocks
            below are shell and Rust, shown for reference.
          </p>
        </Callout>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">2. Export a database to a script</h2>
          <p className="text-text-secondary mb-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">reifydb-cli local export</code>{' '}
            reads a local embedded database file and writes a self-contained{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">.rql</code> script:
            plain <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">create</code>{' '}
            statements for the schema followed by batched{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">insert</code>{' '}
            statements for the data.
          </p>
          <CodeBlock
            language="bash"
            code={`reifydb-cli local export --db ./app.db --out backup.rql`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">3. Import it somewhere else</h2>
          <p className="text-text-secondary mb-4">
            The exported script is just RQL, so loading it back is a straight replay against a
            target database:
          </p>
          <CodeBlock
            language="bash"
            code={`reifydb-cli local import --db ./restored.db --file backup.rql`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">4. Narrow what gets exported</h2>
          <p className="text-text-secondary mb-4">
            You rarely want the entire database. Filter by namespace, by specific object, or by
            kind; picking an object automatically pulls in the dictionaries and enums its
            columns depend on, so the script stays self-contained:
          </p>
          <CodeBlock
            language="bash"
            code={`# Everything in one namespace
reifydb-cli local export --db ./app.db --namespace shop --out shop.rql

# One table by name, plus anything it depends on
reifydb-cli local export --db ./app.db --object shop::products --out products.rql

# Every dictionary and enum, nothing else
reifydb-cli local export --db ./app.db --kind dictionary --kind enum --out reference.rql`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">5. Split schema from data</h2>
          <p className="text-text-secondary mb-4">
            A two-phase migration, stand up the structure, review it, then load rows, is two
            exports instead of one:
          </p>
          <CodeBlock
            language="bash"
            code={`reifydb-cli local export --db ./app.db --schema-only --out schema.rql
reifydb-cli local export --db ./app.db --data-only   --out data.rql

reifydb-cli local import --db ./target.db --file schema.rql
reifydb-cli local import --db ./target.db --file data.rql`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">--if-not-exists</code>{' '}
            makes the schema script safe to replay: without it, importing the same{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">create</code>{' '}
            statements twice fails the second time because the objects already exist.{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">--batch-size</code>{' '}
            controls how many rows land in each generated{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">insert</code>{' '}
            statement: small for diff-friendly output, large for fewer, faster statements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Same thing, from Rust</h2>
          <p className="text-text-secondary mb-4">
            Everything the CLI does is a thin wrapper over the embedded API. Reach for this
            directly when export or import is part of your application rather than a one-off
            operational task:
          </p>
          <CodeBlock
            language="rust"
            code={`use reifydb::{Database, ExportOptions, embedded};

let source = embedded::memory().build()?;
// ... write data into \`source\` ...

// Full backup: schema and data for every object, as one script.
let dump = source.export(&ExportOptions::all())?;

// Re-materialize it into a fresh database.
let restored = embedded::memory().build()?;
restored.import(&dump)?;`}
          />
          <p className="text-text-secondary mt-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">ExportOptions</code>{' '}
            is the same builder behind every CLI flag above:{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">.namespace(...)</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">.object(ns, name)</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">.kind(...)</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">.schema_only()</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">.data_only()</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">.batch_size(n)</code>,{' '}
            and <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">.if_not_exists(true)</code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Where next</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/scripting/dml/insert" className="text-primary hover:text-primary-light font-medium transition-colors">
                  Insert, Update, Delete
                </Link>{' '}
                - the statements your application uses to write data day to day
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/clients/rust-embedded" className="text-primary hover:text-primary-light font-medium transition-colors">
                  Rust (Embedded)
                </Link>{' '}
                - running ReifyDB inside your own process
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <Link to="/docs/installation" className="text-primary hover:text-primary-light font-medium transition-colors">
                  Installation
                </Link>{' '}
                - building the CLI locally
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
