import { conceptsSystemCatalogColumnsExample as syscatColumns, conceptsSystemCatalogConfigsExample as syscatConfigs, conceptsSystemCatalogCountExample as syscatCount, conceptsSystemCatalogCreateExample as syscatCreate, conceptsSystemCatalogJoinExample as syscatJoin, conceptsSystemCatalogListExample as syscatList, conceptsSystemCatalogReadOnlyExample as syscatReadOnly, conceptsSystemCatalogRolesExample as syscatRoles, conceptsSystemCatalogSelfExample as syscatSelf, conceptsSystemCatalogTablesExample as syscatTables, conceptsSystemCatalogTypesExample as syscatTypes, conceptsSystemCatalogVersionsExample as syscatVersions, conceptsSystemCatalogViewFlowExample as syscatViewFlow } from './system-catalog.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function Table({ rows }: { rows: string[][] }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2 pr-4 font-bold">Table</th>
            <th className="py-2 pr-4 font-bold">Columns</th>
            <th className="py-2 pr-4 font-bold">In this build</th>
          </tr>
        </thead>
        <tbody className="text-text-secondary">
          {rows.map((cells) => (
            <tr key={cells[0]} className="border-b border-border/50">
              <td className="py-2 pr-4 font-mono whitespace-nowrap">{cells[0]}</td>
              <td className="py-2 pr-4 font-mono text-xs">{cells[1]}</td>
              <td className="py-2 pr-4">{cells[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const schemaRows: string[][] = [
  ['namespaces', 'id, name, local_name, parent_id', 'rows: system with its config, metrics, procedures and bindings children, default, rql, and yours'],
  ['tables', 'id, namespace_id, name, primary_key_id', 'rows; panics on every read once any primary key exists'],
  ['columns', 'id, object_id, object_type, name, type, position, auto_increment, dictionary_id', 'rows; type is an id into system::types'],
  ['column_properties', 'id, column_id, type, value', 'empty'],
  ['views', 'id, namespace_id, name, kind, primary_key_id, underlying_id', 'rows once a view exists; a scan omits kind'],
  ['primary_keys', 'id, shape_id', 'rows once a primary key exists'],
  ['primary_key_columns', 'primary_key_id, column_id, position', 'rows once a primary key exists'],
  ['sequences', 'id, namespace_id, name, value', 'INTERNAL_ERROR on every read: a system sequence id is missing from the catalog'],
  ['ringbuffers', 'id, namespace_id, name, capacity, primary_key_id', 'rows: the two engine ring buffers under system::metrics'],
  ['series', 'id, namespace_id, name, tag_id, key_column, key_kind', 'rows: the 23 snapshots series under system::metrics'],
  ['dictionaries', 'id, namespace_id, name, value_type, id_type', 'empty until you create one'],
  ['enums', 'id, namespace_id, name', 'empty until you create one'],
  ['enum_variants', 'id, variant_tag, variant_name, field_count, field_index, field_name, field_type', 'one row per variant; variant names come back lower-cased'],
  ['tags, tag_variants', 'same shape as enums and enum_variants', 'empty until you create one'],
  ['events, event_variants', 'same shape as enums and enum_variants', 'empty until you create one'],
  ['handlers', 'id, namespace_id, name, on_sumtype_id, on_variant_tag', 'empty until you create one'],
  ['types', 'id, name', '27 rows'],
  ['virtual_tables', 'id, namespace_id, name, kind', '62 rows'],
  ['virtual_table_columns', 'id, vtable_id, name, type, position', '353 rows'],
  ['procedures::rql, procedures::test', 'not observable', 'empty; not listed by virtual_tables'],
  ['procedures::in_process, ::extern_c, ::extern_wasm', 'not observable', 'panics on read'],
  ['bindings::http, ::grpc, ::ws', 'not observable', 'empty; not listed by virtual_tables'],
];

const securityRows: string[][] = [
  ['identities', 'id, name, enabled', 'rows: root is always there'],
  ['identity_attributes', 'id, name, value_type', 'empty'],
  ['identity_attribute_values', 'identity, attribute_id, attribute, value', 'empty'],
  ['authentications', 'id, user_id, method', 'panics on read'],
  ['roles', 'id, name', 'empty until you create one'],
  ['granted_roles', 'identity_id, role_id', 'empty until you grant one; a scan names the first column identity'],
  ['policies', 'id, name, target_type, target_namespace, target_object, enabled', 'empty until you create one'],
  ['policy_operations', 'policy_id, operation, body_source', 'empty until you create one'],
];

const flowRows: string[][] = [
  ['flows', 'id, namespace_id, name, status', 'rows once a view exists'],
  ['flow_watermarks', 'flow_id, shape_id, lag', 'rows once a view exists; not listed by virtual_tables'],
  ['subscriptions, subscription_watermarks', 'not observable', 'empty; not listed by virtual_tables; the browser build has no subscription service'],
  ['cdc_consumers', 'consumer_id, checkpoint', 'empty'],
];

const runtimeRows: string[][] = [
  ['versions', 'name, version, description, type', '11 rows'],
  ['configs', 'key, value, default_value, description, requires_restart', '58 rows'],
  ['migrations', 'name, action, body, rollback_body', 'empty until you register one'],
  ['shapes', 'fingerprint, field_count', 'one row per distinct row layout'],
  ['shape_fields', 'fingerprint, field_index, name, type, constraint_type, constraint_p1, constraint_p2, offset, size, align', 'one row per field per layout'],
  ['shape_retention_strategies', 'shape_id, shape_type, strategy_type, cleanup_mode, value', 'panics on read'],
  ['operator_retention_strategies', 'operator_id, strategy_type, cleanup_mode, value', 'panics on read'],
  ['metrics::request_history', 'ring buffer, capacity 10000', 'empty here'],
  ['metrics::statement_stats', 'ring buffer, capacity 5000', 'empty here'],
  ['metrics::storage::<object>::current', 'id, namespace_id, tier, current and historical key, value and total bytes and counts, total_bytes', '9 tables, one per object kind; empty here'],
  ['metrics::cdc::<object>::current', 'id, namespace_id, key_bytes, value_bytes, total_bytes, count', '9 tables, one per object kind; empty here'],
  ['metrics::<domain>::snapshots', 'series keyed by ts', '23 series; empty here'],
];

export function SystemCatalogPage() {
  return (
    <Layout
      title="The System Catalog"
      description="The system:: namespace: virtual tables that expose every namespace, table, column, view, flow, role, setting and version, read with the same from as your own data."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">The System Catalog</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            ReifyDB keeps its own bookkeeping in a namespace called <Code>system</Code>.
            Every namespace, table, column, view, flow, role, setting, and version the
            engine knows about is exposed there as a virtual table: a table built from
            the catalog at read time, never stored as rows. You read it with{' '}
            <Link to="/docs/rql/transforms/from" className="text-primary hover:text-primary-light font-medium transition-colors">from</Link>,
            exactly like your own data, and the same operators apply. There is nothing
            to enable and no separate admin API to learn.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Reading the catalog</h2>
          <p className="text-text-secondary mb-4">
            Every catalog table is addressed as <Code>system::name</Code>. A good first
            query asks the engine what it is:
          </p>
          <ExecutableSnippet title={syscatVersions.title} initialCode={syscatVersions.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The playground on this site runs the <Code>@reifydb/wasm</Code> 0.10.0
            package; the engine inside it reports 0.9.3, because the version string in
            the binary lags the package version. The catalog lists itself too:{' '}
            <Code>system::virtual_tables</Code> has one row per virtual table, and the{' '}
            <Code>system</Code> namespace always has id 1:
          </p>
          <ExecutableSnippet title={syscatCount.title} initialCode={syscatCount.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Catalog tables accept every read operator -{' '}
            <Link to="/docs/rql/transforms/aggregate" className="text-primary hover:text-primary-light font-medium transition-colors">aggregate</Link>{' '}
            above, <Code>filter</Code>, <Code>sort</Code>, <Code>take</Code>, and{' '}
            <Code>map</Code> below:
          </p>
          <ExecutableSnippet title={syscatList.title} initialCode={syscatList.code} />
          <p className="text-text-secondary mt-4">
            A bare scan of a catalog table comes back in whatever order the engine
            builds it - by id for some tables, newest first for others. Add a{' '}
            <Link to="/docs/rql/transforms/sort" className="text-primary hover:text-primary-light font-medium transition-colors">sort</Link>{' '}
            whenever order matters.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Objects link by id</h2>
          <p className="text-text-secondary mb-4">
            Catalog tables point at each other by numeric id, never by name.{' '}
            <Code>system::tables.namespace_id</Code> is a <Code>system::namespaces.id</Code>;{' '}
            <Code>system::columns.object_id</Code> is the id of the table or view that owns
            the column; <Code>system::columns.type</Code> is a <Code>system::types.id</Code>.
            Looking something up is a chain: find the namespace, take its id, find its
            tables, take an id, find its columns, or let a join walk the ids for you.
            Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={syscatCreate.title} initialCode={syscatCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            With the id in hand, list the tables inside the namespace. The ids on this
            page come from a fresh engine; if you ran other pages first, take the id from
            the result above instead:
          </p>
          <ExecutableSnippet title={syscatTables.title} initialCode={syscatTables.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>primary_key_id</Code> stays <Code>none</Code> until a primary key is
            declared. The columns of a table hang off its id through <Code>object_id</Code>.
            Each column carries its position, its <Code>auto_increment</Code> flag, and a
            numeric type id:
          </p>
          <ExecutableSnippet title={syscatColumns.title} initialCode={syscatColumns.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Type ids resolve through <Code>system::types</Code>; the full list of types is
            on the{' '}
            <Link to="/docs/concepts/data-types" className="text-primary hover:text-primary-light font-medium transition-colors">Data Types</Link>{' '}
            page:
          </p>
          <ExecutableSnippet title={syscatTypes.title} initialCode={syscatTypes.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Two lookups can be one query. A{' '}
            <Link to="/docs/rql/transforms/join" className="text-primary hover:text-primary-light font-medium transition-colors">join</Link>{' '}
            over catalog tables works like any other join, in either direction; here the
            type id of every column of <Code>orders</Code> becomes its name:
          </p>
          <ExecutableSnippet title={syscatJoin.title} initialCode={syscatJoin.code} />
          <Callout variant="warning" title="Three forms to know about in this build">
            A <Code>let</Code> whose stages are chained on whitespace, such as{' '}
            <Code>let $x = from system::tables filter {'{'} ... {'}'}</Code>, parses and
            then traps the shipped browser engine (<Code>unreachable</Code>) while
            planning; that is true of every table, not only the catalog. Pipe the stages
            instead: <Code>let $x = from system::tables | filter {'{'} ... {'}'}</Code>{' '}
            works (see{' '}
            <Link to="/docs/rql/expressions/subqueries" className="text-primary hover:text-primary-light font-medium transition-colors">Subqueries</Link>).
            A subquery inside <Code>filter</Code> is a clean <Code>AST_005</Code>. A
            misspelled catalog name is not: <Code>from system::tabels</Code> traps with{' '}
            <Code>unreachable</Code> ("Unknown virtual table type"), where an unknown
            table in your own namespace fails with <Code>CA_004</Code>. A trap can leave
            the shared playground engine unusable; reload the page to recover.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The catalog describes itself</h2>
          <p className="text-text-secondary mb-4">
            <Code>system::virtual_table_columns</Code> holds the columns of every virtual
            table, keyed by <Code>vtable_id</Code>. <Code>system::tables</Code> is virtual
            table 3, so its own shape is one query away:
          </p>
          <ExecutableSnippet title={syscatSelf.title} initialCode={syscatSelf.code} />
          <p className="text-text-secondary mt-4">
            Type 13 is <Code>uint8</Code> and type 9 is <Code>utf8</Code> in{' '}
            <Code>system::types</Code>. The reference at the bottom of this page was built
            from exactly this table.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Views and flows</h2>
          <p className="text-text-secondary mb-4">
            A{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>{' '}
            is more than a row in <Code>system::views</Code>. Creating one also registers a
            flow - the dataflow graph that keeps the view current - in{' '}
            <Code>system::flows</Code>:
          </p>
          <ExecutableSnippet title={syscatViewFlow.title} initialCode={syscatViewFlow.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Security objects</h2>
          <p className="text-text-secondary mb-4">
            Identities, roles, grants, and policies are catalog objects like everything
            else. <Code>root</Code> is always present in <Code>system::identities</Code>;
            roles you create appear in <Code>system::roles</Code>, grants in{' '}
            <Code>system::granted_roles</Code>, and policies in <Code>system::policies</Code>{' '}
            with their per-operation bodies in <Code>system::policy_operations</Code>:
          </p>
          <ExecutableSnippet title={syscatRoles.title} initialCode={syscatRoles.code} />
          <p className="text-text-secondary mt-4">
            How these objects are created and enforced is covered in{' '}
            <Link to="/docs/scripting/access-control" className="text-primary hover:text-primary-light font-medium transition-colors">Access Control</Link>{' '}
            and{' '}
            <Link to="/docs/concepts/data-model/policies" className="text-primary hover:text-primary-light font-medium transition-colors">Policies</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Runtime settings and metrics</h2>
          <p className="text-text-secondary mb-4">
            <Code>system::configs</Code> lists every runtime setting with its current
            value, its default, and whether changing it needs a restart:
          </p>
          <ExecutableSnippet title={syscatConfigs.title} initialCode={syscatConfigs.code} />
          <p className="text-text-secondary mt-4">
            Changing a setting is covered in{' '}
            <Link to="/docs/operate/configuration" className="text-primary hover:text-primary-light font-medium transition-colors">Configuration</Link>.
            The engine's own telemetry lives under <Code>system::metrics</Code>: a{' '}
            <Code>current</Code> table per storage and change-log object kind,{' '}
            <Code>snapshots</Code> series for history, and the{' '}
            <Code>request_history</Code> and <Code>statement_stats</Code> ring buffers.
            They are ordinary catalog objects - <Code>system::ringbuffers</Code> and{' '}
            <Code>system::series</Code> list them - and are read with <Code>from</Code>.
            In the browser build they exist but hold no rows. See{' '}
            <Link to="/docs/operate/observability" className="text-primary hover:text-primary-light font-medium transition-colors">Observability</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The catalog is read-only</h2>
          <p className="text-text-secondary mb-4">
            Virtual tables have no rows of their own to write. <Code>insert</Code>,{' '}
            <Code>update</Code>, <Code>delete</Code>, and <Code>drop table</Code> against a{' '}
            <Code>system::</Code> table all fail with <Code>CA_004</Code>, the same "table
            not found" error an unknown table gives. The only way to change the catalog
            is DDL:{' '}
            <Code>create</Code>, <Code>alter</Code>, <Code>drop</Code>.
          </p>
          <ExecutableSnippet title={syscatReadOnly.title} initialCode={syscatReadOnly.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The build does not stop you from running{' '}
            <Code>create table system::mine {'{'} ... {'}'}</Code> - it succeeds. Do not:{' '}
            <Code>system</Code> belongs to the engine.
          </p>
          <Callout variant="warning" title="A primary key breaks system::tables in this build">
            Once any table has a primary key, every read of <Code>system::tables</Code> -
            bare, filtered, or mapped - hits the same <Code>unreachable</Code> panic in the
            shipped browser engine. The snippets on this page never declare one for that
            reason. If you ran the primary key snippet on the{' '}
            <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Tables</Link>{' '}
            page in this session, reload before reading <Code>system::tables</Code> here.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Reference: every table in this build</h2>
          <p className="text-text-secondary mb-4">
            The groups below cover all 39 virtual tables in <Code>system</Code> plus the
            metrics tables, as listed by <Code>system::virtual_tables</Code> on the
            playground engine, and the few extra names that answer a <Code>from</Code>{' '}
            without being listed. Columns come from{' '}
            <Code>system::virtual_table_columns</Code>. The last column records what a
            read returned on a fresh engine; "panics on read" means the engine lists the
            table but has no reader for it: the read traps with <Code>unreachable</Code>{' '}
            ("Unknown virtual table type"), exactly as a misspelled <Code>system::</Code>{' '}
            name does, so never put such a query in a shared playground.
          </p>
          <h3 className="text-lg font-bold mb-2">Schema objects</h3>
          <Table rows={schemaRows} />
          <h3 className="text-lg font-bold mb-2">Security</h3>
          <Table rows={securityRows} />
          <h3 className="text-lg font-bold mb-2">Flows and subscriptions</h3>
          <Table rows={flowRows} />
          <h3 className="text-lg font-bold mb-2">Runtime and metrics</h3>
          <Table rows={runtimeRows} />
          <p className="text-text-secondary">
            Migrations are covered in{' '}
            <Link to="/docs/scripting/migrations" className="text-primary hover:text-primary-light font-medium transition-colors">Migrations</Link>,
            sequences in{' '}
            <Link to="/docs/concepts/data-model/sequences" className="text-primary hover:text-primary-light font-medium transition-colors">Sequences</Link>,
            and the remaining engine quirks in{' '}
            <Link to="/docs/resources/caveats" className="text-primary hover:text-primary-light font-medium transition-colors">Caveats</Link>.
          </p>
        </section>

      </div>
    </Layout>
  );
}
