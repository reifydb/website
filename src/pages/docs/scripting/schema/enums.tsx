import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function EnumsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Enums
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Enums define a fixed set of variants. They can be simple unit variants
            or struct variants that carry data.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Unit Variants</h2>
          <ExecutableSnippet
            title="Unit Enum"
            initialCode={getExampleById('scripting-create-enum-unit')!.code}
          />
          <p className="text-text-secondary mt-4">
            Simple enums with no associated data. Useful for status fields, categories, and flags.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Struct Variants</h2>
          <ExecutableSnippet
            title="Struct Enum"
            initialCode={getExampleById('scripting-create-enum-struct')!.code}
          />
          <p className="text-text-secondary mt-4">
            Struct enums carry typed data with each variant. Each variant can have different fields.
          </p>
        </section>
      </div>
    </Layout>
  );
}
