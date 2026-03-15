import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function SeriesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Series
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Series are time-indexed storage types designed for metrics, sensor data,
            and other timestamped values.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Tags</h2>
          <p className="text-text-secondary">
            Every series is partitioned by a tag. Tags are enum-like types where each variant
            represents a different data source. Define a tag first, then reference it when
            creating the series.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Series</h2>
          <ExecutableSnippet
            title="Create Series"
            initialCode={getExampleById('scripting-create-series')!.code}
          />
          <p className="text-text-secondary mt-4">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">WITH</code> clause
            specifies the tag for partitioning and the timestamp precision. Data is
            automatically indexed by time.
          </p>
        </section>
      </div>
    </Layout>
  );
}
