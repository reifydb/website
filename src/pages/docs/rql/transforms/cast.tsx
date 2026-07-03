import { Layout } from '../../layout.tsx';
import { OperatorPage } from '../../components';

export function CastPage() {
  return (
    <Layout>
      <OperatorPage
        name="cast"
        summary="Converts a value to another type, anywhere an expression is allowed."
        syntax={`map { cast("42", int4) }`}
        description={
          <p>
            cast takes a value and a target type name. It appears in map, filter, insert
            payloads, and any other expression position. Casting a value that does not fit
            the target type is an error; this page will document the exact conversion rules
            per type pair.
          </p>
        }
        related={[
          { label: 'Data types', href: '/docs/concepts/data-types' },
          { label: 'map', href: '/docs/rql/transforms/map' },
        ]}
      />
    </Layout>
  );
}
