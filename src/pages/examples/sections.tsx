import type { ReactNode } from 'react';
import { guideExamples, type CodeExample } from '@/lib/examples';

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

const builtInTesting = guideExamples.find((e) => e.id === 'guide-built-in-testing')!;

export const exampleSections: ExampleSection[] = [
  {
    id: builtInTesting.id,
    title: builtInTesting.title,
    subtitle: 'Define and run tests inside the database',
    example: builtInTesting,
    body: (
      <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
        <p>
          ReifyDB has built-in testing primitives. Use{' '}
          <code className="text-xs bg-black/5 px-1.5 py-0.5 rounded font-mono text-primary">CREATE TEST PROCEDURE</code> to
          define reusable setup logic, and{' '}
          <code className="text-xs bg-black/5 px-1.5 py-0.5 rounded font-mono text-primary">CREATE TEST</code> to
          write assertions against your data using pipeline syntax.
        </p>
        <p>
          Run all tests in a namespace with{' '}
          <code className="text-xs bg-black/5 px-1.5 py-0.5 rounded font-mono text-primary">RUN TESTS</code>.
          Each test runs in its own transaction that is rolled back afterward, so tests never interfere
          with each other or leave behind state.
        </p>
      </div>
    ),
  },
];

export function getSectionById(id: string): ExampleSection | undefined {
  return exampleSections.find((s) => s.id === id);
}
