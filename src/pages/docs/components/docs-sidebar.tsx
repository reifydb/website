import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib';
import type { NavSection } from '../data/navigation';

interface DocsSidebarProps {
  sections: NavSection[];
  currentPath: string;
}

export function DocsSidebar({ sections, currentPath }: DocsSidebarProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

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
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 px-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = currentPath === item.href;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'w-full flex items-center px-3 py-2 text-sm text-left',
                        'transition-all duration-150 border-2',
                        isActive
                          ? 'bg-primary-color text-white border-border-default shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)]'
                          : 'text-text-secondary hover:text-primary-color hover:bg-bg-tertiary border-transparent hover:border-border-default'
                      )}
                    >
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
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
