import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
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

// Get all expandable item IDs (sections + items with children)
function getAllExpandableIds(sections: NavSection[]): Set<string> {
  const ids = new Set<string>();

  function collectIds(items: NavItem[]) {
    for (const item of items) {
      if (item.children && item.children.length > 0) {
        ids.add(item.id);
        collectIds(item.children);
      }
    }
  }

  for (const section of sections) {
    ids.add(`section-${section.title}`);
    collectIds(section.items);
  }

  return ids;
}

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
    'w-full flex items-center gap-2 px-3 py-2 text-sm text-left',
    'transition-all duration-150',
    isActive
      ? 'text-primary-color font-medium'
      : 'text-text-secondary hover:text-primary-color'
  );

  return (
    <li>
      {item.href && !hasChildren ? (
        <Link
          to={item.href}
          onClick={onNavigate}
          className={cn(itemStyles, 'block')}
          style={{ paddingLeft: `${20 + depth * 16 + 22}px` }}
        >
          <span className="truncate">{item.label}</span>
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={itemStyles}
          style={{ paddingLeft: `${20 + depth * 16}px` }}
        >
          {hasChildren && (
            <ChevronRight
              size={14}
              className={cn(
                'flex-shrink-0 transition-transform duration-200',
                isOpen && 'rotate-90'
              )}
            />
          )}
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
          <ul className="space-y-1">
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
    // Start with all expandable items open by default
    return getAllExpandableIds(sections);
  });

  // Update open items when path changes
  useEffect(() => {
    const ancestors = findAllAncestors(sections, currentPath);
    setOpenItems(prev => {
      const next = new Set(prev);
      ancestors.forEach(id => next.add(id));
      return next;
    });
  }, [currentPath, sections]);

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
      <nav className="flex-1 p-4 pt-6 overflow-y-auto">
        {sections.map((section) => {
          const sectionId = `section-${section.title}`;
          const isSectionOpen = openItems.has(sectionId);

          return (
            <div key={section.title} className="mb-4">
              <button
                onClick={() => toggleItem(sectionId)}
                className="w-full flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-wider mb-2 px-3 py-1 hover:text-primary-color transition-colors"
              >
                <ChevronRight
                  size={12}
                  className={cn(
                    'flex-shrink-0 transition-transform duration-200',
                    isSectionOpen && 'rotate-90'
                  )}
                />
                {section.title}
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-200',
                  isSectionOpen ? 'max-h-[2000px]' : 'max-h-0'
                )}
              >
                <ul className="space-y-1">
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
      <div className="p-4 border-t-2 border-border-default">
        <button
          onClick={handleBack}
          className="text-xs text-text-muted hover:text-primary-color transition-colors font-bold uppercase tracking-wider"
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
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white border-2 border-border-default shadow-minimal"
        aria-label="Toggle docs menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-border-default/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 border-r-2 border-border-default bg-white flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          'lg:hidden fixed top-0 left-0 w-72 h-full bg-white border-r-2 border-border-default z-50 flex flex-col transform transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
