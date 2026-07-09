import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelSequencesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Sequences</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A sequence is a monotonic counter the engine maintains for ID generation.
            You rarely create one directly: declaring a column{' '}
            <Code>with {'{'} auto_increment {'}'}</Code> gives that column its own
            sequence, and the engine draws from it on every insert.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Auto-increment columns</h2>
          <p className="text-text-secondary mb-4">
            Any integer column can auto-increment. Writers simply omit the column and
            each row receives the next value - no coordination, no SELECT MAX, no
            application-side counters. Run the snippets on this page in order:
          </p>
          <ExampleSnippet id="dm-sequences-auto-increment" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Repositioning a sequence</h2>
          <p className="text-text-secondary mb-4">
            The sequence behind a column is addressed as{' '}
            <Code>namespace::table::column</Code>. <Code>alter sequence ... set
            value N</Code> repositions it; the next insert draws <Code>N + 1</Code>.
            This is how imports preserve existing IDs and how ID ranges are carved out:
          </p>
          <ExampleSnippet id="dm-sequences-alter" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Reading generated IDs back</h2>
          <p className="text-text-secondary mb-4">
            The row's generated ID is often needed immediately - to reference it, to
            return it to a client. <Code>returning</Code> hands it back from the insert
            itself, in the same statement:
          </p>
          <ExampleSnippet id="dm-sequences-returning" />
        </section>

        <Callout variant="note" title="Where else sequences appear">
          The catalog uses sequences internally to assign IDs to every object it
          manages - the IDs you see in DDL results and in{' '}
          <Link to="/docs/concepts/data-model/namespaces" className="text-primary hover:text-primary-light font-medium transition-colors">system catalog</Link>{' '}
          queries come from the same machinery.
        </Callout>
      </div>
    </Layout>
  );
}
