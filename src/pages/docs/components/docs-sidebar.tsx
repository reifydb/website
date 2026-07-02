import { useNavigate } from 'react-router-dom';
import type { NavSection } from '../data/navigation';
import { DocsNavTree } from './docs-nav-tree';

interface DocsSidebarProps {
  sections: NavSection[];
  currentPath: string;
}

export function DocsSidebar({ sections, currentPath }: DocsSidebarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <aside className="hidden lg:flex w-72 border-r border-border-default bg-bg-secondary flex-col">
      <nav className="flex-1 p-4 pt-6 overflow-y-auto sidebar-no-scrollbar">
        <DocsNavTree sections={sections} currentPath={currentPath} />
      </nav>

      <div className="p-4 border-t border-border-default">
        <button
          onClick={handleBack}
          className="text-xs text-text-muted hover:text-primary transition-colors font-semibold uppercase tracking-wider"
        >
          &larr; Back
        </button>
      </div>
    </aside>
  );
}
