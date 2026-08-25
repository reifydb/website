import type { CodeExample } from '@/lib/examples/types';

export const playgroundRevenueExample: CodeExample = {
  id: 'playground-revenue-by-region',
  title: 'Revenue by region',
  code: `from app::orders
filter { status == "completed" }
aggregate { revenue: math::sum(total) } by { region }
sort { revenue: desc }`,
};

export const playgroundUsersExample: CodeExample = {
  id: 'playground-active-users',
  title: 'Filter and sort',
  code: `from app::users
filter { active == true }
map { name, role, age }
sort { age: desc }`,
};

export const playgroundJoinExample: CodeExample = {
  id: 'playground-join-departments',
  title: 'Join two tables',
  code: `from app::employees
inner join { from app::departments } as d using (dept_id, d.id)
map { department: d_name, salary }
sort { salary: desc }`,
};

export const playgroundComputedExample: CodeExample = {
  id: 'playground-computed-columns',
  title: 'Computed columns',
  code: `from app::employees
inner join { from app::departments } as d using (dept_id, d.id)
extend { bonus: salary * 0.1 }
map { department: d_name, salary, bonus }
sort { bonus: desc }`,
};

export const playgroundExamples: CodeExample[] = [
  playgroundRevenueExample,
  playgroundUsersExample,
  playgroundJoinExample,
  playgroundComputedExample,
];
