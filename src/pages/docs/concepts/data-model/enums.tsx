import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelEnumsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Enums</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            An enum is a named, closed set of variants declared as schema. Columns
            typed by an enum can only hold one of its variants - the database enforces
            what would otherwise be a stringly-typed convention in application code.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Declaring and using an enum</h2>
          <p className="text-text-secondary mb-4">
            Declare the variants once, then use the enum as a column type. Values are
            written as variant paths - <Code>dm_enum::status::Active</Code> - so a typo
            is a schema error, not silent bad data. Under the hood each variant is
            stored as a compact tag (its index), which is what a plain read shows. Run
            the snippets on this page in order:
          </p>
          <ExampleSnippet id="dm-enums-basic" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Variants with payloads</h2>
          <p className="text-text-secondary mb-4">
            Variants can carry typed fields, making an enum a full sum type. A column
            holding <Code>Circle {'{'} radius {'}'}</Code> or{' '}
            <Code>Rectangle {'{'} width, height {'}'}</Code> stores exactly one
            variant's payload; reads flatten the variant tag and every possible field,
            with <Code>none</Code> for fields of the variants not present:
          </p>
          <ExampleSnippet id="dm-enums-struct" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Enum, dictionary, or plain string?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Fixed set known at design time, enforced by the schema: <strong>enum</strong>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Open set discovered at runtime, stored compactly: a{' '}
                <Link to="/docs/concepts/data-model/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">dictionary</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Free-form text: a plain <Code>utf8</Code> column.
              </span>
            </li>
          </ul>
        </section>

        <Callout variant="note" title="Related type declarations">
          The same variant syntax powers two sibling primitives:{' '}
          <Link to="/docs/concepts/data-model/tags" className="text-primary hover:text-primary-light font-medium transition-colors">tags</Link>{' '}
          classify series entries, and{' '}
          <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">events</Link>{' '}
          dispatch to handlers.
        </Callout>
      </div>
    </Layout>
  );
}
