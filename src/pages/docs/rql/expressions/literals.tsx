import { Link } from 'react-router-dom';
import { Layout } from '../../layout.tsx';
import { ExecutableSnippet } from '@/components/ui';
import {
  numericExample,
  textExample,
  booleanExample,
  noneExample,
  listExample,
  temporalExample,
} from './literals.examples';

export function LiteralsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Literals
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Literal values you can write directly inside an RQL expression: numbers, text,
            booleans, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">none</code>,
            lists, and dates.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Numeric Literals</h2>
          <p className="text-text-secondary mb-4">
            Integers and decimals are written directly, with no quotes or suffix.
          </p>
          <ExecutableSnippet title="Numeric Literals" initialCode={numericExample.code} />
          <p className="text-text-secondary mt-4">
            A bare numeric literal has a generic numeric type until it lands in a column or gets
            cast explicitly. To pin it to a specific type, use{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">cast()</code>. See{' '}
            <Link to="/docs/rql/transforms/cast" className="text-primary-color hover:underline font-medium">
              cast
            </Link>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Text Literals</h2>
          <p className="text-text-secondary mb-4">
            Double-quoted strings. <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">+</code> concatenates
            text, auto-converting non-text values alongside it.
          </p>
          <ExecutableSnippet title="Text Literals" initialCode={textExample.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Boolean Literals</h2>
          <p className="text-text-secondary mb-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">true</code> and <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">false</code>,
            lowercase, unquoted.
          </p>
          <ExecutableSnippet title="Boolean Literals" initialCode={booleanExample.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">The none Literal</h2>
          <p className="text-text-secondary mb-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">none</code> represents
            a missing value. Test for it with{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">is::some()</code> and <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">is::none()</code>;
            see{' '}
            <Link to="/docs/concepts/none" className="text-primary-color hover:underline font-medium">
              Working with none
            </Link>{' '}
            for how it propagates through expressions.
          </p>
          <ExecutableSnippet title="The none Literal" initialCode={noneExample.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">List Literals</h2>
          <p className="text-text-secondary mb-4">
            Square brackets with comma-separated values. Lists show up most often with{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">in</code> and <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">not in</code>.
          </p>
          <ExecutableSnippet title="List Literals" initialCode={listExample.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Temporal Literals</h2>
          <p className="text-text-secondary mb-4">
            An <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">@</code> prefix
            followed by a recognized date, time, datetime, or duration pattern:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-2 border-border-default text-sm">
              <thead>
                <tr className="bg-bg-tertiary">
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Kind</th>
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Pattern</th>
                  <th className="text-left px-4 py-2 border-b-2 border-border-default font-bold">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default">date</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">YYYY-MM-DD</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">@2024-03-15</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default">time</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">HH:MM:SS</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">@14:30:00</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-default">datetime</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">YYYY-MM-DDTHH:MM:SSZ</td>
                  <td className="px-4 py-2 border-b border-border-default font-mono text-xs">@2024-03-15T14:30:00Z</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">duration</td>
                  <td className="px-4 py-2 font-mono text-xs">ISO 8601, P...</td>
                  <td className="px-4 py-2 font-mono text-xs">@P1Y2M, @PT2H30M</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ExecutableSnippet title="Temporal Literals" initialCode={temporalExample.code} />
        </section>

      </div>
    </Layout>
  );
}
