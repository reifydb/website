import { formatPostDate, formatReadTime, type BlogPost } from '@/data/blog-data';
import { BackLink } from './back-link';
import { BlogMarkdownRenderer } from './blog-markdown-renderer';
import { PostSigil } from './post-sigil';
import { ShareRow } from './share-row';
import { TagChips } from './tag-chips';

const creditLabel = 'pixel-label text-[#4b52d6]';

export function EntryDetail({ post }: { post: BlogPost }) {
  return (
    <article>
      <header className="sky">
        <div className="mx-auto max-w-3xl px-6 md:px-8 pt-[clamp(28px,5vw,56px)] pb-10 sm:pb-12">
          <BackLink label="SELECT ENTRY" className="mb-8" />
          <p className="pixel-label text-[#4b52d6] mb-4">
            ENTRY {post.sequence} · {formatPostDate(post.date)} · {formatReadTime(post.readTime)}
          </p>
          <h1 className="text-[clamp(28px,4vw,44px)] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary mb-4 text-balance">
            {post.title}
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">{post.excerpt}</p>
          <PostSigil cells={post.sigilCells} />
        </div>
      </header>
      <div className="pixel-fade" aria-hidden="true" />

      <div className="mx-auto max-w-3xl px-6 md:px-8 pt-12 sm:pt-16 pb-24 sm:pb-32">
        <div className="font-body">
          <BlogMarkdownRenderer content={post.content} />
        </div>

        <div className="dialog mt-16 p-6 sm:p-8 grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-6 gap-y-4 font-mono text-sm text-text-secondary">
          <p className={creditLabel}>WRITTEN BY</p>
          <p className="text-text-primary">{post.author}</p>
          <p className={creditLabel}>TAGS</p>
          <TagChips tags={post.tags} />
          <p className={creditLabel}>SHARE</p>
          <ShareRow post={post} />
        </div>

        <BackLink label="BACK TO SELECT ENTRY" className="mt-10" />
      </div>
    </article>
  );
}
