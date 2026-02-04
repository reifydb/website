import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib';
import type { NavSection, NavItem } from '../data/navigation';

interface DocsSidebarProps {
  sections: NavSection[];
  currentPath: string;
}

// Find all ancestor item IDs for a given path
function findAncestorIds(items: NavItem[], targetPath: string, ancestors: string[] = []): string[] | null {
  for (const item of items) {
    if (item.href === targetPath) {
      return ancestors;
    }
    if (item.children) {
      const found = findAncestorIds(item.children, targetPath, [...ancestors, item.id]);
      if (found) return found;
    }
  }
  return null;
}

// Find all ancestor IDs across all sections
function findAllAncestors(sections: NavSection[], targetPath: string): Set<string> {
  const result = new Set<string>();
  for (const section of sections) {
    // Add section title as an ID so sections auto-expand too
    const ancestors = findAncestorIds(section.items, targetPath, [`section-${section.title}`]);
    if (ancestors) {
      ancestors.forEach(id => result.add(id));
      break;
    }
  }
  return result;
}

// Persist open items across component remounts
let persistedOpenItems: Set<string> | null = null;

interface AccordionItemProps {
  item: NavItem;
  currentPath: string;
  depth: number;
  openItems: Set<string>;
  onToggle: (id: string) => void;
  onNavigate: () => void;
}

function AccordionItem({ item, currentPath, depth, openItems, onToggle, onNavigate }: AccordionItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openItems.has(item.id);
  const isActive = item.href === currentPath;

  const handleClick = () => {
    if (hasChildren) {
      onToggle(item.id);
    } else {
      onNavigate();
    }
  };

  const itemStyles = cn(
    'w-full flex items-center py-1.5 text-sm text-left',
    'transition-all duration-150',
    isActive
      ? 'text-primary font-medium'
      : 'text-text-secondary hover:text-primary'
  );

  return (
    <li>
      {item.href && !hasChildren ? (
        <Link
          to={item.href}
          onClick={onNavigate}
          className={cn(itemStyles, 'block pl-4')}
        >
          <span className="truncate">{item.label}</span>
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={cn(itemStyles, 'pl-4')}
        >
          <span className="truncate">{item.label}</span>
        </button>
      )}
      {hasChildren && (
        <div
          className={cn(
            'overflow-hidden transition-all duration-200',
            isOpen ? 'max-h-[1000px]' : 'max-h-0'
          )}
        >
          <ul className="space-y-0.5 border-l border-white/10 ml-3">
            {item.children!.map((child) => (
              <AccordionItem
                key={child.id}
                item={child}
                currentPath={currentPath}
                depth={depth + 1}
                openItems={openItems}
                onToggle={onToggle}
                onNavigate={onNavigate}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export function DocsSidebar({ sections, currentPath }: DocsSidebarProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    // Use persisted state if available, otherwise expand ancestors of current page
    if (persistedOpenItems) {
      return persistedOpenItems;
    }
    return findAllAncestors(sections, currentPath);
  });

  // Sync state to module variable for persistence across remounts
  useEffect(() => {
    persistedOpenItems = openItems;
  }, [openItems]);

  const toggleItem = useCallback((id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const sidebarContent = (
    <>
      {/* Navigation */}
      <nav className="flex-1 p-4 pt-6 overflow-y-auto sidebar-no-scrollbar">
        {sections.map((section) => {
          const sectionId = `section-${section.title}`;
          const isSectionOpen = openItems.has(sectionId);

          return (
            <div key={section.title} className="mb-4">
              <button
                onClick={() => toggleItem(sectionId)}
                className="w-full flex items-center text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-3 py-1 hover:text-primary transition-colors"
              >
                {section.title}
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  isSectionOpen ? 'max-h-[2000px]' : 'max-h-0'
                )}
              >
                <ul className="space-y-0.5 border-l border-white/10 ml-3">
                  {section.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      item={item}
                      currentPath={currentPath}
                      depth={0}
                      openItems={openItems}
                      onToggle={toggleItem}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleBack}
          className="text-xs text-text-muted hover:text-primary transition-colors font-semibold uppercase tracking-wider"
        >
          &larr; Back
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-bg-tertiary border border-white/10 rounded-lg"
        aria-label="Toggle docs menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 border-r border-white/10 bg-bg-secondary flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed top-0 left-0 w-72 h-full bg-bg-secondary border-r border-white/10 z-50 flex flex-col transform transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
