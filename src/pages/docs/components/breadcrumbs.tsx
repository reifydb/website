import { Link } from 'react-router-dom';
import type { Breadcrumb } from '../data/navigation';

interface BreadcrumbsProps {
  trail: Breadcrumb[];
}

export function Breadcrumbs({ trail }: BreadcrumbsProps) {
  if (trail.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-xs text-text-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/docs" className="hover:text-primary transition-colors">
            Docs
          </Link>
        </li>
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
              <span aria-hidden="true">/</span>
              {crumb.href && !isLast ? (
                <Link to={crumb.href} className="hover:text-primary transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-text-secondary font-medium' : undefined}>
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
