import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';

export function IsModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">is Module</h1>
          <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">Type checking and value inspection functions.</p>
        </div>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Value Checks</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/is/some" className="group block">
              <h3 className="font-bold font-mono mb-1">is::some</h3>
              <p className="text-sm text-text-secondary">Check if a value is not none (has some value).</p>
            </Link>
            <Link to="/docs/functions/is/none" className="group block">
              <h3 className="font-bold font-mono mb-1">is::none</h3>
              <p className="text-sm text-text-secondary">Check if a value is none (has no value).</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Type Checks</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/is/type" className="group block">
              <h3 className="font-bold font-mono mb-1">is::type</h3>
              <p className="text-sm text-text-secondary">Check if a value is of a specified type.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Permission Checks</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/is/root" className="group block">
              <h3 className="font-bold font-mono mb-1">is::root</h3>
              <p className="text-sm text-text-secondary">Check if the current user has root privileges.</p>
            </Link>
            <Link to="/docs/functions/is/anonymous" className="group block">
              <h3 className="font-bold font-mono mb-1">is::anonymous</h3>
              <p className="text-sm text-text-secondary">Check if the current user is anonymous (not authenticated).</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">Function Reference</h2>
          <div className="dialog overflow-x-auto"><table className="w-full">
            <thead className="bg-[#efedfb]"><tr><th className="text-left p-2 sm:p-3 font-bold">Function</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><Link to="/docs/functions/is/some" className="text-primary-color hover:underline font-mono">is::some</Link></td><td className="p-2 sm:p-3">Check if a value is not none (has some value)</td></tr>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><Link to="/docs/functions/is/none" className="text-primary-color hover:underline font-mono">is::none</Link></td><td className="p-2 sm:p-3">Check if a value is none (has no value)</td></tr>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><Link to="/docs/functions/is/type" className="text-primary-color hover:underline font-mono">is::type</Link></td><td className="p-2 sm:p-3">Check if a value is of a specified type</td></tr>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><Link to="/docs/functions/is/root" className="text-primary-color hover:underline font-mono">is::root</Link></td><td className="p-2 sm:p-3">Check if the current user has root privileges</td></tr>
              <tr className="border-t border-border-light"><td className="p-2 sm:p-3"><Link to="/docs/functions/is/anonymous" className="text-primary-color hover:underline font-mono">is::anonymous</Link></td><td className="p-2 sm:p-3">Check if the current user is anonymous (not authenticated)</td></tr>
            </tbody>
          </table></div>
        </section>
      </div>
    </Layout>
  );
}
