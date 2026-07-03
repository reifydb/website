import { Layout } from '../../layout.tsx';
import { OperatorPage } from '../../components';

export function FromPage() {
  return (
    <Layout>
      <OperatorPage
        name="from"
        summary="Starts a pipeline by naming its data source: a table, a view, or inline records."
        syntax={`from namespace::source`}
        description={
          <p>
            Every query begins with from. The source can be a table, a view, a system vtable
            such as system::metrics, or an inline array of records.
          </p>
        }
        examples={[
          { exampleId: 'transform-from' },
          {
            exampleId: 'rql5-inline',
            note: 'Inline records need no schema; useful for prototyping an expression.',
          },
        ]}
        related={[
          { label: 'filter', href: '/docs/rql/transforms/filter' },
          { label: 'map', href: '/docs/rql/transforms/map' },
        ]}
      />
    </Layout>
  );
}
