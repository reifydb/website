import type { CodeExample } from '../index';

export const scriptingSubscriptionsExamples: CodeExample[] = [
  {
    id: 'scripting-create-subscription',
    title: 'Create Subscription',
    category: 'scripting',
    code: `CREATE NAMESPACE sb;
CREATE TABLE sb::events { id: int4, kind: utf8 };

CREATE SUBSCRIPTION {
  id: int4,
  kind: utf8
} AS {
  FROM sb::events
}`,
  },
];
