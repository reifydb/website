import { litBooleanExample as litBoolean, litCastExample as litCast, litDateAddExample as litDateAdd, litDatePlusDurationExample as litDatePlusDuration, litDecimalExactExample as litDecimalExact, litDurationFormsExample as litDurationForms, litInvalidDateExample as litInvalidDate, litListExample as litList, litNoneExample as litNone, litNumericExample as litNumeric, litNumericTypesExample as litNumericTypes, litRangeExample as litRange, litTemporalCompareExample as litTemporalCompare, litTemporalExample as litTemporal, litTemporalTypesExample as litTemporalTypes, litTextConcatExample as litTextConcat, litTextExample as litText } from './literals.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

const th = 'text-left px-4 py-2 border-b border-border-light font-bold';
const td = 'px-4 py-2 border-b border-border-default';
const tdMono = 'px-4 py-2 border-b border-border-default font-mono text-xs';

export function LiteralsPage() {
  return (
    <Layout
      title="Literals"
      description="How to write constant values in RQL: numbers, text, booleans, none, lists, and @-prefixed temporal literals, and which type each one gets."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">Literals</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A literal is a constant written directly into an expression: <Code>42</Code>,{' '}
            <Code>"Ada"</Code>, <Code>true</Code>, <Code>none</Code>,{' '}
            <Code>[1, 2, 3]</Code>, <Code>@2024-03-15</Code>. Every literal has a type the
            moment it is parsed, and that type decides how it combines with columns and
            other values. Each snippet on this page runs on its own.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Numbers</h2>
          <p className="text-text-secondary mb-4">
            Integers and decimals are written bare, with no quotes and no suffix. A leading{' '}
            <Code>-</Code> makes a negative literal, underscores may group digits, and
            exponent notation is accepted:
          </p>
          <ExecutableSnippet title={litNumeric.title} initialCode={litNumeric.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An integer literal gets the narrowest signed type that holds it:{' '}
            <Code>int1</Code> up to 127, <Code>int2</Code> up to 32767, then{' '}
            <Code>int4</Code>, <Code>int8</Code>, and <Code>int16</Code>. Anything with a
            decimal point or an exponent is a <Code>Decimal</Code>. Arithmetic widens from
            there (see{' '}
            <Link to="/docs/rql/expressions/operators" className="text-primary hover:text-primary-light font-medium transition-colors">Operators</Link>),
            and <Code>meta::type()</Code> shows the result:
          </p>
          <ExecutableSnippet title={litNumericTypes.title} initialCode={litNumericTypes.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Decimal literals are exact base-10 values, not binary floats. They keep their
            scale through arithmetic, and <Code>0.1 + 0.2</Code> really is{' '}
            <Code>0.3</Code>:
          </p>
          <ExecutableSnippet title={litDecimalExact.title} initialCode={litDecimalExact.code} />
          <p className="text-text-secondary mt-4 mb-4">
            When a literal lands in a typed column it is converted to the column's type,
            and a value outside that type's range is a clean error rather than a wrapped or
            truncated value:
          </p>
          <ExecutableSnippet title={litRange.title} initialCode={litRange.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The current engine source also tokenizes hexadecimal, binary, and octal
            integers:
          </p>
          <RqlCodeBlock code={`map { flags: 0x1F, mask: 0b1010, mode: 0o17 }`} />
          <p className="text-text-muted text-sm mt-3">
            These prefixed forms need a newer engine than the playground runs; here they
            fail with <Code>NUMBER_001</Code>. Write the decimal value instead.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Text</h2>
          <p className="text-text-secondary mb-4">
            Text goes in double or single quotes; the two are equivalent. There are no
            escape sequences: a backslash is an ordinary character, and{' '}
            <Code>\n</Code> stays two characters. To include one kind of quote, wrap the
            literal in the other kind. A literal may span lines, and the line breaks are
            part of the value.
          </p>
          <ExecutableSnippet title={litText.title} initialCode={litText.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>+</Code> concatenates as soon as either side is text, rendering the other
            side into the string. That makes <Code>"5" + 5</Code> the text{' '}
            <Code>55</Code>; use <Code>cast()</Code> when you want the number.{' '}
            <Code>text::length()</Code> counts characters, not bytes:
          </p>
          <ExecutableSnippet title={litTextConcat.title} initialCode={litTextConcat.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Booleans</h2>
          <p className="text-text-secondary mb-4">
            <Code>true</Code> and <Code>false</Code>, unquoted. Comparisons and logical
            operators produce the same type, so a literal and a computed boolean are
            interchangeable in <Code>filter</Code>:
          </p>
          <ExecutableSnippet title={litBoolean.title} initialCode={litBoolean.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">none</h2>
          <p className="text-text-secondary mb-4">
            <Code>none</Code> is the absent value. It can be written wherever a value can:
            in an inline row, in an <Code>insert</Code> into an <Code>Option</Code> column,
            or in a <Code>map</Code>. It never equals anything, itself included -{' '}
            <Code>note == none</Code> is <Code>none</Code>, not <Code>true</Code>. Test
            for it with <Code>is::none()</Code> and <Code>is::some()</Code>:
          </p>
          <ExecutableSnippet title={litNone.title} initialCode={litNone.code} />
          <p className="text-text-muted text-sm mt-3">
            How <Code>none</Code> moves through filters, joins, and aggregates is covered in{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">Working with none</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Lists</h2>
          <p className="text-text-secondary mb-4">
            Square brackets with comma-separated values. A list is a value in its own
            right, but its main job is the right-hand side of <Code>in</Code>,{' '}
            <Code>not in</Code>, and <Code>contains</Code>:
          </p>
          <ExecutableSnippet title={litList.title} initialCode={litList.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Temporal literals</h2>
          <p className="text-text-secondary mb-4">
            An <Code>@</Code> prefix followed by an ISO 8601 form. The shape of what
            follows decides the type:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border border-border-light text-sm">
              <thead>
                <tr className="bg-[#efedfb]">
                  <th className={th}>Type</th>
                  <th className={th}>Form</th>
                  <th className={th}>Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className={td}>date</td><td className={tdMono}>@YYYY-MM-DD</td><td className={tdMono}>@2024-03-15</td></tr>
                <tr><td className={td}>time</td><td className={tdMono}>@HH:MM:SS[.fraction]</td><td className={tdMono}>@14:30:00, @14:30:00.5</td></tr>
                <tr><td className={td}>datetime</td><td className={tdMono}>@YYYY-MM-DDTHH:MM:SS[.fraction][Z]</td><td className={tdMono}>@2024-03-15T14:30:00Z</td></tr>
                <tr><td className={td}>duration</td><td className={tdMono}>@P[nY][nM][nW][nD][T[nH][nM][nS]]</td><td className={tdMono}>@P1Y2M, @PT2H30M, @P1DT2H</td></tr>
              </tbody>
            </table>
          </div>
          <ExecutableSnippet title={litTemporal.title} initialCode={litTemporal.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Times and datetimes render with nanosecond precision. A datetime is always UTC:
            the trailing <Code>Z</Code> is optional, the <Code>T</Code> separator is not,
            and a numeric offset such as <Code>+02:00</Code> is rejected. Every form is its
            own type:
          </p>
          <ExecutableSnippet title={litTemporalTypes.title} initialCode={litTemporalTypes.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Durations normalize on output: weeks become days, 90 minutes become{' '}
            <Code>1h30m</Code>, and fractional seconds show in milliseconds. Only the ISO
            form is parsed; a compact <Code>@1h30m</Code> is not a literal.
          </p>
          <ExecutableSnippet title={litDurationForms.title} initialCode={litDurationForms.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Temporal values of the same kind compare with the usual operators and with{' '}
            <Code>between</Code>:
          </p>
          <ExecutableSnippet title={litTemporalCompare.title} initialCode={litTemporalCompare.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Arithmetic between a date and a duration goes through the{' '}
            <Link to="/docs/functions/date" className="text-primary hover:text-primary-light font-medium transition-colors">date</Link>{' '}
            and{' '}
            <Link to="/docs/functions/datetime" className="text-primary hover:text-primary-light font-medium transition-colors">datetime</Link>{' '}
            modules, not through <Code>+</Code> and <Code>-</Code>:
          </p>
          <ExecutableSnippet title={litDateAdd.title} initialCode={litDateAdd.code} />
          <div className="mt-4">
            <ExecutableSnippet title={litDatePlusDuration.title} initialCode={litDatePlusDuration.code} />
          </div>
          <p className="text-text-secondary mt-4 mb-4">
            A literal that matches the pattern but names an impossible calendar value is
            rejected when the query is parsed:
          </p>
          <ExecutableSnippet title={litInvalidDate.title} initialCode={litInvalidDate.code} />
          <Callout variant="warning" title="Temporal literals inside inline rows">
            In the engine build the playground runs, a date, time, datetime, or duration
            literal used as a field of an inline row (<Code>from [{'{'} at: @2024-03-15 {'}'}]</Code>)
            comes back as <Code>none</Code>. The same literal works in <Code>map</Code>,
            in <Code>filter</Code>, and in an <Code>insert</Code> into a typed column, so put
            temporal test data in a table rather than an inline frame.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Pinning a literal's type</h2>
          <p className="text-text-secondary mb-4">
            When the inferred type is not the one you need - an <Code>int1</Code> where a
            join key is <Code>int4</Code>, a <Code>Decimal</Code> where a column is{' '}
            <Code>float4</Code>, text that should be a number - wrap the literal in{' '}
            <Link to="/docs/rql/transforms/cast" className="text-primary hover:text-primary-light font-medium transition-colors">cast</Link>:
          </p>
          <ExecutableSnippet title={litCast.title} initialCode={litCast.code} />
        </section>
      </div>
    </Layout>
  );
}
