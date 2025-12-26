import { useRef } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { rqlLanguageDefinition, rqlLanguageConfiguration } from '@/lib/rql-language';
import { brutalistLightTheme } from '@/lib/monaco-themes';

let languageRegistered = false;

function registerRqlLanguage(monaco: typeof import('monaco-editor')) {
  if (languageRegistered) return;

  monaco.languages.register({ id: 'rql' });
  monaco.languages.setMonarchTokensProvider('rql', rqlLanguageDefinition);
  monaco.languages.setLanguageConfiguration('rql', rqlLanguageConfiguration);
  monaco.editor.defineTheme('brutalist-light', brutalistLightTheme);

  languageRegistered = true;
}

interface CodeViewerProps {
  code: string;
  className?: string;
}

export function CodeViewer({ code, className }: CodeViewerProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const lineCount = code.split('\n').length;
  // Calculate height based on line count (20px per line + padding)
  const height = Math.max(lineCount * 20 + 16, 60);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    registerRqlLanguage(monaco);
  };

  const handleBeforeMount = (monaco: typeof import('monaco-editor')) => {
    registerRqlLanguage(monaco);
  };

  return (
    <div className={className} style={{ height, pointerEvents: 'none' }}>
      <Editor
        height="100%"
        language="rql"
        theme="brutalist-light"
        value={code}
        beforeMount={handleBeforeMount}
        onMount={handleEditorDidMount}
        options={{
          readOnly: true,
          domReadOnly: true,
          minimap: { enabled: false },
          lineNumbers: 'on',
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 16,
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden',
            alwaysConsumeMouseWheel: false,
          },
          overviewRulerLanes: 0,
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          renderLineHighlight: 'none',
          contextmenu: false,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 13,
          padding: { top: 8, bottom: 8 },
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />
    </div>
  );
}
