import { castStringToIntExample, castFloatTruncatesExample, castStringToDateExample, castStringToBoolExample, castColumnToTextExample, castInvalidNumberExample, castUnsupportedPairExample, castInFilterExample } from './cast.examples';
import { Layout } from '../../layout.tsx';
import { OperatorPage } from '../../components';

export function CastPage() {
  return (
    <Layout>
      <OperatorPage
        name="cast"
        summary="Converts a value to another type. Works anywhere an expression is allowed: map, extend, filter, insert payloads, and more."
        syntax={`cast(<value>, <target_type>)`}
        description={
          <p>
            The first argument is any expression; the second is a target type name such as{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">int4</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">float8</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">utf8</code>,{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">date</code>, or{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">bool</code>. A cast that
            can't be performed is an error, not a silent{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">none</code>.
          </p>
        }
        examples={[
          {
            example: castStringToIntExample,
            heading: 'String to Integer',
          },
          {
            example: castFloatTruncatesExample,
            heading: 'Float to Integer Truncates',
            note: 'Casting to an integer type truncates toward zero rather than rounding.',
          },
          {
            example: castStringToDateExample,
            heading: 'String to Date',
          },
          {
            example: castStringToBoolExample,
            heading: 'String to Boolean',
          },
          {
            example: castColumnToTextExample,
            heading: 'A Typed Column to Text',
            note: 'A column that already has a concrete type like int4 casts to text cleanly.',
          },
          {
            example: castInvalidNumberExample,
            heading: "A String That Isn't Numeric",
            note: '"abc" cannot become an int4; this fails with CAST_002, not CAST_001, because the type pair is fine but the value itself does not parse.',
          },
          {
            example: castUnsupportedPairExample,
            heading: 'An Unsupported Type Pair',
            note: 'Booleans do not cast to dates at all, regardless of value; CAST_001 again.',
          },
          {
            example: castInFilterExample,
            heading: 'cast Inside a Filter Condition',
          },
        ]}
        notes={
          <ul className="list-disc list-inside space-y-2">
            <li>
              Cast failures come from a small set of error codes: CAST_001 (the type pair itself
              is not supported), CAST_002 (numeric parse failure), CAST_003 (temporal parse
              failure), CAST_004 (boolean parse failure), CAST_005 (UUID parse failure), CAST_006
              (BLOB is not valid UTF-8).
            </li>
            <li>
              Supported cast families are broadly numeric-to-numeric, string-to-temporal, and
              boolean-to-numeric; not every type pair is meaningful, and the engine rejects the
              ones that aren't rather than guessing.
            </li>
          </ul>
        }
        related={[
          { label: 'Data types', href: '/docs/concepts/data-types' },
          { label: 'map', href: '/docs/rql/transforms/map' },
          { label: 'filter', href: '/docs/rql/transforms/filter' },
        ]}
      />
    </Layout>
  );
}
