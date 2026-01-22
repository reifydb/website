import { DocsLayout } from '../../docs-layout';
import { ExecutableSnippet } from '@/components/ui';

export function FilterPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Filter Transform
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">filter</code> transform
            keeps only rows that match a specified condition.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Basic Syntax</h2>
          <ExecutableSnippet
            title="Basic Syntax"
            initialCode={`from app.users
filter age >= 18`}
          />
          <p className="text-text-secondary mt-4">
            This keeps only users who are 18 or older.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Multiple Conditions</h2>
          <p className="text-text-secondary mb-4">
            Combine conditions using logical operators:
          </p>
          <ExecutableSnippet
            title="Multiple Conditions"
            initialCode={`from app.users
filter age >= 18 && status == "active"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Pattern Matching</h2>
          <p className="text-text-secondary mb-4">
            Use the <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">~=</code> operator
            for pattern matching:
          </p>
          <ExecutableSnippet
            title="Pattern Matching"
            initialCode={`from app.users
filter email ~= "%@gmail.com"`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Null Handling</h2>
          <p className="text-text-secondary mb-4">
            Filter out null values explicitly:
          </p>
          <ExecutableSnippet
            title="Null Handling"
            initialCode={`from app.users
filter deleted_at == null`}
          />
        </section>

      </div>
    </DocsLayout>
  );
}
