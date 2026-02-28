import { cn } from '@/lib';
import type { ExampleSection } from './sections';

interface ExamplesSidebarProps {
  sections: ExampleSection[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function ExamplesSidebar({ sections, activeId, onSelect }: ExamplesSidebarProps) {
  return (
    <aside className="hidden lg:flex w-60 border-r border-dashed border-white/15 bg-bg-secondary flex-col">
      <nav className="flex-1 p-4 pt-6 overflow-y-auto sidebar-no-scrollbar">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3 px-3">
          Examples
        </h3>
        <ul className="space-y-0.5">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <button
                  onClick={() => onSelect(section.id)}
                  className={cn(
                    'w-full text-left text-sm py-1.5 px-3 transition-all duration-150 truncate',
                    isActive
                      ? 'text-primary font-medium border-l-2 border-primary'
                      : 'text-text-secondary hover:text-primary'
                  )}
                >
                  {section.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

interface ExamplesSidebarMobileProps {
  sections: ExampleSection[];
  activeId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ExamplesSidebarMobile({ sections, activeId, onSelect, isOpen, onClose }: ExamplesSidebarMobileProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:hidden transition-all duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60" />

      {/* Drawer */}
      <div
        className={cn(
          'absolute top-0 left-0 h-full w-72 max-w-[85vw] bg-bg-elevated border-r border-dashed border-white/15 transform transition-transform duration-300 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-dashed border-white/15">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Examples
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close sidebar"
          >
            <span className="font-mono text-sm">[x]</span>
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-0.5">
            {sections.map((section) => {
              const isActive = section.id === activeId;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      onSelect(section.id);
                      onClose();
                    }}
                    className={cn(
                      'w-full text-left text-sm py-2 px-3 transition-all duration-150 truncate',
                      isActive
                        ? 'text-primary font-medium border-l-2 border-primary'
                        : 'text-text-secondary hover:text-primary'
                    )}
                  >
                    {section.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
