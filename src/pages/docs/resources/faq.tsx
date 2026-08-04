import { faqExtendDuplicateColumnExample, faqCastUnsupportedPairExample, faqBareFromOrderExample } from './faq.examples';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { CodeBlock, Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';

export function TroubleshootingFaqPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <div className="text-sm text-text-muted mb-2 font-bold">Resources</div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Troubleshooting & FAQ</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            What common errors mean, the surprises that do not raise an error at all, and the questions
            everyone asks first.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Anatomy of a diagnostic error</h2>
          <p className="text-text-secondary mb-4">
            Every RQL error carries a stable code and a message. Most add a{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">HELP</code> line, and many
            add a source location with a caret pointing at the exact span that failed. Run this one:
          </p>
          <ExecutableSnippet
            title={faqExtendDuplicateColumnExample.title}
            initialCode={faqExtendDuplicateColumnExample.code}
          />
          <p className="text-text-secondary mt-4 mb-2">It reports:</p>
          <CodeBlock
            language="text"
            code={`Error EXTEND_002
  Cannot extend with duplicate column name 'total'

HELP
  Use a different column name or remove the existing column first

NOTES
  • EXTEND operation cannot add columns that already exist in the frame
  • Each column name must be unique within the result frame
  • Consider using MAP if you want to replace existing columns`}
          />
          <p className="text-text-secondary mt-4">
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">extend</code> only adds
            columns; reusing an existing name is rejected rather than silently overwriting it. To update a
            column in place, use{' '}
            <Link to="/docs/rql/transforms/patch" className="text-primary-color hover:underline font-medium">
              patch
            </Link>{' '}
            instead.
          </p>
          <p className="text-text-secondary mt-6 mb-4">
            Some errors also carry a location. This one points at the exact argument that could not be
            cast:
          </p>
          <ExecutableSnippet
            title={faqCastUnsupportedPairExample.title}
            initialCode={faqCastUnsupportedPairExample.code}
          />
          <p className="text-text-secondary mt-4 mb-2">It reports:</p>
          <CodeBlock
            language="text"
            code={`Error CAST_001
  unsupported cast from Boolean to Date

LOCATION
  line 1, column 12

RQL
  1 │ map { cast(true, date) }
    │            ~~~~
    │
    │ cannot cast true of type Boolean to Date

HELP
  ensure the source and target types are compatible for casting

NOTES
  • supported casts include: numeric to numeric, string to temporal, boolean to numeric`}
          />
          <p className="text-text-secondary mt-4">
            The <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">LOCATION</code> /{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">RQL</code> block is not
            guaranteed on every error, the first example above did not have one, but when present the
            line under the caret names the exact value and type that failed. See{' '}
            <Link to="/docs/rql/transforms/cast" className="text-primary-color hover:underline font-medium">
              cast
            </Link>{' '}
            for which type pairs are supported.
          </p>
          <p className="text-text-secondary mt-6">
            An error raised inside a procedure call nests the underlying cause under a{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">↳</code> marker, with its own
            code, location, and help. Calling{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">
              system::config::set(...)
            </code>{' '}
            with a key that does not exist looks like this:
          </p>
          <CodeBlock
            language="text"
            className="mt-4"
            code={`Error PROCEDURE_003: Procedure system::config::set execution failed
  at "system::config::set" (line 1, column 6)

  1 │ call system::config::set("NOT_A_REAL_KEY", 1)
    │      ~~~~~~~~~~~~~~~~~~~
    │       execution failed

  ↳  Error CA_050: unknown config key \`NOT_A_REAL_KEY\`
    at "system::config::set" (line 1, column 6)

    1 │ call system::config::set("NOT_A_REAL_KEY", 1)
      │      ~~~~~~~~~~~~~~~~~~~
      │      unknown config key

    help: query system.config to see all registered configuration keys

  help: Check procedure arguments and context`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Reading an error code</h2>
          <p className="text-text-secondary">
            Codes are grouped by the part of the engine that raised them rather than one flat taxonomy:{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">CAST_*</code> from the cast
            system, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">EXTEND_*</code> from
            the extend operator, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">CA_*</code>{' '}
            from the catalog, <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">PROCEDURE_*</code>{' '}
            from procedure invocation, and so on for every other operator and subsystem. The prefix tells
            you where to start reading; the operator and function pages under{' '}
            <Link to="/docs/rql/transforms" className="text-primary-color hover:underline font-medium">
              Pipeline Operators
            </Link>{' '}
            and{' '}
            <Link to="/docs/functions" className="text-primary-color hover:underline font-medium">
              Routines
            </Link>{' '}
            cover the specific failure modes for that operator or function.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Silent surprises</h2>
          <p className="text-text-secondary mb-4">
            Not everything unexpected is an error. A few things return a completely valid, successfully
            executed result that just is not the one you expected.
          </p>
          <p className="text-text-secondary mb-2">
            A table scan with no <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">sort</code>{' '}
            is not returned in insertion order, it comes back latest-inserted-first:
          </p>
          <ExecutableSnippet
            title={faqBareFromOrderExample.title}
            initialCode={faqBareFromOrderExample.code}
          />
          <p className="text-text-secondary mt-4">
            If a specific order matters at all, even "the order I inserted them in", add an explicit{' '}
            <Link to="/docs/rql/transforms/sort" className="text-primary-color hover:underline font-medium">
              sort
            </Link>
            . While you are there: a bare{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">sort {'{'} col {'}'}</code>{' '}
            with no direction sorts descending, not ascending, so write{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">:asc</code> or{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">:desc</code> explicitly.
          </p>
          <p className="text-text-secondary mt-4">
            A join or comparison against a bare, untyped literal can also match nothing with no error at
            all, rather than failing loudly: a generic integer literal is not the same type as a sized
            column type until it is cast or compared against one. See{' '}
            <Link to="/docs/rql/transforms/join" className="text-primary-color hover:underline font-medium">
              join
            </Link>{' '}
            for typed join examples, and{' '}
            <Link to="/docs/rql/transforms/cast" className="text-primary-color hover:underline font-medium">
              cast
            </Link>{' '}
            for casting a literal to a sized type before comparing it.
          </p>
          <p className="text-text-secondary mt-4">
            An anonymous or low-privilege query against{' '}
            <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">system::*</code> that comes
            back with zero rows and no error is very often a missing read policy, not missing data: system
            catalog reads are policy-gated the same as any other object, and a denied read looks exactly
            like an empty table. See{' '}
            <Link to="/docs/scripting/access-control" className="text-primary-color hover:underline font-medium">
              Access Control
            </Link>{' '}
            for granting read access.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Frequently asked questions</h2>
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold tracking-tight mb-1">Is RQL a SQL dialect?</h3>
              <p className="text-text-secondary">
                No. It shares the general idea of a declarative query language, but the grammar is its
                own: no <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">SELECT</code>, a
                top-to-bottom pipeline of operators instead of clauses, and its own literal and type
                system. See{' '}
                <Link to="/docs/rql/for-sql-users" className="text-primary-color hover:underline font-medium">
                  RQL for SQL Users
                </Link>{' '}
                for a direct mapping.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight mb-1">
                Is ReifyDB a cache in front of another database, or can it be the database?
              </h3>
              <p className="text-text-secondary">
                It is designed to be the system of record itself: an application state database that
                stores, mutates, and derives live state under one transactional model, with incrementally
                maintained views standing in for the caches and refresh jobs you would otherwise build by
                hand.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight mb-1">When do views recompute?</h3>
              <p className="text-text-secondary">
                It depends which kind. Transactional views recompute synchronously as part of the write
                transaction that changed their source data. Deferred views recompute asynchronously on a
                tick. See{' '}
                <Link to="/docs/scripting/views/transactional" className="text-primary-color hover:underline font-medium">
                  Transactional Views
                </Link>{' '}
                and{' '}
                <Link to="/docs/scripting/views/deferred" className="text-primary-color hover:underline font-medium">
                  Deferred Views
                </Link>
                .
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight mb-1">
                Why does an error sometimes wrap another error?
              </h3>
              <p className="text-text-secondary">
                The outer error is where the failure surfaced, commonly a procedure call, and the nested
                one under <code className="bg-bg-tertiary px-1.5 py-0.5 text-sm font-bold">↳</code> is the
                actual root cause. Read the nested error first; the outer one usually just says which call
                failed.
              </p>
            </div>
          </div>
        </section>

        <Callout variant="tip" title="Next Steps">
          For engine limitations that are not errors at all, deliberate tradeoffs rather than bugs, see{' '}
          <Link to="/docs/resources/caveats" className="text-primary-color hover:underline font-medium">
            Caveats & Limitations
          </Link>.
        </Callout>
      </div>
    </Layout>
  );
}
