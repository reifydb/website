import { useEffect, useRef } from 'react';
import { watchLive } from './live';

export function useWatchWhileVisible<T extends Element>(id: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    let stop: (() => void) | null = null;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !stop) stop = watchLive(id);
      if (!entry.isIntersecting && stop) {
        stop();
        stop = null;
      }
    });
    observer.observe(ref.current!);
    return () => {
      observer.disconnect();
      stop?.();
    };
  }, [id]);

  return ref;
}
