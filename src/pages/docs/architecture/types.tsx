import { dtBigIntExample as dtBigInt, dtCastErrorExample as dtCastError, dtCastExample as dtCast, dtFloatDecimalExample as dtFloatDecimal, dtIdsBlobExample as dtIdsBlob, dtInsertCoercionExample as dtInsertCoercion, dtLiteralTypesExample as dtLiteralTypes, dtOptionExample as dtOption, dtRangeErrorExample as dtRangeError, dtScalarExample as dtScalar, dtStringConcatExample as dtStringConcat, dtTemporalExample as dtTemporal, dtWideningExample as dtWidening } from './types.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function DocLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">{children}</Link>;
}

const typeRows: Array<[string, string, string, string]> = [
  ['int1', 'signed integer', '-128 to 127', '42'],
  ['int2', 'signed integer', '-32,768 to 32,767', '42'],
  ['int4', 'signed integer', '-2,147,483,648 to 2,147,483,647', '42'],
  ['int8', 'signed integer', '-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807', '42'],
  ['int16', 'signed integer', '-1.7e38 to 1.7e38 (128 bits)', '42'],
  ['uint1', 'unsigned integer', '0 to 255', '42'],
  ['uint2', 'unsigned integer', '0 to 65,535', '42'],
  ['uint4', 'unsigned integer', '0 to 4,294,967,295', '42'],
  ['uint8', 'unsigned integer', '0 to 18,446,744,073,709,551,615', '42'],
  ['uint16', 'unsigned integer', '0 to 3.4e38 (128 bits)', '42'],
  ['int, uint', 'big integer', 'no fixed range', '42'],
  ['float4', 'binary float', 'about 7 significant digits, up to 3.4e38', '19.99'],
  ['float8', 'binary float', 'about 15 significant digits, up to 1.7e308', '19.99'],
  ['decimal', 'exact decimal', 'arbitrary precision', '10.5'],
  ['bool', 'boolean', 'true or false (boolean is an alias)', 'true'],
  ['utf8', 'text', 'UTF-8 string (text is an alias)', '"Widget"'],
  ['blob', 'bytes', 'renders as 0x hex', 'blob::hex("48656c6c6f")'],
  ['date', 'calendar day', 'YYYY-MM-DD', '@2024-03-15'],
  ['datetime', 'instant', 'UTC, nanosecond precision, renders with a Z suffix', '@2024-03-15T14:30:00Z'],
  ['time', 'time of day', 'HH:MM:SS with optional fraction', '@14:30:00'],
  ['duration', 'span of time', 'ISO-8601 in, compact form out (1d2h30m)', 'cast("P1DT2H30M", duration)'],
  ['uuid4, uuid7', 'identifier', 'random (v4) or time-ordered (v7) UUID', 'cast("550e8400-...", uuid4)'],
  ['identity_id', 'identifier', 'a UUID that names an identity', 'identity::id()'],
  ['Option(T)', 'optional', 'T or none', 'none'],
];

