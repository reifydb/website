import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import styles from './styles.module.css';
import { rqlLanguageDefinition, rqlLanguageConfiguration, rqlCompletionProvider } from './rqlLanguage';

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
  ({ value, onChange, onExecute, language = 'rql', theme = 'brutalist-light', readOnly = false }, ref) => {
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
    const monacoRef = useRef<Monaco | null>(null);
    const onExecuteRef = useRef<(() => void) | undefined>(onExecute);
    
    useEffect(() => {
      onExecuteRef.current = onExecute;
    }, [onExecute]);

    useEffect(() => {
      if (monacoRef.current && theme) {
        const actualTheme = theme === 'brutalist-light' ? 'brutalist-light' : 
                           theme === 'brutalist-dark' ? 'brutalist-dark' : theme;
        monacoRef.current.editor.setTheme(actualTheme);
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
      // Register RQL language only if not already registered
      const languages = monaco.languages.getLanguages();
      const rqlRegistered = languages.some(lang => lang.id === 'rql');
      
      if (!rqlRegistered) {
        monaco.languages.register({ id: 'rql' });
        monaco.languages.setMonarchTokensProvider('rql', rqlLanguageDefinition);
        monaco.languages.setLanguageConfiguration('rql', rqlLanguageConfiguration);
        monaco.languages.registerCompletionItemProvider('rql', rqlCompletionProvider);
      }

      // Define brutalist light theme
      monaco.editor.defineTheme('brutalist-light', {
        base: 'vs',
        inherit: true,
        rules: [
          { token: 'keyword', foreground: '383838', fontStyle: 'bold' },
          { token: 'string', foreground: '16A34A' },
          { token: 'string.sql', foreground: '16A34A' },
          { token: 'string.quote', foreground: '16A34A' },
          { token: 'string.escape', foreground: '16A34A', fontStyle: 'italic' },
          { token: 'comment', foreground: '5A5A5A' },
          { token: 'number', foreground: 'B91C1C', fontStyle: 'bold' },
          { token: 'operator', foreground: '383838', fontStyle: 'bold' },
          { token: 'identifier', foreground: '1A1A1A' },
          { token: 'type', foreground: '7C3AED', fontStyle: 'bold' },
          { token: 'key', foreground: '7C3AED', fontStyle: 'italic' },
        ],
        colors: {
          'editor.background': '#F8F8F7',
          'editor.foreground': '#1A1A1A',
          'editor.lineHighlightBackground': '#F4EFEA',
          'editorLineNumber.foreground': '#5A5A5A',
          'editor.selectionBackground': '#383838',
          'editor.selectionForeground': '#FFFFFF',
          'editor.inactiveSelectionBackground': '#E5E5E5',
          'editorCursor.foreground': '#383838',
          'editor.lineHighlightBorder': '#383838',
          'editorIndentGuide.background': '#E5E5E5',
          'editorIndentGuide.activeBackground': '#383838',
        }
      });

      // Define brutalist dark theme
      monaco.editor.defineTheme('brutalist-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'keyword', foreground: 'F8F8F7', fontStyle: 'bold' },
          { token: 'string', foreground: '53DBC9' },
          { token: 'string.sql', foreground: '53DBC9' },
          { token: 'string.quote', foreground: '53DBC9' },
          { token: 'string.escape', foreground: '53DBC9', fontStyle: 'italic' },
          { token: 'comment', foreground: '999999' },
          { token: 'number', foreground: 'FF6B35', fontStyle: 'bold' },
          { token: 'operator', foreground: 'F8F8F7', fontStyle: 'bold' },
          { token: 'identifier', foreground: 'F8F8F7' },
          { token: 'type', foreground: '6FC2FF', fontStyle: 'bold' },
          { token: 'key', foreground: '6FC2FF', fontStyle: 'italic' },
        ],
        colors: {
          'editor.background': '#2A2A2A',
          'editor.foreground': '#F8F8F7',
          'editor.lineHighlightBackground': '#1A1A1A',
          'editorLineNumber.foreground': '#999999',
          'editor.selectionBackground': '#F8F8F7',
          'editor.selectionForeground': '#1A1A1A',
          'editor.inactiveSelectionBackground': '#3A3A3A',
          'editorCursor.foreground': '#F8F8F7',
          'editor.lineHighlightBorder': '#F8F8F7',
          'editorIndentGuide.background': '#3A3A3A',
          'editorIndentGuide.activeBackground': '#F8F8F7',
        }
      });

      // Set initial theme
      if (monaco && monaco.editor) {
        try {
          const actualTheme = theme === 'brutalist-light' ? 'brutalist-light' : 
                             theme === 'brutalist-dark' ? 'brutalist-dark' : theme;
          monaco.editor.setTheme(actualTheme);
        } catch (e) {
          // Theme will be set on mount
        }
      }
    };

    const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
      editorRef.current = editor;
      monacoRef.current = monaco;

      // Set theme again after mount
      const actualTheme = theme === 'brutalist-light' ? 'brutalist-light' : 
                         theme === 'brutalist-dark' ? 'brutalist-dark' : theme;
      monaco.editor.setTheme(actualTheme);

      editor.focus();

      // Add execute shortcut
      editor.onKeyDown((e) => {
        if ((e.ctrlKey || e.metaKey) && e.keyCode === monaco.KeyCode.Enter) {
          e.preventDefault();
          e.stopPropagation();
          if (onExecuteRef.current) {
            onExecuteRef.current();
          }
        }
      });

      // Add action for context menu
      const actionId = `execute-query-${Math.random().toString(36).substring(2, 11)}`;
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

      // Configure editor options with brutalist styling
      editor.updateOptions({
        minimap: { enabled: false },
        fontSize: 16,
        fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace",
        fontWeight: '500',
        lineNumbers: 'on',
        lineNumbersMinChars: 3,
        lineHeight: 26,
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        fixedOverflowWidgets: true,
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto',
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
          alwaysConsumeMouseWheel: false,
        },
        tabSize: 2,
        wordWrap: 'off',
        padding: {
          top: 16,
          bottom: 16,
        },
        suggest: {
          showKeywords: true,
          showSnippets: true,
          showFunctions: true,
          preview: false,
        },
        renderLineHighlight: 'all',
        renderIndentGuides: true,
        cursorStyle: 'block',
        cursorBlinking: 'solid',
        smoothScrolling: false,
        hover: {
          enabled: true,
          delay: 300,
        },
        quickSuggestions: {
          other: true,
          comments: false,
          strings: false,
        },
        parameterHints: {
          enabled: true,
        },
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        wordBasedSuggestions: false,
      });
    };

    return (
      <div 
        className={styles.brutalistEditorContainer}
        onMouseEnter={() => {
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