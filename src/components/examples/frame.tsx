import { Suspense, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '@/lib';
import { SCENES } from './index';
import type { Example } from './index';

interface ExampleFrameProps {
  howTo: string;
  scene: ReactNode;
  dock?: ReactNode;
  ran?: string | null;
}

export function ExampleFrame({ howTo, scene, dock, ran }: ExampleFrameProps) {
  return (
    <div className="example-frame">
      <p className="example-frame__how">{howTo}</p>
      <div className="example-frame__scene">{scene}</div>
      {dock && <div className="example-frame__dock">{dock}</div>}
      <div className="example-frame__ran" aria-live="polite">
        <span className="example-frame__ran-label">just ran</span>
        <code className="example-frame__ran-code">{ran ?? '-'}</code>
      </div>
    </div>
  );
}

export function ExampleFrameSkeleton({ howTo }: { howTo: string }) {
  return (
    <ExampleFrame
      howTo={howTo}
      scene={
        <div className="example-frame__empty" aria-busy="true">
          Starting the database in this tab...
        </div>
      }
    />
  );
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

function SceneOf({ id, howTo }: { id: string; howTo: string }) {
  const Scene = SCENES[id];
  return <Scene key={id} howTo={howTo} />;
}

interface ExampleHostProps {
  example: Example | null;
  className?: string;
}

export function ExampleHost({ example, className }: ExampleHostProps) {
  const ready = useIdleReady();
  const howTo = example?.howTo ?? 'Loading an example...';
  
  return (
    <div className={cn('example-host', className)}>
      {example && ready ? (
        <Suspense fallback={<ExampleFrameSkeleton howTo={howTo} />}>
          <SceneOf id={example.id} howTo={howTo} />
        </Suspense>
      ) : (
        <ExampleFrameSkeleton howTo={howTo} />
      )}
    </div>
  );
}
