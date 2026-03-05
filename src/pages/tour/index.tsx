import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { tourSteps } from './tour-data';
import { TourStepView } from './tour-step';

export function TourPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const stepParam = parseInt(searchParams.get('step') || '1', 10);
  const currentStep = Number.isNaN(stepParam)
    ? 1
    : Math.max(1, Math.min(stepParam, tourSteps.length));
  const step = tourSteps[currentStep - 1];

  const goToStep = useCallback(
    (n: number) => {
      const clamped = Math.max(1, Math.min(n, tourSteps.length));
      setSearchParams({ step: String(clamped) }, { replace: true });
    },
    [setSearchParams],
  );

  // Keyboard navigation with arrow keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in the editor
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      if ((e.target as HTMLElement)?.closest?.('.monaco-editor')) return;

      if (e.key === 'ArrowLeft') goToStep(currentStep - 1);
      if (e.key === 'ArrowRight') goToStep(currentStep + 1);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [currentStep, goToStep]);

  const progress = (currentStep / tourSteps.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Progress header */}
      <div className="border-b border-dashed border-black/25 bg-bg-secondary sticky top-[60px] z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <span className="font-mono text-xs text-text-muted shrink-0 hidden sm:inline">
            $ reifydb tour
          </span>
          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 h-px bg-black/10 relative">
              <div
                className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-xs text-text-muted shrink-0">
              step <span className="text-primary">{currentStep}</span> of {tourSteps.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col bg-bg-primary">
        <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12">
          <TourStepView key={step.id} step={step} />
        </div>
      </main>

      {/* Navigation bar */}
      <div className="border-t border-dashed border-black/25 bg-bg-secondary sticky bottom-0 z-30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <button
            onClick={() => goToStep(currentStep - 1)}
            disabled={currentStep === 1}
            className="font-mono text-sm border border-black/30 text-text-secondary hover:border-primary hover:text-primary px-4 py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            [&lt; prev]
          </button>

          {/* Step dots */}
          <div className="flex gap-1.5 items-center">
            {tourSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i + 1)}
                className={`transition-colors ${
                  i + 1 === currentStep
                    ? 'w-3 h-3 bg-primary'
                    : 'w-2 h-2 bg-black/15 hover:bg-black/30'
                }`}
                title={`Step ${i + 1}: ${tourSteps[i].title}`}
              />
            ))}
          </div>

          <button
            onClick={() => goToStep(currentStep + 1)}
            disabled={currentStep === tourSteps.length}
            className="font-mono text-sm border border-black/30 text-text-secondary hover:border-primary hover:text-primary px-4 py-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            [next &gt;]
          </button>
        </div>
      </div>

    </div>
  );
}
