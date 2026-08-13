import { useState } from 'react';
import { useMounted } from '@/hooks';
import { SITE_ORIGIN, type BlogPost } from '@/data/blog-data';

const actionClass =
  'text-text-muted hover:text-primary transition-colors duration-200 cursor-pointer';

export function ShareRow({ post }: { post: BlogPost }) {
  const mounted = useMounted();
  const [copied, setCopied] = useState(false);

  const url = `${SITE_ORIGIN}/blog/${post.slug}`;
  const target = encodeURIComponent(url);
  const hashtags = post.tags.map((tag) => `#${tag}`).join(' ');
  const body = `${post.title}\n\n${post.excerpt}\n\n${hashtags}`;
  const tweet = encodeURIComponent(`${body}\n\n${url}`);
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
      .share({ title: post.title, text: body, url })
      .catch(() => undefined);
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="text-text-muted/60">share</span>
      <a
        href={`https://x.com/intent/tweet?text=${tweet}`}
        target="_blank"
        rel="noreferrer"
        className={actionClass}
      >
        X
      </a>
      <a
        href={`https://t.me/share/url?url=${target}&text=${encodeURIComponent(body)}`}
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
