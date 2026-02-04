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
          "font-medium px-4 py-2 rounded-lg transition-all duration-150 flex items-center gap-1.5",
          isOpen
            ? "text-text-primary bg-white/5"
            : "text-text-secondary hover:text-text-primary hover:bg-white/5"
        )}
      >
        {dropdown.label}
        <svg
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
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
        <div className="bg-bg-secondary border border-white/10 rounded-xl shadow-2xl shadow-black/20 overflow-hidden min-w-[400px]">
          <div className="grid grid-cols-2 gap-0">
            {dropdown.columns.map((column, colIndex) => (
              <div
                key={column.title}
                className={cn(
                  "p-4",
                  colIndex === 0 && "border-r border-white/10"
                )}
              >
                <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3 px-3">
                  {column.title}
                </h3>
                <div className="flex flex-col gap-1">
                  {column.items.map((item) => {
                    const isExternal = item.href.startsWith('http');
                    const isAnchor = item.href.startsWith('/#');

                    if (isExternal) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div className="font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-xs text-text-tertiary mt-0.5">
                              {item.description}
                            </div>
                          )}
                        </a>
                      );
                    }

                    if (isAnchor) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          className="group px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div className="font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-xs text-text-tertiary mt-0.5">
                              {item.description}
                            </div>
                          )}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="group px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <div className="font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="text-xs text-text-tertiary mt-0.5">
                            {item.description}
                          </div>
                        )}
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
