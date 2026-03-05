import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';

export function DurationModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">duration Module</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Create, manipulate, and format durations representing spans of time.</p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Constructors</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/duration/years" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::years</h3>
              <p className="text-sm text-text-secondary">Create a duration of the specified number of years.</p>
            </Link>
            <Link to="/docs/functions/duration/months" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::months</h3>
              <p className="text-sm text-text-secondary">Create a duration of the specified number of months.</p>
            </Link>
            <Link to="/docs/functions/duration/weeks" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::weeks</h3>
              <p className="text-sm text-text-secondary">Create a duration of the specified number of weeks.</p>
            </Link>
            <Link to="/docs/functions/duration/days" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::days</h3>
              <p className="text-sm text-text-secondary">Create a duration of the specified number of days.</p>
            </Link>
            <Link to="/docs/functions/duration/hours" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::hours</h3>
              <p className="text-sm text-text-secondary">Create a duration of the specified number of hours.</p>
            </Link>
            <Link to="/docs/functions/duration/minutes" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::minutes</h3>
              <p className="text-sm text-text-secondary">Create a duration of the specified number of minutes.</p>
            </Link>
            <Link to="/docs/functions/duration/seconds" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::seconds</h3>
              <p className="text-sm text-text-secondary">Create a duration of the specified number of seconds.</p>
            </Link>
            <Link to="/docs/functions/duration/millis" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::millis</h3>
              <p className="text-sm text-text-secondary">Create a duration of the specified number of milliseconds.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Component Extraction</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/duration/get_months" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::get_months</h3>
              <p className="text-sm text-text-secondary">Get the months component of a duration.</p>
            </Link>
            <Link to="/docs/functions/duration/get_days" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::get_days</h3>
              <p className="text-sm text-text-secondary">Get the days component of a duration.</p>
            </Link>
            <Link to="/docs/functions/duration/get_nanos" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::get_nanos</h3>
              <p className="text-sm text-text-secondary">Get the nanoseconds component of a duration.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Arithmetic</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/duration/add" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::add</h3>
              <p className="text-sm text-text-secondary">Add two durations together.</p>
            </Link>
            <Link to="/docs/functions/duration/subtract" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::subtract</h3>
              <p className="text-sm text-text-secondary">Subtract one duration from another.</p>
            </Link>
            <Link to="/docs/functions/duration/negate" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::negate</h3>
              <p className="text-sm text-text-secondary">Negate a duration (flip its sign).</p>
            </Link>
            <Link to="/docs/functions/duration/scale" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::scale</h3>
              <p className="text-sm text-text-secondary">Scale a duration by a numeric factor.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Formatting</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/docs/functions/duration/trunc" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::trunc</h3>
              <p className="text-sm text-text-secondary">Truncate a duration to a specified precision.</p>
            </Link>
            <Link to="/docs/functions/duration/format" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold mb-1">duration::format</h3>
              <p className="text-sm text-text-secondary">Format a duration as a human-readable string.</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Function Reference</h2>
          <div className="border-2 border-border-default overflow-x-auto"><table className="w-full">
            <thead className="bg-bg-tertiary"><tr><th className="text-left p-2 sm:p-3 font-bold">Function</th><th className="text-left p-2 sm:p-3 font-bold">Description</th></tr></thead>
            <tbody>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/years" className="text-primary-color hover:underline">duration::years</Link></td><td className="p-2 sm:p-3">Create a duration of the specified number of years.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/months" className="text-primary-color hover:underline">duration::months</Link></td><td className="p-2 sm:p-3">Create a duration of the specified number of months.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/weeks" className="text-primary-color hover:underline">duration::weeks</Link></td><td className="p-2 sm:p-3">Create a duration of the specified number of weeks.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/days" className="text-primary-color hover:underline">duration::days</Link></td><td className="p-2 sm:p-3">Create a duration of the specified number of days.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/hours" className="text-primary-color hover:underline">duration::hours</Link></td><td className="p-2 sm:p-3">Create a duration of the specified number of hours.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/minutes" className="text-primary-color hover:underline">duration::minutes</Link></td><td className="p-2 sm:p-3">Create a duration of the specified number of minutes.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/seconds" className="text-primary-color hover:underline">duration::seconds</Link></td><td className="p-2 sm:p-3">Create a duration of the specified number of seconds.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/millis" className="text-primary-color hover:underline">duration::millis</Link></td><td className="p-2 sm:p-3">Create a duration of the specified number of milliseconds.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/get_months" className="text-primary-color hover:underline">duration::get_months</Link></td><td className="p-2 sm:p-3">Get the months component of a duration.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/get_days" className="text-primary-color hover:underline">duration::get_days</Link></td><td className="p-2 sm:p-3">Get the days component of a duration.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/get_nanos" className="text-primary-color hover:underline">duration::get_nanos</Link></td><td className="p-2 sm:p-3">Get the nanoseconds component of a duration.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/add" className="text-primary-color hover:underline">duration::add</Link></td><td className="p-2 sm:p-3">Add two durations together.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/subtract" className="text-primary-color hover:underline">duration::subtract</Link></td><td className="p-2 sm:p-3">Subtract one duration from another.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/negate" className="text-primary-color hover:underline">duration::negate</Link></td><td className="p-2 sm:p-3">Negate a duration (flip its sign).</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/scale" className="text-primary-color hover:underline">duration::scale</Link></td><td className="p-2 sm:p-3">Scale a duration by a numeric factor.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/trunc" className="text-primary-color hover:underline">duration::trunc</Link></td><td className="p-2 sm:p-3">Truncate a duration to a specified precision.</td></tr>
              <tr className="border-t-2 border-border-default"><td className="p-2 sm:p-3"><Link to="/docs/functions/duration/format" className="text-primary-color hover:underline">duration::format</Link></td><td className="p-2 sm:p-3">Format a duration as a human-readable string.</td></tr>
            </tbody>
          </table></div>
        </section>
      </div>
    </Layout>
  );
}
