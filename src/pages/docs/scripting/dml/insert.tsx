import { insAutoIncrementExample as insAutoIncrement, insCreateExample as insCreate, insDictionaryDedupeExample as insDictionaryDedupe, insDictionaryExample as insDictionary, insMissingRequiredExample as insMissingRequired, insMultiRowExample as insMultiRow, insOptionalExample as insOptional, insReturningExample as insReturning, insRingbufferExample as insRingbuffer, insScanExample as insScan, insSeriesExample as insSeries, insTypeMismatchExample as insTypeMismatch } from './insert.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DmlInsertPage() {
  return (
    <Layout
      title="Insert"
      description="How insert adds rows to tables, ring buffers, series, and dictionaries: multi-row syntax, confirmation frames, returning, optional columns, and type checking."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Insert</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>insert</Code> adds rows to a storage shape. It always takes an array of
            records - one record per row - and each record's fields are matched against
            the target's columns by name, converted to the declared column types, and
            checked before anything is written. The statement either lands every row or
            none of them.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">One statement, one or many rows</h2>
          <p className="text-text-secondary mb-4">
            The target is named as <Code>namespace::table</Code>, and the rows follow as
            an array of <Code>{'{ field: value }'}</Code> records. A single row is just
            an array of one:
          </p>
          <ExecutableSnippet title={insCreate.title} initialCode={insCreate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An insert does not echo the rows back. It answers with a confirmation frame -
            the namespace, the target, and how many rows went in. Batching more rows into
            the same array is the natural way to load data; the whole array is written in
            one atomic step:
          </p>
          <ExecutableSnippet title={insMultiRow.title} initialCode={insMultiRow.code} />
          <ExecutableSnippet title={insScan.title} initialCode={insScan.code} />
          <p className="text-text-muted text-sm mt-3">
            A bare <Code>from</Code> returns the newest rows first; the examples on this
            page add <Code>sort</Code> where a stable order matters.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Getting the rows back with returning</h2>
          <p className="text-text-secondary mb-4">
            When the write itself produces something you need - most often a generated
            ID - append <Code>returning</Code> with the columns to project. The
            confirmation frame is replaced by the inserted rows:
          </p>
          <ExecutableSnippet title={insReturning.title} initialCode={insReturning.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Auto-increment columns</h2>
          <p className="text-text-secondary mb-4">
            A column declared <Code>with {'{'} auto_increment {'}'}</Code> is filled from
            a per-column sequence, so records simply leave it out. Combined with{' '}
            <Code>returning</Code>, the insert both assigns and reports the IDs in one
            statement:
          </p>
          <ExecutableSnippet title={insAutoIncrement.title} initialCode={insAutoIncrement.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Declaring tables, including auto-increment and primary keys, is covered in{' '}
            <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Tables</Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Optional columns and none</h2>
          <p className="text-text-secondary mb-4">
            A column declared <Code>Option(type)</Code> may be omitted from a record or
            set to <Code>none</Code> explicitly - both store the same absent value, which
            renders as <Code>⟪none⟫</Code> in results:
          </p>
          <ExecutableSnippet title={insOptional.title} initialCode={insOptional.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Every other column is required. Omitting one is the same as inserting{' '}
            <Code>none</Code> into it, and the engine rejects that with{' '}
            <Code>CONSTRAINT_007</Code> rather than invent a default:
          </p>
          <ExecutableSnippet title={insMissingRequired.title} initialCode={insMissingRequired.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Type checking happens on insert</h2>
          <p className="text-text-secondary mb-4">
            Values are converted to the column's declared type as they are written, and a
            value that cannot be converted fails the whole statement. A non-numeric
            string aimed at an integer column fails with <Code>CAST_002</Code>; a number
            outside the column type's range fails with <Code>NUMBER_002</Code>. Nothing
            is written on failure:
          </p>
          <ExecutableSnippet title={insTypeMismatch.title} initialCode={insTypeMismatch.code} />
          <Callout variant="warning" title="Unknown fields are silently ignored">
            A field in a record that matches no column is dropped without an error. A
            typo in a field name for an optional column therefore inserts{' '}
            <Code>none</Code> instead of the value you meant - check{' '}
            <Code>returning</Code> output when in doubt.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Beyond tables</h2>
          <p className="text-text-secondary mb-4">
            The same statement writes to every insertable shape, and the confirmation
            frame names the kind of target. A{' '}
            <Link to="/docs/scripting/storage/ringbuffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffer</Link>{' '}
            accepts inserts like a table and silently evicts its oldest rows once it
            reaches capacity:
          </p>
          <ExecutableSnippet title={insRingbuffer.title} initialCode={insRingbuffer.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A{' '}
            <Link to="/docs/scripting/storage/series" className="text-primary hover:text-primary-light font-medium transition-colors">series</Link>{' '}
            stores rows ordered by its declared key column:
          </p>
          <ExecutableSnippet title={insSeries.title} initialCode={insSeries.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A{' '}
            <Link to="/docs/scripting/schema/dictionaries" className="text-primary hover:text-primary-light font-medium transition-colors">dictionary</Link>{' '}
            interns values rather than storing rows, and its insert behaves accordingly:
            instead of a count, it returns the interned entries with their assigned IDs:
          </p>
          <ExecutableSnippet title={insDictionary.title} initialCode={insDictionary.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Inserting a value the dictionary already holds creates nothing new - the
            existing entry comes back with its original ID:
          </p>
          <ExecutableSnippet title={insDictionaryDedupe.title} initialCode={insDictionaryDedupe.code} />
          <Callout variant="note" title="Views are written by the engine">
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">Views</Link>{' '}
            are derived state and are not an insert target - naming one fails with{' '}
            <Code>CA_004</Code>. Write to the source tables and let the engine maintain
            the view.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Atomicity</h2>
          <p className="text-text-secondary mb-4">
            Every request runs as one transaction. A multi-row insert is atomic, and so
            is a request that combines several inserts with other statements - if any
            statement fails, every row inserted earlier in the same request is rolled
            back. How that works, and how conflicts between concurrent writers are
            retried, is covered in{' '}
            <Link to="/docs/concepts/transactions" className="text-primary hover:text-primary-light font-medium transition-colors">Transactions</Link>.
          </p>
        </section>
      </div>
    </Layout>
  );
}
