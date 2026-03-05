import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function FilterPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Filter Transform
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">filter</code> to
            keep only the rows that match a condition.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Basic Syntax</h2>
          <ExecutableSnippet
            title="Basic Syntax"
            initialCode={getExampleById('filter-basic')!.code}
          />
          <p className="text-text-secondary mt-4">
            This keeps users who are 18 or older.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Multiple Conditions</h2>
          <p className="text-text-secondary mb-4">
            Combine conditions with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">&&</code> (and) and <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">||</code> (or):
          </p>
          <ExecutableSnippet
            title="Multiple Conditions"
            initialCode={getExampleById('filter-multiple-conditions')!.code}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">None Handling</h2>
          <p className="text-text-secondary mb-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">none</code> to check for absent values:
          </p>
          <ExecutableSnippet
            title="None Handling"
            initialCode={getExampleById('filter-none')!.code}
          />
        </section>

      </div>
    </Layout>
  );
}
