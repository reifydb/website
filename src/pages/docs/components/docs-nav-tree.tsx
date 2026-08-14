import { useState, useCallback, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib';
import { useIsLocalhost } from '@/hooks';
import { useDisplaySections } from '../data/use-display-sections';
import type { NavSection, NavItem } from '../data/navigation';

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

function findAllAncestors(sections: NavSection[], targetPath: string): Set<string> {
  const result = new Set<string>();
  for (const section of sections) {
    const ancestors = findAncestorIds(section.items, targetPath, [`section-${section.title}`]);
    if (ancestors) {
      ancestors.forEach(id => result.add(id));
      break;
    }
  }
  return result;
}

function findIdPathInItems(items: NavItem[], targetId: string, prefix: string[]): string[] | null {
  for (const item of items) {
    const path = [...prefix, item.id];
    if (item.id === targetId) return path;
    if (item.children) {
      const found = findIdPathInItems(item.children, targetId, path);
      if (found) return found;
    }
  }
  return null;
}

function findIdPath(sections: NavSection[], targetId: string): string[] | null {
  for (const section of sections) {
    const sectionId = `section-${section.title}`;
    if (sectionId === targetId) return [sectionId];
    const found = findIdPathInItems(section.items, targetId, [sectionId]);
    if (found) return found;
  }
  return null;
}

let persistedOpenItems: Set<string> | null = null;

function isItemPublished(item: NavItem): boolean {
  if (item.published === true) return true;
  if (item.children) return item.children.some(isItemPublished);
  return false;
}

export interface AccordionItemProps {
  item: NavItem;
  currentPath: string;
  depth: number;
  openItems: Set<string>;
  onToggle: (id: string) => void;
  onNavigate: () => void;
  devMode?: boolean;
}

export const AccordionItem = memo(function AccordionItem({ item, currentPath, depth, openItems, onToggle, onNavigate, devMode }: AccordionItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openItems.has(item.id);
  const isActive = item.href === currentPath;
  const published = isItemPublished(item);

  const handleClick = () => {
    if (hasChildren) {
      onToggle(item.id);
    } else {
      onNavigate();
    }
  };

  const itemStyles = cn(
    'w-full flex items-center py-1.5 text-sm text-left',
    'transition-colors duration-150',
    isActive
      ? 'text-primary font-medium'
      : 'text-text-secondary hover:text-primary',
    devMode && !published && 'opacity-50 italic'
  );

  return (
    <li>
      {item.href && !hasChildren ? (
        <Link
          to={item.href}
          onClick={onNavigate}
          className={cn(itemStyles, 'pl-4')}
        >
          <span className="truncate flex-1 min-w-0">{item.label}</span>
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={cn(itemStyles, 'pl-4')}
        >
          <span className="truncate flex-1 min-w-0">{item.label}</span>
        </button>
      )}
      {hasChildren && (
        <div
          className={cn(
            'grid transition-[grid-template-rows] duration-150',
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
        >
          <div className="overflow-hidden">
            <ul className="space-y-0.5 ml-3">
              {item.children!.map((child) => (
                <AccordionItem
                  key={child.id}
                  item={child}
                  currentPath={currentPath}
                  depth={depth + 1}
                  openItems={openItems}
                  onToggle={onToggle}
                  onNavigate={onNavigate}
                  devMode={devMode}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
});

interface DocsNavTreeProps {
  sections: NavSection[];
  currentPath: string;
  onNavigate?: () => void;
}

const noop = () => {};

export function DocsNavTree({ sections, currentPath, onNavigate = noop }: DocsNavTreeProps) {
  const isLocalhost = useIsLocalhost();
  const displaySections = useDisplaySections(sections);

  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const ancestors = findAllAncestors(displaySections, currentPath);
    if (persistedOpenItems) {
      return new Set([...persistedOpenItems, ...ancestors]);
    }
    return ancestors;
  });

  useEffect(() => {
    persistedOpenItems = openItems;
  }, [openItems]);

  const toggleItem = useCallback((id: string) => {
    setOpenItems(prev => {
      const path = findIdPath(displaySections, id);
      if (!path) return prev;
      if (prev.has(id)) {
        return new Set(path.slice(0, -1));
      }
      return new Set(path);
    });
  }, [displaySections]);

  const singleSection = displaySections.length === 1;

  return (
    <>
      {displaySections.map((section) => {
        const sectionId = `section-${section.title}`;
        const isSectionOpen = singleSection || openItems.has(sectionId);

        return (
          <div key={section.title} className="mb-4">
            {!singleSection && (
              <button
                onClick={() => toggleItem(sectionId)}
                className="w-full flex items-center text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-3 py-1 hover:text-primary transition-colors"
              >
                {section.title}
              </button>
            )}
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-150',
                isSectionOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <ul className="space-y-0.5 ml-3">
                  {section.items.map((item) => (
                    <AccordionItem
                      key={item.id}
                      item={item}
                      currentPath={currentPath}
                      depth={0}
                      openItems={openItems}
                      onToggle={toggleItem}
                      onNavigate={onNavigate}
                      devMode={isLocalhost}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
