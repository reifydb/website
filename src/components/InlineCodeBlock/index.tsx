import React, { useState, useEffect } from 'react';
import InlineEditor from '../InlineEditor';
import InlineViewer from '../InlineViewer';

interface InlineCodeBlockProps {
  query: string;
  defaultExpanded?: boolean;
  editable?: boolean;
  language?: string;
  forceViewer?: boolean; // Allow forcing viewer mode regardless of device
}

export default function InlineCodeBlock({
  query,
  defaultExpanded = false,
  editable = true,
  language = 'rql',
  forceViewer = false
}: InlineCodeBlockProps) {
  const [isMobile, setIsMobile] = useState(() => {
    // Check if we're on the server (SSR)
    if (typeof window === 'undefined') {
      return false; // Default to desktop during SSR
    }
    // Initial client-side check
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    return hasTouch || isSmallScreen;
  });

  useEffect(() => {
    // Check if device is mobile on mount and window resize
    const checkMobile = () => {
      // Check for touch capability and screen width
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(hasTouch || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Show viewer if:
  // 1. forceViewer is true, OR
  // 2. Device is mobile, OR  
  // 3. editable is false
  const shouldShowViewer = forceViewer || isMobile || !editable;

  if (shouldShowViewer) {
    return <InlineViewer query={query} language={language} />;
  }

  return (
    <InlineEditor 
      query={query} 
      defaultExpanded={defaultExpanded}
      editable={editable}
    />
  );
}