import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';
import { ExampleSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelDictionariesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Dictionaries</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A dictionary maps values of one type to compact IDs of another - classic
            interning. Store a currency code, a stock symbol, or a country name once,
            and every row that references it carries a small integer instead of the
            repeated string.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a dictionary</h2>
          <p className="text-text-secondary mb-4">
            The declaration names the value type and the ID type:{' '}
            <Code>create dictionary ns::name for value_type as id_type</Code>. The ID
            type bounds how many distinct values the dictionary can hold - a{' '}
            <Code>uint2</Code> allows 65,536. Inserting returns the assigned mapping.
            Run the snippets on this page in order:
          </p>
          <ExampleSnippet id="dm-dictionaries-create" />
          <p className="text-text-secondary mt-4 mb-4">
            Inserting a value that is already interned is not an error - it returns the
            existing ID, so writers never need to check first:
          </p>
          <ExampleSnippet id="dm-dictionaries-duplicate" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The mapping is queryable</h2>
          <p className="text-text-secondary mb-4">
            A dictionary reads like any other source - each row is an ID/value pair:
          </p>
          <ExampleSnippet id="dm-dictionaries-from" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Dictionary-encoded columns</h2>
          <p className="text-text-secondary mb-4">
            The real payoff is wiring a dictionary to a table column with{' '}
            <Code>with {'{'} dictionary: ns::dict {'}'}</Code>. Writers and readers keep
            using plain strings; the engine stores and compares the compact IDs
            underneath:
          </p>
          <ExampleSnippet id="dm-dictionaries-column" />
          <p className="text-text-secondary mt-4 mb-4">
            Note the insert above used <Code>"NVDA"</Code>, which was not in the
            dictionary. Unknown values are interned automatically on write:
          </p>
          <ExampleSnippet id="dm-dictionaries-new-entry" />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">When to use one</h2>
          <p className="text-text-secondary mb-4">
            Dictionaries pay off when a string column has low cardinality relative to
            its row count - status names, symbols, categories, country codes. They are
            the wrong tool for high-cardinality values like emails or UUIDs, where
            nearly every row would add a dictionary entry. For a fixed, closed set of
            variants known at design time, consider an{' '}
            <Link to="/docs/concepts/data-model/enums" className="text-primary hover:text-primary-light font-medium transition-colors">enum</Link>{' '}
            instead: enums are schema, dictionaries are data.
          </p>
        </section>

        <Callout variant="note" title="Append-only">
          Dictionaries support insert and read. Entries are not updated or deleted -
          an interned value keeps its ID for the lifetime of the dictionary.
        </Callout>
      </div>
    </Layout>
  );
}
