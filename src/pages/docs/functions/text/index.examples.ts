import type { CodeExample } from '@/lib/examples/types';

export const textOverviewQuickExample: CodeExample = {
    id: 'text-overview-quick',
    title: 'Text Module Quick Example',
    code: `from app::users
extend {
  full_name: text::concat(first_name, " ", last_name),
  email_lower: text::lower(email)
}
filter { text::length(full_name) > 0 }`,
  };

export const functionsTextExamples: CodeExample[] = [
  textOverviewQuickExample,
];
