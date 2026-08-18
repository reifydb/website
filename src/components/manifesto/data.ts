export const HEADLINE = 'One database instead of Postgres + Redis + a queue + a cron job.';

export const apologies = [
  {
    box: 'REDIS',
    after: 'tables, already in memory',
    role: 'The hot copy.',
    text: 'The database could not serve these rows fast enough, so now there are two of them. One is right.',
  },
  {
    box: 'CRON',
    after: 'views, current on write',
    role: 'The refresh.',
    text: 'The database could not keep a derived number current, so it is recomputed on a timer. Between runs it is wrong, and it looks fresh.',
  },
  {
    box: 'QUEUE + WORKERS',
    after: 'transitions, inside the transaction',
    role: 'The rule, later.',
    text: 'The database could not run your logic when the data changed, so the logic runs afterwards, elsewhere, and hopes the data has not moved.',
  },
  {
    box: 'SERVICE ACCOUNT',
    after: 'per-user auth and policies',
    role: 'The one password.',
    text: 'The database could not tell your users apart, so everything connects as one privileged account and the code in front of it decides who may do what. Every rule lives twice, one connection can do anything, and queries get built from user input on the way through.',
  },
  {
    box: 'GLUE',
    after: 'nothing',
    role: 'The code that knows.',
    text: 'None of the above knows about the others, so you wrote the code that does. It is the most fragile code you own, and it ships no feature.',
  },
];

export const tenets = [
  {
    claim: "Derived state is the database's job.",
    text: 'If a number can be computed from your data, you should never maintain it by hand. Not with a cron job, not with a cache key, not with a worker that hopes it ran in time. The write that changes the data is the thing that updates the number.',
  },
  {
    claim: 'A rule enforced in a service is a rule enforced sometimes.',
    text: 'Say a balance may never go below zero. If that check lives in a service, it holds only for writes that go through that service. The migration script, the support tool, the worker someone adds next quarter: none of them know the rule exists. Put the check on the data, inside the write that changes it, and there is no way around it.',
  },
  {
    claim: 'One write, one truth.',
    text: 'If a change and its consequences cannot commit together, you do not have a system. You have two systems and a race between them. Rollback has to mean everything rolls back.',
  },
  {
    claim: 'Counters, queues, and buffers are state, not cache.',
    text: 'They deserve the same transaction as the row next to them. Rebuilding them in a second store is how a balance and a rate limit end up disagreeing about the same second.',
  },
  {
    claim: 'The network is the speed limit.',
    text: 'Every round trip between your data and your logic is latency you paid for and correctness you gave up while waiting. The hot path should not have a network in it.',
  },
  {
    claim: 'The application user is the database user.',
    text: 'Every client authenticates to the database as itself, and policies decide, per user, what may be read and written. There is no shared service account and no privileged connection to hijack: a hostile query runs as the user, with the user\'s permissions, and can do nothing the user could not do anyway. Nothing to inject into, and no second copy of the rules in an API layer to drift.',
  },
];

export const stackToday = `+---------------+
|   POSTGRES    |
+---------------+
    ~ glue ~
+---------------+
|     REDIS     |
+---------------+
    ~ glue ~
+---------------+
|     CRON      |
+---------------+
    ~ glue ~
+---------------+
|     QUEUE     |
+---------------+
    ~ glue ~
+---------------+
|    WORKERS    |
+---------------+`;

export const stackReify = `+---------------+
|    REIFYDB    |
|               |
|  tables       |
|  views        |
|  transitions  |
|  primitives   |
+---------------+`;
