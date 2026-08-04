import { scDictCreateExample as scDictCreate, scDictDeleteErrorExample as scDictDeleteError, scDictDropExample as scDictDrop, scDictDropInUseExample as scDictDropInUse, scDictDuplicateExample as scDictDuplicate, scDictEncodedExample as scDictEncoded, scDictExplicitIdExample as scDictExplicitId, scDictFilterExample as scDictFilter, scDictIfNotExistsExample as scDictIfNotExists, scDictInsertExample as scDictInsert, scDictInternedExample as scDictInterned, scDictJoinExample as scDictJoin, scDictScanExample as scDictScan, scDictUpdateErrorExample as scDictUpdateError } from './dictionaries.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DictionariesPage() {
  return (
    <Layout
      title="Dictionaries"
      description="Creating dictionaries with create dictionary ... for ... as ..., interning values, querying and joining the mapping, and the append-only operation surface."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Dictionaries</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A dictionary interns values: it assigns each distinct value a compact
            integer ID, once, and hands the same ID back every time that value appears
            again. Rows then carry the small ID instead of the repeated string. This
            page covers the DDL and query surface; the design reasoning lives in{' '}
            <Link to="/docs/concepts/data-model/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">Dictionaries in the data model</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating a dictionary</h2>
          <p className="text-text-secondary mb-4">
            The declaration is{' '}
            <Code>create dictionary ns::name for value_type as id_type</Code>.{' '}
            <Code>for</Code> names the type of the values being interned;{' '}
            <Code>as</Code> names the type of the assigned IDs. The ID type must be an
            unsigned integer type (<Code>uint1</Code>, <Code>uint2</Code>,{' '}
            <Code>uint4</Code>, <Code>uint8</Code>, or <Code>uint16</Code>), and it
            bounds the dictionary's capacity - a <Code>uint2</Code> can distinguish
            65,536 values. Dictionaries are DDL, so creation needs an admin
            transaction, which is what the runnable snippets on this page execute as.
            Run them in order:
          </p>
          <ExecutableSnippet title={scDictCreate.title} initialCode={scDictCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Like every <Code>create</Code>, the confirmation carries the catalog id the
            engine assigned. <Code>create dictionary if not exists</Code> makes the
            statement idempotent - re-running it returns the existing dictionary with{' '}
            <Code>created</Code> set to <Code>false</Code>:
          </p>
          <ExecutableSnippet title={scDictIfNotExists.title} initialCode={scDictIfNotExists.code} />
          <Callout variant="warning" title="Pick a real unsigned ID type">
            The current build accepts a declaration whose <Code>as</Code> type is not
            an unsigned integer (for example <Code>as utf8</Code>) but the resulting
            dictionary is unusable - the first insert brings down the session instead
            of returning a typed error. Declare the ID type as one of the{' '}
            <Code>uint</Code> types, always.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Inserting entries</h2>
          <p className="text-text-secondary mb-4">
            An insert sends records with a single <Code>value</Code> field. The engine
            assigns IDs sequentially starting at 1, and the confirmation returns the
            full mapping for every record in the batch:
          </p>
          <ExecutableSnippet title={scDictInsert.title} initialCode={scDictInsert.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Interning is idempotent by design. Inserting a value that already exists is
            not an error and does not create a second entry - it returns the existing
            ID. Writers never need to check first, which is what makes dictionaries
            safe to feed from concurrent ingestion paths:
          </p>
          <ExecutableSnippet title={scDictDuplicate.title} initialCode={scDictDuplicate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            IDs are always engine-assigned. There is no way to choose one: an{' '}
            <Code>id</Code> field in the record is silently ignored and the entry gets
            the next sequential ID anyway. That is a consequence of the contract - an
            ID, once assigned, must never be reused or reassigned, so the engine keeps
            sole ownership of the counter:
          </p>
          <ExecutableSnippet title={scDictExplicitId.title} initialCode={scDictExplicitId.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Querying the mapping</h2>
          <p className="text-text-secondary mb-4">
            A dictionary is a readable source like any table or view - each row is an
            ID/value pair. A bare scan returns entries newest-first, the same order
            convention as tables:
          </p>
          <ExecutableSnippet title={scDictScan.title} initialCode={scDictScan.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The full pipeline vocabulary applies downstream of <Code>from</Code> -
            filter, map, aggregate, join. A point lookup is just a filter:
          </p>
          <ExecutableSnippet title={scDictFilter.title} initialCode={scDictFilter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Because the mapping is queryable, translating stored IDs back into values
            is an ordinary join. Joined columns flatten to{' '}
            <Code>alias_column</Code> names, so the dictionary's{' '}
            <Code>value</Code> arrives as <Code>c_value</Code> here:
          </p>
          <ExecutableSnippet title={scDictJoin.title} initialCode={scDictJoin.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Insert and from are the whole surface</h2>
          <p className="text-text-secondary mb-4">
            Dictionaries are append-only on purpose. Once <Code>"USD"</Code> is entry
            1, every row that ever stored a 1 depends on that meaning - rewriting or
            deleting the entry would silently repoint history. So the engine simply
            does not offer those operations: <Code>update</Code> and{' '}
            <Code>delete</Code> address tables, and a dictionary is not a table:
          </p>
          <ExecutableSnippet title={scDictUpdateError.title} initialCode={scDictUpdateError.code} />
          <ExecutableSnippet title={scDictDeleteError.title} initialCode={scDictDeleteError.code} />
          <p className="text-text-secondary mt-4 mb-4">
            If a value was interned by mistake, the entry stays - it costs a few bytes
            and references nothing until a row actually stores its ID. The only way to
            remove entries is to drop the whole dictionary.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Dictionary-encoded columns</h2>
          <p className="text-text-secondary mb-4">
            Explicit inserts and joins are the manual gears. The integrated form wires
            a dictionary to a table column with{' '}
            <Code>with {'{'} dictionary: ns::dict {'}'}</Code>: writers and readers use
            plain values, and the engine stores and compares the compact IDs
            underneath. Values not yet in the dictionary are interned automatically on
            write:
          </p>
          <ExecutableSnippet title={scDictEncoded.title} initialCode={scDictEncoded.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The insert above used <Code>"NOK"</Code>, which the dictionary had never
            seen. It was assigned the next ID as part of the write:
          </p>
          <ExecutableSnippet title={scDictInterned.title} initialCode={scDictInterned.code} />
          <p className="text-text-secondary mt-4 mb-4">
            One dictionary can back any number of columns across tables, which is how
            the same category set stays consistent everywhere it appears.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Dropping a dictionary</h2>
          <p className="text-text-secondary mb-4">
            The catalog tracks which columns reference a dictionary, and a dictionary
            that is still referenced cannot be dropped - the attempt fails with{' '}
            <Code>CA_032</Code> naming the dependent column:
          </p>
          <ExecutableSnippet title={scDictDropInUse.title} initialCode={scDictDropInUse.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Drop the dependent tables first, then the dictionary. Both statements run
            in one request, so they commit atomically:
          </p>
          <ExecutableSnippet title={scDictDrop.title} initialCode={scDictDrop.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Dropping the dictionary discards the entire mapping. Any IDs you copied
            into plain integer columns (as in the join example above) become
            meaningless numbers - only <Code>with {'{'} dictionary {'}'}</Code> columns
            are tracked as dependencies.
          </p>
        </section>

        <Callout variant="note" title="Dictionary or enum?">
          A dictionary holds an open set that grows at runtime. If the set is fixed
          and known at design time - lifecycle states, severity levels - declare an{' '}
          <Link to="/docs/scripting/schema/enums" className="text-primary hover:text-primary-light font-medium transition-colors">enum</Link>{' '}
          instead and let the schema enforce it: enums are schema, dictionaries are
          data.
        </Callout>
      </div>
    </Layout>
  );
}
