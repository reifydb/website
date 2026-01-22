import { DocsLayout } from '../../docs-layout';
import { ExecutableSnippet } from '@/components/ui';

export function SortPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Sort Transform
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">sort</code> transform
            orders rows by one or more columns.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Basic Syntax</h2>
          <ExecutableSnippet
            title="Basic Syntax"
            initialCode={`from app.users
sort created_at`}
          />
          <p className="text-text-secondary mt-4">
            By default, sorting is in ascending order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Descending Order</h2>
          <p className="text-text-secondary mb-4">
            Use a minus sign for descending order:
          </p>
          <ExecutableSnippet
            title="Descending Order"
            initialCode={`from app.users
sort -created_at`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Multiple Columns</h2>
          <p className="text-text-secondary mb-4">
            Sort by multiple columns with a list:
          </p>
          <ExecutableSnippet
            title="Multiple Columns"
            initialCode={`from app.orders
sort { -total, created_at }`}
          />
          <p className="text-text-secondary mt-4">
            This sorts by total (descending) first, then by created_at (ascending) for ties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Combined with Take</h2>
          <p className="text-text-secondary mb-4">
            Sort is often combined with <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">take</code>
            to get top N results:
          </p>
          <ExecutableSnippet
            title="Combined with Take"
            initialCode={`from app.users
sort -score
take 10`}
          />
        </section>

      </div>
    </DocsLayout>
  );
}
