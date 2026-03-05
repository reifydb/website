import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';

export function DatetimeModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">datetime Module</h1>
          <p className="text-lg text-text-secondary leading-relaxed">Comprehensive datetime manipulation including extraction, construction, arithmetic, and formatting.</p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Extraction</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/docs/functions/datetime/year" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::year</h3>
              <p className="text-text-secondary text-sm">Extract the year from a datetime</p>
            </Link>
            <Link to="/docs/functions/datetime/month" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::month</h3>
              <p className="text-text-secondary text-sm">Extract the month (1-12)</p>
            </Link>
            <Link to="/docs/functions/datetime/day" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::day</h3>
              <p className="text-text-secondary text-sm">Extract the day of the month</p>
            </Link>
            <Link to="/docs/functions/datetime/hour" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::hour</h3>
              <p className="text-text-secondary text-sm">Extract the hour (0-23)</p>
            </Link>
            <Link to="/docs/functions/datetime/minute" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::minute</h3>
              <p className="text-text-secondary text-sm">Extract the minute (0-59)</p>
            </Link>
            <Link to="/docs/functions/datetime/second" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::second</h3>
              <p className="text-text-secondary text-sm">Extract the second (0-59)</p>
            </Link>
            <Link to="/docs/functions/datetime/nanosecond" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::nanosecond</h3>
              <p className="text-text-secondary text-sm">Extract the nanosecond component</p>
            </Link>
            <Link to="/docs/functions/datetime/day_of_year" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::day_of_year</h3>
              <p className="text-text-secondary text-sm">Get the day of the year (1-366)</p>
            </Link>
            <Link to="/docs/functions/datetime/day_of_week" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::day_of_week</h3>
              <p className="text-text-secondary text-sm">Get the day of the week (1=Monday, 7=Sunday)</p>
            </Link>
            <Link to="/docs/functions/datetime/quarter" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::quarter</h3>
              <p className="text-text-secondary text-sm">Get the quarter (1-4)</p>
            </Link>
            <Link to="/docs/functions/datetime/week" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::week</h3>
              <p className="text-text-secondary text-sm">Get the ISO week number (1-53)</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Components</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/docs/functions/datetime/date" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::date</h3>
              <p className="text-text-secondary text-sm">Extract the date component</p>
            </Link>
            <Link to="/docs/functions/datetime/time" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::time</h3>
              <p className="text-text-secondary text-sm">Extract the time component</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Epoch</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/docs/functions/datetime/epoch" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::epoch</h3>
              <p className="text-text-secondary text-sm">Get the Unix epoch timestamp in seconds</p>
            </Link>
            <Link to="/docs/functions/datetime/epoch_millis" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::epoch_millis</h3>
              <p className="text-text-secondary text-sm">Get the Unix epoch timestamp in milliseconds</p>
            </Link>
            <Link to="/docs/functions/datetime/from_epoch" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::from_epoch</h3>
              <p className="text-text-secondary text-sm">Create a datetime from epoch seconds</p>
            </Link>
            <Link to="/docs/functions/datetime/from_epoch_millis" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::from_epoch_millis</h3>
              <p className="text-text-secondary text-sm">Create a datetime from epoch milliseconds</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Construction</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/docs/functions/datetime/new" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::new</h3>
              <p className="text-text-secondary text-sm">Create a new datetime from a date and time</p>
            </Link>
            <Link to="/docs/functions/datetime/now" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::now</h3>
              <p className="text-text-secondary text-sm">Get the current datetime</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Manipulation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/docs/functions/datetime/add" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::add</h3>
              <p className="text-text-secondary text-sm">Add a duration to a datetime</p>
            </Link>
            <Link to="/docs/functions/datetime/subtract" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::subtract</h3>
              <p className="text-text-secondary text-sm">Subtract a duration from a datetime</p>
            </Link>
            <Link to="/docs/functions/datetime/diff" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::diff</h3>
              <p className="text-text-secondary text-sm">Calculate the difference between two datetimes</p>
            </Link>
            <Link to="/docs/functions/datetime/trunc" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::trunc</h3>
              <p className="text-text-secondary text-sm">Truncate a datetime to a specified precision</p>
            </Link>
            <Link to="/docs/functions/datetime/age" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::age</h3>
              <p className="text-text-secondary text-sm">Calculate the duration between two datetimes</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Formatting</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/docs/functions/datetime/format" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">datetime::format</h3>
              <p className="text-text-secondary text-sm">Format a datetime as a string</p>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Function Reference</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary"><tr>
                <th className="text-left p-2 sm:p-3 font-bold">Function</th>
                <th className="text-left p-2 sm:p-3 font-bold">Description</th>
              </tr></thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/year" className="text-primary-color hover:underline font-bold">datetime::year</Link></td>
                  <td className="p-2 sm:p-3">Extract the year from a datetime</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/month" className="text-primary-color hover:underline font-bold">datetime::month</Link></td>
                  <td className="p-2 sm:p-3">Extract the month (1-12)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/day" className="text-primary-color hover:underline font-bold">datetime::day</Link></td>
                  <td className="p-2 sm:p-3">Extract the day of the month</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/hour" className="text-primary-color hover:underline font-bold">datetime::hour</Link></td>
                  <td className="p-2 sm:p-3">Extract the hour (0-23)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/minute" className="text-primary-color hover:underline font-bold">datetime::minute</Link></td>
                  <td className="p-2 sm:p-3">Extract the minute (0-59)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/second" className="text-primary-color hover:underline font-bold">datetime::second</Link></td>
                  <td className="p-2 sm:p-3">Extract the second (0-59)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/nanosecond" className="text-primary-color hover:underline font-bold">datetime::nanosecond</Link></td>
                  <td className="p-2 sm:p-3">Extract the nanosecond component</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/day_of_year" className="text-primary-color hover:underline font-bold">datetime::day_of_year</Link></td>
                  <td className="p-2 sm:p-3">Get the day of the year (1-366)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/day_of_week" className="text-primary-color hover:underline font-bold">datetime::day_of_week</Link></td>
                  <td className="p-2 sm:p-3">Get the day of the week (1=Monday, 7=Sunday)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/quarter" className="text-primary-color hover:underline font-bold">datetime::quarter</Link></td>
                  <td className="p-2 sm:p-3">Get the quarter (1-4)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/week" className="text-primary-color hover:underline font-bold">datetime::week</Link></td>
                  <td className="p-2 sm:p-3">Get the ISO week number (1-53)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/date" className="text-primary-color hover:underline font-bold">datetime::date</Link></td>
                  <td className="p-2 sm:p-3">Extract the date component</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/time" className="text-primary-color hover:underline font-bold">datetime::time</Link></td>
                  <td className="p-2 sm:p-3">Extract the time component</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/epoch" className="text-primary-color hover:underline font-bold">datetime::epoch</Link></td>
                  <td className="p-2 sm:p-3">Get the Unix epoch timestamp in seconds</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/epoch_millis" className="text-primary-color hover:underline font-bold">datetime::epoch_millis</Link></td>
                  <td className="p-2 sm:p-3">Get the Unix epoch timestamp in milliseconds</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/from_epoch" className="text-primary-color hover:underline font-bold">datetime::from_epoch</Link></td>
                  <td className="p-2 sm:p-3">Create a datetime from epoch seconds</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/from_epoch_millis" className="text-primary-color hover:underline font-bold">datetime::from_epoch_millis</Link></td>
                  <td className="p-2 sm:p-3">Create a datetime from epoch milliseconds</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/new" className="text-primary-color hover:underline font-bold">datetime::new</Link></td>
                  <td className="p-2 sm:p-3">Create a new datetime from a date and time</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/now" className="text-primary-color hover:underline font-bold">datetime::now</Link></td>
                  <td className="p-2 sm:p-3">Get the current datetime</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/add" className="text-primary-color hover:underline font-bold">datetime::add</Link></td>
                  <td className="p-2 sm:p-3">Add a duration to a datetime</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/subtract" className="text-primary-color hover:underline font-bold">datetime::subtract</Link></td>
                  <td className="p-2 sm:p-3">Subtract a duration from a datetime</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/diff" className="text-primary-color hover:underline font-bold">datetime::diff</Link></td>
                  <td className="p-2 sm:p-3">Calculate the difference between two datetimes</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/trunc" className="text-primary-color hover:underline font-bold">datetime::trunc</Link></td>
                  <td className="p-2 sm:p-3">Truncate a datetime to a specified precision</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/age" className="text-primary-color hover:underline font-bold">datetime::age</Link></td>
                  <td className="p-2 sm:p-3">Calculate the duration between two datetimes</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><Link to="/docs/functions/datetime/format" className="text-primary-color hover:underline font-bold">datetime::format</Link></td>
                  <td className="p-2 sm:p-3">Format a datetime as a string</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
