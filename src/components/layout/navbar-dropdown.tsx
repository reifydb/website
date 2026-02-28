import { Link } from 'react-router-dom';
import { cn } from '@/lib';
import type { NavDropdown } from './navbar-data';

interface NavbarDropdownProps {
  dropdown: NavDropdown;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function NavbarDropdown({ dropdown, isOpen, onMouseEnter, onMouseLeave }: NavbarDropdownProps) {
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
          isOpen
            ? "text-primary"
            : "text-text-secondary hover:text-primary"
        )}
      >
        [{dropdown.label.toLowerCase()}/]
      </button>

      {/* Dropdown Panel */}
      <div
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className={cn(
          "bg-bg-elevated border-2 border-dashed border-white/15 overflow-hidden",
          dropdown.columns.length === 1 ? "min-w-[200px]" : "min-w-[400px]"
        )}>
          <div className={cn(
            "grid gap-0",
            dropdown.columns.length === 1 ? "grid-cols-1" : "grid-cols-2"
          )}>
            {dropdown.columns.map((column, colIndex) => (
              <div
                key={column.title}
                className={cn(
                  "p-4",
                  dropdown.columns.length > 1 && colIndex < dropdown.columns.length - 1 && "border-r border-white/10"
                )}
              >
                <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3 px-3">
                  <span className="text-primary"># </span>{column.title.toLowerCase()}
                </h3>
                <div className="flex flex-col gap-1">
                  {column.items.map((item) => {
                    const isExternal = item.href.startsWith('http');
                    const isAnchor = item.href.startsWith('/#');

                    const content = (
                      <>
                        <div className="text-sm text-text-secondary group-hover:text-primary transition-colors">
                          <span className="text-text-muted">-- </span>{item.label.toLowerCase()}
                        </div>
                        {item.description && (
                          <div className="text-xs text-text-tertiary mt-0.5 pl-[1.5ch]">
                            {item.description}
                          </div>
                        )}
                      </>
                    );

                    if (isExternal) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group px-3 py-2 transition-colors"
                        >
                          {content}
                        </a>
                      );
                    }

                    if (isAnchor) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          className="group px-3 py-2 transition-colors"
                        >
                          {content}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="group px-3 py-2 transition-colors"
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
