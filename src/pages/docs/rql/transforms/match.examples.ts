import type { CodeExample } from '@/lib/examples/types';

export const rqlTransformsMatchExamples: CodeExample[] = [
{
    id: 'match-value',
    title: 'Value Match',
    category: 'rql',
    code: `from app::orders
extend { region_label: match region { "North" => "Northern", "South" => "Southern", else => "Other" } }
map { id, region, region_label }`,
  },
{
    id: 'match-searched',
    title: 'Searched Match',
    category: 'rql',
    code: `from app::orders
extend { size: match { when total > 100 then "large", when total > 50 then "medium", else "small" } }
map { id, total, size }`,
  },
];
