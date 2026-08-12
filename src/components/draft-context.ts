import { createContext, useContext } from 'react';

export const DraftContext = createContext(false);

export function useIsDraft(): boolean {
  return useContext(DraftContext);
}
