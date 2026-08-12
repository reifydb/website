/**
 * Shared type for the colocated `<page>.examples.ts` files.
 */

export interface CodeExample {
  /** Unique identifier for test naming */
  id: string;
  /** The RQL code to execute */
  code: string;
  /** Display title */
  title: string;
  /** Optional description */
  description?: string;
  /** If true, test expects execution to fail */
  expectsError?: boolean;
  /** Expected result as rendered table text (omit for dynamic results like date::now()) */
  expected?: string;
}
