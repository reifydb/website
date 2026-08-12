import { useState } from 'react';

/**
 * Detects if the application is running on localhost.
 * Handles localhost, 127.0.0.1, ::1 (IPv6), and *.localhost subdomains.
 */
export function useIsLocalhost(): boolean {
  const [isLocalhost] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname;
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.endsWith('.localhost')
    );
  });

  return isLocalhost;
}
