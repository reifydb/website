import { useIsLocalhost } from '@/hooks';
import { DocsWipTerminal } from '@/components/demo/docs-wip-terminal';
import type {ReactNode} from "react";

interface DocsGateProps {
  children: ReactNode;
}

/**
 * Conditionally renders documentation content based on environment.
 * - Localhost: Shows actual documentation (children)
 * - Production: Shows WIP terminal page
 *
 * To disable this gate and show docs in production, set SHOW_DOCS_IN_PRODUCTION to true.
 */
const SHOW_DOCS_IN_PRODUCTION = false;

export function DocsGate({ children }: DocsGateProps) {
  const isLocalhost = useIsLocalhost();

  if (isLocalhost || SHOW_DOCS_IN_PRODUCTION) {
    return <>{children}</>;
  }

  return <DocsWipTerminal />;
}
