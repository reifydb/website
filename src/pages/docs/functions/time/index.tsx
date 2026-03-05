import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';

export function TimeModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">time Module</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Functions for working with time-of-day values, including extraction, construction, arithmetic, and formatting.</p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Extraction</h2>
          <div className="grid gap-4">
            <Link to="/docs/functions/time/hour" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::hour</h3>
              <p className="text-text-secondary text-sm">Extract the hour (0-23) from a time value.</p>
            </Link>
            <Link to="/docs/functions/time/minute" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::minute</h3>
              <p className="text-text-secondary text-sm">Extract the minute (0-59) from a time value.</p>
            </Link>
            <Link to="/docs/functions/time/second" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::second</h3>
              <p className="text-text-secondary text-sm">Extract the second (0-59) from a time value.</p>
            </Link>
            <Link to="/docs/functions/time/nanosecond" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::nanosecond</h3>
              <p className="text-text-secondary text-sm">Extract the nanosecond component from a time value.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Construction</h2>
          <div className="grid gap-4">
            <Link to="/docs/functions/time/new" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::new</h3>
              <p className="text-text-secondary text-sm">Create a new time from hour, minute, and second components.</p>
            </Link>
            <Link to="/docs/functions/time/now" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::now</h3>
              <p className="text-text-secondary text-sm">Get the current time of day.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Manipulation</h2>
          <div className="grid gap-4">
            <Link to="/docs/functions/time/add" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::add</h3>
              <p className="text-text-secondary text-sm">Add a duration to a time value.</p>
            </Link>
            <Link to="/docs/functions/time/subtract" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::subtract</h3>
              <p className="text-text-secondary text-sm">Subtract a duration from a time value.</p>
            </Link>
            <Link to="/docs/functions/time/diff" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::diff</h3>
              <p className="text-text-secondary text-sm">Calculate the difference between two time values.</p>
            </Link>
            <Link to="/docs/functions/time/trunc" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::trunc</h3>
              <p className="text-text-secondary text-sm">Truncate a time to a specified precision.</p>
            </Link>
            <Link to="/docs/functions/time/age" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::age</h3>
              <p className="text-text-secondary text-sm">Calculate the elapsed duration from a time value until now.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Formatting</h2>
          <div className="grid gap-4">
            <Link to="/docs/functions/time/format" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">time::format</h3>
              <p className="text-text-secondary text-sm">Format a time value as a string.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Function Reference</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Function</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/hour" className="text-primary-color hover:underline font-semibold">time::hour</Link></td><td className="p-2 sm:p-3 text-text-secondary">Extract the hour (0-23) from a time value.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/minute" className="text-primary-color hover:underline font-semibold">time::minute</Link></td><td className="p-2 sm:p-3 text-text-secondary">Extract the minute (0-59) from a time value.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/second" className="text-primary-color hover:underline font-semibold">time::second</Link></td><td className="p-2 sm:p-3 text-text-secondary">Extract the second (0-59) from a time value.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/nanosecond" className="text-primary-color hover:underline font-semibold">time::nanosecond</Link></td><td className="p-2 sm:p-3 text-text-secondary">Extract the nanosecond component from a time value.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/new" className="text-primary-color hover:underline font-semibold">time::new</Link></td><td className="p-2 sm:p-3 text-text-secondary">Create a new time from hour, minute, and second components.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/now" className="text-primary-color hover:underline font-semibold">time::now</Link></td><td className="p-2 sm:p-3 text-text-secondary">Get the current time of day.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/add" className="text-primary-color hover:underline font-semibold">time::add</Link></td><td className="p-2 sm:p-3 text-text-secondary">Add a duration to a time value.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/subtract" className="text-primary-color hover:underline font-semibold">time::subtract</Link></td><td className="p-2 sm:p-3 text-text-secondary">Subtract a duration from a time value.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/diff" className="text-primary-color hover:underline font-semibold">time::diff</Link></td><td className="p-2 sm:p-3 text-text-secondary">Calculate the difference between two time values.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/trunc" className="text-primary-color hover:underline font-semibold">time::trunc</Link></td><td className="p-2 sm:p-3 text-text-secondary">Truncate a time to a specified precision.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/age" className="text-primary-color hover:underline font-semibold">time::age</Link></td><td className="p-2 sm:p-3 text-text-secondary">Calculate the elapsed duration from a time value until now.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/time/format" className="text-primary-color hover:underline font-semibold">time::format</Link></td><td className="p-2 sm:p-3 text-text-secondary">Format a time value as a string.</td></tr>
            </tbody>
          </table></div>
        </section>
      </div>
    </Layout>
  );
}
