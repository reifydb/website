import type { ReactNode } from 'react';
import { Prose, Kw } from './prose';
import { heroExamples } from '@/pages/landing/sections/hero.examples';
import type { CodeExample } from '@/lib/examples/types';
import {
  exViewsDeclareExample,
  exViewsWriteExample,
  exViewsReadExample,
  exPoliciesSetupExample,
  exPoliciesInspectExample,
  exProceduresExample,
  exRingBufferExample,
} from './sections.examples';

export interface PipelineStep {
  label: string;
  description: string;
}

export interface ExampleStep {
  title: string;
  /** Prose rendered above the snippet. */
  body: ReactNode;
  example: CodeExample;
}

export interface ExampleSection {
  id: string;
  title: string;
  subtitle: string;
  /** What the database does, shown before the first step. */
  pipeline: PipelineStep[];
  steps: ExampleStep[];
  /** Closing note that terminates the step rail. */
  finish: ReactNode;
}

const builtInTesting = heroExamples.find((e) => e.id === 'guide-built-in-testing')!;

export const exampleSections: ExampleSection[] = [
  {
    id: 'incremental-views',
    finish: (
      <p>
        A number that is always current, maintained by the database from the writes themselves.
        There is no job to schedule, no cache to invalidate, and no window where the view disagrees
        with the table it is derived from.
      </p>
    ),
    title: 'Incremental Views',
    subtitle: 'Derived numbers the database keeps current',
    pipeline: [
      {
        label: 'insert ex_views::orders',
        description: 'Three rows commit in one transaction',
      },
      {
        label: 'ex_views::revenue catches up',
        description: 'The view is brought up to date from the change alone, inside that commit',
      },
      {
        label: 'from ex_views::revenue',
        description: 'The read is already current; nothing refreshed it in between',
      },
    ],
    steps: [
      {
        title: 'Declare what the number is',
        example: exViewsDeclareExample,
        body: (
          <Prose>
            <p>
              A <Kw>deferred view</Kw> is a query you declare once. From then on the database
              maintains it for you: when a write commits, the view is brought up to date
              incrementally, using only what changed rather than running the whole query again.
            </p>
            <p>
              Nothing recomputes it on a timer, and nothing has to remember to invalidate a cache
              key. The work is proportional to the write, not to the size of the table.
            </p>
          </Prose>
        ),
      },
      {
        title: 'Write to the source table only',
        example: exViewsWriteExample,
        body: (
          <Prose>
            <p>
              Nothing in this statement mentions <Kw>ex_views::revenue</Kw>. There is no second
              write, no queue message, and no cache key to bust.
            </p>
          </Prose>
        ),
      },
      {
        title: 'Read the view',
        example: exViewsReadExample,
        body: (
          <Prose>
            <p>
              The view has already caught up. No cron job, worker or cache invalidation ran between
              the insert above and this read.
            </p>
          </Prose>
        ),
      },
    ],
  },

  {
    id: 'policies',
    finish: (
      <p>
        A rule that travels with the table. Every connection is subject to it - the migration
        script, the support tool, and the service someone writes next quarter - because it is not
        the application that enforces it.
      </p>
    ),
    title: 'Policies',
    subtitle: 'Rules that live on the data, not in a service',
    pipeline: [
      {
        label: 'create table policy',
        description: 'The rule becomes a catalog object on ex_pol::documents',
      },
      {
        label: 'from: { filter ... }',
        description: 'Shapes what any reader of the table may see',
      },
      {
        label: 'insert: { require ... }',
        description: 'Rejects a write that would break the invariant, whoever sends it',
      },
    ],
    steps: [
      {
        title: 'Attach the rules to the table',
        example: exPoliciesSetupExample,
        body: (
          <Prose>
            <p>
              A policy attaches a rule to a table. <Kw>from</Kw> policies shape what a reader may
              see; <Kw>insert</Kw> policies reject writes that would break an invariant.
            </p>
            <p>
              Because the rule is part of the table, it holds for every connection: the migration
              script, the support tool, and the worker someone adds next quarter.
            </p>
          </Prose>
        ),
      },
      {
        title: 'Look them up in the catalog',
        example: exPoliciesInspectExample,
        body: (
          <Prose>
            <p>
              This console is connected as an administrator, so the rows are not filtered here. What
              matters is where the rule lives: it is a catalog object on the table, not a
              conditional in an API layer that a second caller can bypass.
            </p>
          </Prose>
        ),
      },
    ],
  },

  {
    id: 'procedures',
    finish: (
      <p>
        Two writes that commit together or not at all, from a single round trip. No orchestration,
        no compensating write, and no state where the money left one account without arriving in
        the other.
      </p>
    ),
    title: 'Procedures',
    subtitle: 'Application logic inside the transaction that changed the data',
    pipeline: [
      { label: 'call ex_proc::transfer', description: 'One round trip, one transaction' },
      { label: 'update balance - amount', description: 'Alice is debited' },
      { label: 'update balance + amount', description: 'Bob is credited, in that same transaction' },
      { label: 'commit', description: 'Both writes land, or neither does' },
    ],
    steps: [
      {
        title: 'Move money with no window where half of it happened',
        example: exProceduresExample,
        body: (
          <Prose>
            <p>
              A transfer is two writes that must both happen or neither. Run them from application
              code over a connection and there is a moment where one has landed and the other has
              not.
            </p>
            <p>
              A <Kw>procedure</Kw> runs next to the data, in one transaction, in one round trip.
              Alice loses exactly what Bob gains.
            </p>
          </Prose>
        ),
      },
    ],
  },

  {
    id: 'ring-buffers',
    finish: (
      <p>
        Bounded state that is a normal table: transactional, queryable, and committed alongside the
        rows it belongs with. Nothing has to be trimmed on a schedule, and nothing lives in a second
        store that can disagree.
      </p>
    ),
    title: 'Ring Buffers',
    subtitle: 'Bounded state that is still transactional',
    pipeline: [
      { label: 'with { capacity: 3 }', description: 'A table with a fixed number of rows' },
      { label: 'insert 4 rows', description: 'The fourth write evicts the oldest row' },
      {
        label: 'from ex_rb::recent_logins',
        description: 'Bounded state that committed next to the row beside it',
      },
    ],
    steps: [
      {
        title: 'Write past the capacity',
        example: exRingBufferExample,
        body: (
          <Prose>
            <p>
              Recent events, rate-limit windows and counters are usually pushed into a second store,
              which is how a balance and a rate limit end up disagreeing about the same second.
            </p>
            <p>
              A <Kw>ringbuffer</Kw> is a table with a fixed capacity. Writing past the capacity
              evicts the oldest row, and the whole thing commits with the row next to it.
            </p>
          </Prose>
        ),
      },
    ],
  },

  {
    id: builtInTesting.id,
    finish: (
      <p>
        Tests that live next to the data they check and run inside the database. Each one is rolled
        back when it finishes, so the suite leaves nothing behind and no fixture harness is needed
        to keep them apart.
      </p>
    ),
    title: builtInTesting.title,
    subtitle: 'Define and run tests inside the database',
    pipeline: [
      { label: 'create test procedure', description: 'Reusable setup logic, defined once' },
      { label: 'create test', description: 'Assertions written against your data in pipeline syntax' },
      {
        label: 'run tests',
        description: 'Each test runs in its own transaction and is rolled back afterward',
      },
    ],
    steps: [
      {
        title: 'Define and run tests in the database',
        example: builtInTesting,
        body: (
          <Prose>
            <p>
              ReifyDB has built-in testing primitives. Use <Kw>CREATE TEST PROCEDURE</Kw> to define
              reusable setup logic, and <Kw>CREATE TEST</Kw> to write assertions against your data
              using pipeline syntax.
            </p>
            <p>
              Run all tests in a namespace with <Kw>RUN TESTS</Kw>. Each test runs in its own
              transaction that is rolled back afterward, so tests never interfere with each other or
              leave behind state.
            </p>
          </Prose>
        ),
      },
    ],
  },
];

export function getSectionById(id: string): ExampleSection | undefined {
  return exampleSections.find((s) => s.id === id);
}
