/**
 * Code Examples Registry
 *
 * Centralized registry for all RQL code examples used in documentation.
 * These examples are consumed by both documentation pages and automated tests.
 */

export type ExampleCategory = 'landing' | 'guide' | 'rql' | 'function' | 'scripting';

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

// Re-export all examples
export * from './landing';
export * from './guides';
export * from './rql';
export * from './transforms';
export * from './expressions';
export * from './architecture';
export * from './functions/math';
export * from './functions/text';
export * from './functions/date';
export * from './functions/blob';
export * from './functions/datetime';
export * from './functions/duration';
export * from './functions/time';
export * from './functions/is';
export * from './functions/identity';
export * from './functions/meta';
export * from './functions/json';
export * from './scripting/index';

// Import for aggregation
import { landingExamples } from './landing';
import { guideExamples } from './guides';
import { rqlExamples } from './rql';
import { transformExamples } from './transforms';
import { expressionExamples } from './expressions';
import { architectureExamples } from './architecture';
import { mathExamples } from './functions/math';
import { textExamples } from './functions/text';
import { dateExamples } from './functions/date';
import { blobExamples } from './functions/blob';
import { datetimeExamples } from './functions/datetime';
import { durationExamples } from './functions/duration';
import { timeExamples } from './functions/time';
import { isExamples } from './functions/is';
import { identityExamples } from './functions/identity';
import { metaExamples } from './functions/meta';
import { jsonExamples } from './functions/json';
import { scriptingSchemaExamples } from './scripting/schema';
import { scriptingStorageExamples } from './scripting/storage';
import { scriptingDmlExamples } from './scripting/dml';
import { scriptingViewsExamples } from './scripting/views';
import { scriptingProceduresExamples } from './scripting/procedures';
import { scriptingEventsExamples } from './scripting/events';
import { scriptingTestingExamples } from './scripting/testing';
import { scriptingMigrationsExamples } from './scripting/migrations';
import { scriptingSubscriptionsExamples } from './scripting/subscriptions';
import { scriptingAccessControlExamples } from './scripting/access-control';

/** All examples combined for testing */
export const allExamples: CodeExample[] = [
  ...landingExamples,
  ...guideExamples,
  ...rqlExamples,
  ...transformExamples,
  ...expressionExamples,
  ...architectureExamples,
  ...mathExamples,
  ...textExamples,
  ...dateExamples,
  ...blobExamples,
  ...datetimeExamples,
  ...durationExamples,
  ...timeExamples,
  ...isExamples,
  ...identityExamples,
  ...metaExamples,
  ...jsonExamples,
  ...scriptingSchemaExamples,
  ...scriptingStorageExamples,
  ...scriptingDmlExamples,
  ...scriptingViewsExamples,
  ...scriptingProceduresExamples,
  ...scriptingEventsExamples,
  ...scriptingTestingExamples,
  ...scriptingMigrationsExamples,
  ...scriptingSubscriptionsExamples,
  ...scriptingAccessControlExamples,
];

/** Get examples by category */
export function getExamplesByCategory(category: ExampleCategory): CodeExample[] {
  return allExamples.filter((ex) => ex.category === category);
}

/** Get a single example by ID */
export function getExampleById(id: string): CodeExample | undefined {
  return allExamples.find((ex) => ex.id === id);
}
