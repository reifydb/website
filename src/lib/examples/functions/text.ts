import type { CodeExample } from '../index';

export const textExamples: CodeExample[] = [
  // text::concat
  {
    id: 'text-concat-fullname',
    title: 'Build full name',
    category: 'function',
    expectsError: true, // text::concat not implemented
    code: `from app.users
extend { full_name: text::concat(first_name, " ", last_name) }`,
  },
  {
    id: 'text-concat-labels',
    title: 'Create display labels',
    category: 'function',
    expectsError: true, // text::concat not implemented
    code: `from app.products
extend { label: text::concat(name, " (", sku, ")") }`,
  },
  {
    id: 'text-concat-urls',
    title: 'Build URLs',
    category: 'function',
    expectsError: true, // text::concat not implemented
    code: `from app.pages
extend { url: text::concat("/", category, "/", slug) }`,
  },

  // text::lower
  {
    id: 'text-lower-email',
    title: 'Normalize email addresses',
    category: 'function',
    expectsError: true, // text::lower not implemented
    code: `from app.users
extend { lower_email: text::lower(email) }`,
  },
  {
    id: 'text-lower-filter',
    title: 'Case-insensitive filtering',
    category: 'function',
    expectsError: true, // text::lower not implemented
    code: `from app.products
filter text::lower(category) == "electronics"`,
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
  },

  // text::trim
  {
    id: 'text-trim-input',
    title: 'Clean user input',
    category: 'function',
    code: `from app.inputs
extend { clean_value: text::trim(value) }`,
  },
  {
    id: 'text-trim-filter',
    title: 'Filter non-empty strings',
    category: 'function',
    code: `from app.comments
filter text::length(text::trim(text)) > 0`,
  },

  // text::length
  {
    id: 'text-length-filter',
    title: 'Filter by minimum length',
    category: 'function',
    code: `from app.posts
filter text::length(content) > 100`,
  },
  {
    id: 'text-length-charcount',
    title: 'Add character count field',
    category: 'function',
    code: `from app.articles
extend { char_count: text::length(body) }`,
  },
  {
    id: 'text-length-validate',
    title: 'Validate input length',
    category: 'function',
    code: `from app.usernames
filter text::length(username) >= 3 and text::length(username) <= 20`,
  },

  // text::substring
  {
    id: 'text-substring-prefix',
    title: 'Extract prefix',
    category: 'function',
    code: `from app.codes
extend { prefix: text::substring(code, 0, 3) }`,
  },
  {
    id: 'text-substring-first',
    title: 'Get first characters',
    category: 'function',
    code: `from app.products
extend { initial: text::substring(name, 0, 1) }`,
  },
  {
    id: 'text-substring-middle',
    title: 'Extract middle portion',
    category: 'function',
    code: `from app.identifiers
extend { middle: text::substring(code, 3, 7) }`,
  },
];
