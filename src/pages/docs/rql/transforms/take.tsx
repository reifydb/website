import { takeAfterFilterExample as takeAfterFilter, takeBasicExample as takeBasic, takeInUpdateExample as takeInUpdate, takeMoreThanAvailableExample as takeMoreThanAvailable, takeTopNExample as takeTopN, takeVariableExample as takeVariable, takeZeroExample as takeZero } from './take.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function TakePage() {
  return (
    <Layout
      title="take"
      description="How the take operator caps a pipeline at N rows, why it belongs after sort, and how it bounds update and delete statements."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">take</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">
            <Code>take N</Code> passes through the first N rows that reach it and stops.
            It is the row cap of a pipeline - what other query languages call{' '}
            <Code>limit</Code>. Which rows count as "first" is decided by everything
            before it, which is why <Code>take</Code> is almost always preceded by a{' '}
            <Link to="/docs/rql/transforms/sort" className="text-primary hover:text-primary-light font-medium transition-colors">sort</Link>.
          </p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">The first N rows</h2>
          <p className="text-text-secondary mb-4">
            On a bare table scan, "first" means newest, because scans deliver rows
            newest-first. Run the snippets on this page in order:
          </p>
          <ExecutableSnippet title={takeBasic.title} initialCode={takeBasic.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Top N: sort, then take</h2>
          <p className="text-text-secondary mb-4">
            Put the order you care about in front of the cap. The largest three events
            by size:
          </p>
          <ExecutableSnippet title={takeTopN.title} initialCode={takeTopN.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>take</Code> sees only what earlier stages let through. A filter before
            it narrows the candidates; a sort before it picks which candidates come
            first:
          </p>
          <ExecutableSnippet title={takeAfterFilter.title} initialCode={takeAfterFilter.code} />
          <Callout variant="tip" title="Order matters">
            <Code>take 3 sort {'{ size: desc }'}</Code> takes three arbitrary rows and
            then sorts those three. <Code>sort {'{ size: desc }'} take 3</Code> gives you
            the top three. Write the sort first.
          </Callout>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Edge values</h2>
          <p className="text-text-secondary mb-4">
            <Code>take 0</Code> is legal and yields no rows:
          </p>
          <ExecutableSnippet title={takeZero.title} initialCode={takeZero.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A count larger than the input is not an error - you get everything there is:
          </p>
          <ExecutableSnippet title={takeMoreThanAvailable.title} initialCode={takeMoreThanAvailable.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The count must be a non-negative integer literal or a variable holding one.
            Braces are optional: <Code>take {'{ 2 }'}</Code> is the same as{' '}
            <Code>take 2</Code>. Inside a script, a variable works as the count:
          </p>
          <ExecutableSnippet title={takeVariable.title} initialCode={takeVariable.code} />
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Bounding a mutation</h2>
          <p className="text-text-secondary mb-4">
            <Code>update</Code> and <Code>delete</Code> accept <Code>take</Code> after
            their <Code>filter</Code>, capping how many matching rows the statement
            touches. Rows are taken from the newest end of the table, so this updates
            the most recent <Code>view</Code> event only:
          </p>
          <ExecutableSnippet title={takeInUpdate.title} initialCode={takeInUpdate.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>take 0</Code> on a mutation matches nothing and changes nothing. There
            is no <Code>sort</Code> on a mutation, so the cap is "the newest N matching
            rows", not an arbitrary N. See{' '}
            <Link to="/docs/concepts/data-model/tables" className="text-primary hover:text-primary-light font-medium transition-colors">Tables</Link>{' '}
            for the full <Code>update</Code> and <Code>delete</Code> forms.
          </p>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">take inside a view</h2>
          <p className="text-text-secondary mb-4">
            In a{' '}
            <Link to="/docs/concepts/data-model/views" className="text-primary hover:text-primary-light font-medium transition-colors">deferred view</Link>,{' '}
            <Code>from source take N</Code> is maintained as "the N newest source rows":
            new inserts push the oldest rows out of the view, and deleting one of the N
            promotes the next candidate in. For a bounded recent-history store with the
            same shape and no view to maintain, a{' '}
            <Link to="/docs/concepts/data-model/ring-buffers" className="text-primary hover:text-primary-light font-medium transition-colors">ring buffer</Link>{' '}
            is the direct alternative.
          </p>
        </section>
      </div>
    </Layout>
  );
}
