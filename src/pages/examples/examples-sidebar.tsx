import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib';
import type { ExampleSection } from './sections';

interface ExamplesSidebarProps {
  sections: ExampleSection[];
  activeId: string;
  onSelect: (id: string) => void;
}

interface LevelCardProps {
  section: ExampleSection;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

function LevelCard({ section, index, isActive, onClick }: LevelCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn('group w-full flex items-start gap-3 text-left p-3', isActive ? 'dialog' : 'border-2 border-transparent')}
    >
      <span
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center font-mono text-xs font-bold',
          isActive ? 'bg-[#ffe08a] text-[#1b1840]' : 'bg-[#4b52d6] text-white'
        )}
      >
        {index + 1}
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            'block text-sm font-medium',
            isActive ? 'text-[#4b52d6]' : 'text-text-primary group-hover:text-[#4b52d6]'
          )}
        >
          {section.title}
        </span>
        <span className="mt-0.5 block text-xs text-text-muted line-clamp-2">{section.subtitle}</span>
      </span>
    </button>
  );
}

export function ExamplesSidebar({ sections, activeId, onSelect }: ExamplesSidebarProps) {
  return (
    <aside className="hidden lg:flex w-72 border-r-2 border-[#4b52d6] bg-[#efedfb] flex-col">
      <nav className="flex-1 p-4 pt-6 overflow-y-auto sidebar-no-scrollbar">
        <h3 className="pixel-label uppercase text-text-muted mb-3 px-3">Examples</h3>
        <ul className="space-y-2">
          {sections.map((section, index) => (
            <li key={section.id}>
              <LevelCard
                section={section}
                index={index}
                isActive={section.id === activeId}
                onClick={() => onSelect(section.id)}
              />
            </li>
          ))}
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
      {/* Backdrop */}
      <div onClick={onClose} className="absolute inset-0 bg-black/60" />

      {/* Drawer */}
      <div
        className={cn(
          'absolute top-0 left-0 h-full w-72 max-w-[85vw] bg-[#efedfb] border-r-2 border-[#4b52d6] z-10 transition-[translate] duration-300 overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-[#c9c3dc]">
          <h3 className="pixel-label uppercase text-text-muted">Examples</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <LevelCard
                  section={section}
                  index={index}
                  isActive={section.id === activeId}
                  onClick={() => {
                    onSelect(section.id);
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
