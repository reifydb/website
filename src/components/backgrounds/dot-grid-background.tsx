import { useEffect, useRef } from 'react';
import { DotGridRenderer, type DotGridConfig } from './dot-grid-renderer';

interface DotGridBackgroundProps extends DotGridConfig {
  className?: string;
}

export function DotGridBackground({ className, ...config }: DotGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<DotGridRenderer | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new DotGridRenderer(canvas, config);
    rendererRef.current = renderer;

    // Initial size
    const parent = canvas.parentElement!;
    renderer.resize(parent.clientWidth, parent.clientHeight);

    // Resize observer
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      renderer.resize(width, height);
    });
    observer.observe(parent);

    // Tab visibility
    const onVisibility = () => renderer.setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      renderer.destroy();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
