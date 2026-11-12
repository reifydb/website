import { scEnumsColumnExample as scEnumsColumn, scEnumsCreateExample as scEnumsCreate, scEnumsDropExample as scEnumsDrop, scEnumsDropInUseExample as scEnumsDropInUse, scEnumsFilterExample as scEnumsFilter, scEnumsIfNotExistsExample as scEnumsIfNotExists, scEnumsInsertUnknownExample as scEnumsInsertUnknown, scEnumsPayloadExample as scEnumsPayload, scEnumsSortExample as scEnumsSort } from './enums.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function EnumsPage() {
  return (
    <Layout
      title="Enums"
      description="Declaring enums with create enum, typing table columns with them, inserting and querying variants, and the rules for dropping an enum."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Enums</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            An enum declares a closed set of variants as schema. Once a column is typed
            by an enum, only those variants can ever be stored in it - a typo becomes a
            schema error instead of silent bad data. This page covers the DDL surface:
            declaring, using, querying, and dropping enums. For when to reach for an
            enum in the first place, see{' '}
            <Link to="/docs/concepts/data-model/enums" className="text-primary hover:text-primary-light font-medium transition-colors">Enums in the data model</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Creating an enum</h2>
          <p className="text-text-secondary mb-4">
            <Code>create enum ns::name {'{'} Variant, ... {'}'}</Code> declares the type.
            Variant names are identifiers, and their order matters: it is the order a
            sort on the column follows. Enums are DDL, so the
            statement needs an admin transaction - which is what the runnable snippets
            on this page execute as. Run them in order:
          </p>
          <ExecutableSnippet title={scEnumsCreate.title} initialCode={scEnumsCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The confirmation includes the catalog id the engine assigned to the new
            type.
          </p>
          <p className="text-text-secondary mb-4">
            <Code>create enum if not exists</Code> makes the declaration idempotent -
            re-running it returns the existing type with <Code>created</Code> set to{' '}
            <Code>false</Code> instead of failing. The variant list in the repeated
            statement is not compared against the existing declaration, so keep them in
            sync yourself:
          </p>
          <ExecutableSnippet title={scEnumsIfNotExists.title} initialCode={scEnumsIfNotExists.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Typing a column with an enum</h2>
          <p className="text-text-secondary mb-4">
            Use the qualified enum name anywhere a column type goes. Values are written
            as the variant name in a string - <Code>'active'</Code> - in any case. A
            read gives the name back in lower case under the declared column name:
          </p>
          <ExecutableSnippet title={scEnumsColumn.title} initialCode={scEnumsColumn.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Variants with payloads</h2>
          <p className="text-text-secondary mb-4">
            Variants can carry typed fields, which makes an enum a full sum type. Each
            row stores exactly one variant and its payload. Every field of every
            variant is its own column, and the fields of absent variants hold{' '}
            <Code>none</Code>. An insert names the variant and sets its field columns:
          </p>
          <ExecutableSnippet title={scEnumsPayload.title} initialCode={scEnumsPayload.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The flattened names follow the pattern{' '}
            <Code>column_variant_field</Code> in lowercase:{' '}
            <Code>s_circle_radius</Code>, <Code>s_rectangle_width</Code>. Those are
            ordinary columns downstream - filter on <Code>s_circle_radius</Code> and
            only rows holding a <Code>Circle</Code> can match, because every other row
            has <Code>none</Code> there.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What insert accepts</h2>
          <p className="text-text-secondary mb-4">
            An insert accepts only a name the enum declares. Any other name is
            rejected with <Code>CA_100</Code>, so a typo fails at write time:
          </p>
          <ExecutableSnippet title={scEnumsInsertUnknown.title} initialCode={scEnumsInsertUnknown.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A raw number (<Code>status: 0</Code>) and the old variant path form
            (<Code>sc_enum::status::Active</Code>) are both rejected.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Filtering and sorting</h2>
          <p className="text-text-secondary mb-4">
            Queries compare the column with a variant name, the same form an insert
            uses:
          </p>
          <ExecutableSnippet title={scEnumsFilter.title} initialCode={scEnumsFilter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Sorting on the column orders rows by variant declaration order - the position
            in the <Code>create enum</Code> statement is the collation. If the order is
            meaningful (severity levels, lifecycle stages), declare the variants in
            that order and the sort comes for free:
          </p>
          <ExecutableSnippet title={scEnumsSort.title} initialCode={scEnumsSort.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Dropping an enum</h2>
          <p className="text-text-secondary mb-4">
            An enum cannot be dropped while any column is typed by it. The dependency
            is tracked in the catalog, and the drop fails with <Code>CA_033</Code>{' '}
            naming the exact column that still references the type:
          </p>
          <ExecutableSnippet title={scEnumsDropInUse.title} initialCode={scEnumsDropInUse.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The error's help text suggests <Code>cascade</Code>, but the current build
            does not honor it - appending <Code>cascade</Code> to the drop still fails
            with the same error. The working order is explicit: drop (or alter) the
            dependent tables first, then the enum. Both statements commit as one atomic
            request:
          </p>
          <ExecutableSnippet title={scEnumsDrop.title} initialCode={scEnumsDrop.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Unlike <Code>create</Code> confirmations, the drop confirmation carries no
            catalog id.
          </p>
        </section>

        <Callout variant="note" title="Enum, dictionary, or plain string?">
          An enum is the right tool for a fixed set known at design time. For an open
          set discovered at runtime - symbols, categories, country codes - use a{' '}
          <Link to="/docs/scripting/schema/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">dictionary</Link>:
          enums are schema, dictionaries are data. The decision guide lives in{' '}
          <Link to="/docs/concepts/data-model/enums" className="text-primary hover:text-primary-light font-medium transition-colors">the concepts page</Link>.
        </Callout>
      </div>
    </Layout>
  );
}
