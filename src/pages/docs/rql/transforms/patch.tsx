import { patchAddExample as patchAdd, patchAfterMapExample as patchAfterMap, patchChainedExample as patchChained, patchDownstreamFilterExample as patchDownstreamFilter, patchDuplicateNameExample as patchDuplicateName, patchEmptyInputExample as patchEmptyInput, patchExtendCollisionExample as patchExtendCollision, patchInlineExample as patchInline, patchMixedExample as patchMixed, patchNoBracesExample as patchNoBraces, patchNoneExample as patchNone, patchReadsInputExample as patchReadsInput, patchReplaceExample as patchReplace, patchSameBlockReferenceExample as patchSameBlockReference, patchTypeExample as patchType, patchUnaliasedExample as patchUnaliased } from './patch.examples';
import { ExecutableSnippet } from '@/components/ui';
import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { Callout, RqlCodeBlock } from '../../components';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#efedfb] px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

export function PatchPage() {
  return (
    <Layout
      title="patch"
      description="The patch operator sets columns on every row: an existing name is overwritten in place, a new name is appended on the right; unlike extend it never rejects a name that already exists."
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4">patch</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            <Code>patch</Code> sets columns. Name a column that already exists and its
            values are replaced, in the same position; name one that does not and it is
            appended on the right. It never removes a column and never changes the row
            count. Where{' '}
            <Link to="/docs/rql/transforms/extend" className="text-primary hover:text-primary-light font-medium transition-colors">extend</Link>{' '}
            refuses to touch an existing column, <Code>patch</Code> is the operator for
            changing one in place - normalising a value, defaulting a field, rewriting a
            status - without listing every other column the way{' '}
            <Link to="/docs/rql/transforms/map" className="text-primary hover:text-primary-light font-medium transition-colors">map</Link>{' '}
            requires.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Syntax</h2>
          <RqlCodeBlock code={`patch { alias: expression, expression, ... }`} />
          <p className="text-text-secondary mt-4">
            Each entry is an expression over the incoming row. <Code>alias:</Code> names
            the target column; an expression without an alias is named by its source
            text. The braces are required (<Code>PATCH_001</Code> when they are
            missing). <Code>patch</Code> needs rows to work on: it follows a{' '}
            <Link to="/docs/rql/transforms/from" className="text-primary hover:text-primary-light font-medium transition-colors">from</Link>{' '}
            or another operator and never starts a pipeline.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Replacing and adding</h2>
          <p className="text-text-secondary mb-4">
            Run the snippets on this page in order. The first creates a table of line
            items and doubles every price. <Code>price</Code> keeps its place between{' '}
            <Code>id</Code> and <Code>qty</Code>; nothing else changes:
          </p>
          <ExecutableSnippet title={patchReplace.title} initialCode={patchReplace.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A name that is not in the frame yet is appended on the right. Where an input
            is <Code>none</Code>, the result is <Code>none</Code>, and the row is kept:
          </p>
          <ExecutableSnippet title={patchAdd.title} initialCode={patchAdd.code} />
          <p className="text-text-secondary mt-4 mb-4">
            One block can do both. Replacements stay where their column was; additions
            go to the end, in the order written:
          </p>
          <ExecutableSnippet title={patchMixed.title} initialCode={patchMixed.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">patch versus extend</h2>
          <p className="text-text-secondary mb-4">
            The two operators share their syntax and differ on exactly one thing: what
            happens when the name already exists. <Code>extend</Code> treats it as an
            error (<Code>EXTEND_002</Code>); <Code>patch</Code> treats it as a
            replacement. The assignment that succeeded above fails as an extend:
          </p>
          <ExecutableSnippet title={patchExtendCollision.title} initialCode={patchExtendCollision.code} />
          <div className="overflow-x-auto mt-4 mb-4">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 pr-4 font-bold">Operator</th>
                  <th className="py-2 pr-4 font-bold">Existing name</th>
                  <th className="py-2 pr-4 font-bold">New name</th>
                  <th className="py-2 pr-4 font-bold">Columns not listed</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border"><td className="py-2 pr-4"><Code>map</Code></td><td className="py-2 pr-4">Replaced</td><td className="py-2 pr-4">Added</td><td className="py-2 pr-4">Dropped</td></tr>
                <tr className="border-b border-border"><td className="py-2 pr-4"><Code>extend</Code></td><td className="py-2 pr-4">Error <Code>EXTEND_002</Code></td><td className="py-2 pr-4">Added on the right</td><td className="py-2 pr-4">Kept</td></tr>
                <tr><td className="py-2 pr-4"><Code>patch</Code></td><td className="py-2 pr-4">Replaced in place</td><td className="py-2 pr-4">Added on the right</td><td className="py-2 pr-4">Kept</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-text-secondary">
            Use <Code>extend</Code> when a collision would be a mistake you want to hear
            about. Use <Code>patch</Code> when overwriting is the point.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Every entry reads the incoming row</h2>
          <p className="text-text-secondary mb-4">
            All entries in one block are evaluated against the row as it enters the
            operator, not against each other. Replacing <Code>price</Code> and copying{' '}
            <Code>price</Code> in the same block copies the old value:
          </p>
          <ExecutableSnippet title={patchReadsInput.title} initialCode={patchReadsInput.code} />
          <p className="text-text-secondary mt-4 mb-4">
            For the same reason an entry cannot use a column added earlier in the same
            block. The name does not exist on the incoming row, so it reads as{' '}
            <Code>none</Code>:
          </p>
          <ExecutableSnippet title={patchSameBlockReference.title} initialCode={patchSameBlockReference.code} />
          <p className="text-text-secondary mt-4 mb-4">
            This is the opposite of <Code>extend</Code>, where later entries do see
            earlier ones. To build on a patched value, chain a second{' '}
            <Code>patch</Code>; each operator sees the output of the one before it:
          </p>
          <ExecutableSnippet title={patchChained.title} initialCode={patchChained.code} />
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">The column takes the expression's type</h2>
          <p className="text-text-secondary mb-4">
            <Code>patch</Code> does not convert the new value to the column's declared
            type. The output column has whatever type the expression produced, even when
            it replaces a stored column of a different type. Here <Code>qty</Code> is
            declared <Code>Option(int4)</Code> and leaves the operator as{' '}
            <Code>utf8</Code>, shown with{' '}
            <Link to="/docs/functions/meta/type" className="text-primary hover:text-primary-light font-medium transition-colors">meta::type</Link>{' '}
            once on the incoming row and once on the result:
          </p>
          <ExecutableSnippet title={patchType.title} initialCode={patchType.code} />
          <p className="text-text-secondary mt-4 mb-4">
            A pipeline is a read, so this never touches the stored column; it only
            changes what the query returns. Wrap the value in{' '}
            <Link to="/docs/rql/transforms/cast" className="text-primary hover:text-primary-light font-medium transition-colors">cast</Link>{' '}
            when the result must carry a specific type. Setting a column to{' '}
            <Code>none</Code> works the same way:
          </p>
          <ExecutableSnippet title={patchNone.title} initialCode={patchNone.code} />
          <div className="mt-4">
            <Callout variant="note" title="A newer engine casts to the declared type">
              The current engine source casts a patched value to the stored column's
              declared type when the name matches a table column, so a newer engine
              than the playground runs would return <Code>qty</Code> as{' '}
              <Code>int4</Code> here, or fail the cast where the value does not
              convert. Do not rely on the result type of a replaced column staying
              the expression's type.
            </Callout>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Using patched columns downstream</h2>
          <p className="text-text-secondary mb-4">
            Anything <Code>patch</Code> produces is a normal column for the operators
            that follow. A bool column can be the whole condition of a{' '}
            <Link to="/docs/rql/transforms/filter" className="text-primary hover:text-primary-light font-medium transition-colors">filter</Link>:
          </p>
          <ExecutableSnippet title={patchDownstreamFilter.title} initialCode={patchDownstreamFilter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            <Code>patch</Code> works on whatever frame reaches it, not only on table
            rows: after a <Code>map</Code> has narrowed the columns, or over inline rows:
          </p>
          <ExecutableSnippet title={patchAfterMap.title} initialCode={patchAfterMap.code} />
          <div className="mt-4">
            <ExecutableSnippet title={patchInline.title} initialCode={patchInline.code} />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Sharp edges</h2>
          <p className="text-text-secondary mb-4">
            Without an alias the new column takes the expression's text as its name,
            which is fine for a quick look and awkward to reference afterwards:
          </p>
          <ExecutableSnippet title={patchUnaliased.title} initialCode={patchUnaliased.code} />
          <p className="text-text-secondary mt-4 mb-4">
            An unknown column name inside an expression is not an error; it reads as{' '}
            <Code>none</Code> on every row. That is what happened to{' '}
            <Code>quadrupled</Code> above, and it is easy to hit after a{' '}
            <Code>map</Code> has dropped a column. When a patched column is unexpectedly
            all <Code>none</Code>, check the spelling of its inputs and what the previous
            operator kept.
          </p>
          <p className="text-text-secondary mb-4">
            Over an empty input <Code>patch</Code> yields no rows:
          </p>
          <ExecutableSnippet title={patchEmptyInput.title} initialCode={patchEmptyInput.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The same name twice in one block is not an error. The first entry wins and
            the second is ignored:
          </p>
          <ExecutableSnippet title={patchDuplicateName.title} initialCode={patchDuplicateName.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The braces are not optional:
          </p>
          <ExecutableSnippet title={patchNoBraces.title} initialCode={patchNoBraces.code} />
          <div className="mt-4">
            <Callout variant="warning" title="patch needs an input">
              <Code>map</Code> and <Code>extend</Code> can start a pipeline and yield a
              single computed row. <Code>patch</Code> cannot: a bare{' '}
              <Code>patch {'{'} x: 1 {'}'}</Code> with nothing in front of it aborts the
              engine ("Patch requires input") instead of returning an error, so it is not
              shown as a runnable snippet here. Always give <Code>patch</Code> a{' '}
              <Code>from</Code> or an upstream operator.
            </Callout>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Compared with SQL</h2>
          <p className="text-text-secondary mb-4">
            <Code>patch</Code> is a <Code>SELECT</Code> with one column expression
            swapped out - <Code>SELECT id, price * 2 AS price, qty FROM items</Code> -
            written without repeating the columns you are not changing. It is not{' '}
            <Code>UPDATE</Code>: nothing is written, and the result is gone when the
            query ends. For a persistent change use{' '}
            <Link to="/docs/scripting/dml/update" className="text-primary hover:text-primary-light font-medium transition-colors">update</Link>,
            whose <Code>{'{'} column: value {'}'}</Code> block has the same shape.
          </p>
        </section>

        <Callout variant="note" title="Column order is part of the output">
          A replaced column keeps its position; an added column always lands at the end,
          in block order. If the order matters, finish with a{' '}
          <Link to="/docs/rql/transforms/map" className="text-primary hover:text-primary-light font-medium transition-colors">map</Link>{' '}
          that lists it.
        </Callout>
      </div>
    </Layout>
  );
}
