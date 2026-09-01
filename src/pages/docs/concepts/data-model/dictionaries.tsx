import { dmDictionariesColumnExample as dmDictionariesColumn, dmDictionariesCreateExample as dmDictionariesCreate, dmDictionariesDeleteExample as dmDictionariesDelete, dmDictionariesDuplicateExample as dmDictionariesDuplicate, dmDictionariesExplicitIdExample as dmDictionariesExplicitId, dmDictionariesFilterEncodedExample as dmDictionariesFilterEncoded, dmDictionariesFromExample as dmDictionariesFrom, dmDictionariesNewEntryExample as dmDictionariesNewEntry, dmDictionariesSharedExample as dmDictionariesShared } from './dictionaries.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelDictionariesPage() {
  return (
    <Layout
      title="Dictionaries"
      description="How ReifyDB dictionaries intern repeated values: exact-match dedup, engine-assigned IDs, dictionary-encoded columns shared across tables, and why entries are never deleted."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Dictionaries</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A dictionary maps values of one type to compact IDs of another - classic
            interning. Store a currency code, a stock symbol, or a country name once,
            and every row that references it carries a small integer instead of the
            repeated string. This page covers how a dictionary behaves; the statement
            surface - create, insert, join, drop - is on the{' '}
            <Link to="/docs/scripting/schema/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">Dictionaries how-to page</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a dictionary</h2>
          <p className="text-text-secondary mb-4">
            The declaration names the value type and the ID type:{' '}
            <Code>create dictionary ns::name for value_type as id_type</Code>. The ID
            type is an unsigned integer and bounds how many distinct values the
            dictionary can hold. IDs start at 1 and follow insert order, so a{' '}
            <Code>uint2</Code> allows 65,535; the insert that would need one more
            fails with <Code>DICT_001</Code>. Inserting returns the assigned mapping.
            Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={dmDictionariesCreate.title} initialCode={dmDictionariesCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Interning is idempotent. Inserting a value that is already present is not
            an error and adds nothing - it returns the existing ID, so writers never
            need to check first. The match is exact: <Code>"AAPL"</Code> and{' '}
            <Code>"aapl"</Code> are two entries.
          </p>
          <ExecutableSnippet title={dmDictionariesDuplicate.title} initialCode={dmDictionariesDuplicate.code} />
          <Callout variant="warning" title="Use utf8 values and a uint ID type">
            The current build accepts a declaration whose <Code>as</Code> type is not an
            unsigned integer, but the dictionary is unusable: the first insert brings
            down the session instead of returning a typed error, and so does dropping
            it afterwards. Keep the value type <Code>utf8</Code> as well - an{' '}
            <Code>int4</Code>-valued dictionary accepts inserts and dedups them, but
            renders every value as <Code>0</Code>.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The mapping is queryable</h2>
          <p className="text-text-secondary mb-4">
            A dictionary reads like any other source - each row is an ID/value pair,
            newest entry first. <Code>filter</Code>, <Code>map</Code>, and{' '}
            <Code>join</Code> apply downstream, so a dictionary joins like any table.
            Dictionaries are catalog objects too: <Code>system::dictionaries</Code>{' '}
            lists each one with its name, value type, and ID type.
          </p>
          <ExecutableSnippet title={dmDictionariesFrom.title} initialCode={dmDictionariesFrom.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Dictionary-encoded columns</h2>
          <p className="text-text-secondary mb-4">
            The real payoff is wiring a dictionary to a table column with{' '}
            <Code>with {'{'} dictionary: ns::dict {'}'}</Code>. Writers and readers keep
            using plain strings; the engine stores and compares the compact IDs
            underneath:
          </p>
          <ExecutableSnippet title={dmDictionariesColumn.title} initialCode={dmDictionariesColumn.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Note the insert above used <Code>"NVDA"</Code>, which was not in the
            dictionary. Unknown values are interned automatically on write:
          </p>
          <ExecutableSnippet title={dmDictionariesNewEntry.title} initialCode={dmDictionariesNewEntry.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Reads go the other way. A filter written with the plain string is compared
            against the ID underneath, and a value the dictionary has never seen
            matches nothing:
          </p>
          <ExecutableSnippet title={dmDictionariesFilterEncoded.title} initialCode={dmDictionariesFilterEncoded.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Every write path through the column interns: an <Code>update</Code> that
            sets a new value adds it to the dictionary just as an insert does.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">IDs belong to the engine</h2>
          <p className="text-text-secondary mb-4">
            IDs are sequential and never reused. There is no way to choose one: an{' '}
            <Code>id</Code> field in the record is silently ignored and the entry gets
            the next ID anyway. That single ownership is what lets a stored ID mean the
            same value for the lifetime of the dictionary:
          </p>
          <ExecutableSnippet title={dmDictionariesExplicitId.title} initialCode={dmDictionariesExplicitId.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">One dictionary, many columns</h2>
          <p className="text-text-secondary mb-4">
            A dictionary is not tied to the table that first used it. Any number of
            columns, across any number of tables, can name the same dictionary, and
            they share one mapping: a value interned through one column is already
            known to the others. That is how a category set stays consistent everywhere
            it appears:
          </p>
          <ExecutableSnippet title={dmDictionariesShared.title} initialCode={dmDictionariesShared.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>"AAPL"</Code> was reused from the earlier <Code>trades</Code> insert;
            only <Code>"AMZN"</Code> was new.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Append-only by design</h2>
          <p className="text-text-secondary mb-4">
            Once <Code>"AAPL"</Code> is entry 1, every row that stores a 1 depends on
            that meaning. Rewriting or deleting the entry would silently repoint
            history, so the engine does not offer those operations:{' '}
            <Code>update</Code> and <Code>delete</Code> address tables, and a dictionary
            is not one:
          </p>
          <ExecutableSnippet title={dmDictionariesDelete.title} initialCode={dmDictionariesDelete.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A value interned by mistake stays. It costs a few bytes and references
            nothing until a row stores its ID. The only way to remove entries is to
            drop the whole dictionary, and the catalog refuses that while any column
            still references it - see the{' '}
            <Link to="/docs/scripting/schema/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">how-to page</Link>{' '}
            for the drop order.
          </p>
          <Callout variant="note" title="Append-only">
            Dictionaries support insert and read. Entries are not updated or deleted -
            an interned value keeps its ID for the lifetime of the dictionary.
          </Callout>
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
      </div>
    </Layout>
  );
}
