import React, { useEffect, useCallback } from 'react';
import SearchBar from '@theme-original/SearchBar';
import type SearchBarType from '@theme/SearchBar';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof SearchBarType>;

export default function SearchBarWrapper(props: Props): JSX.Element {
  // Add global keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        
        // Focus the Search input
        const searchInput = document.querySelector('.DocSearch-Button') as HTMLElement;
        if (searchInput) {
          searchInput.click();
        } else {
          // Fallback for local Search
          const localSearchInput = document.querySelector('input[type="Search"]') as HTMLInputElement;
          if (localSearchInput) {
            localSearchInput.focus();
            localSearchInput.select();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Add Search analytics
  const trackSearch = useCallback((query: string) => {
    // Store Search queries locally for analytics
    try {
      const searches = JSON.parse(localStorage.getItem('reifydb_searches') || '[]');
      searches.push({
        query,
        timestamp: new Date().toISOString(),
        page: window.location.pathname
      });
      // Keep only last 100 searches
      if (searches.length > 100) {
        searches.shift();
      }
      localStorage.setItem('reifydb_searches', JSON.stringify(searches));
    } catch (error) {
      console.error('Failed to track Search:', error);
    }
  }, []);

  // Override Search behavior to add tracking
  useEffect(() => {
    const handleSearchInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target && target.type === 'search' && target.value) {
        // Debounce tracking
        const timeoutId = setTimeout(() => {
          trackSearch(target.value);
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    };

    document.addEventListener('input', handleSearchInput);
    return () => document.removeEventListener('input', handleSearchInput);
  }, [trackSearch]);

  return <SearchBar {...props} />;
}