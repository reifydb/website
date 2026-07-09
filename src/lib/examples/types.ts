/**
 * Shared types for the code examples registry.
 *
 * Kept separate from index.ts so that colocated `<page>.examples.ts` files can
 * import the type without depending on the barrel that aggregates them.
 */

export type ExampleCategory = 'landing' | 'guide' | 'rql' | 'function' | 'scripting' | 'concept';

export type ExampleComponent = 'snippet' | string;

export interface CodeExample {
  /** Unique identifier for test naming */
  id: string;
  /** The RQL code to execute */
  code: string;
  /** Display title */
  title: string;
  /** Optional description */
  description?: string;
  /** Category for grouping */
  category: ExampleCategory;
  /** If true, test expects execution to fail */
  expectsError?: boolean;
  /** Expected result as rendered table text (omit for dynamic results like date::now()) */
  expected?: string;
  /** Which UI component to render this example with. Defaults to 'snippet'. */
  component?: ExampleComponent;
}
