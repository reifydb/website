import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function RingbuffersPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Ringbuffers
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Ringbuffers are fixed-capacity tables that automatically evict the oldest rows
            when full. Perfect for logs, event streams, and sliding windows.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Ringbuffer</h2>
          <ExecutableSnippet
            title="Create Ringbuffer"
            initialCode={getExampleById('scripting-create-ringbuffer')!.code}
          />
          <p className="text-text-secondary mt-4">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">WITH {'{ capacity: N }'}</code> clause
            sets the maximum number of rows. Once full, new inserts evict the oldest row.
          </p>
        </section>
      </div>
    </Layout>
  );
}
