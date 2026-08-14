import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';

export function IdentityModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">identity Module</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Functions for working with record identifiers.</p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Functions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/identity/id" className="group block border border-l-[6px] border-border-light bg-bg-secondary rounded-md shadow-[var(--shadow-soft)] p-4 transition-colors duration-200 hover:border-l-primary hover:bg-bg-tertiary">
              <h3 className="font-bold font-mono mb-1">identity::id</h3>
              <p className="text-sm text-text-secondary">Get the unique identifier of a record.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Function Reference</h2>
          <div className="border border-border-light overflow-x-auto rounded-md"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Function</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><Link to="/docs/functions/identity/id" className="text-primary-color hover:underline font-mono">identity::id</Link></td><td className="p-2 sm:p-3">Get the unique identifier of a record</td></tr>
            </tbody>
          </table></div>
        </section>
      </div>
    </Layout>
  );
}
