import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import styles from './styles.module.css';

const CodeEditor = lazy(() => import('../CodeEditor'));

interface InlineViewerProps {
  query: string;
  language?: string;
}

export default function InlineViewer({
  query,
  language = 'rql'
}: InlineViewerProps) {
  const [editorTheme, setEditorTheme] = useState('brutalist-light');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate height based on content - fully expand to show all lines
  const calculateHeight = useCallback((content: string) => {
    const lines = content.split('\n').length;
    const lineHeight = 24;
    const extraPadding = 20;
    const minLines = 3;
    const minHeight = (minLines * lineHeight) + extraPadding;
    
    // Calculate height to fit all content without scrolling
    const calculatedHeight = Math.max((lines * lineHeight) + extraPadding, minHeight);
    return calculatedHeight;
  }, []);

  const [editorHeight] = useState(() => calculateHeight(query));

  useEffect(() => {
    const detectTheme = () => {
      const htmlTheme = document.documentElement.getAttribute('data-theme');
      setEditorTheme(htmlTheme === 'dark' ? 'brutalist-dark' : 'brutalist-light');
    };

    detectTheme();

    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.brutalistViewer}>
      <div className={styles.viewerContainer}>
        <Suspense
          fallback={
            <div className={styles.viewerLoading}>
              <div className={styles.loadingSpinner} />
              <span>LOADING CODE...</span>
            </div>
          }
        >
          <div 
            ref={containerRef}
            className={styles.codeContainer} 
            style={{ 
              height: `${editorHeight}px`,
              minHeight: `${editorHeight}px`,
              maxHeight: `${editorHeight}px` 
            }}
          >
            <CodeEditor
              value={query}
              onChange={() => {}} // No-op since it's read-only
              onExecute={() => {}} // No-op since there's no execution
              language={language}
              theme={editorTheme}
              readOnly={true}
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
}