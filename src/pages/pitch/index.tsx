import { useEffect, useCallback, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { pitchSlides } from './pitch-data';

export function PitchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const slideParam = parseInt(searchParams.get('slide') || '1', 10);
  const currentSlide = Number.isNaN(slideParam)
    ? 1
    : Math.max(1, Math.min(slideParam, pitchSlides.length));
  const slide = pitchSlides[currentSlide - 1];

  const goToSlide = useCallback(
    (n: number) => {
      const clamped = Math.max(1, Math.min(n, pitchSlides.length));
      setSearchParams({ slide: String(clamped) }, { replace: true });
    },
    [setSearchParams],
  );

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
      if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
      if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [currentSlide, goToSlide, toggleFullscreen]);

  const progress = (currentSlide / pitchSlides.length) * 100;

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-bg-primary section-pattern">
      {!isFullscreen && <Navbar />}

      {/* Progress header */}
      <div className={`border-b border-dashed border-black/25 bg-bg-secondary sticky ${isFullscreen ? 'top-0' : 'top-[60px]'} z-30`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <span className="font-mono text-xs text-text-muted shrink-0 hidden sm:inline">
            $ reifydb pitch
          </span>
          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 h-px bg-black/10 relative">
              <div
                className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-xs text-text-muted shrink-0">
              slide <span className="text-primary">{currentSlide}</span> of {pitchSlides.length}
            </span>
          </div>
          <button
            onClick={toggleFullscreen}
            className="font-mono text-xs border border-black/30 text-text-secondary hover:border-primary hover:text-primary px-2 py-1 transition-colors shrink-0"
            title={isFullscreen ? 'Exit fullscreen (Esc)' : 'Fullscreen (F)'}
          >
            {isFullscreen ? '[exit]' : '[full]'}
          </button>
        </div>
      </div>

      {/* Main content — top-aligned, horizontally centered */}
      <main className="flex-1 flex justify-center">
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-4">
          {slide.content}
        </div>
      </main>

      {/* Navigation bar */}
      <div className="border-t border-dashed border-black/25 bg-bg-secondary sticky bottom-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => goToSlide(currentSlide - 1)}
            disabled={currentSlide === 1}
            className="font-mono text-sm border border-black/30 text-text-secondary hover:border-primary hover:text-primary px-4 py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            [&lt; prev]
          </button>

          {/* Slide dots */}
          <div className="flex gap-1.5 items-center">
            {pitchSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i + 1)}
                className={`transition-colors ${
                  i + 1 === currentSlide
                    ? 'w-3 h-3 bg-primary'
                    : 'w-2 h-2 bg-black/15 hover:bg-black/30'
                }`}
                title={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => goToSlide(currentSlide + 1)}
            disabled={currentSlide === pitchSlides.length}
            className="font-mono text-sm border border-black/30 text-text-secondary hover:border-primary hover:text-primary px-4 py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            [next &gt;]
          </button>
        </div>
      </div>
    </div>
  );
}
