import { Github, Star } from 'lucide-react';
import { useGitHubStars } from '@/hooks/use-github-stars';

export function GitHubStars() {
  const { formatted, loading } = useGitHubStars();

  return (
    <a
      href="https://github.com/reifydb/reifydb"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-2 border-2 border-border-default rounded bg-white hover:bg-bg-tertiary transition-colors"
    >
      <Github size={18} className="text-border-default" />
      {!loading && formatted && (
        <span className="flex items-center gap-1 text-sm font-bold text-text-secondary">
          <Star size={14} className="fill-current" />
          {formatted}
        </span>
      )}
    </a>
  );
}
