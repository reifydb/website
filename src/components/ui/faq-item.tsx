import { useEffect, useState } from 'react';
import { cn } from '@/lib';
import { PixelIcon } from './pixel-icon';

const ROBOT = [
  '...a...',
  '...l...',
  '...l...',
  'lwwwwwl',
  'lwpwpwl',
  'lwwwwwl',
  'leeeeel',
  '.kk.kk.',
  '.kk.kk.',
];

const ROBOT_COLORS: Record<string, string> = {
  a: '#ffe08a',
  l: '#c9c3dc',
  w: '#ffffff',
  p: '#7e85f2',
  e: '#e6e4f5',
  k: '#3f3b99',
};

const CHARACTERS_PER_TICK = 2;
const TICK_MS = 25;

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shown, setShown] = useState(0);
  const done = shown >= answer.length;

  useEffect(() => {
    if (!isOpen || done) return;
    const timer = window.setTimeout(() => setShown((n) => Math.min(answer.length, n + CHARACTERS_PER_TICK)), TICK_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen, done, shown, answer.length]);

  return (
    <div className="dialog">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShown(0);
        }}
        className="dialog__question"
        aria-expanded={isOpen}
      >
        <svg
          viewBox="0 0 4 7"
          className={cn('h-3.5 w-2 shrink-0 text-[#4b52d6] transition-transform', isOpen && 'rotate-90')}
          shapeRendering="crispEdges"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="0" y="0" width="1" height="7" />
          <rect x="1" y="1" width="1" height="5" />
          <rect x="2" y="2" width="1" height="3" />
          <rect x="3" y="3" width="1" height="1" />
        </svg>
        <span>{question}</span>
      </button>
      {isOpen && (
        <div className="dialog__answer" onClick={() => setShown(answer.length)}>
          <div className="dialog__portrait">
            <PixelIcon rows={ROBOT} colors={ROBOT_COLORS} className="h-9 w-7" />
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">
            <span className="sr-only">{answer}</span>
            <span aria-hidden="true">
              {answer.slice(0, shown)}
              <span className="invisible">{answer.slice(shown)}</span>
              {done && <span className="dialog__next">▼</span>}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
