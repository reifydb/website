import type { ReactNode } from 'react';
import { ExecutableSnippet } from '@/components/ui';
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

export interface ExampleSection {
  id: string;
  title: string;
  subtitle: string;
  example: CodeExample;
  /** Extra content rendered above the snippet. Can be any React tree. */
  body?: ReactNode;
  /** Extra content rendered below the snippet. */
  footer?: ReactNode;
}

const builtInTesting = heroExamples.find((e) => e.id === 'guide-built-in-testing')!;

export const exampleSections: ExampleSection[] = [
  {
    id: 'incremental-views',
    title: 'Incremental Views',
    subtitle: 'Derived numbers the database keeps current',
    example: exViewsDeclareExample,
    body: (
      <Prose>
        <p>
          A <Kw>deferred view</Kw> is a query you declare once. From then on the database maintains
          it for you: when a write commits, the view is brought up to date incrementally, using only
          what changed rather than running the whole query again.
        </p>
        <p>
          Nothing recomputes it on a timer, and nothing has to remember to invalidate a cache key.
          The work is proportional to the write, not to the size of the table.
        </p>
      </Prose>
    ),
    footer: (
      <>
        <Prose>
          <p>
            Now write to the source table. Notice that nothing here mentions{' '}
            <Kw>ex_views::revenue</Kw>.
          </p>
        </Prose>
        <ExecutableSnippet
          initialCode={exViewsWriteExample.code}
          title={exViewsWriteExample.title}
        />
        <Prose>
          <p>
            Read the view. It has already caught up, and no cron job, worker or cache invalidation
            was involved in making that happen.
          </p>
        </Prose>
        <ExecutableSnippet
          initialCode={exViewsReadExample.code}
          title={exViewsReadExample.title}
        />
      </>
    ),
  },

  {
    id: 'policies',
    title: 'Policies',
    subtitle: 'Rules that live on the data, not in a service',
    example: exPoliciesSetupExample,
    body: (
      <Prose>
        <p>
          A policy attaches a rule to a table. <Kw>from</Kw> policies shape what a reader may see;{' '}
          <Kw>insert</Kw> policies reject writes that would break an invariant.
        </p>
        <p>
          Because the rule is part of the table, it holds for every connection: the migration
          script, the support tool, and the worker someone adds next quarter.
        </p>
      </Prose>
    ),
    footer: (
      <>
        <Prose>
          <p>
            This console is connected as an administrator, so the rows below are not filtered here.
            What matters is where the rule lives: it is a catalog object on the table, not a
            conditional in an API layer that a second caller can bypass.
          </p>
        </Prose>
        <ExecutableSnippet
          initialCode={exPoliciesInspectExample.code}
          title={exPoliciesInspectExample.title}
        />
      </>
    ),
  },

  {
    id: 'procedures',
    title: 'Procedures',
    subtitle: 'Application logic inside the transaction that changed the data',
    example: exProceduresExample,
    body: (
      <Prose>
        <p>
          A transfer is two writes that must both happen or neither. Run them from application code
          over a connection and there is a moment where one has landed and the other has not.
        </p>
        <p>
          A <Kw>procedure</Kw> runs next to the data, in one transaction, in one round trip. Alice
          loses exactly what Bob gains.
        </p>
      </Prose>
    ),
  },

  {
    id: 'ring-buffers',
    title: 'Ring Buffers',
    subtitle: 'Bounded state that is still transactional',
    example: exRingBufferExample,
    body: (
      <Prose>
        <p>
          Recent events, rate-limit windows and counters are usually pushed into a second store,
          which is how a balance and a rate limit end up disagreeing about the same second.
        </p>
        <p>
          A <Kw>ringbuffer</Kw> is a table with a fixed capacity. Writing past the capacity evicts
          the oldest row, and the whole thing commits with the row next to it.
        </p>
      </Prose>
    ),
  },

  {
    id: builtInTesting.id,
    title: builtInTesting.title,
    subtitle: 'Define and run tests inside the database',
    example: builtInTesting,
    body: (
      <Prose>
        <p>
          ReifyDB has built-in testing primitives. Use <Kw>CREATE TEST PROCEDURE</Kw> to define
          reusable setup logic, and <Kw>CREATE TEST</Kw> to write assertions against your data using
          pipeline syntax.
        </p>
        <p>
          Run all tests in a namespace with <Kw>RUN TESTS</Kw>. Each test runs in its own
          transaction that is rolled back afterward, so tests never interfere with each other or
          leave behind state.
        </p>
      </Prose>
    ),
  },
];

export function getSectionById(id: string): ExampleSection | undefined {
  return exampleSections.find((s) => s.id === id);
}
