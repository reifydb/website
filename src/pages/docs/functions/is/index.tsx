import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';

export function IsModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">is Module</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Type checking and value inspection functions.</p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Value Checks</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/is/some" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold font-mono mb-1">is::some</h3>
              <p className="text-sm text-text-secondary">Check if a value is not none (has some value).</p>
            </Link>
            <Link to="/docs/functions/is/none" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold font-mono mb-1">is::none</h3>
              <p className="text-sm text-text-secondary">Check if a value is none (has no value).</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Type Checks</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/is/type" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold font-mono mb-1">is::type</h3>
              <p className="text-sm text-text-secondary">Check if a value is of a specified type.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Permission Checks</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/is/root" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold font-mono mb-1">is::root</h3>
              <p className="text-sm text-text-secondary">Check if the current user has root privileges.</p>
            </Link>
            <Link to="/docs/functions/is/anonymous" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold font-mono mb-1">is::anonymous</h3>
              <p className="text-sm text-text-secondary">Check if the current user is anonymous (not authenticated).</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Function Reference</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Function</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/is/some" className="text-primary-color hover:underline font-mono">is::some</Link></td><td className="p-2 sm:p-3">Check if a value is not none (has some value)</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/is/none" className="text-primary-color hover:underline font-mono">is::none</Link></td><td className="p-2 sm:p-3">Check if a value is none (has no value)</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/is/type" className="text-primary-color hover:underline font-mono">is::type</Link></td><td className="p-2 sm:p-3">Check if a value is of a specified type</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/is/root" className="text-primary-color hover:underline font-mono">is::root</Link></td><td className="p-2 sm:p-3">Check if the current user has root privileges</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/is/anonymous" className="text-primary-color hover:underline font-mono">is::anonymous</Link></td><td className="p-2 sm:p-3">Check if the current user is anonymous (not authenticated)</td></tr>
            </tbody>
          </table></div>
        </section>
      </div>
    </Layout>
  );
}
