import { modelStateActivityEvictExample as modelStateActivityEvict, modelStateAlterSequenceExample as modelStateAlterSequence, modelStateCompleteTaskExample as modelStateCompleteTask, modelStateDictionaryExample as modelStateDictionary, modelStateEnumExample as modelStateEnum, modelStateInsertProjectsExample as modelStateInsertProjects, modelStateInsertTasksExample as modelStateInsertTasks, modelStateJoinExample as modelStateJoin, modelStateNamespaceExample as modelStateNamespace, modelStateReadDictionaryExample as modelStateReadDictionary, modelStateReadTasksExample as modelStateReadTasks, modelStateReadViewExample as modelStateReadView, modelStateRingbufferExample as modelStateRingbuffer, modelStateTasksTableExample as modelStateTasksTable, modelStateViewExample as modelStateView, modelStateViewAfterExample as modelStateViewAfter } from './model-application-state.examples';
import { Link } from 'react-router-dom';
import { Layout } from '../layout.tsx';
import { Callout } from '../components';
import { ExecutableSnippet } from '@/components/ui';

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-bg-tertiary px-1.5 py-0.5 text-xs font-bold">{children}</code>;
}

function DocLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-primary hover:text-primary-light font-medium transition-colors">
      {children}
    </Link>
  );
}

