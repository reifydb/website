export function TagChips({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 font-mono text-[11px] label-uppercase border-2 border-border-default bg-bg-secondary text-text-secondary"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
