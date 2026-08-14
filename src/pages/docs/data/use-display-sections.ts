import { useMemo } from 'react';
import { useIsLocalhost } from '@/hooks';
import { filterPublished } from './navigation';
import type { NavSection } from './navigation';

/**
 * Filters out unpublished pages in production; localhost keeps everything (marked as drafts).
 */
export function useDisplaySections(sections: NavSection[]): NavSection[] {
  const isLocalhost = useIsLocalhost();

  return useMemo(
    () =>
      isLocalhost
        ? sections.filter((s) => s.items.length > 0)
        : sections
            .map((s) => ({ ...s, items: filterPublished(s.items) }))
            .filter((s) => s.items.length > 0),
    [sections, isLocalhost],
  );
}
