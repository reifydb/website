import { Link } from 'react-router-dom';
import { DocsLayout } from '../docs-layout';
import { CodeBlock, RqlCodeBlock, Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';

export function QuickStartPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Quick Start
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Get up and running with ReifyDB in minutes.
          </p>
        </div>

        {/* Start ReifyDB */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Start ReifyDB</h2>
          <p className="text-text-secondary mb-4">
            Launch the ReifyDB server:
          </p>
          <CodeBlock
            language="bash"
            code={`reifydb serve`}
          />
          <p className="text-text-muted text-sm mt-3">
            By default, ReifyDB listens on port 5432. Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs">--port</code> to change it.
          </p>
        </section>

        {/* Your First Query */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Your First Query</h2>
          <p className="text-text-secondary mb-4">
            RQL lets you query inline data directly. Click <strong>Run</strong> to try it:
          </p>
          <ExecutableSnippet
            title="Try it"
            initialCode={`from [
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"},
  {id: 3, name: "Carol", role: "user"}
]`}
          />
          <p className="text-text-muted text-sm mt-3">
            This queries an inline array of records. Great for prototyping!
          </p>
        </section>

        {/* Filtering Data */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Filtering Data</h2>
          <p className="text-text-secondary mb-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">filter</code> to select specific rows:
          </p>
          <ExecutableSnippet
            title="Try it"
            initialCode={`from [
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"},
  {id: 3, name: "Carol", role: "user"}
]
filter role == "user"`}
          />
        </section>

        {/* Selecting Columns */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Selecting Columns</h2>
          <p className="text-text-secondary mb-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">select</code> to choose which columns to return:
          </p>
          <ExecutableSnippet
            title="Try it"
            initialCode={`from [
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"},
  {id: 3, name: "Carol", role: "user"}
]
filter role == "user"
select name`}
          />
        </section>

        {/* Creating a Table */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a Table</h2>
          <p className="text-text-secondary mb-4">
            Create a persistent table to store data:
          </p>
          <RqlCodeBlock
            code={`create table app.users {
  id: int4,
  name: utf8,
  email: utf8,
  role: utf8
}`}
          />
        </section>

        {/* Inserting Data */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Inserting Data</h2>
          <p className="text-text-secondary mb-4">
            Insert records into your table:
          </p>
          <RqlCodeBlock
            code={`insert into app.users [
  {id: 1, name: "Alice", email: "alice@example.com", role: "admin"},
  {id: 2, name: "Bob", email: "bob@example.com", role: "user"}
]`}
          />
        </section>

        {/* Querying Tables */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Querying Tables</h2>
          <p className="text-text-secondary mb-4">
            Query your table just like inline data:
          </p>
          <RqlCodeBlock
            code={`from app.users
filter role == "admin"
select name, email`}
          />
        </section>

        {/* Next Steps */}
        <Callout variant="tip" title="Next Steps">
          Learn more about the query language in{' '}
          <Link to="/docs/rql/basics" className="text-primary-color hover:underline font-medium">
            RQL Basics
          </Link>.
        </Callout>
      </div>
    </DocsLayout>
  );
}
