const watching = new Map<string, number>();
const handlers = new Map<string, (action: string) => void>();

export function watchLive(id: string): () => void {
  watching.set(id, (watching.get(id) ?? 0) + 1);
  return () => watching.set(id, (watching.get(id) ?? 1) - 1);
}

export function isWatched(id: string): boolean {
  return (watching.get(id) ?? 0) > 0;
}

export function handleLiveActions(id: string, handler: (action: string) => void): () => void {
  handlers.set(id, handler);
  return () => {
    if (handlers.get(id) === handler) handlers.delete(id);
  };
}

export function sendLiveAction(id: string, action: string) {
  handlers.get(id)?.(action);
}
