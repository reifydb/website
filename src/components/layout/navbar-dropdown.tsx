import { Link, useLocation } from 'react-router-dom';
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
            ? "text-primary"
            : "text-text-secondary hover:text-primary"
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
            "bg-bg-elevated border border-border-default rounded-lg shadow-large transition-all",
            instant ? "duration-0" : "duration-200",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
        >
          <div className="p-3">
          {dropdown.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-1">
                {column.title}
              </h3>
              <div className="flex flex-col gap-1">
                {column.items.map((item) => (
                  <ItemLink key={item.label} item={item} className="group block">
                    <div className="p-3 rounded-md transition-all duration-150 hover:bg-white/5">
                      <div className="font-medium text-sm text-text-primary group-hover:text-primary transition-colors">
                        {item.label}
                      </div>
                      {item.description && (
                        <div className="text-xs text-text-secondary mt-1">
                          {item.description}
                        </div>
                      )}
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
