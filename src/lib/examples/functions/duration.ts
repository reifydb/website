import type { CodeExample } from '../index';

export const durationExamples: CodeExample[] = [
  {
    id: 'duration-add',
    title: 'Add two durations',
    category: 'function',
    code: `map {duration::add(duration::hours(1), duration::minutes(30))}`,
  },
  {
    id: 'duration-days',
    title: 'Create a duration of days',
    category: 'function',
    code: `map {duration::days(10)}`,
  },
  {
    id: 'duration-format',
    title: 'Format a duration',
    category: 'function',
    code: `map {duration::format(duration::months(27), '%Y years %M months')}`,
  },
  {
    id: 'duration-get_days',
    title: 'Get days from duration',
    category: 'function',
    code: `map {duration::get_days(cast('P10D', duration))}`,
  },
  {
    id: 'duration-get_months',
    title: 'Get months from duration',
    category: 'function',
    code: `map {duration::get_months(cast('P1Y2M', duration))}`,
  },
  {
    id: 'duration-get_nanos',
    title: 'Get nanoseconds from duration',
    category: 'function',
    code: `map {duration::get_nanos(cast('PT1H', duration))}`,
  },
  {
    id: 'duration-hours',
    title: 'Create a duration of hours',
    category: 'function',
    code: `map {duration::hours(5)}`,
  },
  {
    id: 'duration-millis',
    title: 'Create a duration of milliseconds',
    category: 'function',
    code: `map {duration::millis(500)}`,
  },
  {
    id: 'duration-minutes',
    title: 'Create a duration of minutes',
    category: 'function',
    code: `map {duration::minutes(30)}`,
  },
  {
    id: 'duration-months',
    title: 'Create a duration of months',
    category: 'function',
    code: `map {duration::months(6)}`,
  },
  {
    id: 'duration-negate',
    title: 'Negate a duration',
    category: 'function',
    code: `map {duration::negate(duration::hours(2))}`,
  },
  {
    id: 'duration-scale',
    title: 'Scale a duration',
    category: 'function',
    code: `map {duration::scale(duration::hours(2), 3)}`,
  },
  {
    id: 'duration-seconds',
    title: 'Create a duration of seconds',
    category: 'function',
    code: `map {duration::seconds(90)}`,
  },
  {
    id: 'duration-subtract',
    title: 'Subtract two durations',
    category: 'function',
    code: `map {duration::subtract(duration::hours(2), duration::minutes(30))}`,
  },
  {
    id: 'duration-trunc',
    title: 'Truncate duration to year',
    category: 'function',
    code: `map {duration::trunc(cast('P1Y2M3DT4H5M6S', duration), 'year')}`,
  },
  {
    id: 'duration-weeks',
    title: 'Create a duration of weeks',
    category: 'function',
    code: `map {duration::weeks(3)}`,
  },
  {
    id: 'duration-years',
    title: 'Create a duration of years',
    category: 'function',
    code: `map {duration::years(2)}`,
  },
];
