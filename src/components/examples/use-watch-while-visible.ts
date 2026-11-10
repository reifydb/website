import { useEffect, useRef } from 'react';
import { watchLive } from './live';

export function useWatchWhileVisible<T extends Element>(id: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let stop: (() => void) | null = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !stop) stop = watchLive(id);
      if (!entry.isIntersecting && stop) {
        stop();
        stop = null;
      }
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      stop?.();
    };
  }, [id]);

  return ref;
}
