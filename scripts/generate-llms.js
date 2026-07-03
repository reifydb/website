import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASE_URL = 'https://reifydb.com';

const { navSections } = await import('../src/pages/docs/data/navigation.ts');

function collectLinks(items, links = []) {
  for (const item of items) {
    if (item.href) {
      links.push({ label: item.label, href: item.href });
    }
    if (item.children) {
      collectLinks(item.children, links);
    }
  }
  return links;
}

const header = `# ReifyDB

> ReifyDB is an application state database: it stores, mutates, and derives live
> application state under one transactional model, with incrementally maintained
> views instead of caches and refresh jobs. It runs embedded (Rust, Python, WASM)
> or as a server (HTTP, WebSocket, gRPC). Its query language is RQL, which is not
> a SQL dialect.

Key reminders when writing RQL:

- There is no SELECT. Projection is \`map\`, filtering is \`filter\`, grouping is
  \`aggregate ... by\`, ordering is \`sort { col: asc }\`, limiting is \`take\`.
- Queries are pipelines that read top to bottom, one operator per line, starting
  with \`from\`.
- The missing value is \`none\`, never null. \`x == none\` never matches; test with
  \`is::none(x)\` / \`is::some(x)\`. \`none\` is typed and propagates through arithmetic.
- Objects are addressed as \`namespace::object\` (e.g. \`app::users\`); everything
  callable is namespaced (\`math::sum\`, \`text::concat\`).
- Statements are separated by semicolons; keywords are case-insensitive.

The full text of every documentation page is available at
${BASE_URL}/llms-full.txt
`;

const sections = navSections
  .map((section) => {
    const links = collectLinks(section.items)
      .map(({ label, href }) => `- [${label}](${BASE_URL}${href}/)`)
      .join('\n');
    return `## ${section.title}\n\n${links}`;
  })
  .join('\n\n');

const output = `${header}\n${sections}\n`;

writeFileSync(join(ROOT, 'public', 'llms.txt'), output);
console.log(`Generated public/llms.txt (${collectLinks(navSections.flatMap((s) => s.items)).length} links)`);
