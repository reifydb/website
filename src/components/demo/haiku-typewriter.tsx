import { useState, useEffect, useMemo } from 'react';

export interface Haiku {
  lines: [string, string, string];
}

interface HaikuTypewriterProps {
  haikus: Haiku[];
  typingSpeed?: number;
  linePause?: number;
  haikuPause?: number;
  className?: string;
}

type Phase = 'typing' | 'line-pause' | 'haiku-display' | 'haiku-fade';

interface TextSegment {
  text: string;
  color?: string;
}

const colorMap: Record<string, string> = {
  primary: 'text-primary',
  cyan: 'text-accent-cyan',
  green: 'text-feature-green',
};

/** Parse "{color:text}" markup into segments. Plain text passes through. */
function parseLine(line: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const regex = /\{(\w+):([^}]+)\}/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: line.slice(lastIndex, match.index) });
    }
    segments.push({ text: match[2], color: match[1] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < line.length) {
    segments.push({ text: line.slice(lastIndex) });
  }
  return segments;
}

/** Strip markup to get plain text (used for char-by-char typing). */
function plainText(line: string): string {
  return line.replace(/\{(\w+):([^}]+)\}/g, '$2');
}

/** Render a partial string (first `len` visible chars) with color markup applied. */
function renderColoredText(markup: string, visibleLen: number): TextSegment[] {
  const segments = parseLine(markup);
  const result: TextSegment[] = [];
  let remaining = visibleLen;
  for (const seg of segments) {
    if (remaining <= 0) break;
    const slice = seg.text.slice(0, remaining);
    result.push({ text: slice, color: seg.color });
    remaining -= slice.length;
  }
  return result;
}

export function HaikuTypewriter({
  haikus,
  typingSpeed = 70,
  linePause = 300,
  haikuPause = 3000,
  className,
}: HaikuTypewriterProps) {
  const [haikuIndex, setHaikuIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('typing');
  const [displayLengths, setDisplayLengths] = useState<number[]>([0, 0, 0]);

  const plainLines = useMemo(
    () => haikus.map((h) => h.lines.map(plainText)),
    [haikus],
  );
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    if (phase === 'typing') {
      const currentPlainLine = plainLines[haikuIndex][lineIndex];
      if (charIndex < currentPlainLine.length) {
        const timeout = setTimeout(() => {
          setDisplayLengths((prev) => {
            const next = [...prev];
            next[lineIndex] = charIndex + 1;
            return next;
          });
          setCharIndex((c) => c + 1);
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        if (lineIndex < 2) {
          setPhase('line-pause');
        } else {
          setPhase('haiku-display');
        }
      }
    } else if (phase === 'line-pause') {
      const timeout = setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
        setPhase('typing');
      }, linePause);
      return () => clearTimeout(timeout);
    } else if (phase === 'haiku-display') {
      const timeout = setTimeout(() => {
        setPhase('haiku-fade');
      }, haikuPause);
      return () => clearTimeout(timeout);
    } else if (phase === 'haiku-fade') {
      const timeout = setTimeout(() => {
        const nextIndex = (haikuIndex + 1) % haikus.length;
        setHaikuIndex(nextIndex);
        setLineIndex(0);
        setCharIndex(0);
        setDisplayLengths([0, 0, 0]);
        setPhase('typing');
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [phase, charIndex, lineIndex, haikuIndex, reducedMotion, haikus, typingSpeed, linePause, haikuPause]);

  const currentHaiku = haikus[haikuIndex];

  const renderSegments = (segments: TextSegment[]) =>
    segments.map((seg, j) => (
      <span key={j} className={seg.color ? colorMap[seg.color] : undefined}>
        {seg.text}
      </span>
    ));

  if (reducedMotion) {
    return (
      <h1 className={className}>
        {haikus[0].lines.map((line, i) => (
          <span key={i} className="block">
            {renderSegments(parseLine(line))}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 className={className} aria-label={plainLines[haikuIndex].join(' / ')}>
      <div
        className={`transition-opacity duration-500 ${phase === 'haiku-fade' ? 'opacity-0' : 'opacity-100'}`}
      >
        {currentHaiku.lines.map((markup, i) => (
          <span key={`${haikuIndex}-${i}`} className="block min-h-[1.2em]">
            {renderSegments(renderColoredText(markup, displayLengths[i]))}
            {i === lineIndex && phase !== 'haiku-fade' && (
              <span
                className="blink-cursor text-primary ml-0.5 drop-shadow-[0_0_8px_rgba(129,140,248,0.8)]"
                aria-hidden="true"
              >
                █
              </span>
            )}
          </span>
        ))}
      </div>
    </h1>
  );
}
