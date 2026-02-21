import type { CodeExample } from '../index';

export const dateExamples: CodeExample[] = [
  // Overview quick example (date/index.tsx)
  {
    id: 'date-overview-quick',
    title: 'Date Module Quick Example',
    category: 'function',
    code: `from app.records
extend { processed_at: date::now() }`,
  },

  // date::now
  {
    id: 'date-now-overdue',
    title: 'Find overdue tasks',
    category: 'function',
    code: `from app.tasks
extend { checked_at: date::now() }`,
  },
  {
    id: 'date-now-timestamp',
    title: 'Add created timestamp',
    category: 'function',
    code: `from app.records
extend { processed_at: date::now() }`,
  },
  {
    id: 'date-now-elapsed',
    title: 'Calculate time elapsed',
    category: 'function',
    code: `from app.events
extend { reviewed_at: date::now() }`,
  },

];
