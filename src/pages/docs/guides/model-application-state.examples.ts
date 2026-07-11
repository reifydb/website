import type { CodeExample } from '@/lib/examples/types';

export const guidesModelApplicationStateExamples: CodeExample[] = [
{
    id: 'model-state-namespace',
    title: 'Create the Namespace and the Projects Table',
    category: 'guide',
    code: `create namespace tracker;
create table tracker::projects {
  id: int8 with { auto_increment },
  name: utf8
}`,
  },
{
    id: 'model-state-insert-projects',
    title: 'Insert Projects and Read the Generated IDs',
    category: 'guide',
    code: `insert tracker::projects [
  { name: "Website" },
  { name: "Mobile App" }
] returning { id, name }`,
    expected: `id | name
---+-----------
1  | Website
2  | Mobile App`,
  },
{
    id: 'model-state-enum',
    title: 'Declare Priority as an Enum',
    category: 'guide',
    code: `create enum tracker::priority { Low, Medium, High }`,
  },
{
    id: 'model-state-dictionary',
    title: 'Create a Dictionary for Assignees',
    category: 'guide',
    code: `create dictionary tracker::assignees for utf8 as uint2`,
  },
{
    id: 'model-state-tasks-table',
    title: 'The Tasks Table Ties It Together',
    category: 'guide',
    code: `create table tracker::tasks {
  id: int8 with { auto_increment },
  project_id: int8,
  title: utf8,
  priority: tracker::priority,
  assignee: utf8 with { dictionary: tracker::assignees },
  done: bool
}`,
  },
{
    id: 'model-state-view',
    title: 'Derived State: Open Tasks per Assignee',
    category: 'guide',
    code: `create transactional view tracker::workload { assignee: utf8, open: int8 } as {
  from tracker::tasks
  filter { done == false }
  aggregate { open: math::count(id) } by { assignee }
}`,
  },
{
    id: 'model-state-ringbuffer',
    title: 'A Ring Buffer for Recent Activity',
    category: 'guide',
    code: `create ringbuffer tracker::activity {
  task_id: int8,
  action: utf8
} with { capacity: 3 }`,
  },
{
    id: 'model-state-insert-tasks',
    title: 'Insert Tasks',
    category: 'guide',
    code: `insert tracker::tasks [
  { project_id: 1, title: "Design landing page", priority: tracker::priority::High,
    assignee: "ada", done: false },
  { project_id: 1, title: "Set up analytics", priority: tracker::priority::Low,
    assignee: "grace", done: false },
  { project_id: 2, title: "Login screen", priority: tracker::priority::Medium,
    assignee: "ada", done: false }
]`,
    expected: `namespace | table | inserted
----------+-------+---------
tracker   | tasks | 3`,
  },
{
    id: 'model-state-alter-sequence',
    title: 'Reposition the ID Sequence',
    category: 'guide',
    code: `alter sequence tracker::tasks::id set value 100;
insert tracker::tasks [
  { project_id: 2, title: "Push notifications", priority: tracker::priority::Low,
    assignee: "grace", done: false }
] returning { id, title }`,
    expected: `id  | title
----+-------------------
101 | Push notifications`,
  },
{
    id: 'model-state-read-tasks',
    title: 'Read the Tasks Back',
    category: 'guide',
    code: `from tracker::tasks
sort { id: asc }`,
    expected: `id  | project_id | title               | priority_tag | assignee | done
----+------------+---------------------+--------------+----------+------
1   | 1          | Design landing page | 2            | ada      | false
2   | 1          | Set up analytics    | 0            | grace    | false
3   | 2          | Login screen        | 1            | ada      | false
101 | 2          | Push notifications  | 0            | grace    | false`,
  },
{
    id: 'model-state-read-dictionary',
    title: 'The Dictionary Interned Both Assignees',
    category: 'guide',
    code: `from tracker::assignees`,
    expected: `id | value
---+------
2  | grace
1  | ada`,
  },
{
    id: 'model-state-read-view',
    title: 'Query the Workload View',
    category: 'guide',
    code: `from tracker::workload
sort { assignee: asc }`,
    expected: `assignee | open
---------+-----
ada      | 2
grace    | 2`,
  },
{
    id: 'model-state-join',
    title: 'Join Tasks to Their Project',
    category: 'guide',
    code: `from tracker::tasks
filter { done == false }
inner join { from tracker::projects } as p using (project_id, p.id)
map { title, project: p_name }
sort { title: asc }`,
    expected: `title               | project
--------------------+-----------
Design landing page | Website
Login screen        | Mobile App
Push notifications  | Mobile App
Set up analytics    | Website`,
  },
{
    id: 'model-state-complete-task',
    title: 'Complete a Task and Log the Activity',
    category: 'guide',
    code: `update tracker::tasks { done: true } filter { title == "Login screen" };
insert tracker::activity [{ task_id: 3, action: "completed" }]`,
    expected: `namespace | ringbuffer | inserted
----------+------------+---------
tracker   | activity   | 1`,
  },
{
    id: 'model-state-view-after',
    title: 'The View Already Reflects the Change',
    category: 'guide',
    code: `from tracker::workload
sort { assignee: asc }`,
    expected: `assignee | open
---------+-----
ada      | 1
grace    | 2`,
  },
{
    id: 'model-state-activity-evict',
    title: 'The Ring Buffer Keeps Only the Newest Rows',
    category: 'guide',
    code: `insert tracker::activity [
  { task_id: 1, action: "commented" },
  { task_id: 2, action: "reassigned" },
  { task_id: 1, action: "completed" }
];
from tracker::activity`,
    expected: `task_id | action
--------+-----------
1       | commented
2       | reassigned
1       | completed`,
  },
];
