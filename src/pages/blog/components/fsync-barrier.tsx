import type { BlogPost } from '@/data/blog-data';

export function FsyncBarrier({ post }: { post: BlogPost }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-3 py-7 px-1 font-mono text-xs label-uppercase text-text-muted select-none"
    >
      <span className="text-primary shrink-0">fsync</span>
      <span className="flex-1 border-t-2 border-dashed border-border-default" />
      <span className="shrink-0" data-numeric>
        {post.lsn}
      </span>
      <span className="shrink-0">·</span>
      <span className="shrink-0" data-numeric>
        {post.size}
      </span>
    </div>
  );
}
