import { useState } from 'react';
import { useMounted } from '@/hooks';
import { BRAND_TAG, SITE_ORIGIN, type BlogPost } from '@/data/blog-data';

const actionClass =
  'text-text-muted hover:text-primary transition-colors duration-200 cursor-pointer';

export function ShareRow({ post }: { post: BlogPost }) {
  const mounted = useMounted();
  const [copied, setCopied] = useState(false);

  const url = `${SITE_ORIGIN}/blog/${post.slug}`;
  const title = encodeURIComponent(post.title);
  const target = encodeURIComponent(url);
  const hashtags = encodeURIComponent([BRAND_TAG, ...post.tags].join(','));
  const canOpenSheet =
    mounted && typeof navigator !== 'undefined' && 'share' in navigator;

  function copyLink() {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => setCopied(false));
  }

  function openSheet() {
    navigator
      .share({ title: post.title, text: post.excerpt, url })
      .catch(() => undefined);
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="text-text-muted/60">share</span>
      <a
        href={`https://x.com/intent/tweet?text=${title}&url=${target}&hashtags=${hashtags}&via=${BRAND_TAG}`}
        target="_blank"
        rel="noreferrer"
        className={actionClass}
      >
        X
      </a>
      <a
        href={`https://t.me/share/url?url=${target}&text=${title}`}
        target="_blank"
        rel="noreferrer"
        className={actionClass}
      >
        Telegram
      </a>
      <button type="button" onClick={copyLink} className={actionClass}>
        {copied ? 'Link copied' : 'Copy link'}
      </button>
      {canOpenSheet && (
        <button type="button" onClick={openSheet} className={actionClass}>
          More <span aria-hidden="true">&rarr;</span>
        </button>
      )}
    </div>
  );
}
