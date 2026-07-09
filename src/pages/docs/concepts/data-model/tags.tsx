import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelTagsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Tags</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A tag is a named set of variants used to classify data - most prominently
            the entries of a{' '}
            <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>.
            Where an{' '}
            <Link to="/docs/concepts/data-model/enums" className="text-primary hover:text-primary-light font-medium transition-colors">enum</Link>{' '}
            types a column and an{' '}
            <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">event</Link>{' '}
            triggers handlers, a tag labels rows: same variant syntax, different role.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Declaring a tag</h2>
          <p className="text-text-secondary mb-4">
            Variants can be bare labels or carry typed payload fields. Here{' '}
            <Code>Sensor</Code> records where a reading came from, while{' '}
            <Code>Manual</Code> is a plain marker. Run the snippets on this page in
            order:
          </p>
          <ExampleSnippet id="dm-tags-create" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Attaching it to a series</h2>
          <p className="text-text-secondary mb-4">
            A series opts into classification with{' '}
            <Code>with {'{'} tag: ns::tag_type {'}'}</Code>. Entries can then be
            labeled with a variant - which sensor produced the value, whether a record
            was entered by hand - without adding columns to the series schema itself:
          </p>
          <ExampleSnippet id="dm-tags-series" />
        </section>

        <Callout variant="note" title="Classification, not dispatch">
          Tags describe data at rest. If you need variants that trigger behavior when
          something happens, declare an{' '}
          <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">event</Link>{' '}
          and attach handlers to it.
        </Callout>
      </div>
    </Layout>
  );
}
