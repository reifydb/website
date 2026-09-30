import { useState, useCallback, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib';
import { ARROW_COLORS, PixelIcon, RIGHT_ARROW } from '@/components/ui';
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
  index: number;
  currentPath: string;
  depth: number;
  openItems: Set<string>;
  onToggle: (id: string) => void;
  onNavigate: () => void;
  devMode?: boolean;
}

function containsPath(item: NavItem, path: string): boolean {
  return item.href === path || (item.children?.some((child) => containsPath(child, path)) ?? false);
}

const DOTTED_PATH =
  'bg-[repeating-linear-gradient(to_bottom,#c9c3dc_0_4px,transparent_4px_8px)] bg-[length:2px_100%] bg-no-repeat';

export const AccordionItem = memo(function AccordionItem({ item, index, currentPath, depth, openItems, onToggle, onNavigate, devMode }: AccordionItemProps) {
  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openItems.has(item.id);
  const isActive = item.href === currentPath;
  const isCurrent = containsPath(item, currentPath);
  const published = isItemPublished(item);
  const isLevel = depth === 0;
  const activeRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (isActive) {
      activeRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [isActive]);

  const handleClick = () => {
    if (hasChildren) {
      onToggle(item.id);
    } else {
      onNavigate();
    }
  };

  const itemStyles = cn(
    'group w-full flex items-center text-left transition-colors duration-150',
    isLevel
      ? 'gap-3 p-3'
      : cn(
          'gap-2 px-2 py-1 text-sm',
          isActive
            ? 'bg-[#ffe08a] text-[#1b1840] font-medium'
            : isCurrent
              ? 'text-[#4b52d6] font-medium'
              : 'text-text-secondary hover:text-[#4b52d6]',
        ),
    devMode && !published && 'opacity-50 italic'
  );

  const content = (
    <>
      {isLevel && (
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center font-mono text-xs font-bold',
            isCurrent ? 'bg-[#ffe08a] text-[#1b1840]' : 'bg-[#4b52d6] text-white'
          )}
        >
          {index + 1}
        </span>
      )}
      <span
        className={cn(
          'truncate flex-1 min-w-0',
          isLevel && cn('text-sm font-medium', isCurrent ? 'text-[#4b52d6]' : 'text-text-primary group-hover:text-[#4b52d6]')
        )}
      >
        {item.label}
      </span>
      {hasChildren && (
        <PixelIcon
          rows={RIGHT_ARROW}
          colors={ARROW_COLORS}
          className={cn('h-2.5 w-1.5 shrink-0 text-[#4b52d6] transition-transform', isOpen && 'rotate-90')}
        />
      )}
    </>
  );

  return (
    <li ref={activeRef} className={cn(isLevel && (isCurrent ? 'dialog' : 'border-2 border-transparent'))}>
      {item.href && !hasChildren ? (
        <Link to={item.href} onClick={onNavigate} className={itemStyles}>
          {content}
        </Link>
      ) : (
        <button onClick={handleClick} className={itemStyles}>
          {content}
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
            <ul className={cn('space-y-0.5 pl-3', DOTTED_PATH, isLevel ? 'ml-[25px] mr-3 mb-3' : 'ml-2')}>
              {item.children!.map((child, childIndex) => (
                <AccordionItem
                  key={child.id}
                  item={child}
                  index={childIndex}
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
            {singleSection ? (
              <h3 className="pixel-label uppercase text-text-muted mb-3 px-3">{section.title}</h3>
            ) : (
              <button
                onClick={() => toggleItem(sectionId)}
                className="w-full flex items-center justify-between pixel-label uppercase text-text-muted mb-3 px-3 py-1 hover:text-[#4b52d6] transition-colors"
              >
                {section.title}
                <PixelIcon
                  rows={RIGHT_ARROW}
                  colors={ARROW_COLORS}
                  className={cn('h-2.5 w-1.5 shrink-0 text-[#4b52d6] transition-transform', isSectionOpen && 'rotate-90')}
                />
              </button>
            )}
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-150',
                isSectionOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <ul className="space-y-2">
                  {section.items.map((item, index) => (
                    <AccordionItem
                      key={item.id}
                      item={item}
                      index={index}
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
