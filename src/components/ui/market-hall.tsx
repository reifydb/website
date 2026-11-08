import { Suspense, lazy, useEffect, useState } from 'react';
import { cn } from '@/lib';

const MarketHallLive = lazy(() => import('./market-hall-live'));

interface MarketHallProps {
  className?: string;
}

function useIdleReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const ric = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => setTimeout(cb, 1));
    const cic = window.cancelIdleCallback ?? clearTimeout;
    const id = ric(() => setReady(true));
    return () => cic(id as never);
  }, []);

  return ready;
}

export function MarketHallSkeleton() {
  return (
    <div className="market-hall__scroll">
      <div className="market-hall__frame market-hall__frame--empty" aria-busy="true">
        <p className="market-hall__hint">Starting the database in this tab...</p>
      </div>
    </div>
  );
}

export function MarketHall({ className }: MarketHallProps) {
  const ready = useIdleReady();

  return (
    <div className={cn('market-hall', className)}>
      {ready ? (
        <Suspense fallback={<MarketHallSkeleton />}>
          <MarketHallLive />
        </Suspense>
      ) : (
        <MarketHallSkeleton />
      )}
    </div>
  );
}
