export function TagChips({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1">
      {tags.map((tag) => (
        <span key={tag}>#{tag}</span>
      ))}
    </div>
  );
}
