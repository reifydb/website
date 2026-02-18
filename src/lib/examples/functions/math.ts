import type { CodeExample } from '../index';

export const mathExamples: CodeExample[] = [
  // Overview quick example (math/index.tsx)
  {
    id: 'math-overview-quick',
    title: 'Math Module Quick Example',
    category: 'function',
    expectsError: true, // math::count() panics
    code: `from app.sales
aggregate {
  total_revenue: math::sum(amount),
  avg_sale: math::avg(amount),
  transaction_count: math::count()
} by region`,
  },

  // math::sum
  {
    id: 'math-sum-by-region',
    title: 'Calculate total revenue',
    category: 'function',
    code: `from app.orders
aggregate {math::sum(total)} by {region}`,
  },
  {
    id: 'math-sum-multiple',
    title: 'Multiple aggregations',
    category: 'function',
    expectsError: true, // aggregate with multiple functions panics
    code: `from app.sales
aggregate {
  total_revenue: math::sum(amount),
  transaction_count: math::count()
}`,
  },

  // math::avg
  {
    id: 'math-avg-by-category',
    title: 'Calculate average price',
    category: 'function',
    code: `from app.products
aggregate {math::avg(price)} by {category}`,
  },
  {
    id: 'math-avg-with-total',
    title: 'Average with total',
    category: 'function',
    code: `from app.sales
aggregate {
  avg_sale: math::avg(amount),
  total_sales: math::sum(amount)
}`,
  },

  // math::min
  {
    id: 'math-min-by-category',
    title: 'Find lowest price',
    category: 'function',
    code: `from app.products
aggregate {math::min(price)} by {category}`,
  },
  {
    id: 'math-min-max-together',
    title: 'Min and max together',
    category: 'function',
    code: `from app.sales
aggregate {
  lowest: math::min(amount),
  highest: math::max(amount)
} by {month}`,
  },

  // math::max
  {
    id: 'math-max-by-category',
    title: 'Find highest price',
    category: 'function',
    code: `from app.products
aggregate {math::max(price)} by {category}`,
  },
  {
    id: 'math-max-min-together',
    title: 'Min and max together',
    category: 'function',
    code: `from app.sales
aggregate {
  lowest: math::min(amount),
  highest: math::max(amount)
} by {month}`,
  },

  // math::count
  {
    id: 'math-count-by-status',
    title: 'Count by status',
    category: 'function',
    expectsError: true, // math::count() panics
    code: `from app.users
aggregate math::count() by status`,
  },
  {
    id: 'math-count-with-other',
    title: 'Count with other aggregations',
    category: 'function',
    expectsError: true, // math::count() panics
    code: `from app.orders
aggregate {
  order_count: math::count(),
  total_revenue: math::sum(total)
} by region`,
  },
  {
    id: 'math-count-total',
    title: 'Total count',
    category: 'function',
    expectsError: true, // math::count() panics
    code: `from app.events
aggregate { total: math::count() }`,
  },

  // math::abs
  {
    id: 'math-abs-convert',
    title: 'Convert to absolute value',
    category: 'function',
    code: `from app.transactions
extend { abs_amount: math::abs(amount) }`,
  },
  {
    id: 'math-abs-filter',
    title: 'Filter by absolute magnitude',
    category: 'function',
    code: `from app.balances
filter math::abs(balance) > 1000`,
  },

  // math::round
  {
    id: 'math-round-decimal',
    title: 'Round to 2 decimal places',
    category: 'function',
    code: `from app.prices
extend { rounded: math::round(price, 2) }`,
  },
  {
    id: 'math-round-integer',
    title: 'Round to nearest integer',
    category: 'function',
    code: `from app.metrics
extend { rounded_value: math::round(value) }`,
  },

  // math::floor
  {
    id: 'math-floor-values',
    title: 'Floor values',
    category: 'function',
    code: `from app.measurements
extend {
  floor_val: math::floor(value),
  ceil_val: math::ceil(value)
}`,
  },
  {
    id: 'math-floor-integer',
    title: 'Convert to integer',
    category: 'function',
    code: `from app.scores
extend { int_score: math::floor(score) }`,
  },

  // math::ceil
  {
    id: 'math-ceil-values',
    title: 'Ceiling values',
    category: 'function',
    code: `from app.measurements
extend {
  floor_val: math::floor(value),
  ceil_val: math::ceil(value)
}`,
  },
  {
    id: 'math-ceil-capacity',
    title: 'Round up for capacity',
    category: 'function',
    code: `from app.resources
extend { capacity_needed: math::ceil(usage_ratio) }`,
  },

  // math::power
  {
    id: 'math-power-squares',
    title: 'Calculate squares',
    category: 'function',
    code: `from app.numbers
extend { squared: math::power(value, 2) }`,
  },
  {
    id: 'math-power-compound',
    title: 'Compound growth',
    category: 'function',
    expectsError: true, // math::power not implemented
    code: `from app.investments
extend { future_value: principal * math::power(1 + rate, years) }`,
  },
  {
    id: 'math-power-sqrt',
    title: 'Square root (exponent 0.5)',
    category: 'function',
    code: `from app.data
extend { sqrt_value: math::power(value, 0.5) }`,
  },
];
