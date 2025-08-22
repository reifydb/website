import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import styles from './styles.module.css';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onExecute?: () => void;
  language?: string;
  theme?: string;
  readOnly?: boolean;
}

export interface CodeEditorRef {
  setValue: (value: string) => void;
  getValue: () => string;
  focus: () => void;
}

const CodeEditor = forwardRef<CodeEditorRef, CodeEditorProps>(
  ({ value, onChange, onExecute, language = 'sql', theme = 'vs', readOnly = false }, ref) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<Monaco | null>(null);
    const onExecuteRef = useRef<(() => void) | undefined>(onExecute);
    
    // Keep onExecuteRef updated with the latest callback
    useEffect(() => {
      onExecuteRef.current = onExecute;
    }, [onExecute]);

    // Force theme update when theme prop changes
    useEffect(() => {
      if (monacoRef.current && theme) {
        monacoRef.current.editor.setTheme(theme);
      }
    }, [theme]);

    useImperativeHandle(ref, () => ({
      setValue: (newValue: string) => {
        if (editorRef.current) {
          editorRef.current.setValue(newValue);
        }
      },
      getValue: () => {
        return editorRef.current?.getValue() || '';
      },
      focus: () => {
        editorRef.current?.focus();
      },
    }));

    const handleBeforeMount = (monaco: Monaco) => {
      // Set initial theme
      if (monaco && monaco.editor) {
        try {
          monaco.editor.setTheme(theme);
        } catch (e) {
          // Theme will be set on mount
        }
      }
    };

    const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      editorRef.current = editor;
      monacoRef.current = monaco;

      // Set theme again after mount
      monaco.editor.setTheme(theme || 'vs');

      // Focus the editor to ensure keyboard shortcuts work
      editor.focus();

      // Register ReifyDB SQL language configuration
      monaco.languages.registerCompletionItemProvider('sql', {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          const suggestions = [
            // ReifyDB specific keywords
            ...['REIFY', 'FLOW', 'STREAM', 'MATERIALIZE'].map((keyword) => ({
              label: keyword,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: keyword,
              documentation: `ReifyDB keyword: ${keyword}`,
              range,
            })),
            ...[
              'MAP',
              'FROM',
              'WHERE',
              'INSERT',
              'UPDATE',
              'DELETE',
              'CREATE',
              'DROP',
              'ALTER',
              'TABLE',
              'INDEX',
              'VIEW',
              'JOIN',
              'LEFT',
              'RIGHT',
              'INNER',
              'OUTER',
              'ON',
              'GROUP BY',
              'ORDER BY',
              'HAVING',
              'LIMIT',
              'OFFSET',
            ].map((keyword) => ({
              label: keyword,
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: keyword,
              range,
            })),
            // Functions
            ...['COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'NOW', 'CURRENT_TIMESTAMP'].map((func) => ({
              label: func,
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: `${func}()`,
              range,
            })),
          ];

          return { suggestions };
        },
      });

      // Add execute shortcut - use onKeyDown to ensure it's scoped to this editor
      editor.onKeyDown((e) => {
        // Check for Ctrl+Enter or Cmd+Enter
        if ((e.ctrlKey || e.metaKey) && e.keyCode === monaco.KeyCode.Enter) {
          e.preventDefault();
          e.stopPropagation();
          if (onExecuteRef.current) {
            onExecuteRef.current();
          }
        }
      });

      // Also add as action for context menu with unique ID per editor
      const actionId = `execute-query-${Math.random().toString(36).substr(2, 9)}`;
      editor.addAction({
        id: actionId,
        label: 'Execute Query',
        keybindings: [
          monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        ],
        contextMenuGroupId: 'navigation',
        contextMenuOrder: 1.5,
        run: () => {
          if (onExecuteRef.current) {
            onExecuteRef.current();
          }
        }
      });

      // Configure editor options
      editor.updateOptions({
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        wordWrap: 'on',
        suggest: {
          showKeywords: true,
          showSnippets: true,
          showFunctions: true,
        },
      });
    };

    return (
      <div 
        className={styles.editorContainer}
        onMouseEnter={() => {
          // Focus the editor when mouse enters
          editorRef.current?.focus();
        }}
      >
        <Editor
          height="100%"
          language={language}
          theme={theme}
          value={value}
          onChange={(value) => onChange(value || '')}
          beforeMount={handleBeforeMount}
          onMount={handleEditorDidMount}
          options={{
            readOnly,
            automaticLayout: true,
          }}
        />
      </div>
    );
  }
);

CodeEditor.displayName = 'CodeEditor';

export default CodeEditor;