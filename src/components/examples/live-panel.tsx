import { useMemo, useRef } from 'react';
import { LiveSubscription } from '@/components/ui';
import { sendLiveAction, watchLive } from './live';
import type { Example } from './index';

export function LivePanel({ example }: { example: Example }) {
  const { id, subscription } = example;
  const stopRef = useRef<(() => void) | null>(null);
  const actions = useMemo(
    () =>
      subscription.actions.map(({ label, action, primary }) => ({
        label,
        primary,
        onClick: () => sendLiveAction(id, action),
      })),
    [id, subscription.actions],
  );

  return (
    <LiveSubscription
      query={subscription.query}
      rowKey={subscription.key}
      columns={subscription.columns}
      ready={subscription.ready}
      actions={actions}
      onVisibleChange={(visible) => {
        stopRef.current?.();
        stopRef.current = visible ? watchLive(id) : null;
      }}
    />
  );
}
