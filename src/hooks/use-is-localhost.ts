import { useState, useEffect } from 'react';

/**
 * Detects if the application is running on localhost.
 * Handles localhost, 127.0.0.1, ::1 (IPv6), and *.localhost subdomains.
 */
export function useIsLocalhost(): boolean {
  const [isLocalhost, setIsLocalhost] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const hostname = window.location.hostname;
    return (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.endsWith('.localhost')
    );
  });

  useEffect(() => {
    const hostname = window.location.hostname;
    setIsLocalhost(
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.endsWith('.localhost')
    );
  }, []);

  return isLocalhost;
}
