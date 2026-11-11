import type { NavSection } from '../data/navigation';
import { DocsNavTree } from './docs-nav-tree';

interface DocsSidebarProps {
  sections: NavSection[];
  currentPath: string;
}

export function DocsSidebar({ sections, currentPath }: DocsSidebarProps) {
  return (
    <aside className="hidden lg:flex w-72 border-x border-[#e3e5f4] bg-[#f5f4fc] flex-col">
      <nav className="flex-1 p-4 pt-6 overflow-y-auto sidebar-no-scrollbar">
        <DocsNavTree sections={sections} currentPath={currentPath} />
      </nav>
    </aside>
  );
}