export function TypesPage() {
  return (
    <Layout
      title="Data Types"
      description="Every ReifyDB column and expression has a type: the integer and float sizes, decimal, text, blob, the four temporal types, UUIDs, Option(T), and how literals, arithmetic, inserts, and cast move between them."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Data Types</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Every column and every expression in RQL has a type, and the engine checks it
            at plan time rather than at read time. The type system is small and explicit:
            integers come in fixed widths, floats are binary, <Code>decimal</Code> is
            exact, and there are four temporal types instead of one. Values move between
            types by three routes - literal inference, arithmetic widening, and{' '}
            <Code>cast</Code> - and this page shows what each of them does.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The type families</h2>
          <p className="text-text-secondary mb-4">
            Column types are written in lowercase in <Code>create table</Code>;{' '}
            <Code>meta::type()</Code> reports the same types in CamelCase (<Code>Int4</Code>,{' '}
            <Code>Utf8</Code>, <Code>Option(Utf8)</Code>).
          </p>
          <div className="border border-border-light overflow-x-auto rounded-md">
            <table className="w-full text-sm">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Type</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Kind</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Range or form</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Literal</th>
                </tr>
              </thead>
              <tbody>
                {typeRows.map(([name, kind, range, literal]) => (
                  <tr key={name} className="border-t border-border-light">
                    <td className="p-2 sm:p-3"><Code>{name}</Code></td>
                    <td className="p-2 sm:p-3 text-text-secondary">{kind}</td>
                    <td className="p-2 sm:p-3 text-text-secondary">{range}</td>
                    <td className="p-2 sm:p-3"><Code>{literal}</Code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            Declare one column of each scalar family and read the row back. Run the
            snippets on this page in order:
          </p>
          <ExecutableSnippet title={dtScalar.title} initialCode={dtScalar.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Temporal types</h2>
          <p className="text-text-secondary mb-4">
            There are four temporal types, and they do not convert into one another
            implicitly: <Code>date</Code> is a calendar day, <Code>datetime</Code> is an
            instant, <Code>time</Code> is a time of day, and <Code>duration</Code> is a
            span. Temporal literals start with <Code>@</Code>:{' '}
            <Code>@2024-03-15</Code>, <Code>@14:30:00</Code>,{' '}
            <Code>@2024-03-15T14:30:00Z</Code>. Fractions of a second are allowed down
            to nanoseconds. A <Code>datetime</Code> is always UTC - the <Code>Z</Code> is
            optional on input and a numeric offset such as <Code>+02:00</Code> is
            rejected (<Code>TEMPORAL_003</Code>). Durations have no literal form; build
            them from an ISO-8601 string with <Code>cast</Code>:
          </p>
          <ExecutableSnippet title={dtTemporal.title} initialCode={dtTemporal.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Note the rendered forms: <Code>datetime</Code> and <Code>time</Code> always
            show nine fractional digits, and a duration prints in its compact form
            (<Code>1d2h30m</Code>, <Code>10d</Code>, <Code>1y2mo</Code>). The{' '}
            <Code>+</Code> operator does not accept temporal operands
            (<Code>OPERATOR_017</Code>); date arithmetic goes through functions such as{' '}
            <DocLink to="/docs/functions/date/add">date::add</DocLink>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Identifiers and bytes</h2>
          <p className="text-text-secondary mb-4">
            <Code>uuid4</Code> and <Code>uuid7</Code> are distinct types; parse one from
            text with <Code>cast</Code>, or generate one with <Code>uuid::v4()</Code> and{' '}
            <Code>uuid::v7()</Code>. A <Code>blob</Code> is raw bytes, built with the{' '}
            <Code>blob::hex</Code>, <Code>blob::utf8</Code>, <Code>blob::b64</Code>, and{' '}
            <Code>blob::b58</Code> decoders and always rendered as hex:
          </p>
          <ExecutableSnippet title={dtIdsBlob.title} initialCode={dtIdsBlob.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What type a literal gets</h2>
          <p className="text-text-secondary mb-4">
            An integer literal is typed as the <em>smallest</em> signed integer that holds
            it: <Code>42</Code> is an <Code>Int1</Code>, <Code>1_000_000</Code> an{' '}
            <Code>Int4</Code>, <Code>3_000_000_000</Code> an <Code>Int8</Code>. Underscores
            are allowed as digit separators. A literal with a fraction or an exponent is
            a <Code>Decimal</Code>, not a float - <Code>4.2</Code> and <Code>1e3</Code>{' '}
            are exact. <Code>none</Code> on its own has no concrete inner type yet:
          </p>
          <ExecutableSnippet title={dtLiteralTypes.title} initialCode={dtLiteralTypes.code} />
          <p className="text-text-secondary mt-4 mb-4">
            When the literal is written into a column, the column's declared type wins;
            the literal's own type only matters inside expressions. To pin an expression
            to a specific type, wrap it in <Code>cast</Code> - see{' '}
            <DocLink to="/docs/rql/expressions/literals">Literals</DocLink>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Ranges are enforced</h2>
          <p className="text-text-secondary mb-4">
            A fixed-width column rejects any value outside its range with{' '}
            <Code>NUMBER_002</Code>; nothing is silently wrapped or clamped. Because a
            request is one transaction, a failed insert rolls back everything else in the
            same request:
          </p>
          <ExecutableSnippet title={dtRangeError.title} initialCode={dtRangeError.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The 128-bit types are the widest fixed sizes; beyond them, <Code>int</Code>{' '}
            and <Code>uint</Code> have no range at all:
          </p>
          <ExecutableSnippet title={dtBigInt.title} initialCode={dtBigInt.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Arithmetic widens the result</h2>
          <p className="text-text-secondary mb-4">
            An operator's result type is one step wider than its widest operand, so an
            addition of two <Code>int1</Code> values cannot overflow - it yields an{' '}
            <Code>Int2</Code>. Two <Code>int4</Code> values produce an <Code>Int8</Code>,
            an <Code>int4</Code> with an <Code>int8</Code> produces an{' '}
            <Code>Int16</Code>, and mixing signed with unsigned lands on the signed side.
            Combining an integer with a <Code>float4</Code> gives <Code>Float8</Code>;
            combining it with a decimal literal gives <Code>Decimal</Code>:
          </p>
          <ExecutableSnippet title={dtWidening.title} initialCode={dtWidening.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The widening applies to the value, not only its label: <Code>127 + 1</Code>{' '}
            on two <Code>int1</Code> operands really is <Code>128</Code>. For arithmetic
            that must stay in a fixed width, or that must saturate or wrap instead of
            widening, use the explicit{' '}
            <DocLink to="/docs/functions/arithmetic-policies">arithmetic policy functions</DocLink>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Floats and decimals</h2>
          <p className="text-text-secondary mb-4">
            <Code>float4</Code> and <Code>float8</Code> are IEEE binary floats;{' '}
            <Code>decimal</Code> is an exact, arbitrary-precision number. Literal
            arithmetic is decimal, so <Code>0.1 + 0.2</Code> is exactly <Code>0.3</Code>.
            A <Code>float4</Code> column reads back clean, but the moment its value goes
            through arithmetic or a cast the 32-bit precision shows:
          </p>
          <ExecutableSnippet title={dtFloatDecimal.title} initialCode={dtFloatDecimal.code} />
          <Callout variant="tip" title="Which numeric type?">
            Counts, ids, and quantities: a fixed-width integer sized to the data. Money and
            anything compared for equality: <Code>decimal</Code>. Measurements where speed
            matters more than the last digit: <Code>float8</Code>. Reach for{' '}
            <Code>float4</Code> only when storage size is the constraint and you accept
            noise in derived values.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Inserts convert to the column type</h2>
          <p className="text-text-secondary mb-4">
            An <Code>insert</Code> applies the same rules as <Code>cast</Code> to every
            field: text that parses as a number goes into an integer column, a number
            goes into a text column, and a fractional value going into an integer column
            is truncated toward zero. Only an out-of-range or unparsable value is an
            error:
          </p>
          <ExecutableSnippet title={dtInsertCoercion.title} initialCode={dtInsertCoercion.code} />
          <Callout variant="warning" title="Truncation is silent">
            <Code>2.9</Code> into an <Code>int4</Code> column stored <Code>2</Code> with no
            error and no warning. If a fractional value reaching an integer column is a
            bug in your application, validate it before the write - the engine will not
            flag it.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Explicit conversion with cast</h2>
          <p className="text-text-secondary mb-4">
            <Code>cast(value, type)</Code> is the one explicit conversion. Text parses into
            every numeric, temporal, boolean, and UUID type; numbers convert between
            widths and to <Code>bool</Code> (0 is <Code>false</Code>, 1 is <Code>true</Code>); a float or
            decimal cast to an integer is truncated:
          </p>
          <ExecutableSnippet title={dtCast.title} initialCode={dtCast.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A cast fails loudly when the value cannot be represented. The error code says
            why: <Code>CAST_001</Code> for an unsupported pair of types (a{' '}
            <Code>datetime</Code> to a <Code>date</Code>, for instance),{' '}
            <Code>CAST_002</Code> for a number that does not parse or does not fit,{' '}
            <Code>CAST_003</Code> for temporal text, <Code>CAST_004</Code> for boolean
            text, <Code>CAST_005</Code> for a UUID, <Code>CAST_006</Code> for a blob that
            is not valid UTF-8:
          </p>
          <ExecutableSnippet title={dtCastError.title} initialCode={dtCastError.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The full operator is covered on the{' '}
            <DocLink to="/docs/rql/transforms/cast">cast</DocLink> page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Option(T) and none</h2>
          <p className="text-text-secondary mb-4">
            A column is required unless declared <Code>Option(type)</Code>. An optional
            column with no value holds <Code>none</Code>, which is a value of type{' '}
            <Code>Option(T)</Code>, not a separate type - so a filled and an empty cell
            of the same column report the same type:
          </p>
          <ExecutableSnippet title={dtOption.title} initialCode={dtOption.code} />
          <p className="text-text-secondary mt-4 mb-4">
            How <Code>none</Code> behaves in expressions, filters, joins, and aggregates
            has its own page:{' '}
            <DocLink to="/docs/concepts/none">Working with none</DocLink>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Text</h2>
          <p className="text-text-secondary mb-4">
            <Code>utf8</Code> (or <Code>text</Code>) is the only string type; there is no
            fixed-length or byte-string variant. <Code>+</Code> between a string and any
            other value converts the other value to text and concatenates:
          </p>
          <ExecutableSnippet title={dtStringConcat.title} initialCode={dtStringConcat.code} />
        </section>

        <Callout variant="note" title="Types you will see but cannot declare">
          <Code>meta::type()</Code> can report a few types that are not column types:{' '}
          <Code>Option(Any)</Code> for a bare <Code>none</Code>, <Code>List(T)</Code> for
          a list literal, and record and tuple types inside scripts. They exist for
          expressions; a table column is always one of the types in the table above.
        </Callout>
      </div>
    </Layout>
  );
}
