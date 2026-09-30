import { Link, useLocation } from 'react-router-dom';
import { ARROW_COLORS, PixelIcon, RIGHT_ARROW } from '@/components/ui';
import { cn } from '@/lib';
import type { NavDropdown, NavDropdownItem } from './navbar-data';

interface NavbarDropdownProps {
  dropdown: NavDropdown;
  isOpen: boolean;
  instant?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const prefixMatchPaths = ['/docs', '/blog'];

function ItemLink({ item, className, children }: { item: NavDropdownItem; className?: string; children: React.ReactNode }) {
  const isExternal = item.href.startsWith('http');
  const isAnchor = item.href.startsWith('/#');

  if (isExternal) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  if (isAnchor) {
    return (
      <a href={item.href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={item.href} className={className}>
      {children}
    </Link>
  );
}

export function NavbarDropdown({ dropdown, isOpen, instant, onMouseEnter, onMouseLeave }: NavbarDropdownProps) {
  const location = useLocation();

  const isDropdownActive = dropdown.columns.some((col) =>
    col.items.some((item) => {
      if (prefixMatchPaths.some((p) => item.href === p)) {
        return location.pathname.startsWith(item.href);
      }
      return location.pathname === item.href;
    })
  );

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Trigger Button */}
      <button
        className={cn(
          "px-3 py-2 transition-colors duration-150",
          isOpen || isDropdownActive
            ? "text-text-primary"
            : "text-text-muted hover:text-text-primary"
        )}
      >
        {dropdown.label}
      </button>

      {/* Dropdown Panel */}
      <div
        className={cn(
          "absolute left-0 top-full pt-1 w-80 z-50",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "dialog transition-[opacity,translate,visibility] ease-[steps(3)]",
            instant ? "duration-0" : "duration-150",
            isOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-2"
          )}
        >
          <div className="p-3">
          {dropdown.columns.map((column) => (
            <div key={column.title}>
              <h3 className="pixel-label uppercase text-[#4b52d6] mb-2 pl-7 pr-1">
                {column.title}
              </h3>
              <div className="flex flex-col gap-1">
                {column.items.map((item) => (
                  <ItemLink key={item.label} item={item} className="group block">
                    <div className="flex gap-2 p-3">
                      <PixelIcon
                        rows={RIGHT_ARROW}
                        colors={ARROW_COLORS}
                        className="invisible mt-[3px] h-3.5 w-2 shrink-0 text-[#4b52d6] group-hover:visible"
                      />
                      <div>
                        <div className="font-medium text-sm text-text-primary group-hover:text-[#4b52d6] transition-colors">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="text-xs text-text-secondary mt-1">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </ItemLink>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
