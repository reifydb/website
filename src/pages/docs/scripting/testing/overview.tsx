import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function TestingOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Testing
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB has a built-in test framework. Write tests alongside your schema,
            seed data with test procedures, and assert results inline.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Tests and Test Procedures</h2>
          <ExecutableSnippet
            title="Create and Run Tests"
            initialCode={getExampleById('scripting-create-test')!.code}
          />
          <p className="text-text-secondary mt-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">CREATE TEST PROCEDURE</code> defines
            reusable setup logic. <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">CREATE TEST</code> defines
            a test that calls setup procedures, runs queries, and asserts results.
            Each test runs in isolation — data from one test never leaks into another.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Assert Expressions</h2>
          <ExecutableSnippet
            title="Assert Expressions"
            initialCode={getExampleById('scripting-assert-literal')!.code}
          />
          <p className="text-text-secondary mt-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">ASSERT</code> checks that a condition
            is true. Use it inline in pipelines or standalone. Tests fail on the first
            assertion failure.
          </p>
        </section>
      </div>
    </Layout>
  );
}
