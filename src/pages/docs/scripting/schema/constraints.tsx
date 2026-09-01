import { refConsCoercionExample as refConsCoercion, refConsDefaultIgnoredExample as refConsDefaultIgnored, refConsDefaultNotAppliedExample as refConsDefaultNotApplied, refConsKeyCatalogExample as refConsKeyCatalog, refConsKeyFreedExample as refConsKeyFreed, refConsKeyOptionalDuplicateExample as refConsKeyOptionalDuplicate, refConsKeyOptionalExample as refConsKeyOptional, refConsMaxLengthExample as refConsMaxLength, refConsMaxLengthExceededExample as refConsMaxLengthExceeded, refConsNoneRejectedExample as refConsNoneRejected, refConsOptionalExample as refConsOptional, refConsPropertyCatalogExample as refConsPropertyCatalog, refConsRangeExample as refConsRange, refConsRangeExceededExample as refConsRangeExceeded, refConsSaturationNoneExample as refConsSaturationNone, refConsSaturationRequiresOptionExample as refConsSaturationRequiresOption, refConsTypeMismatchExample as refConsTypeMismatch, refConsUnknownPropertyExample as refConsUnknownProperty, refConsUpdateNoneRejectedExample as refConsUpdateNoneRejected } from './constraints.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, CodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function ConstraintsPage() {
  return (
    <Layout
      title="Constraints"
      description="What ReifyDB checks on every write: required columns, type and range, byte-length limits, primary keys, saturation policies, and which declared properties are parsed but not enforced."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Constraints</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            A constraint is a rule the engine checks on every insert and update, and
            a write that breaks one fails as a whole. This page lists the rules the
            shipped engine enforces, the error each one raises, and the declarations
            that are accepted but not enforced yet. The statements that declare
            columns and keys are on the{' '}
            <Link to="/docs/scripting/schema/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Tables</Link>{' '}
            and{' '}
            <Link to="/docs/scripting/schema/indexes" className="text-primary hover:text-primary-light font-medium transition-colors">Indexes</Link>{' '}
            pages; this one is about what happens at write time.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Required columns</h2>
          <p className="text-text-secondary mb-4">
            A column is required unless its type is wrapped in <Code>Option(...)</Code>.
            An optional column accepts an explicit <Code>none</Code> and can be left
            out of the record, which stores <Code>none</Code> too. Run the snippets on
            this page in order:
          </p>
          <ExecutableSnippet title={refConsOptional.title} initialCode={refConsOptional.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A required column cannot take <Code>none</Code>, whether the record spells
            it out or leaves the field off. Either way the write fails with{' '}
            <Code>CONSTRAINT_007</Code>:
          </p>
          <ExecutableSnippet title={refConsNoneRejected.title} initialCode={refConsNoneRejected.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same check runs on <Code>update</Code>, so a row cannot lose a
            required value after the fact:
          </p>
          <ExecutableSnippet title={refConsUpdateNoneRejected.title} initialCode={refConsUpdateNoneRejected.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Type and range</h2>
          <p className="text-text-secondary mb-4">
            Every value is converted to its column type at the write boundary. A value
            with no reading in that type fails with a cast error: <Code>CAST_002</Code>{' '}
            for a numeric column, <Code>CAST_003</Code> for a temporal one,{' '}
            <Code>CAST_005</Code> for a uuid. The numeric case:
          </p>
          <ExecutableSnippet title={refConsTypeMismatch.title} initialCode={refConsTypeMismatch.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A value that does have a reading is converted without complaint. Numeric
            text becomes a number, and a float written to an integer column is
            truncated toward zero - <Code>5.9</Code> is stored as <Code>5</Code>, and
            nothing reports the lost fraction:
          </p>
          <ExecutableSnippet title={refConsCoercion.title} initialCode={refConsCoercion.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Integer columns also check their range. <Code>int1</Code> holds -128 to
            127:
          </p>
          <ExecutableSnippet title={refConsRange.title} initialCode={refConsRange.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Anything outside it fails with <Code>NUMBER_002</Code>, and the message
            names the valid range. Out-of-range numeric text reports{' '}
            <Code>CAST_002</Code> instead, with the same <Code>NUMBER_002</Code> as its
            cause:
          </p>
          <ExecutableSnippet title={refConsRangeExceeded.title} initialCode={refConsRangeExceeded.code} />
          <p className="text-text-secondary mt-4">
            A <Code>bool</Code> column takes <Code>true</Code> and <Code>false</Code>,
            their text forms in any case, and the numbers 0 and 1, as a number or as
            text. Any other text fails with <Code>BOOLEAN_001</Code> and any other
            number with <Code>BOOLEAN_003</Code>. Ranges for every numeric type are on the{' '}
            <Link to="/docs/concepts/data-types" className="text-primary hover:text-primary-light font-medium transition-colors">Data Types</Link>{' '}
            page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Byte-length limits</h2>
          <p className="text-text-secondary mb-4">
            <Code>utf8(n)</Code> and <Code>blob(n)</Code> cap a column at{' '}
            <Code>n</Code> bytes. The limit counts bytes, not characters, so a
            two-byte character uses two of them:
          </p>
          <ExecutableSnippet title={refConsMaxLength.title} initialCode={refConsMaxLength.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A longer value fails with <Code>CONSTRAINT_001</Code> for text and{' '}
            <Code>CONSTRAINT_002</Code> for blobs:
          </p>
          <ExecutableSnippet title={refConsMaxLengthExceeded.title} initialCode={refConsMaxLengthExceeded.code} />
          <p className="text-text-secondary mt-4">
            A size on a numeric type, such as <Code>int4(1)</Code>, is accepted by the
            parser and ignored. Only the two variable-length types carry a limit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Primary keys</h2>
          <p className="text-text-secondary mb-4">
            <Code>create primary key on ns::table {'{'} col, ... {'}'}</Code> is the
            one uniqueness rule the engine maintains. Every insert checks the key, a
            repeat fails with <Code>INDEX_001</Code>, and the whole insert rolls back.
            The{' '}
            <Link to="/docs/scripting/schema/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Tables</Link>{' '}
            page shows the basic case; three details matter beyond it. First,{' '}
            <Code>none</Code> is a key value like any other, so a key over an{' '}
            <Code>Option</Code> column allows exactly one row without a value:
          </p>
          <ExecutableSnippet title={refConsKeyOptional.title} initialCode={refConsKeyOptional.code} />
          <ExecutableSnippet title={refConsKeyOptionalDuplicate.title} initialCode={refConsKeyOptionalDuplicate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Second, a deleted row gives its key back, so the value can be inserted
            again in the same request:
          </p>
          <ExecutableSnippet title={refConsKeyFreed.title} initialCode={refConsKeyFreed.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Third, the key is recorded in the system catalog. <Code>system::primary_keys</Code>{' '}
            lists one row per key with the table it belongs to (<Code>shape_id</Code>), and{' '}
            <Code>system::primary_key_columns</Code> lists the columns of each key in
            order:
          </p>
          <ExecutableSnippet title={refConsKeyCatalog.title} initialCode={refConsKeyCatalog.code} />
          <Callout variant="warning" title="What the key does not check in this build">
            Only inserts are checked: an <Code>update</Code> that gives two rows the
            same key succeeds. Rows already in the table are not checked when the key
            is declared. A second <Code>create primary key</Code> on the same table is
            accepted and adds a second key entry instead of failing. And a key over{' '}
            <Code>utf8</Code> or <Code>blob</Code> makes every later write fail with{' '}
            <Code>CA_009</Code>. Declare one key, before the first insert, over
            fixed-size columns. Also avoid scanning <Code>system::tables</Code> once a
            key exists: in this build that read traps the engine on the{' '}
            <Code>primary_key_id</Code> column.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Saturation policies</h2>
          <p className="text-text-secondary mb-4">
            The range check above has one configurable outcome. A column property
            declared with{' '}
            <Code>create column property on ns::table::column {'{'} saturation: none {'}'}</Code>{' '}
            replaces an out-of-range value with <Code>none</Code> instead of rejecting
            the write:
          </p>
          <ExecutableSnippet title={refConsSaturationNone.title} initialCode={refConsSaturationNone.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The column has to be able to hold that <Code>none</Code>. On a required
            column the policy produces a value the column cannot store, and the write
            fails on the required-column rule instead:
          </p>
          <ExecutableSnippet title={refConsSaturationRequiresOption.title} initialCode={refConsSaturationRequiresOption.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>saturation: error</Code> is the default behaviour written down
            explicitly. A property declared this way lands in{' '}
            <Code>system::column_properties</Code> as a type and value code; saturation
            is type 1, with 1 for <Code>error</Code> and 2 for <Code>none</Code>.
            Properties written inline on a column declaration never appear there:
          </p>
          <ExecutableSnippet title={refConsPropertyCatalog.title} initialCode={refConsPropertyCatalog.code} />
          <Callout variant="warning" title="Only error and none, and only through create column property">
            Any other saturation value, and a <Code>default</Code> property declared
            through <Code>create column property</Code>, reach an unimplemented path in
            this build and trap the engine. In the playground that leaves every open
            snippet unusable until the page is reloaded. The inline form on a column
            declaration is safe but inert; see below.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Declared but not enforced</h2>
          <p className="text-text-secondary mb-4">
            A column declaration accepts four property names after <Code>with</Code>:
          </p>
          <CodeBlock
            language="rql"
            code={`create table ns::name {
  id: int8 with { auto_increment },
  label: utf8 with { dictionary: ns::labels },
  level: int1 with { saturation: error },
  qty: int4 with { default: 1 }
}`}
          />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>auto_increment</Code> and <Code>dictionary</Code> do what they say;
            see{' '}
            <Link to="/docs/concepts/data-model/sequences" className="text-primary hover:text-primary-light font-medium transition-colors">Sequences</Link>{' '}
            and{' '}
            <Link to="/docs/scripting/schema/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">Dictionaries</Link>.
            Anything else is rejected, and the error lists the accepted names:
          </p>
          <ExecutableSnippet title={refConsUnknownProperty.title} initialCode={refConsUnknownProperty.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The inline <Code>saturation</Code> and <Code>default</Code> forms are
            parsed and then dropped. A table declares them without complaint:
          </p>
          <ExecutableSnippet title={refConsDefaultIgnored.title} initialCode={refConsDefaultIgnored.code} />
          <p className="text-text-secondary mt-4 mb-4">
            But an insert that relies on the default finds nothing there:
          </p>
          <ExecutableSnippet title={refConsDefaultNotApplied.title} initialCode={refConsDefaultNotApplied.code} />
          <p className="text-text-secondary mt-4">
            There is no <Code>unique</Code> property, no inline <Code>primary key</Code>{' '}
            on a column, and no executed <Code>create index</Code>; the{' '}
            <Link to="/docs/scripting/schema/indexes" className="text-primary hover:text-primary-light font-medium transition-colors">Indexes</Link>{' '}
            page covers what the parser accepts there. Where you need a default today,
            supply the value in the insert or make the column <Code>Option</Code>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Errors</h2>
          <ul className="list-disc pl-6 space-y-2 text-text-secondary">
            <li>
              <Code>CONSTRAINT_007</Code> - <Code>none</Code> written to a required
              column, on insert or update, explicitly or by omission.
            </li>
            <li>
              <Code>CAST_002</Code> / <Code>CAST_003</Code> / <Code>CAST_005</Code> - a
              value with no reading as a number, a temporal value, or a uuid.
            </li>
            <li>
              <Code>NUMBER_002</Code> - an integer outside the column type's range.
            </li>
            <li>
              <Code>BOOLEAN_001</Code> / <Code>BOOLEAN_003</Code> - text or a number
              with no boolean reading written to a <Code>bool</Code> column.
            </li>
            <li>
              <Code>CONSTRAINT_001</Code> / <Code>CONSTRAINT_002</Code> - a{' '}
              <Code>utf8(n)</Code> or <Code>blob(n)</Code> value over its byte limit.
            </li>
            <li>
              <Code>INDEX_001</Code> - an insert repeats a primary key.
            </li>
            <li>
              <Code>CA_009</Code> - a write to a table whose key includes a
              variable-length column.
            </li>
            <li>
              <Code>AST_011</Code> - an unknown column property name.
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
