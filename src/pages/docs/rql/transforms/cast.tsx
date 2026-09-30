import { castColumnExample as castColumn, castFloat4NoiseExample as castFloat4Noise, castFloatTruncatesExample as castFloatTruncates, castInArithmeticExample as castInArithmetic, castInFilterExample as castInFilter, castInInsertExample as castInInsert, castInvalidNumberExample as castInvalidNumber, castNoneExample as castNone, castOutOfRangeExample as castOutOfRange, castStringToIntExample as castStringToInt, castStringToTemporalExample as castStringToTemporal, castToBoolExample as castToBool, castUnsupportedPairExample as castUnsupportedPair, castWholeStatementFailsExample as castWholeStatementFails } from './cast.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function CastPage() {
  return (
    <Layout
      title="cast"
      description="How cast converts a value to another type in RQL: which conversions exist, how they truncate, how none passes through, and the error codes a failed cast raises."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">cast</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            <Code>cast(value, type)</Code> converts a value to another type. It is an
            expression, so it works anywhere one is allowed - in{' '}
            <Link to="/docs/rql/transforms/map" className="text-primary hover:text-primary-light font-medium transition-colors">map</Link>,{' '}
            <Link to="/docs/rql/transforms/filter" className="text-primary hover:text-primary-light font-medium transition-colors">filter</Link>,{' '}
            <Link to="/docs/rql/transforms/extend" className="text-primary hover:text-primary-light font-medium transition-colors">extend</Link>,
            and insert payloads. A conversion that cannot be done is an error that
            fails the statement, never a silent <Code>none</Code> or a wrong value.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The common conversions</h2>
          <p className="text-text-secondary mb-4">
            The second argument is a bare type name:{' '}
            <Code>int1</Code> through <Code>int16</Code>, <Code>uint1</Code> through{' '}
            <Code>uint16</Code>, <Code>float4</Code>, <Code>float8</Code>,{' '}
            <Code>bool</Code>, <Code>utf8</Code> (or <Code>text</Code>),{' '}
            <Code>date</Code>, <Code>time</Code>, <Code>datetime</Code>,{' '}
            <Code>duration</Code>, and the UUID types. See{' '}
            <Link to="/docs/concepts/data-types" className="text-primary hover:text-primary-light font-medium transition-colors">Data Types</Link>.
            Text parses into numbers:
          </p>
          <ExecutableSnippet title={castStringToInt.title} initialCode={castStringToInt.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A float cast to an integer type is truncated toward zero, not rounded:
          </p>
          <ExecutableSnippet title={castFloatTruncates.title} initialCode={castFloatTruncates.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Text parses into temporal types in ISO 8601 form. Dates are{' '}
            <Code>YYYY-MM-DD</Code>; datetimes add a <Code>T</Code> and a time, and are
            stored in UTC with nanosecond precision:
          </p>
          <ExecutableSnippet title={castStringToTemporal.title} initialCode={castStringToTemporal.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Booleans come from the words <Code>true</Code> and <Code>false</Code>, or
            from the numbers <Code>1</Code> and <Code>0</Code> - any other number is a{' '}
            <Code>CAST_004</Code> error:
          </p>
          <ExecutableSnippet title={castToBool.title} initialCode={castToBool.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Casting columns</h2>
          <p className="text-text-secondary mb-4">
            The usual job is fixing up a column that arrived as text. Surrounding
            whitespace is ignored, and text with a fractional part is truncated the
            same way a float is. Numbers cast to <Code>utf8</Code> in the other
            direction. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={castColumn.title} initialCode={castColumn.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A cast inside <Code>filter</Code> lets you compare a text column as a
            number instead of as a string - <Code>"7" &gt;= "12"</Code> would be true
            as text:
          </p>
          <ExecutableSnippet title={castInFilter.title} initialCode={castInFilter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Arithmetic does not convert text for you; cast first, then multiply:
          </p>
          <ExecutableSnippet title={castInArithmetic.title} initialCode={castInArithmetic.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same expression works in an insert payload, which is how temporal
            columns are usually filled from literals:
          </p>
          <ExecutableSnippet title={castInInsert.title} initialCode={castInInsert.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">none passes through</h2>
          <p className="text-text-secondary mb-4">
            Casting <Code>none</Code> yields <Code>none</Code> of the target type; it is
            never an error. Optional columns therefore cast cleanly row by row. See{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">Working with none</Link>.
          </p>
          <ExecutableSnippet title={castNone.title} initialCode={castNone.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">When a cast fails</h2>
          <p className="text-text-secondary mb-4">
            Failures fall into a small set of codes. <Code>CAST_002</Code> means the type
            pair is fine but the value does not parse as a number:
          </p>
          <ExecutableSnippet title={castInvalidNumber.title} initialCode={castInvalidNumber.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A value that parses but does not fit the target's range is also{' '}
            <Code>CAST_002</Code>; the message names the valid range. There is no
            wrap-around:
          </p>
          <ExecutableSnippet title={castOutOfRange.title} initialCode={castOutOfRange.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A cast is evaluated for every row, and one bad row fails the whole statement.
            You never get partial output with a <Code>none</Code> where the bad value
            was. Because the statement fails, the insert in the same request is rolled
            back too (see{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>):
          </p>
          <ExecutableSnippet title={castWholeStatementFails.title} initialCode={castWholeStatementFails.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>CAST_001</Code> is different: the type pair itself has no conversion,
            whatever the value:
          </p>
          <ExecutableSnippet title={castUnsupportedPair.title} initialCode={castUnsupportedPair.code} />
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-bold">Code</th>
                  <th className="py-2 pr-4 font-bold">Meaning</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border"><td className="py-2 pr-4"><Code>CAST_001</Code></td><td className="py-2 pr-4">No conversion exists between the two types</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4"><Code>CAST_002</Code></td><td className="py-2 pr-4">Number does not parse or is out of range</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4"><Code>CAST_003</Code></td><td className="py-2 pr-4">Date, time, datetime, or duration does not parse</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4"><Code>CAST_004</Code></td><td className="py-2 pr-4">Boolean does not parse (text not true/false, number not 0/1)</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4"><Code>CAST_005</Code></td><td className="py-2 pr-4">UUID does not parse</td></tr>
                <tr><td className="py-2 pr-4"><Code>CAST_006</Code></td><td className="py-2 pr-4">Blob is not valid UTF-8</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">float4 and precision</h2>
          <p className="text-text-secondary mb-4">
            A <Code>float4</Code> column reads back clean (<Code>89.99</Code>), but the
            value it actually holds is the nearest 32-bit float. Casting it to{' '}
            <Code>float8</Code>, or doing arithmetic on it, exposes those extra digits.
            This is not a bug in <Code>cast</Code>; it is what the column stores. Use{' '}
            <Code>float8</Code> for values you will widen or compute with:
          </p>
          <ExecutableSnippet title={castFloat4Noise.title} initialCode={castFloat4Noise.code} />
        </section>

        <Callout variant="tip" title="Pinning a literal's type">
          Bare numeric literals have a generic integer or float type that is inferred
          from context. When a literal must have a specific stored type - for a join
          key, or a column whose type the engine cannot infer - wrap it:{' '}
          <Code>cast(1, int4)</Code>. See{' '}
          <Link to="/docs/rql/transforms/join" className="text-primary hover:text-primary-light font-medium transition-colors">join</Link>{' '}
          for why this matters.
        </Callout>
      </div>
    </Layout>
  );
}
