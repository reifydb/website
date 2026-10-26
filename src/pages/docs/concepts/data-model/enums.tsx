import { dmEnumsAggregateExample as dmEnumsAggregate, dmEnumsColumnExample as dmEnumsColumn, dmEnumsCreateExample as dmEnumsCreate, dmEnumsDropExample as dmEnumsDrop, dmEnumsDropInUseExample as dmEnumsDropInUse, dmEnumsFilterIsExample as dmEnumsFilterIs, dmEnumsOptionExample as dmEnumsOption, dmEnumsPayloadMathExample as dmEnumsPayloadMath, dmEnumsProjectionNoneExample as dmEnumsProjectionNone, dmEnumsStringRejectedExample as dmEnumsStringRejected, dmEnumsStructExample as dmEnumsStruct, dmEnumsUpdateExample as dmEnumsUpdate, dmEnumsViewExample as dmEnumsView, dmEnumsViewInsertExample as dmEnumsViewInsert, dmEnumsViewReadExample as dmEnumsViewRead } from './enums.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelEnumsPage() {
  return (
    <Layout
      title="Enums"
      description="Closed sets of named variants as column types: declaration, tag storage, filtering with is, payload fields, enums inside views, and what the engine rejects."
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
            variants. The confirmation calls the new object a <Code>sumtype</Code>:
            enums,{' '}
            <Link to="/docs/concepts/data-model/tags" className="text-primary hover:text-primary-light font-medium transition-colors">tags</Link>, and{' '}
            <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">events</Link>{' '}
            share one underlying catalog kind and one variant syntax. Run the snippets on
            this page in order:
          </p>
          <ExecutableSnippet title={dmEnumsCreate.title} initialCode={dmEnumsCreate.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Enums as column types</h2>
          <p className="text-text-secondary mb-4">
            Name the enum as a column type and write variants with their full path,{' '}
            <Code>namespace::enum::Variant</Code>. Storage is a small integer: the
            variant's position in the declaration, starting at 0. A read returns that
            position in a column called <Code>{'<'}column{'>'}_tag</Code>, so{' '}
            <Code>Active</Code>, <Code>Inactive</Code>, and <Code>Pending</Code> come back
            as 0, 1, and 2:
          </p>
          <ExecutableSnippet title={dmEnumsColumn.title} initialCode={dmEnumsColumn.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Filtering, updating, aggregating</h2>
          <p className="text-text-secondary mb-4">
            To test a row's variant, use <Code>is</Code> with the variant path. This is
            the one form the engine understands for variant comparison in a filter:
          </p>
          <ExecutableSnippet title={dmEnumsFilterIs.title} initialCode={dmEnumsFilterIs.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Updates assign a variant path the same way an insert does. The{' '}
            <Code>_tag</Code> column is what <Code>returning</Code> can hand back:
          </p>
          <ExecutableSnippet title={dmEnumsUpdate.title} initialCode={dmEnumsUpdate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Because the stored value is an integer, grouping and sorting by variant work
            on the <Code>_tag</Code> column directly:
          </p>
          <ExecutableSnippet title={dmEnumsAggregate.title} initialCode={dmEnumsAggregate.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Variants with payload fields</h2>
          <p className="text-text-secondary mb-4">
            A variant can declare fields in braces. Each field becomes its own stored
            column, named <Code>{'<'}column{'>'}_{'<'}variant{'>'}_{'<'}field{'>'}</Code>{' '}
            in lower case, and holds <Code>none</Code> on rows of any other variant:
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
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Enums in views</h2>
          <p className="text-text-secondary mb-4">
            A{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>{' '}
            can filter on a variant with <Code>is</Code>. Declare the view's output
            column as the flattened <Code>_tag</Code> column with type{' '}
            <Code>uint1</Code>, since that is what the source produces. Views need
            separate calls for create, write, and read:
          </p>
          <ExecutableSnippet title={dmEnumsView.title} initialCode={dmEnumsView.code} />
          <ExecutableSnippet title={dmEnumsViewInsert.title} initialCode={dmEnumsViewInsert.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Only the row whose variant matched the filter reached the view:
          </p>
          <ExecutableSnippet title={dmEnumsViewRead.title} initialCode={dmEnumsViewRead.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What the engine rejects</h2>
          <p className="text-text-secondary mb-4">
            An enum column accepts a variant path and nothing else. A string with the
            variant's name is refused with a constraint error (its message talks about
            inserting <Code>none</Code> into a <Code>Uint1</Code>, which is the tag
            column underneath):
          </p>
          <ExecutableSnippet title={dmEnumsStringRejected.title} initialCode={dmEnumsStringRejected.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An enum column can be optional. Wrap it in <Code>Option(...)</Code> and a row
            with no variant holds <Code>none</Code> in its <Code>_tag</Code> column:
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
            After flattening, the declared column name no longer names anything.
            Projecting it fails with <Code>QUERY_001</Code>. Always project the{' '}
            <Code>_tag</Code> column or a payload column:
          </p>
          <ExecutableSnippet title={dmEnumsProjectionNone.title} initialCode={dmEnumsProjectionNone.code} />
          <Callout variant="warning" title="Statements that crash the playground engine">
            Three inputs are not rejected cleanly in the current build and instead take
            down the in-browser engine, so they are not runnable here: a misspelled
            variant path in an insert, a variant path used as a plain value in{' '}
            <Code>filter</Code> or <Code>map</Code> (use <Code>is</Code> for
            comparison), and <Code>cast(text, enum)</Code>. Double-check variant paths
            before running them against a server.
          </Callout>
          <p className="text-text-secondary mt-4 mb-4">
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
                A label on series entries rather than a column type: a{' '}
                <Link to="/docs/concepts/data-model/tags" className="text-primary hover:text-primary-light font-medium transition-colors">tag</Link>.
                Something that happens rather than something that is: an{' '}
                <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">event</Link>.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
