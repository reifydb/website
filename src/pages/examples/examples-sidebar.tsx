import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib';
import type { Example } from '@/components/examples';

interface ExamplesSidebarProps {
  examples: Example[];
  activeId: string;
  onSelect: (id: string) => void;
}

interface LevelCardProps {
  example: Example;
  isActive: boolean;
  onClick: () => void;
}

function LevelCard({ example, isActive, onClick }: LevelCardProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left px-3 py-3.5"
    >
      <span className="min-w-0">
        <span
          className={cn(
            'block text-sm font-medium',
            isActive ? 'marker text-[#4b52d6]' : 'text-text-primary group-hover:text-[#4b52d6]'
          )}
        >
          {example.title}
        </span>
        <span className="mt-0.5 block text-xs text-text-muted line-clamp-2">{example.subline}</span>
      </span>
    </button>
  );
}

export function ExamplesSidebar({ examples, activeId, onSelect }: ExamplesSidebarProps) {
  return (
    <aside className="hidden lg:flex w-72 shrink-0 sticky top-[var(--nav-h)] self-start h-[calc(100vh-var(--nav-h))] border-r border-[#e3e5f4] bg-bg-primary flex-col">
      <nav className="flex-1 p-4 pt-6 overflow-y-auto sidebar-no-scrollbar">
        <h3 className="font-display text-xs font-semibold uppercase tracking-[0.06em] text-text-muted mb-3 px-3">Examples</h3>
        <ul className="border-t border-[#e3e5f4]">
          {examples.map((example) => (
            <li key={example.id} className="border-b border-[#e3e5f4]">
              <LevelCard
                example={example}
                isActive={example.id === activeId}
                onClick={() => onSelect(example.id)}
              />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

interface ExamplesSidebarMobileProps {
  examples: Example[];
  activeId: string;
  onSelect: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ExamplesSidebarMobile({ examples, activeId, onSelect, isOpen, onClose }: ExamplesSidebarMobileProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 lg:hidden transition-all duration-300',
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      <div onClick={onClose} className="absolute inset-0 bg-black/60" />

      <div
        className={cn(
          'absolute top-0 left-0 h-full w-72 max-w-[85vw] bg-bg-primary border-r border-[#e3e5f4] z-10 transition-[translate] duration-300 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#e3e5f4]">
          <h3 className="font-display text-xs font-semibold uppercase tracking-[0.06em] text-text-muted">Examples</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="border-t border-[#e3e5f4]">
            {examples.map((example) => (
              <li key={example.id} className="border-b border-[#e3e5f4]">
                <LevelCard
                  example={example}
                  isActive={example.id === activeId}
                  onClick={() => {
                    onSelect(example.id);
                    onClose();
                  }}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
