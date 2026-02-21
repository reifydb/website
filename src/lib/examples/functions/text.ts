import type { CodeExample } from '../index';

export const textExamples: CodeExample[] = [
  // Overview quick example (text/index.tsx)
  {
    id: 'text-overview-quick',
    title: 'Text Module Quick Example',
    category: 'function',
    code: `from app.users
extend {
  full_name: text::concat(first_name, " ", last_name),
  email_lower: text::lower(email)
}
filter text::length(full_name) > 0`,
  },

  // text::concat
  {
    id: 'text-concat-fullname',
    title: 'Build full name',
    category: 'function',
    code: `from app.users
extend { full_name: text::concat(first_name, " ", last_name) }`,
  },
  {
    id: 'text-concat-labels',
    title: 'Create display labels',
    category: 'function',
    code: `from app.products
extend { label: text::concat(name, " (", sku, ")") }`,
    expected: `id | name        | sku     | price              | category    | label
---+-------------+---------+--------------------+-------------+----------------------
5  | Thingamajig | TMJ-005 | 15.5               | Accessories | Thingamajig (TMJ-005)
4  | Doohickey   | DHK-004 | 99.98999786376953  | Hardware    | Doohickey (DHK-004)
3  | Gizmo       | GZM-003 | 19.989999771118164 | Accessories | Gizmo (GZM-003)
2  | Gadget      | GDT-002 | 49.9900016784668   | Electronics | Gadget (GDT-002)
1  | Widget      | WGT-001 | 29.989999771118164 | Electronics | Widget (WGT-001)`,
  },
  {
    id: 'text-concat-urls',
    title: 'Build URLs',
    category: 'function',
    code: `from app.pages
extend { url: text::concat("/", category, "/", slug) }`,
    expected: `id | category | slug               | url
---+----------+--------------------+-------------------------
4  | docs     | installation-guide | /docs/installation-guide
3  | blog     | advanced-queries   | /blog/advanced-queries
2  | docs     | api-reference      | /docs/api-reference
1  | blog     | getting-started    | /blog/getting-started`,
  },

  // text::lower
  {
    id: 'text-lower-email',
    title: 'Normalize email addresses',
    category: 'function',
    code: `from app.users
extend { lower_email: text::lower(email) }`,
  },
  {
    id: 'text-lower-filter',
    title: 'Case-insensitive filtering',
    category: 'function',
    code: `from app.products
filter text::lower(category) == "electronics"`,
    expected: `id | name   | sku     | price              | category
---+--------+---------+--------------------+------------
2  | Gadget | GDT-002 | 49.9900016784668   | Electronics
1  | Widget | WGT-001 | 29.989999771118164 | Electronics`,
  },

  // text::upper
  {
    id: 'text-upper-names',
    title: 'Format display names',
    category: 'function',
    code: `from app.users
extend { upper_name: text::upper(name) }`,
  },
  {
    id: 'text-upper-sku',
    title: 'Uppercase code identifiers',
    category: 'function',
    code: `from app.products
extend { sku_upper: text::upper(sku) }`,
    expected: `id | name        | sku     | price              | category    | sku_upper
---+-------------+---------+--------------------+-------------+----------
5  | Thingamajig | TMJ-005 | 15.5               | Accessories | TMJ-005
4  | Doohickey   | DHK-004 | 99.98999786376953  | Hardware    | DHK-004
3  | Gizmo       | GZM-003 | 19.989999771118164 | Accessories | GZM-003
2  | Gadget      | GDT-002 | 49.9900016784668   | Electronics | GDT-002
1  | Widget      | WGT-001 | 29.989999771118164 | Electronics | WGT-001`,
  },

  // text::trim
  {
    id: 'text-trim-input',
    title: 'Clean user input',
    category: 'function',
    code: `from app.inputs
extend { clean_value: text::trim(value) }`,
    expected: `id | value           | clean_value
---+-----------------+------------
4  |    spaces       | spaces
3  | trimmed         | trimmed
2  |   test input    | test input
1  |   hello world   | hello world`,
  },
  {
    id: 'text-trim-filter',
    title: 'Filter non-empty strings',
    category: 'function',
    code: `from app.inputs
filter text::length(value) > 0`,
    expected: `id | value
---+----------------
4  |    spaces
3  | trimmed
2  |   test input
1  |   hello world`,
  },

  // text::length
  {
    id: 'text-length-filter',
    title: 'Filter by minimum length',
    category: 'function',
    code: `from app.posts
filter text::length(content) > 100`,
    expected: `(empty)`,
  },
  {
    id: 'text-length-charcount',
    title: 'Add character count field',
    category: 'function',
    code: `from app.articles
extend { char_count: text::length(body) }`,
    expected: `id | body                                                                       | char_count
---+----------------------------------------------------------------------------+-----------
4  | Performance optimization strategies for large datasets.                    | 55
3  | Best practices for data modeling in document databases.                    | 55
2  | Advanced query techniques using RQL expressions and transforms.            | 63
1  | Introduction to ReifyDB and its powerful features for modern applications. | 74`,
  },
  {
    id: 'text-length-validate',
    title: 'Validate input length',
    category: 'function',
    code: `from app.usernames
filter text::length(username) >= 3 and text::length(username) <= 20`,
    expected: `id | username
---+-------------
4  | david_brown
3  | carol_wilson
2  | bob_jones
1  | alice_smith`,
  },

  // text::substring
  {
    id: 'text-substring-prefix',
    title: 'Extract prefix',
    category: 'function',
    code: `from app.codes
extend { prefix: text::substring(code, 0, 3) }`,
    expected: `id | code   | prefix
---+--------+-------
4  | jkl012 | jkl
3  | GHI789 | GHI
2  | def456 | def
1  | ABC123 | ABC`,
  },
  {
    id: 'text-substring-first',
    title: 'Get first characters',
    category: 'function',
    code: `from app.products
extend { initial: text::substring(name, 0, 1) }`,
    expected: `id | name        | sku     | price              | category    | initial
---+-------------+---------+--------------------+-------------+--------
5  | Thingamajig | TMJ-005 | 15.5               | Accessories | T
4  | Doohickey   | DHK-004 | 99.98999786376953  | Hardware    | D
3  | Gizmo       | GZM-003 | 19.989999771118164 | Accessories | G
2  | Gadget      | GDT-002 | 49.9900016784668   | Electronics | G
1  | Widget      | WGT-001 | 29.989999771118164 | Electronics | W`,
  },
  {
    id: 'text-substring-middle',
    title: 'Extract middle portion',
    category: 'function',
    code: `from app.identifiers
extend { middle: text::substring(code, 3, 7) }`,
    expected: `id | code     | middle
---+----------+-------
4  | ID-004-D | 004-D
3  | ID-003-C | 003-C
2  | ID-002-B | 002-B
1  | ID-001-A | 001-A`,
  },
];
