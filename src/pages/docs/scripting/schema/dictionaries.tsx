import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function DictionariesPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Dictionaries
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Dictionaries provide key-value mappings with typed keys and values.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Create a Dictionary</h2>
          <ExecutableSnippet
            title="Create Dictionary"
            initialCode={getExampleById('scripting-create-dictionary')!.code}
          />
          <p className="text-text-secondary mt-4">
            Use <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">CREATE DICTIONARY</code> with
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold"> FOR</code> (value type)
            and <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">AS</code> (key type)
            to define a typed key-value store.
          </p>
        </section>
      </div>
    </Layout>
  );
}
