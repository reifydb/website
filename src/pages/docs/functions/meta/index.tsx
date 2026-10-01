import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';

export function MetaModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">meta Module</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">Functions for inspecting value metadata and types.</p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Functions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/meta/type" className="group block">
              <h3 className="font-bold font-mono mb-1">meta::type</h3>
              <p className="text-sm text-text-secondary">Get the type name of a value as a string.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Function Reference</h2>
          <div className="dialog overflow-x-auto"><table className="w-full">
            <thead className="bg-[#efedfb]"><tr><th className="text-left p-2 sm:p-3 font-bold">Function</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><Link to="/docs/functions/meta/type" className="text-primary-color hover:underline font-mono">meta::type</Link></td><td className="p-2 sm:p-3">Get the type name of a value as a string</td></tr>
            </tbody>
          </table></div>
        </section>
      </div>
    </Layout>
  );
}
