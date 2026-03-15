import { createContext, useContext } from 'react';
import { useIsLocalhost } from '@/hooks';
import { useLocation } from 'react-router-dom';
import { DocsWipTerminal } from '@/components/demo/docs-wip-terminal';
import { NotFoundPage } from '@/pages/not-found';
import { navSections, getPublishedPaths } from '@/pages/docs/data/navigation';
import type {ReactNode} from "react";

interface DocsGateProps {
  children: ReactNode;
}

/**
 * Conditionally renders documentation content based on environment and publish status.
 * - Localhost: Shows all documentation, with a banner on unpublished pages
 * - Production: Shows WIP terminal page (when SHOW_DOCS_IN_PRODUCTION is false)
 * - Unpublished pages on production: Shows 404
 */
const SHOW_DOCS_IN_PRODUCTION = true;

const publishedPaths = getPublishedPaths(navSections);

const DraftContext = createContext(false);

export function useIsDraft(): boolean {
  return useContext(DraftContext);
}

export function DocsGate({ children }: DocsGateProps) {
  const isLocalhost = useIsLocalhost();
  const { pathname } = useLocation();

  if (!(isLocalhost || SHOW_DOCS_IN_PRODUCTION)) {
    return <DocsWipTerminal />;
  }

  const isPublished = !pathname.startsWith('/docs') || publishedPaths.has(pathname);

  // In production, unpublished pages show 404
  if (!isPublished && !isLocalhost) {
    return <NotFoundPage />;
  }

  const isDraft = !isPublished;

  return (
    <DraftContext.Provider value={isDraft}>
      {children}
    </DraftContext.Provider>
  );
}
