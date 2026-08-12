const KEYWORDS = new Set([
  'from',
  'sort',
  'filter',
  'map',
  'aggregate',
  'take',
  'by',
  'asc',
  'desc',
]);

const PUNCTUATION = /^(::|[{}:,])$/;
const TOKEN = /::|[{}:,]|[A-Za-z_][A-Za-z0-9_]*|\s+|./g;

function tokenClass(token: string): string {
  if (KEYWORDS.has(token)) return 'text-primary';
  if (PUNCTUATION.test(token)) return 'text-text-muted';
  return 'text-code-text';
}

export function RqlCode({ query }: { query: string }) {
  return (
    <code className="font-mono text-sm">
      {(query.match(TOKEN) ?? []).map((token, index) => (
        <span key={index} className={tokenClass(token)}>
          {token}
        </span>
      ))}
    </code>
  );
}
