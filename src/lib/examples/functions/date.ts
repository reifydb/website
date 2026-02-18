import type { CodeExample } from '../index';

export const dateExamples: CodeExample[] = [
  // Overview quick example (date/index.tsx)
  {
    id: 'date-overview-quick',
    title: 'Date Module Quick Example',
    category: 'function',
    expectsError: true, // date::year, date::month, date::format not implemented
    code: `from app.events
filter date::year(created_at) == 2024
extend {
  month: date::month(created_at),
  formatted: date::format(created_at, "%Y-%m-%d")
}`,
  },

  // date::now
  {
    id: 'date-now-overdue',
    title: 'Find overdue tasks',
    category: 'function',
    expectsError: true, // date::now not implemented
    code: `from app.tasks
filter due_date < date::now()`,
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
    expectsError: true, // date::now not implemented
    code: `from app.orders
extend { days_since: date::diff(date::now(), created_at, unit: "days") }`,
  },

  // date::add
  {
    id: 'date-add-expiration',
    title: 'Calculate expiration date',
    category: 'function',
    expectsError: true, // date::add not implemented
    code: `from app.subscriptions
extend { expires: date::add(start_date, days: 30) }`,
  },
  {
    id: 'date-add-current',
    title: 'Add days to current date',
    category: 'function',
    expectsError: true, // date::add not implemented
    code: `from app.events
extend { deadline: date::add(date::now(), days: 7) }`,
  },
  {
    id: 'date-add-subtract',
    title: 'Subtract days',
    category: 'function',
    expectsError: true, // date::add not implemented
    code: `from app.records
extend { one_week_ago: date::add(date::now(), days: -7) }`,
  },

  // date::diff
  {
    id: 'date-diff-days',
    title: 'Calculate days since creation',
    category: 'function',
    expectsError: true, // date::diff not implemented
    code: `from app.orders
extend { days_since: date::diff(date::now(), created_at, unit: "days") }`,
  },
  {
    id: 'date-diff-filter',
    title: 'Filter by age',
    category: 'function',
    expectsError: true, // date::diff not implemented
    code: `from app.records
filter date::diff(date::now(), created_at, unit: "days") > 30`,
  },
  {
    id: 'date-diff-hours',
    title: 'Calculate hours between events',
    category: 'function',
    expectsError: true, // date::diff not implemented
    code: `from app.sessions
extend { duration_hours: date::diff(end_time, start_time, unit: "hours") }`,
  },

  // date::format
  {
    id: 'date-format-iso',
    title: 'Format as ISO date',
    category: 'function',
    expectsError: true, // date::format not implemented
    code: `from app.events
extend { formatted: date::format(created_at, "%Y-%m-%d") }`,
  },
  {
    id: 'date-format-time',
    title: 'Include time',
    category: 'function',
    expectsError: true, // date::format not implemented
    code: `from app.logs
extend { timestamp_str: date::format(timestamp, "%Y-%m-%d %H:%M:%S") }`,
  },
  {
    id: 'date-format-custom',
    title: 'Custom format',
    category: 'function',
    expectsError: true, // date::format not implemented
    code: `from app.orders
extend { order_date: date::format(created_at, "%B %d, %Y") }`,
  },

  // date::year
  {
    id: 'date-year-filter',
    title: 'Filter by year',
    category: 'function',
    expectsError: true, // date::year not implemented
    code: `from app.events
filter date::year(created_at) == 2024`,
  },
  {
    id: 'date-year-group',
    title: 'Group by year',
    category: 'function',
    expectsError: true, // date::year not implemented
    code: `from app.orders
aggregate math::sum(total) by date::year(order_date)`,
  },

  // date::month
  {
    id: 'date-month-aggregate',
    title: 'Aggregate by month',
    category: 'function',
    expectsError: true, // date::month not implemented
    code: `from app.orders
aggregate math::sum(total) by date::month(order_date)`,
  },
  {
    id: 'date-month-filter',
    title: 'Filter by specific month',
    category: 'function',
    expectsError: true, // date::month not implemented
    code: `from app.events
filter date::month(created_at) == 12`,
  },

  // date::day
  {
    id: 'date-day-filter',
    title: 'Filter by first day of month',
    category: 'function',
    expectsError: true, // date::day not implemented
    code: `from app.logs
filter date::day(timestamp) == 1`,
  },
  {
    id: 'date-day-extract',
    title: 'Extract day component',
    category: 'function',
    expectsError: true, // date::day not implemented
    code: `from app.events
extend { day_of_month: date::day(created_at) }`,
  },

  // date::hour
  {
    id: 'date-hour-extract',
    title: 'Extract time components',
    category: 'function',
    expectsError: true, // date::hour not implemented
    code: `from app.events
extend {
  hour: date::hour(timestamp),
  minute: date::minute(timestamp)
}`,
  },
  {
    id: 'date-hour-business',
    title: 'Filter by business hours',
    category: 'function',
    expectsError: true, // date::hour not implemented
    code: `from app.requests
filter date::hour(timestamp) >= 9 and date::hour(timestamp) < 17`,
  },

  // date::minute
  {
    id: 'date-minute-extract',
    title: 'Extract time components',
    category: 'function',
    expectsError: true, // date::minute not implemented
    code: `from app.events
extend {
  hour: date::hour(timestamp),
  minute: date::minute(timestamp)
}`,
  },
  {
    id: 'date-minute-filter',
    title: 'Filter by specific time',
    category: 'function',
    expectsError: true, // date::minute not implemented
    code: `from app.logs
filter date::hour(timestamp) == 14 and date::minute(timestamp) == 30`,
  },

  // date::second
  {
    id: 'date-second-extract',
    title: 'Extract precise time',
    category: 'function',
    expectsError: true, // date::second not implemented
    code: `from app.events
extend {
  hour: date::hour(timestamp),
  minute: date::minute(timestamp),
  second: date::second(timestamp)
}`,
  },
  {
    id: 'date-second-filter',
    title: 'Filter by exact second',
    category: 'function',
    expectsError: true, // date::second not implemented
    code: `from app.logs
filter date::second(timestamp) == 0`,
  },
];
