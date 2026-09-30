import { distinctEmptyExample as distinctEmpty, distinctMultiExample as distinctMulti, distinctNoneExample as distinctNone, distinctProjectExample as distinctProject, distinctSingleExample as distinctSingle, distinctSortFirstExample as distinctSortFirst } from './distinct.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function DistinctPage() {
  return (
    <Layout
      title="distinct"
      description="How the distinct operator keeps one row per key, which row survives a tie, and how to control that with sort."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">distinct</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>distinct</Code> keeps one row per unique value of the columns you name
            and drops the rest. It does not reshape the row - every column comes through -
            it only decides which rows survive. Use it when you want the set of values
            something takes on, or one representative row per key.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">One row per key</h2>
          <p className="text-text-secondary mb-4">
            Name the key columns in braces. The first row the operator sees for each key
            survives; later rows with the same key are dropped. A bare table scan
            delivers rows newest-first, so here the newest visit per user is the one
            that survives. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={distinctSingle.title} initialCode={distinctSingle.code} />
          <p className="text-text-muted text-sm mt-3">
            Row 5 beat row 2 for <Code>grace</Code>, and row 3 beat row 1 for{' '}
            <Code>ada</Code>, because they arrived first in the scan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Multiple columns</h2>
          <p className="text-text-secondary mb-4">
            With several columns, the key is the combination. Two rows are duplicates
            only if they agree on every named column:
          </p>
          <ExecutableSnippet title={distinctMulti.title} initialCode={distinctMulti.code} />
          <p className="text-text-muted text-sm mt-3">
            Row 1 (<Code>ada</Code>, <Code>/home</Code>) now survives alongside row 3
            (<Code>ada</Code>, <Code>/docs</Code>); only row 2 is a duplicate of row 5.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Choosing which row survives</h2>
          <p className="text-text-secondary mb-4">
            "First seen" is whatever order the pipeline delivers - there is no separate
            first-inserted or last-inserted rule. To pick the survivor deliberately,{' '}
            <Link to="/docs/rql/transforms/sort" className="text-primary hover:text-primary-light font-medium transition-colors">sort</Link>{' '}
            immediately before <Code>distinct</Code>. Sorting by <Code>id</Code>{' '}
            ascending keeps the oldest visit per user instead of the newest:
          </p>
          <ExecutableSnippet title={distinctSortFirst.title} initialCode={distinctSortFirst.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same idea gives you "the highest-scoring row per group" or "the latest
            reading per sensor": sort on the tie-breaker, then <Code>distinct</Code> on
            the group key.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Just the values</h2>
          <p className="text-text-secondary mb-4">
            <Code>distinct</Code> keeps whole rows. When you only want the list of
            values, follow it with a{' '}
            <Link to="/docs/rql/transforms/map" className="text-primary hover:text-primary-light font-medium transition-colors">map</Link>{' '}
            that projects the key:
          </p>
          <ExecutableSnippet title={distinctProject.title} initialCode={distinctProject.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">none is a key value</h2>
          <p className="text-text-secondary mb-4">
            Rows whose key column is <Code>none</Code> are grouped together like any
            other value: all of them collapse to one surviving row. See{' '}
            <Link to="/docs/concepts/none" className="text-primary hover:text-primary-light font-medium transition-colors">Working with none</Link>.
          </p>
          <ExecutableSnippet title={distinctNone.title} initialCode={distinctNone.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Empty braces are not "all columns"</h2>
          <p className="text-text-secondary mb-4">
            <Code>distinct {'{}'}</Code> (and a bare <Code>distinct</Code> with no braces)
            parses, but it deduplicates on zero columns - every row has the same empty
            key, and every row survives. It is not a shortcut for whole-row
            deduplication:
          </p>
          <ExecutableSnippet title={distinctEmpty.title} initialCode={distinctEmpty.code} />
          <Callout variant="warning" title="Name the columns you mean">
            To deduplicate on the whole row, list every column explicitly:{' '}
            <Code>distinct {'{ id, user, page }'}</Code>. An empty key silently keeps
            everything.
          </Callout>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">distinct or aggregate?</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                You want one existing row per key, with all of its columns intact:{' '}
                <Code>distinct</Code>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                You want a number per key - a count, a sum, a maximum:{' '}
                <Link to="/docs/rql/transforms/aggregate" className="text-primary hover:text-primary-light font-medium transition-colors">aggregate</Link>.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Inside a{' '}
                <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">view</Link>,{' '}
                <Code>distinct</Code> is maintained incrementally: the flow engine tracks
                which keys it has seen and updates the surviving row per key as source
                rows change. Its state can be bounded with a TTL - see{' '}
                <Link to="/docs/rql/transforms/with" className="text-primary hover:text-primary-light font-medium transition-colors">the with clause</Link>.
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
