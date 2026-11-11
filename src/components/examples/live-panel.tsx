import { useMemo, useRef } from 'react';
import { LiveSubscription } from '@/components/ui';
import { sendLiveAction, watchLive } from './live';
import type { Example } from './index';

export function LivePanel({ id, subscription }: { id: string; subscription: NonNullable<Example['subscription']> }) {
  const stopRef = useRef<(() => void) | null>(null);
  const actions = useMemo(
    () =>
      subscription.actions.map(({ label, action }) => ({
        label,
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
