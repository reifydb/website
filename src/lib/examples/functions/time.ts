import type { CodeExample } from '../index';

export const timeExamples: CodeExample[] = [
  {
    id: 'time-add',
    title: 'Add duration to time',
    category: 'function',
    code: `map {time::add(cast('14:30:00', time), cast('PT1H', duration))}`,
  },
  {
    id: 'time-age',
    title: 'Calculate age between times',
    category: 'function',
    code: `map {time::age(cast('14:00:00', time), cast('10:00:00', time))}`,
  },
  {
    id: 'time-diff',
    title: 'Calculate difference between times',
    category: 'function',
    code: `map {time::diff(cast('14:00:00', time), cast('10:00:00', time))}`,
  },
  {
    id: 'time-format',
    title: 'Format time as string',
    category: 'function',
    code: `map {time::format(cast('14:30:45', time), '%H:%M:%S')}`,
  },
  {
    id: 'time-hour',
    title: 'Extract hour from time',
    category: 'function',
    code: `map {time::hour(cast('14:30:00', time))}`,
  },
  {
    id: 'time-minute',
    title: 'Extract minute from time',
    category: 'function',
    code: `map {time::minute(cast('14:30:00', time))}`,
  },
  {
    id: 'time-nanosecond',
    title: 'Extract nanosecond from time',
    category: 'function',
    code: `map {time::nanosecond(cast('14:30:45.123456789', time))}`,
  },
  {
    id: 'time-new',
    title: 'Create a new time',
    category: 'function',
    code: `map {time::new(14, 30, 0)}`,
  },
  {
    id: 'time-now',
    title: 'Get current time',
    category: 'function',
    code: `map {time::now()}`,
  },
  {
    id: 'time-second',
    title: 'Extract second from time',
    category: 'function',
    code: `map {time::second(cast('14:30:45', time))}`,
  },
  {
    id: 'time-subtract',
    title: 'Subtract duration from time',
    category: 'function',
    code: `map {time::subtract(cast('14:30:00', time), cast('PT1H', duration))}`,
  },
  {
    id: 'time-trunc',
    title: 'Truncate time to hour',
    category: 'function',
    code: `map {time::trunc(cast('14:30:45', time), 'hour')}`,
  },
];
