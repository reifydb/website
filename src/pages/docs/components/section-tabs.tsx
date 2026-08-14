import { Link } from 'react-router-dom';
import { cn } from '@/lib';
import { useDisplaySections } from '../data/use-display-sections';
import { getSectionHref } from '../data/navigation';
import type { NavSection } from '../data/navigation';

interface SectionTabsProps {
  sections: NavSection[];
  activeTitle: string | null;
}

export function SectionTabs({ sections, activeTitle }: SectionTabsProps) {
  const displaySections = useDisplaySections(sections);

  return (
    <nav className="hidden lg:block border-b border-border-default bg-bg-secondary overflow-x-auto sidebar-no-scrollbar">
      <ul className="flex justify-center gap-6 px-6">
        {displaySections.map((section) => {
          const href = getSectionHref(section);
          if (!href) return null;
          const isActive = section.title === activeTitle;

          return (
            <li key={section.title} className="py-3">
              <Link
                to={href}
                className={cn(
                  'tab-brutalist block text-xs font-semibold whitespace-nowrap',
                  isActive ? 'tab-brutalist-active text-primary' : 'text-text-muted hover:text-primary',
                )}
              >
                {section.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
