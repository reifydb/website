import type { CodeExample } from '../index';

export const mathExamples: CodeExample[] = [
  // Overview quick example (math/index.tsx)
  {
    id: 'math-overview-quick',
    title: 'Math Module Quick Example',
    category: 'function',
    code: `from app::sales
aggregate {
  total_revenue: math::sum(amount),
  avg_sale: math::avg(amount)
} by {region}`,
    expected: `region | total_revenue | avg_sale
-------+---------------+---------
North  | 3450.75       | 1725.375
West   | 2100          | 2100
East   | 1800.25       | 1800.25
South  | 2300.5        | 2300.5`,
  },

  // math::sum
  {
    id: 'math-sum-by-region',
    title: 'Calculate total revenue',
    category: 'function',
    code: `from app::orders
aggregate {math::sum(total)} by {region}`,
    expected: `region | math::sum(total)
-------+------------------
North  | 471.25
West   | 55.25
East   | 245
South  | 89.98999786376953`,
  },
  {
    id: 'math-sum-multiple',
    title: 'Multiple aggregations',
    category: 'function',
    code: `from app::sales
aggregate {
  total_revenue: math::sum(amount),
  avg_sale: math::avg(amount)
}`,
    expected: `total_revenue | avg_sale
--------------+---------
9651.5        | 1930.3`,
  },

  // math::avg
  {
    id: 'math-avg-by-category',
    title: 'Calculate average price',
    category: 'function',
    code: `from app::products
aggregate {math::avg(price)} by {category}`,
    expected: `category    | math::avg(price)
------------+-------------------
Accessories | 17.744999885559082
Hardware    | 99.98999786376953
Electronics | 39.99000072479248`,
  },
  {
    id: 'math-avg-with-total',
    title: 'Average with total',
    category: 'function',
    code: `from app::sales
aggregate {
  avg_sale: math::avg(amount),
  total_sales: math::sum(amount)
}`,
    expected: `avg_sale | total_sales
---------+------------
1930.3   | 9651.5`,
  },

  // math::min
  {
    id: 'math-min-by-category',
    title: 'Find lowest price',
    category: 'function',
    code: `from app::products
aggregate {math::min(price)} by {category}`,
    expected: `category    | math::min(price)
------------+-------------------
Accessories | 15.5
Hardware    | 99.98999786376953
Electronics | 29.989999771118164`,
  },
  {
    id: 'math-min-max-together',
    title: 'Min and max together',
    category: 'function',
    code: `from app::sales
aggregate {
  lowest: math::min(amount),
  highest: math::max(amount)
} by {month}`,
    expected: `month    | lowest  | highest
---------+---------+--------
March    | 1950.75 | 1950.75
February | 1800.25 | 2100
January  | 1500    | 2300.5`,
  },

  // math::max
  {
    id: 'math-max-by-category',
    title: 'Find highest price',
    category: 'function',
    code: `from app::products
aggregate {math::max(price)} by {category}`,
    expected: `category    | math::max(price)
------------+-------------------
Accessories | 19.989999771118164
Hardware    | 99.98999786376953
Electronics | 49.9900016784668`,
  },
  {
    id: 'math-max-min-together',
    title: 'Min and max together',
    category: 'function',
    code: `from app::sales
aggregate {
  lowest: math::min(amount),
  highest: math::max(amount)
} by {month}`,
    expected: `month    | lowest  | highest
---------+---------+--------
March    | 1950.75 | 1950.75
February | 1800.25 | 2100
January  | 1500    | 2300.5`,
  },

  // math::abs
  {
    id: 'math-abs-convert',
    title: 'Convert to absolute value',
    category: 'function',
    code: `from app::transactions
extend { abs_amount: math::abs(amount) }`,
    expected: `id | amount | abs_amount
---+--------+-----------
5  | 500.75 | 500.75
4  | -30    | 30
3  | 200    | 200
2  | -75.25 | 75.25
1  | 150.5  | 150.5`,
  },
  {
    id: 'math-abs-filter',
    title: 'Filter by absolute magnitude',
    category: 'function',
    code: `from app::balances
filter { math::abs(balance) > 1000 }`,
    expected: `id | balance
---+--------
3  | 3200
1  | 1250.5`,
  },

  // math::round
  {
    id: 'math-round-decimal',
    title: 'Round to 2 decimal places',
    category: 'function',
    code: `from app::prices
extend { rounded: math::round(price, 2) }`,
    expected: `id | price              | rounded
---+--------------------+-------------------
4  | 29.989999771118164 | 29.989999771118164
3  | 99.94999694824219  | 99.94999694824219
2  | 49.5               | 49.5
1  | 19.989999771118164 | 19.989999771118164`,
  },
  {
    id: 'math-round-integer',
    title: 'Round to nearest integer',
    category: 'function',
    code: `from app::metrics
extend { rounded_value: math::round(value) }`,
    expected: `id | value  | rounded_value
---+--------+--------------
4  | 312    | 312
3  | 89.25  | 89
2  | 230.75 | 231
1  | 125.5  | 126`,
  },

  // math::floor
  {
    id: 'math-floor-values',
    title: 'Floor values',
    category: 'function',
    code: `from app::measurements
extend {
  floor_val: math::floor(value),
  ceil_val: math::ceil(value)
}`,
    expected: `id | value              | floor_val | ceil_val
---+--------------------+-----------+---------
4  | 67.88999938964844  | 67        | 68
3  | 12.345000267028809 | 12        | 13
2  | 45.78900146484375  | 45        | 46
1  | 23.45599937438965  | 23        | 24`,
  },
  {
    id: 'math-floor-integer',
    title: 'Convert to integer',
    category: 'function',
    code: `from app::scores
extend { int_score: math::floor(score) }`,
    expected: `id | score | int_score
---+-------+----------
5  | 95    | 95
4  | 88.75 | 88
3  | 78.25 | 78
2  | 92    | 92
1  | 85.5  | 85`,
  },

  // math::ceil
  {
    id: 'math-ceil-values',
    title: 'Ceiling values',
    category: 'function',
    code: `from app::measurements
extend {
  floor_val: math::floor(value),
  ceil_val: math::ceil(value)
}`,
    expected: `id | value              | floor_val | ceil_val
---+--------------------+-----------+---------
4  | 67.88999938964844  | 67        | 68
3  | 12.345000267028809 | 12        | 13
2  | 45.78900146484375  | 45        | 46
1  | 23.45599937438965  | 23        | 24`,
  },
  {
    id: 'math-ceil-capacity',
    title: 'Round up for capacity',
    category: 'function',
    code: `from app::resources
extend { capacity_needed: math::ceil(usage_ratio) }`,
    expected: `id | usage_ratio         | capacity_needed
---+---------------------+----------------
4  | 0.33000001311302185 | 1
3  | 0.9200000166893005  | 1
2  | 0.44999998807907104 | 1
1  | 0.75                | 1`,
  },

  // math::power
  {
    id: 'math-power-squares',
    title: 'Calculate squares',
    category: 'function',
    code: `from app::numbers
extend { squared: math::power(value, 2) }`,
  },
  {
    id: 'math-power-compound',
    title: 'Compound growth',
    category: 'function',
    code: `from app::numbers
extend { cubed: math::power(value, 3) }`,
  },
  {
    id: 'math-power-sqrt',
    title: 'Square root (exponent 0.5)',
    category: 'function',
    code: `from app::data
extend { sqrt_value: math::power(value, 0.5) }`,
  },

  // Inline snippet examples
  {
    id: 'math-sqrt-inline',
    title: 'Calculate square root',
    category: 'function',
    code: `map {math::sqrt(cast(16.0, float8))}`,
  },
  {
    id: 'math-power-inline',
    title: 'Calculate power',
    category: 'function',
    code: `map {math::power(cast(2, int4), cast(3, int4))}`,
  },
  {
    id: 'math-floor-inline',
    title: 'Floor a float',
    category: 'function',
    code: `map {math::floor(cast(3.7, float8))}`,
  },
  {
    id: 'math-ceil-inline',
    title: 'Ceil a float',
    category: 'function',
    code: `map {math::ceil(cast(3.2, float8))}`,
  },
  {
    id: 'math-sign-inline',
    title: 'Get sign of number',
    category: 'function',
    code: `map {math::sign(cast(-50000, int4))}`,
  },
  {
    id: 'math-clamp-inline',
    title: 'Clamp value to range',
    category: 'function',
    code: `map {math::clamp(cast(5, int4), cast(0, int4), cast(10, int4))}`,
  },
  {
    id: 'math-mod-inline',
    title: 'Modulo operation',
    category: 'function',
    code: `map {math::mod(cast(7, int4), cast(3, int4))}`,
  },
  {
    id: 'math-truncate-inline',
    title: 'Truncate a float',
    category: 'function',
    code: `map {math::truncate(cast(3.5, float8))}`,
  },
  {
    id: 'math-gcd-inline',
    title: 'Greatest common divisor',
    category: 'function',
    code: `map {math::gcd(cast(12, int4), cast(8, int4))}`,
  },
  {
    id: 'math-lcm-inline',
    title: 'Least common multiple',
    category: 'function',
    code: `map {math::lcm(cast(4, int4), cast(6, int4))}`,
  },
  {
    id: 'math-sin-inline',
    title: 'Calculate sine',
    category: 'function',
    code: `map {math::sin(cast(1.0, float8))}`,
  },
  {
    id: 'math-cos-inline',
    title: 'Calculate cosine',
    category: 'function',
    code: `map {math::cos(cast(0.0, float8))}`,
  },
  {
    id: 'math-tan-inline',
    title: 'Calculate tangent',
    category: 'function',
    code: `map {math::tan(cast(1.0, float8))}`,
  },
  {
    id: 'math-asin-inline',
    title: 'Calculate arcsine',
    category: 'function',
    code: `map {math::asin(cast(0.5, float8))}`,
  },
  {
    id: 'math-acos-inline',
    title: 'Calculate arccosine',
    category: 'function',
    code: `map {math::acos(cast(0.5, float8))}`,
  },
  {
    id: 'math-atan-inline',
    title: 'Calculate arctangent',
    category: 'function',
    code: `map {math::atan(cast(1.0, float8))}`,
  },
  {
    id: 'math-atan2-inline',
    title: 'Calculate two-argument arctangent',
    category: 'function',
    code: `map {math::atan2(cast(1.0, float8), cast(1.0, float8))}`,
  },
  {
    id: 'math-exp-inline',
    title: 'Calculate exponential',
    category: 'function',
    code: `map {math::exp(cast(1.0, float8))}`,
  },
  {
    id: 'math-log-inline',
    title: 'Calculate natural logarithm',
    category: 'function',
    code: `map {math::log(cast(2.0, float8))}`,
  },
  {
    id: 'math-log2-inline',
    title: 'Calculate base-2 logarithm',
    category: 'function',
    code: `map {math::log2(cast(8.0, float8))}`,
  },
  {
    id: 'math-log10-inline',
    title: 'Calculate base-10 logarithm',
    category: 'function',
    code: `map {math::log10(cast(100.0, float8))}`,
  },
  {
    id: 'math-e-inline',
    title: 'Get Euler number',
    category: 'function',
    code: `map {math::e()}`,
  },
  {
    id: 'math-pi-inline',
    title: 'Get Pi constant',
    category: 'function',
    code: `map {math::pi()}`,
  },
];
