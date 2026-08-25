import type { CodeExample } from '@/lib/examples/types';

export const exViewsDeclareExample: CodeExample = {
  id: 'ex-views-declare',
  title: 'Declare what the number is',
  code: `create namespace ex_views;
create table ex_views::orders { id: int4, region: utf8, total: float8 };

create deferred view ex_views::revenue { region: utf8, revenue: float8 } as {
  from ex_views::orders
  aggregate { revenue: math::sum(total) } by { region }
}`,
};

export const exViewsWriteExample: CodeExample = {
  id: 'ex-views-write',
  title: 'Write to the source table only',
  code: `insert ex_views::orders [
  { id: 1, region: "eu", total: 120.0 },
  { id: 2, region: "us", total: 80.0 },
  { id: 3, region: "eu", total: 45.5 }
]`,
};

export const exViewsReadExample: CodeExample = {
  id: 'ex-views-read',
  title: 'No refresh, no worker, no cron',
  code: `from ex_views::revenue
sort { revenue: desc }`,
};

export const exPoliciesSetupExample: CodeExample = {
  id: 'ex-policies-setup',
  title: 'Attach the rule to the data',
  code: `create namespace ex_pol;
create table ex_pol::documents { id: int4, title: utf8, public: bool };
insert ex_pol::documents [
  { id: 1, title: "Launch plan", public: true },
  { id: 2, title: "Salary bands", public: false }
];

create table policy public_only on ex_pol::documents {
  from: { filter { public == true } }
};

create table policy no_private_inserts on ex_pol::documents {
  insert: { require { public == true } }
}`,
};

export const exPoliciesInspectExample: CodeExample = {
  id: 'ex-policies-inspect',
  title: 'The rules are catalog objects, not application code',
  code: `from system::policies
filter { target_namespace == "ex_pol" }
map { name, target_type, target_shape, enabled }`,
};

export const exProceduresExample: CodeExample = {
  id: 'ex-procedures-transfer',
  title: 'Both writes, or neither',
  code: `create namespace ex_proc;
create table ex_proc::accounts { id: int4, owner: utf8, balance: float8 };
insert ex_proc::accounts [
  { id: 1, owner: "alice", balance: 500.0 },
  { id: 2, owner: "bob", balance: 120.0 }
];

create procedure ex_proc::transfer { from_id: int4, to_id: int4, amount: float8 } as {
  update ex_proc::accounts { balance: balance - $amount } filter { id == $from_id };
  update ex_proc::accounts { balance: balance + $amount } filter { id == $to_id }
};

call ex_proc::transfer(1, 2, 75.0);
from ex_proc::accounts sort { id: asc }`,
};

export const exRingBufferExample: CodeExample = {
  id: 'ex-ring-buffer',
  title: 'A bounded buffer that is still a transaction',
  code: `create namespace ex_rb;
create ringbuffer ex_rb::recent_logins {
  user_id: int4,
  at: utf8
} with { capacity: 3 };

insert ex_rb::recent_logins [
  { user_id: 1, at: "09:00" },
  { user_id: 2, at: "09:05" },
  { user_id: 3, at: "09:12" },
  { user_id: 4, at: "09:20" }
];

from ex_rb::recent_logins`,
};

export const sectionExamples: CodeExample[] = [
  exViewsDeclareExample,
  exViewsWriteExample,
  exViewsReadExample,
  exPoliciesSetupExample,
  exPoliciesInspectExample,
  exProceduresExample,
  exRingBufferExample,
];
