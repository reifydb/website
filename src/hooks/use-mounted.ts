import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * Returns false on the server and during hydration, then true once mounted.
 * Lets a component render static markup that hydration can match before
 * swapping in browser-only content.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
