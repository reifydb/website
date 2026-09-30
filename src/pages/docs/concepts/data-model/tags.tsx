import { dmTagsCatalogExample as dmTagsCatalog, dmTagsCreateExample as dmTagsCreate, dmTagsDuplicateExample as dmTagsDuplicate, dmTagsInsertExample as dmTagsInsert, dmTagsMissingExample as dmTagsMissing, dmTagsNoDropExample as dmTagsNoDrop, dmTagsSeriesExample as dmTagsSeries } from './tags.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelTagsPage() {
  return (
    <Layout
      title="Tags"
      description="Closed sets of labels for classifying series entries: declaring a tag type, attaching it to a series, labelling rows on insert, and the current limits."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Tags</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            A tag is a closed set of labels, declared once and attached to a{' '}
            <Link to="/docs/concepts/data-model/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>.
            Each entry in the series can then carry one label - where a reading came
            from, why an audit record was written - without adding a column for every
            such distinction. The variant syntax is shared with{' '}
            <Link to="/docs/concepts/data-model/enums" className="text-primary hover:text-primary-light font-medium transition-colors">enums</Link>{' '}
            and{' '}
            <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">events</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Declaring a tag type</h2>
          <p className="text-text-secondary mb-4">
            <Code>create tag</Code> takes a namespaced name and a brace list of variants.
            A variant can carry typed fields (<Code>Sensor {'{'} location: utf8 {'}'}</Code>)
            or be a bare label (<Code>Manual</Code>). Unlike most <Code>create</Code>{' '}
            statements, the confirmation has no <Code>id</Code> column. Run the snippets
            on this page in order:
          </p>
          <ExecutableSnippet title={dmTagsCreate.title} initialCode={dmTagsCreate.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Attaching a tag to a series</h2>
          <p className="text-text-secondary mb-4">
            A series names its tag type in the <Code>with</Code> clause next to the
            required <Code>key</Code>. One series has at most one tag type; the tag type
            can be shared by many series:
          </p>
          <ExecutableSnippet title={dmTagsSeries.title} initialCode={dmTagsSeries.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Labelling entries on insert</h2>
          <p className="text-text-secondary mb-4">
            Each inserted row may include a <Code>tag</Code> field holding a variant,
            written by its bare name rather than a full path. Payload variants take their
            fields in braces. The field is optional; rows without it are accepted:
          </p>
          <ExecutableSnippet title={dmTagsInsert.title} initialCode={dmTagsInsert.code} />
          <Callout variant="warning" title="Labels are not readable back in the current build">
            The <Code>tag</Code> column renders <Code>0</Code> for every row above,
            whether the row was labelled <Code>Sensor</Code>, <Code>Manual</Code>, or not
            at all. Inserts are not validated against the tag type either: an unknown
            variant name or a payload of the wrong type is accepted silently, and a
            series declared without a tag type still accepts a <Code>tag</Code> field.
            Treat tags as declared intent for now. If you need to filter or group by a
            classification today, store it in an ordinary column, or use an{' '}
            <Link to="/docs/concepts/data-model/enums" className="text-primary hover:text-primary-light font-medium transition-colors">enum</Link>{' '}
            column on a table.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What the engine rejects</h2>
          <p className="text-text-secondary mb-4">
            The tag type named by a series must already exist in the catalog:
          </p>
          <ExecutableSnippet title={dmTagsMissing.title} initialCode={dmTagsMissing.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Tag names are unique within a namespace, and redeclaring one is an error even
            with a different variant list:
          </p>
          <ExecutableSnippet title={dmTagsDuplicate.title} initialCode={dmTagsDuplicate.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Catalog and lifecycle</h2>
          <p className="text-text-secondary mb-4">
            Tag types are listed in <Code>system::tags</Code> with their <Code>id</Code>,{' '}
            <Code>namespace_id</Code>, and <Code>name</Code>:
          </p>
          <ExecutableSnippet title={dmTagsCatalog.title} initialCode={dmTagsCatalog.code} />
          <p className="text-text-secondary mt-4 mb-4">
            There is no <Code>drop tag</Code> in the grammar. A tag type stays in its
            namespace once created, and its name cannot be reused, so pick names with
            some care:
          </p>
          <ExecutableSnippet title={dmTagsNoDrop.title} initialCode={dmTagsNoDrop.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Tag, enum, or event?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A label on entries of a series, chosen per row: tag.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                A column type on a table that the engine validates and that you can
                filter and group on: an{' '}
                <Link to="/docs/concepts/data-model/enums" className="text-primary hover:text-primary-light font-medium transition-colors">enum</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Something that happens and should trigger handlers: an{' '}
                <Link to="/docs/concepts/data-model/events" className="text-primary hover:text-primary-light font-medium transition-colors">event</Link>.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
