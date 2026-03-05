import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import { getExampleById } from '@/lib/examples';

export function TextModuleOverviewPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            text Module
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            String manipulation functions for cleaning, formatting, and transforming text in your queries.
          </p>
        </div>

        {/* Quick Example */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Quick Example</h2>
          <ExecutableSnippet
            title="Quick Example"
            initialCode={getExampleById('text-overview-quick')!.code}
          />
        </section>

        {/* Case & Whitespace */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Case & Whitespace</h2>
          <div className="grid gap-3">
            <Link to="/docs/functions/text/lower" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::lower</h3>
              <p className="text-text-secondary text-sm">Convert a string to lowercase</p>
            </Link>
            <Link to="/docs/functions/text/upper" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::upper</h3>
              <p className="text-text-secondary text-sm">Convert a string to uppercase</p>
            </Link>
            <Link to="/docs/functions/text/trim" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::trim</h3>
              <p className="text-text-secondary text-sm">Remove leading and trailing whitespace</p>
            </Link>
            <Link to="/docs/functions/text/trim_start" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::trim_start</h3>
              <p className="text-text-secondary text-sm">Remove leading whitespace</p>
            </Link>
            <Link to="/docs/functions/text/trim_end" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::trim_end</h3>
              <p className="text-text-secondary text-sm">Remove trailing whitespace</p>
            </Link>
          </div>
        </section>

        {/* Search & Match */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Search & Match</h2>
          <div className="grid gap-3">
            <Link to="/docs/functions/text/contains" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::contains</h3>
              <p className="text-text-secondary text-sm">Check if a string contains a substring</p>
            </Link>
            <Link to="/docs/functions/text/starts_with" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::starts_with</h3>
              <p className="text-text-secondary text-sm">Check if a string starts with a prefix</p>
            </Link>
            <Link to="/docs/functions/text/ends_with" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::ends_with</h3>
              <p className="text-text-secondary text-sm">Check if a string ends with a suffix</p>
            </Link>
            <Link to="/docs/functions/text/index_of" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::index_of</h3>
              <p className="text-text-secondary text-sm">Find the index of a substring</p>
            </Link>
            <Link to="/docs/functions/text/count" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::count</h3>
              <p className="text-text-secondary text-sm">Count the number of characters in a string</p>
            </Link>
          </div>
        </section>

        {/* Manipulation */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Manipulation</h2>
          <div className="grid gap-3">
            <Link to="/docs/functions/text/concat" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::concat</h3>
              <p className="text-text-secondary text-sm">Concatenate multiple strings together</p>
            </Link>
            <Link to="/docs/functions/text/substring" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::substring</h3>
              <p className="text-text-secondary text-sm">Extract a portion of a string</p>
            </Link>
            <Link to="/docs/functions/text/replace" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::replace</h3>
              <p className="text-text-secondary text-sm">Replace all occurrences of a substring</p>
            </Link>
            <Link to="/docs/functions/text/repeat" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::repeat</h3>
              <p className="text-text-secondary text-sm">Repeat a string multiple times</p>
            </Link>
            <Link to="/docs/functions/text/reverse" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::reverse</h3>
              <p className="text-text-secondary text-sm">Reverse the characters in a string</p>
            </Link>
            <Link to="/docs/functions/text/pad_left" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::pad_left</h3>
              <p className="text-text-secondary text-sm">Pad a string on the left</p>
            </Link>
            <Link to="/docs/functions/text/pad_right" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::pad_right</h3>
              <p className="text-text-secondary text-sm">Pad a string on the right</p>
            </Link>
          </div>
        </section>

        {/* Measurement & Encoding */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Measurement & Encoding</h2>
          <div className="grid gap-3">
            <Link to="/docs/functions/text/length" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::length</h3>
              <p className="text-text-secondary text-sm">Get the length of a string</p>
            </Link>
            <Link to="/docs/functions/text/ascii" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::ascii</h3>
              <p className="text-text-secondary text-sm">Get the ASCII code of the first character</p>
            </Link>
            <Link to="/docs/functions/text/char" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::char</h3>
              <p className="text-text-secondary text-sm">Convert an ASCII code to a character</p>
            </Link>
          </div>
        </section>

        {/* Formatting */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Formatting</h2>
          <div className="grid gap-3">
            <Link to="/docs/functions/text/format_bytes" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::format_bytes</h3>
              <p className="text-text-secondary text-sm">Format bytes using binary units (KiB, MiB)</p>
            </Link>
            <Link to="/docs/functions/text/format_bytes_si" className="block border-2 border-border-default p-4 hover:bg-bg-tertiary transition-colors">
              <h3 className="font-bold text-primary-color mb-1">text::format_bytes_si</h3>
              <p className="text-text-secondary text-sm">Format bytes using SI units (KB, MB)</p>
            </Link>
          </div>
        </section>

        {/* Reference Table */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Function Reference</h2>
          <div className="border-2 border-border-default overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="text-left p-2 sm:p-3 font-bold">Function</th>
                  <th className="text-left p-2 sm:p-3 font-bold">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::ascii</code></td>
                  <td className="p-2 sm:p-3">Get the ASCII code of the first character</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::char</code></td>
                  <td className="p-2 sm:p-3">Convert an ASCII code to a character</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::concat</code></td>
                  <td className="p-2 sm:p-3">Concatenate multiple strings together</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::contains</code></td>
                  <td className="p-2 sm:p-3">Check if a string contains a substring</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::count</code></td>
                  <td className="p-2 sm:p-3">Count the number of characters in a string</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::ends_with</code></td>
                  <td className="p-2 sm:p-3">Check if a string ends with a suffix</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::format_bytes</code></td>
                  <td className="p-2 sm:p-3">Format bytes using binary units (KiB, MiB)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::format_bytes_si</code></td>
                  <td className="p-2 sm:p-3">Format bytes using SI units (KB, MB)</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::index_of</code></td>
                  <td className="p-2 sm:p-3">Find the index of a substring</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::length</code></td>
                  <td className="p-2 sm:p-3">Get the length of a string</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::lower</code></td>
                  <td className="p-2 sm:p-3">Convert a string to lowercase</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::pad_left</code></td>
                  <td className="p-2 sm:p-3">Pad a string on the left</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::pad_right</code></td>
                  <td className="p-2 sm:p-3">Pad a string on the right</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::repeat</code></td>
                  <td className="p-2 sm:p-3">Repeat a string multiple times</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::replace</code></td>
                  <td className="p-2 sm:p-3">Replace all occurrences of a substring</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::reverse</code></td>
                  <td className="p-2 sm:p-3">Reverse the characters in a string</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::starts_with</code></td>
                  <td className="p-2 sm:p-3">Check if a string starts with a prefix</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::substring</code></td>
                  <td className="p-2 sm:p-3">Extract a portion of a string</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::trim</code></td>
                  <td className="p-2 sm:p-3">Remove leading and trailing whitespace</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::trim_end</code></td>
                  <td className="p-2 sm:p-3">Remove trailing whitespace</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::trim_start</code></td>
                  <td className="p-2 sm:p-3">Remove leading whitespace</td>
                </tr>
                <tr className="border-t-2 border-border-default">
                  <td className="p-2 sm:p-3"><code>text::upper</code></td>
                  <td className="p-2 sm:p-3">Convert a string to uppercase</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
