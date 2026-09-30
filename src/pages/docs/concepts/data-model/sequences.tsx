import { dmSequencesAfterAlterExample as dmSequencesAfterAlter, dmSequencesAlterExample as dmSequencesAlter, dmSequencesAutoIncrementExample as dmSequencesAutoIncrement, dmSequencesBackwardsExample as dmSequencesBackwards, dmSequencesCatalogExample as dmSequencesCatalog, dmSequencesDuplicateExample as dmSequencesDuplicate, dmSequencesExplicitExample as dmSequencesExplicit, dmSequencesGapExample as dmSequencesGap, dmSequencesGapFailExample as dmSequencesGapFail, dmSequencesNonAutoExample as dmSequencesNonAuto, dmSequencesReturningExample as dmSequencesReturning, dmSequencesRingbufferExample as dmSequencesRingbuffer, dmSequencesTypeRejectedExample as dmSequencesTypeRejected } from './sequences.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DataModelSequencesPage() {
  return (
    <Layout
      title="Sequences"
      description="The per-column counters behind auto_increment: how values are drawn, repositioned with alter sequence, why gaps and duplicates happen, and what is rejected."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">Sequences</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            A sequence is the counter behind an <Code>auto_increment</Code> column. Every
            such column owns one; there is no standalone <Code>create sequence</Code>.
            Inserts that leave the column out draw the next value, and{' '}
            <Code>alter sequence</Code> repositions the counter when you need to. This
            page walks through what the counter does and does not guarantee.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Auto-increment columns</h2>
          <p className="text-text-secondary mb-4">
            Declare an integer column <Code>with {'{'} auto_increment {'}'}</Code> on a{' '}
            <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">table</Link>.
            The first value drawn is 1, and each insert that omits the column takes the
            next one. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={dmSequencesAutoIncrement.title} initialCode={dmSequencesAutoIncrement.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The generated value is part of the row from the start, so{' '}
            <Code>returning</Code> can hand it back in the same statement:
          </p>
          <ExecutableSnippet title={dmSequencesReturning.title} initialCode={dmSequencesReturning.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Explicit values do not move the sequence</h2>
          <p className="text-text-secondary mb-4">
            Supplying the column yourself writes that value and leaves the counter where
            it was. After inserting <Code>id: 100</Code>, the next generated id is still
            4, not 101. Importing rows with their own ids therefore needs a manual
            reposition afterwards, or a later insert will eventually catch up and
            collide:
          </p>
          <ExecutableSnippet title={dmSequencesExplicit.title} initialCode={dmSequencesExplicit.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Repositioning with alter sequence</h2>
          <p className="text-text-secondary mb-4">
            <Code>alter sequence namespace::table::column set value N</Code> sets the
            counter's current value. The confirmation echoes the new position:
          </p>
          <ExecutableSnippet title={dmSequencesAlter.title} initialCode={dmSequencesAlter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>N</Code> is the value the sequence considers already used, so the next
            insert draws <Code>N + 1</Code>:
          </p>
          <ExecutableSnippet title={dmSequencesAfterAlter.title} initialCode={dmSequencesAfterAlter.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Gaps</h2>
          <p className="text-text-secondary mb-4">
            A value is drawn when the insert runs, not when the transaction commits. If
            the request fails afterwards, the row is rolled back but the value is not
            returned to the counter. This request inserts a row and then fails on a bad
            cast:
          </p>
          <ExecutableSnippet title={dmSequencesGapFail.title} initialCode={dmSequencesGapFail.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The table does not contain "Lost", and the next id skips 102:
          </p>
          <ExecutableSnippet title={dmSequencesGap.title} initialCode={dmSequencesGap.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Deleted rows do not give their ids back either. Sequence values are unique
            and increasing within a run of successful inserts; they are not dense, and
            they are not a row count.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Moving backwards produces duplicates</h2>
          <p className="text-text-secondary mb-4">
            <Code>alter sequence</Code> accepts any value, including one below ids that
            already exist. Nothing checks the column for uniqueness on insert, so the
            counter simply hands out ids that are already taken:
          </p>
          <ExecutableSnippet title={dmSequencesBackwards.title} initialCode={dmSequencesBackwards.code} />
          <ExecutableSnippet title={dmSequencesDuplicate.title} initialCode={dmSequencesDuplicate.code} />
          <Callout variant="warning" title="Only move a sequence forward">
            Reposition to a value at or above the highest id in the table. The one
            legitimate reason to touch a sequence is a bulk import of rows that carry
            their own ids; set the value to the imported maximum right after the import.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">What the engine rejects</h2>
          <p className="text-text-secondary mb-4">
            Only auto-increment columns have a sequence to alter:
          </p>
          <ExecutableSnippet title={dmSequencesNonAuto.title} initialCode={dmSequencesNonAuto.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The column must be a plain integer type. Strings, floats, and{' '}
            <Code>Option(int)</Code> are refused at create time:
          </p>
          <ExecutableSnippet title={dmSequencesTypeRejected.title} initialCode={dmSequencesTypeRejected.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Sequences are a table feature. A{' '}
            <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffer</Link>{' '}
            accepts the <Code>auto_increment</Code> declaration but never draws from it,
            so an insert that omits the column fails on the missing value:
          </p>
          <ExecutableSnippet title={dmSequencesRingbuffer.title} initialCode={dmSequencesRingbuffer.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Catalog</h2>
          <p className="text-text-secondary mb-4">
            Sequences have no catalog table of their own. The <Code>auto_increment</Code>{' '}
            flag on <Code>system::columns</Code> tells you which columns have one; the
            current value is only visible through the ids you get back:
          </p>
          <ExecutableSnippet title={dmSequencesCatalog.title} initialCode={dmSequencesCatalog.code} />
        </section>

        <Callout variant="note" title="Catalog ids are sequences too">
          The <Code>id</Code> column in every <Code>create</Code> confirmation on these
          pages comes from the engine's own internal counters, which is why it keeps
          climbing across every object you create in a session.
        </Callout>
      </div>
    </Layout>
  );
}