export function ModelApplicationStatePage() {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Model Application State
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Take one realistic domain - a small task tracker - and model it end to end
            with ReifyDB's schema primitives: a namespace to own everything, tables for
            the entities, an enum for a closed value set, a dictionary for an open one,
            auto-increment sequences for IDs, a transactional view for derived state,
            and a ring buffer for recent activity. You end up with a working schema and
            the queries that drive it.
          </p>
        </div>

        <Callout variant="info" title="This page is a real database">
          Every snippet runs against a real ReifyDB engine compiled to WebAssembly.
          Click <strong>Run</strong> on each snippet, top to bottom - later snippets
          build on the state left by earlier ones. If you have not done the{' '}
          <DocLink to="/docs/guides/quick-start">quickstart</DocLink> yet, start there.
        </Callout>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">1. A namespace and the first table</h2>
          <p className="text-text-secondary mb-4">
            Everything the tracker owns lives in one{' '}
            <DocLink to="/docs/concepts/data-model/namespaces">namespace</DocLink>.
            One namespace per application domain is the right default: it keeps names
            short, and dropping or inspecting the whole app stays a one-liner. The first
            entity is <Code>projects</Code>. Its <Code>id</Code> column carries{' '}
            <Code>with {'{'} auto_increment {'}'}</Code>, so the database owns ID
            assignment - your application never coordinates counters:
          </p>
          <ExecutableSnippet title={modelStateNamespace.title} initialCode={modelStateNamespace.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Because the database assigns IDs, you read them back at insert time with{' '}
            <Code>returning</Code> instead of guessing:
          </p>
          <ExecutableSnippet title={modelStateInsertProjects.title} initialCode={modelStateInsertProjects.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">2. A closed value set: enum</h2>
          <p className="text-text-secondary mb-4">
            Task priority is a fixed set known at design time. That is exactly what an{' '}
            <DocLink to="/docs/concepts/data-model/enums">enum</DocLink> is for: the
            schema enforces the set, so a typo like <Code>"hgih"</Code> is a schema
            error instead of silent bad data. Declare the variants once:
          </p>
          <ExecutableSnippet title={modelStateEnum.title} initialCode={modelStateEnum.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">3. An open value set: dictionary</h2>
          <p className="text-text-secondary mb-4">
            Assignee names are the opposite case: an open set you discover at runtime.
            A <DocLink to="/docs/concepts/data-model/dictionaries">dictionary</DocLink>{' '}
            interns each distinct string once and stores a compact integer everywhere
            it is used. You still read and write plain strings; the encoding is the
            engine's problem:
          </p>
          <ExecutableSnippet title={modelStateDictionary.title} initialCode={modelStateDictionary.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">4. The tasks table ties it together</h2>
          <p className="text-text-secondary mb-4">
            Now the central entity. Each column type is a decision you just made:
            an auto-increment ID, a plain <Code>int8</Code> foreign reference to{' '}
            <Code>projects</Code>, the enum for priority, and the dictionary-encoded
            assignee:
          </p>
          <ExecutableSnippet title={modelStateTasksTable.title} initialCode={modelStateTasksTable.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">5. Derived state is a view, not a cache</h2>
          <p className="text-text-secondary mb-4">
            "How many open tasks does each person have?" is the kind of read shape that
            usually ends up in a cache with invalidation bugs. Here it is a{' '}
            <DocLink to="/docs/concepts/data-model/views">transactional view</DocLink>:
            declared once, maintained incrementally inside the same transaction as every
            write that affects it. Define it before inserting data, so it tracks changes
            from the start:
          </p>
          <ExecutableSnippet title={modelStateView.title} initialCode={modelStateView.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">6. Recent activity is a ring buffer</h2>
          <p className="text-text-secondary mb-4">
            An activity feed only ever shows the last few entries, so storing unbounded
            history is waste. A{' '}
            <DocLink to="/docs/concepts/data-model/ring-buffers">ring buffer</DocLink>{' '}
            holds a fixed number of rows and evicts the oldest on overflow - retention
            is schema, not a cleanup job. The tiny capacity here is just to make
            eviction visible on this page:
          </p>
          <ExecutableSnippet title={modelStateRingbuffer.title} initialCode={modelStateRingbuffer.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">7. Load the data</h2>
          <p className="text-text-secondary mb-4">
            The schema is complete; now exercise it. Enum values are written as variant
            paths, and assignees are written as plain strings - the dictionary interns
            new names on the fly:
          </p>
          <ExecutableSnippet title={modelStateInsertTasks.title} initialCode={modelStateInsertTasks.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Every auto-increment column is backed by a{' '}
            <DocLink to="/docs/concepts/data-model/sequences">sequence</DocLink> you can
            reposition, for example to keep public-facing IDs away from the small
            numbers used while prototyping. The next insert continues from the new
            value:
          </p>
          <ExecutableSnippet title={modelStateAlterSequence.title} initialCode={modelStateAlterSequence.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">8. Read it back</h2>
          <p className="text-text-secondary mb-4">
            A plain read shows how each choice is stored. The enum column comes back as
            its compact tag (<Code>priority_tag</Code>: declaration order, so{' '}
            <Code>Low</Code> is 0 and <Code>High</Code> is 2), while the
            dictionary-encoded assignee is decoded back to a string for you:
          </p>
          <ExecutableSnippet title={modelStateReadTasks.title} initialCode={modelStateReadTasks.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The dictionary itself is queryable, and it interned exactly the two distinct
            names it saw:
          </p>
          <ExecutableSnippet title={modelStateReadDictionary.title} initialCode={modelStateReadDictionary.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">9. Query the derived state</h2>
          <p className="text-text-secondary mb-4">
            The workload view is already populated. Nothing recomputed it - the task
            inserts maintained it as they committed:
          </p>
          <ExecutableSnippet title={modelStateReadView.title} initialCode={modelStateReadView.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Ad-hoc read shapes stay ordinary queries. Joined columns are prefixed with
            the join alias, so the project's <Code>name</Code> arrives as{' '}
            <Code>p_name</Code>:
          </p>
          <ExecutableSnippet title={modelStateJoin.title} initialCode={modelStateJoin.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">10. Change the data</h2>
          <p className="text-text-secondary mb-4">
            Complete a task and record the action in the activity buffer:
          </p>
          <ExecutableSnippet title={modelStateCompleteTask.title} initialCode={modelStateCompleteTask.code} />
          <p className="text-text-secondary mt-4 mb-4">
            The completed task no longer matches the view's <Code>filter</Code>, so its
            assignee's count dropped by one. There is no cache to invalidate, because
            there is no cache:
          </p>
          <ExecutableSnippet title={modelStateViewAfter.title} initialCode={modelStateViewAfter.code} />
          <p className="text-text-secondary mt-4 mb-4">
            Meanwhile the activity buffer enforces its own retention. It held one row;
            three more inserts push it past its capacity of 3, and the oldest entry is
            evicted:
          </p>
          <ExecutableSnippet title={modelStateActivityEvict.title} initialCode={modelStateActivityEvict.code} />
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What you modeled</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Authoritative state: two tables with database-assigned IDs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Constrained values: an enum for the closed set, a dictionary for the
                open one - both enforced or encoded by the schema, not by convention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Derived state: a transactional view that every write keeps current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                Bounded history: a ring buffer whose retention is part of the schema.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Where next</h2>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <DocLink to="/docs/concepts/data-model">The data model</DocLink>{' '}
                - every primitive used here, in reference depth
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <DocLink to="/docs/concepts/transactions">Transactions</DocLink>{' '}
                - why the view and the write can never disagree
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-mono">--</span>
              <span>
                <DocLink to="/docs/rql">RQL in five minutes</DocLink>{' '}
                - the query language behind every snippet on this page
              </span>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
