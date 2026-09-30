import { Star } from 'lucide-react';
import { useGitHubStars } from '@/hooks';

const stats = [
  { value: '1 RTT', label: 'per transaction, not per statement' },
  { value: 'Rust', label: 'core, zero GC pauses' },
  { value: 'Apache-2.0', label: 'open source' },
  { value: 'Embedded', label: 'or standalone server' },
];

export function TrustStrip() {
  const { formatted, loading } = useGitHubStars();

  return (
    <div className="bg-bg-primary border-b border-border-light">
      <div className="mx-auto max-w-6xl px-6 md:px-8 py-8">
        <div className="grid grid-cols-2 gap-y-6 gap-x-8 sm:grid-cols-3 lg:grid-cols-5">
          <a
            href="https://github.com/reifydb/reifydb"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="pixel-score flex items-center gap-1.5 uppercase text-[#4b52d6] group-hover:text-primary transition-colors">
              <Star size={16} className="fill-current text-primary" />
              {loading || !formatted ? 'GitHub' : formatted}
            </div>
            <div className="text-xs text-text-muted mt-1">stars on GitHub</div>
          </a>
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="pixel-score uppercase text-[#4b52d6]">{stat.value}</div>
              <div className="text-xs text-text-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
