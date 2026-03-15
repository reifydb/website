import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function MapPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Map Transform
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">map</code> to
            select and reshape columns. Keep what you need, drop the rest.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Select Columns</h2>
          <ExecutableSnippet
            title="Select Columns"
            initialCode={getExampleById('map-basic')!.code}
          />
          <p className="text-text-secondary mt-4">
            Pick the columns you want. Everything else is gone.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Rename and Compute</h2>
          <ExecutableSnippet
            title="Rename and Compute"
            initialCode={getExampleById('map-alias')!.code}
          />
          <p className="text-text-secondary mt-4">
            Alias columns or create new ones from expressions. The result only contains what you specify.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Constants</h2>
          <ExecutableSnippet
            title="Constants"
            initialCode={getExampleById('map-constants')!.code}
          />
          <p className="text-text-secondary mt-4">
            Map can produce constant values across every row.
          </p>
        </section>

        <p className="text-text-secondary">
          <strong>Map replaces</strong> the row shape — only mapped columns survive. <strong>Extend adds</strong> columns to the existing shape. Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">map</code> when you want to control exactly what comes out. Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">extend</code> when you want to add without losing anything.
        </p>

      </div>
    </Layout>
  );
}
