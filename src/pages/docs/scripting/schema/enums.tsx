import { scEnumsCastExample as scEnumsCast, scEnumsColumnExample as scEnumsColumn, scEnumsCreateExample as scEnumsCreate, scEnumsDropExample as scEnumsDrop, scEnumsDropInUseExample as scEnumsDropInUse, scEnumsFilterExample as scEnumsFilter, scEnumsIfNotExistsExample as scEnumsIfNotExists, scEnumsInsertStringExample as scEnumsInsertString, scEnumsPayloadExample as scEnumsPayload, scEnumsSortExample as scEnumsSort } from './enums.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function EnumsPage() {
  return (
    <Layout
      title="Enums"
      description="Declaring enums with create enum, typing table columns with them, inserting and querying variants, and the rules for dropping an enum."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Enums</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            An enum declares a closed set of variants as schema. Once a column is typed
            by an enum, only those variants can ever be stored in it - a typo becomes a
            schema error instead of silent bad data. This page covers the DDL surface:
            declaring, using, querying, and dropping enums. For when to reach for an
            enum in the first place, see{' '}
            <Link to="/docs/concepts/data-model/enums" className="text-primary hover:text-primary-light font-medium transition-colors">Enums in the data model</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Creating an enum</h2>
          <p className="text-text-secondary mb-4">
            <Code>create enum ns::name {'{'} Variant, ... {'}'}</Code> declares the type.
            Variant names are identifiers, and their order matters: each variant is
            assigned a tag equal to its position in the declaration, starting at 0, and
            that tag is what the engine physically stores. Enums are DDL, so the
            statement needs an admin transaction - which is what the runnable snippets
            on this page execute as. Run them in order:
          </p>
          <ExecutableSnippet title={scEnumsCreate.title} initialCode={scEnumsCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The confirmation includes the catalog id the engine assigned to the new
            type. Note the column header: <Code>sumtype</Code>, not <Code>enum</Code> -
            internally an enum is a sum type, and the confirmation leaks that name.
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
          <h2 className="text-2xl font-black tracking-tight mb-4">Typing a column with an enum</h2>
          <p className="text-text-secondary mb-4">
            Use the qualified enum name anywhere a column type goes. Values are written
            as fully qualified variant paths - <Code>sc_enum::status::Active</Code>.
            On disk the column holds only the compact tag, and a read exposes it as a
            flattened <Code>_tag</Code> column:
          </p>
          <ExecutableSnippet title={scEnumsColumn.title} initialCode={scEnumsColumn.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The declared column was <Code>status</Code>, but the result shows{' '}
            <Code>status_tag</Code> with the variant indices (0 for{' '}
            <Code>Active</Code>, 1 for <Code>Inactive</Code>, 2 for{' '}
            <Code>Pending</Code>). This flattening is the same scheme joins use for
            aliased columns: the logical name is a prefix, and every physical part of
            the value gets its own column.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Variants with payloads</h2>
          <p className="text-text-secondary mb-4">
            Variants can carry typed fields, which makes an enum a full sum type. Each
            row stores exactly one variant and its payload; a read flattens the tag and
            every field of every variant, filling the fields of absent variants with{' '}
            <Code>none</Code>:
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
          <h2 className="text-2xl font-black tracking-tight mb-4">What insert accepts</h2>
          <p className="text-text-secondary mb-4">
            The only accepted value form is the fully qualified variant path. A plain
            string that happens to spell a variant name is not resolved to one - the
            value fails to map onto the tag column and the insert is rejected. The
            error is phrased in terms of the physical storage: the string produces{' '}
            <Code>none</Code>, and the non-optional tag column refuses it:
          </p>
          <ExecutableSnippet title={scEnumsInsertString.title} initialCode={scEnumsInsertString.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Writing the raw tag number (<Code>status: 0</Code>) is rejected the same
            way. The variant path is deliberately the single point of entry: it is the
            only form the parser can check against the declaration.
          </p>
          <Callout variant="note" title="Spell the path correctly">
            A misspelled variant name in an otherwise well-formed path (for example{' '}
            <Code>sc_enum::status::Actve</Code>) is not caught cleanly in the current
            engine build - it brings down the session instead of returning a typed
            error. Until that is fixed upstream, treat variant paths as
            copy-paste-from-the-declaration material.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Filtering, sorting, and casting</h2>
          <p className="text-text-secondary mb-4">
            After flattening, queries work with the physical <Code>_tag</Code> column,
            and the tag behaves like the small unsigned integer it is. Filtering on a
            variant's index selects exactly that variant:
          </p>
          <ExecutableSnippet title={scEnumsFilter.title} initialCode={scEnumsFilter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Sorting on the tag orders rows by variant declaration order - the position
            in the <Code>create enum</Code> statement is the collation. If the order is
            meaningful (severity levels, lifecycle stages), declare the variants in
            that order and the sort comes for free:
          </p>
          <ExecutableSnippet title={scEnumsSort.title} initialCode={scEnumsSort.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The tag also casts like any integer - here to text:
          </p>
          <ExecutableSnippet title={scEnumsCast.title} initialCode={scEnumsCast.code} />
          <p className="text-text-secondary mt-4 mb-4">
            There is no built-in function to render a tag back into its variant name,
            and <Code>cast</Code> from a string to an enum type is not supported in the
            current build. If you need the names in query output, keep a small lookup
            table or a{' '}
            <Link to="/docs/scripting/schema/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">dictionary</Link>{' '}
            alongside the enum and join on the tag.
          </p>
          <Callout variant="warning" title="The logical column name does not survive flattening">
            After a read, <Code>status</Code> no longer exists - only{' '}
            <Code>status_tag</Code> does. The two failure modes differ:{' '}
            <Code>sort {'{'} status: asc {'}'}</Code> fails loudly with{' '}
            <Code>QUERY_001</Code> (column not found), but{' '}
            <Code>filter {'{'} status == 0 {'}'}</Code> silently matches nothing,
            because a comparison against a missing column yields <Code>none</Code>.
            Always use the <Code>_tag</Code> name in query expressions. Variant-path
            literals (<Code>status_tag == sc_enum::status::Active</Code>) are not
            usable in filters in the current build either - compare against the
            numeric tag.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Dropping an enum</h2>
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
            catalog id - and it says <Code>enum</Code>, not <Code>sumtype</Code>.
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
