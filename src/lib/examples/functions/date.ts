import type { CodeExample } from '../index';

export const dateExamples: CodeExample[] = [
  // Overview quick example (date/index.tsx)
  {
    id: 'date-overview-quick',
    title: 'Date Module Quick Example',
    category: 'function',
    code: `from app::records
extend { processed_at: date::now() }`,
  },

  // date::now
  {
    id: 'date-now-overdue',
    title: 'Find overdue tasks',
    category: 'function',
    code: `from app::tasks
extend { checked_at: date::now() }`,
  },
  {
    id: 'date-now-timestamp',
    title: 'Add created timestamp',
    category: 'function',
    code: `from app::records
extend { processed_at: date::now() }`,
  },
  {
    id: 'date-now-elapsed',
    title: 'Calculate time elapsed',
    category: 'function',
    code: `from app::events
extend { reviewed_at: date::now() }`,
  },

  // Inline snippet examples
  {
    id: 'date-year-inline',
    title: 'Extract year from date',
    category: 'function',
    code: `map {date::year(cast('2024-03-15', date))}`,
  },
  {
    id: 'date-month-inline',
    title: 'Extract month from date',
    category: 'function',
    code: `map {date::month(cast('2024-03-15', date))}`,
  },
  {
    id: 'date-day-inline',
    title: 'Extract day from date',
    category: 'function',
    code: `map {date::day(cast('2024-03-15', date))}`,
  },
  {
    id: 'date-new-inline',
    title: 'Create a new date',
    category: 'function',
    code: `map {date::new(2024, 3, 15)}`,
  },
  {
    id: 'date-add-inline',
    title: 'Add duration to date',
    category: 'function',
    code: `map {date::add(cast('2024-01-15', date), cast('P10D', duration))}`,
  },
  {
    id: 'date-subtract-inline',
    title: 'Subtract duration from date',
    category: 'function',
    code: `map {date::subtract(cast('2024-01-15', date), cast('P10D', duration))}`,
  },
  {
    id: 'date-diff-inline',
    title: 'Calculate difference between dates',
    category: 'function',
    code: `map {date::diff(cast('2024-01-15', date), cast('2024-01-05', date))}`,
  },
  {
    id: 'date-format-inline',
    title: 'Format date as string',
    category: 'function',
    code: `map {date::format(cast('2024-03-15', date), '%Y-%m-%d')}`,
  },
  {
    id: 'date-now-inline',
    title: 'Get current date',
    category: 'function',
    code: `map {date::now()}`,
  },
  {
    id: 'date-trunc-inline',
    title: 'Truncate date to year',
    category: 'function',
    code: `map {date::trunc(cast('2024-03-15', date), 'year')}`,
  },
  {
    id: 'date-age-inline',
    title: 'Calculate age between dates',
    category: 'function',
    code: `map {date::age(cast('2024-03-20', date), cast('2022-01-15', date))}`,
  },
  {
    id: 'date-day_of_year-inline',
    title: 'Get day of year',
    category: 'function',
    code: `map {date::day_of_year(cast('2023-01-15', date))}`,
  },
  {
    id: 'date-day_of_week-inline',
    title: 'Get day of week',
    category: 'function',
    code: `map {date::day_of_week(cast('2024-01-01', date))}`,
  },
  {
    id: 'date-quarter-inline',
    title: 'Get quarter from date',
    category: 'function',
    code: `map {date::quarter(cast('2024-01-15', date))}`,
  },
  {
    id: 'date-week-inline',
    title: 'Get week number from date',
    category: 'function',
    code: `map {date::week(cast('2024-01-01', date))}`,
  },
  {
    id: 'date-is_leap_year-inline',
    title: 'Check if leap year',
    category: 'function',
    code: `map {date::is_leap_year(cast('2024-01-15', date))}`,
  },
  {
    id: 'date-days_in_month-inline',
    title: 'Get days in month',
    category: 'function',
    code: `map {date::days_in_month(cast('2024-01-15', date))}`,
  },
  {
    id: 'date-start_of_month-inline',
    title: 'Get start of month',
    category: 'function',
    code: `map {date::start_of_month(cast('2024-01-15', date))}`,
  },
  {
    id: 'date-end_of_month-inline',
    title: 'Get end of month',
    category: 'function',
    code: `map {date::end_of_month(cast('2024-01-15', date))}`,
  },
  {
    id: 'date-start_of_year-inline',
    title: 'Get start of year',
    category: 'function',
    code: `map {date::start_of_year(cast('2024-06-15', date))}`,
  },
];
