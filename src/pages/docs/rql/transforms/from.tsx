import { Layout } from '../../layout.tsx';
import { OperatorPage } from '../../components';
import {
  fromTableExample,
  fromInlineSingleExample,
  fromInlineMultiExample,
  fromInlineTypesExample,
  fromEmptyExample,
} from './from.examples';

export function FromPage() {
  return (
    <Layout>
      <OperatorPage
        name="from"
        summary="Starts a pipeline by naming its data source: a table, a view, a system vtable, or inline records."
        syntax={`from namespace::table
from namespace::view
from system::vtable
from [{ field: value, ... }, ...]`}
        description={
          <p>
            Every query begins with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">from</code>.
            The source can be a table, a view, a system vtable such as{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">system::metrics</code>, or an inline
            array of records. A table or view source is always written as{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">namespace::name</code>; there is no
            bare, unqualified table name in RQL.
          </p>
        }
        examples={[
          {
            example: fromTableExample,
            heading: 'From a Table',
            note: 'namespace::table. Every object reference in RQL is namespaced the same way.',
          },
          {
            example: fromInlineSingleExample,
            heading: 'From a Single Inline Record',
            note: 'No schema required. Useful for prototyping an expression before you have a table to back it.',
          },
          {
            example: fromInlineMultiExample,
            heading: 'From Multiple Inline Records',
          },
          {
            example: fromInlineTypesExample,
            heading: 'Inline Records with Mixed Types',
            note: 'Columns from an inline source are sorted alphabetically by name, not by the order fields were written. Columns from a table follow the order in the table definition.',
          },
          {
            example: fromEmptyExample,
            heading: 'Empty Source',
            note: 'A valid, structurally distinct query. Downstream operators run against zero rows rather than erroring.',
          },
        ]}
        notes={
          <ul className="list-disc list-inside space-y-2">
            <li>
              <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">from table</code> and{' '}
              <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">from [{'{...}'}]</code> are
              structurally different query forms, even when they happen to produce the same rows.
            </li>
            <li>
              A table scan with no explicit <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">sort</code> returns
              rows in reverse insertion order (most recently inserted first). Add{' '}
              <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">sort</code> if you need a
              specific order; scan order is an implementation detail, not a guarantee.
            </li>
          </ul>
        }
        related={[
          { label: 'filter', href: '/docs/rql/transforms/filter' },
          { label: 'map', href: '/docs/rql/transforms/map' },
          { label: 'sort', href: '/docs/rql/transforms/sort' },
        ]}
      />
    </Layout>
  );
}
