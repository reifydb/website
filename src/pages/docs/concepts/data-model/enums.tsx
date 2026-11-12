import { dmEnumsAggregateExample as dmEnumsAggregate, dmEnumsColumnExample as dmEnumsColumn, dmEnumsCreateExample as dmEnumsCreate, dmEnumsDropExample as dmEnumsDrop, dmEnumsDropInUseExample as dmEnumsDropInUse, dmEnumsFilterExample as dmEnumsFilter, dmEnumsOptionExample as dmEnumsOption, dmEnumsPayloadMathExample as dmEnumsPayloadMath, dmEnumsStructExample as dmEnumsStruct, dmEnumsUnknownRejectedExample as dmEnumsUnknownRejected, dmEnumsUpdateExample as dmEnumsUpdate } from './enums.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelEnumsPage() {
  return (
    <Layout
      title="Enums"
      description="Closed sets of named variants as column types: declaration, writing and reading variants by name, payload fields, and what the engine rejects."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Enums</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            An enum is a closed set of named variants, declared once and used as a
            column type. A column typed with an enum can only hold one of those
            variants, so a status, a kind, or a mode is checked by the schema instead of
            by a convention every writer has to remember. Variants may also carry typed
            fields of their own.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Declaring an enum</h2>
          <p className="text-text-secondary mb-4">
            <Code>create enum</Code> takes a namespaced name and a brace list of
            variants. Enums and{' '}
            <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">events</Link>{' '}
            share one underlying catalog kind and one variant syntax. Run the snippets on
            this page in order:
          </p>
          <ExecutableSnippet title={dmEnumsCreate.title} initialCode={dmEnumsCreate.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Enums as column types</h2>
          <p className="text-text-secondary mb-4">
            Name the enum as a column type and write a variant by its name as a string,{' '}
            <Code>'active'</Code>. Case does not matter on write, and a read gives the
            name back in lower case under the column's own name:
          </p>
          <ExecutableSnippet title={dmEnumsColumn.title} initialCode={dmEnumsColumn.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Filtering, updating, aggregating</h2>
          <p className="text-text-secondary mb-4">
            To test a row's variant, compare the column with the variant name:
          </p>
          <ExecutableSnippet title={dmEnumsFilter.title} initialCode={dmEnumsFilter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Updates assign a variant name the same way an insert does:
          </p>
          <ExecutableSnippet title={dmEnumsUpdate.title} initialCode={dmEnumsUpdate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Grouping and sorting work on the enum column directly. A sort follows the
            declaration order, not the alphabet:
          </p>
          <ExecutableSnippet title={dmEnumsAggregate.title} initialCode={dmEnumsAggregate.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Variants with payload fields</h2>
          <p className="text-text-secondary mb-4">
            A variant can declare fields in braces. Each field becomes its own stored
            column, named <Code>{'<'}column{'>'}_{'<'}variant{'>'}_{'<'}field{'>'}</Code>{' '}
            in lower case, and holds <Code>none</Code> on rows of any other variant.
            An insert names the variant and sets those columns directly:
          </p>
          <ExecutableSnippet title={dmEnumsStruct.title} initialCode={dmEnumsStruct.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Those flattened columns are ordinary columns for the rest of the pipeline.
            Filter to the variant first so the arithmetic never meets a{' '}
            <Code>none</Code>:
          </p>
          <ExecutableSnippet title={dmEnumsPayloadMath.title} initialCode={dmEnumsPayloadMath.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What the engine rejects</h2>
          <p className="text-text-secondary mb-4">
            An enum column accepts only the names its enum declares. Any other name is
            refused with <Code>CA_100</Code>:
          </p>
          <ExecutableSnippet title={dmEnumsUnknownRejected.title} initialCode={dmEnumsUnknownRejected.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An enum column can be optional. Wrap it in <Code>Option(...)</Code> and a row
            with no variant holds <Code>none</Code>:
          </p>
          <ExecutableSnippet title={dmEnumsOption.title} initialCode={dmEnumsOption.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An enum that any column still references cannot be dropped:
          </p>
          <ExecutableSnippet title={dmEnumsDropInUse.title} initialCode={dmEnumsDropInUse.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Once nothing uses it, <Code>drop enum</Code> works as expected. There is no{' '}
            <Code>alter enum</Code>; changing a variant list means dropping and
            recreating:
          </p>
          <ExecutableSnippet title={dmEnumsDrop.title} initialCode={dmEnumsDrop.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Sharp edges</h2>
          <p className="text-text-secondary mb-4">
            <Code>create enum if not exists</Code> on a name that already exists returns{' '}
            <Code>created: false</Code> and ignores the variant list you passed, even
            when it differs from the stored one.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Enum, dictionary, or plain string?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                The set of values is fixed at schema time and a wrong value is a bug:
                enum. The engine validates every write.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                The set is open but values repeat a lot: intern them in a{' '}
                <Link to="/docs/concepts/data-model/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">dictionary</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Free text: <Code>utf8</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A label on series entries rather than a column: an enum as the{' '}
                <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>{' '}
                tag. Something that happens rather than something that is: an{' '}
                <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">event</Link>.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
