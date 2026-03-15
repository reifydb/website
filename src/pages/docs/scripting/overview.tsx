import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function ScriptingOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Scripting
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB's scripting language lets you define schemas, manipulate data, create views,
            procedures, events, tests, and more — all in a single coherent system.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Define Schema</h2>
          <ExecutableSnippet
            title="Create a Table"
            initialCode={getExampleById('scripting-create-table')!.code}
          />
          <p className="text-text-secondary mt-4">
            Namespaces organize your tables. Every table lives inside a namespace.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Insert and Query</h2>
          <ExecutableSnippet
            title="Insert and Query"
            initialCode={getExampleById('scripting-insert-basic')!.code}
          />
          <p className="text-text-secondary mt-4">
            Insert rows, then query them with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">FROM</code>.
            Everything is transactional.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Built-in Testing</h2>
          <ExecutableSnippet
            title="Testing"
            initialCode={getExampleById('scripting-create-test')!.code}
          />
          <p className="text-text-secondary mt-4">
            Write tests alongside your schema. Seed data with test procedures, assert results inline.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What's Covered</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Link to="/docs/scripting/schema/namespaces" className="text-primary hover:text-primary-light font-medium transition-colors">Schema</Link> — Namespaces, tables, enums, dictionaries</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Link to="/docs/scripting/storage/ringbuffers" className="text-primary hover:text-primary-light font-medium transition-colors">Storage Types</Link> — Ringbuffers, series, tags</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Link to="/docs/scripting/dml/insert" className="text-primary hover:text-primary-light font-medium transition-colors">Data Manipulation</Link> — Insert, update, delete</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Link to="/docs/scripting/views" className="text-primary hover:text-primary-light font-medium transition-colors">Views</Link> — Deferred and transactional materialized views</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Link to="/docs/scripting/procedures" className="text-primary hover:text-primary-light font-medium transition-colors">Procedures</Link> — Reusable logic with parameters and control flow</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Link to="/docs/scripting/events" className="text-primary hover:text-primary-light font-medium transition-colors">Events</Link> — Event-driven state transitions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Link to="/docs/scripting/testing" className="text-primary hover:text-primary-light font-medium transition-colors">Testing</Link> — Built-in test framework</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span><Link to="/docs/scripting/migrations" className="text-primary hover:text-primary-light font-medium transition-colors">Migrations</Link> — Schema versioning with rollback</span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
