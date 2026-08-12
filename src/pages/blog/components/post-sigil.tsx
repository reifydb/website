export function PostSigil({ lines }: { lines: string[] }) {
  return (
    <pre
      aria-hidden="true"
      className="shrink-0 font-mono text-[10px] sm:text-xs leading-[1.15] select-none text-text-muted"
    >
      {lines.map((line, index) =>
        index === 0 || index === lines.length - 1 ? (
          <div key={line + index}>{line}</div>
        ) : (
          <div key={line + index}>
            {line[0]}
            <span className="text-primary">{line.slice(1, -1)}</span>
            {line.at(-1)}
          </div>
        )
      )}
    </pre>
  );
}
