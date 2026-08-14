import { Github, Star } from 'lucide-react';
import { useGitHubStars } from '@/hooks/use-github-stars';
import { Skeleton } from '@reifydb/ui';

export function TrustBarSection() {
  const { formatted, loading } = useGitHubStars();

  if (!loading && !formatted) return null;

  return (
    <div className="border-y border-border-light bg-bg-secondary">
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-4 flex items-center justify-center gap-2 text-sm text-text-secondary">
        <Github size={16} />
        {loading ? (
          <Skeleton className="h-4 w-48" />
        ) : (
          <a
            href="https://github.com/reifydb/reifydb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-text-primary transition-colors"
          >
            <span className="flex items-center gap-1 font-semibold text-text-primary">
              <Star size={14} className="fill-current text-primary" />
              {formatted} stars
            </span>
            <span>on GitHub</span>
            <span className="text-primary">View the repo &rarr;</span>
          </a>
        )}
      </div>
    </div>
  );
}
