import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import Editor, {Monaco} from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

interface RqlEditorProps {
    value: string;
    onChange: (value: string) => void;
    onExecute: () => void;
    language?: string;
    height?: string;
}

export interface RqlEditorRef {
    focus: () => void;
}

export const RqlEditor = forwardRef<RqlEditorRef, RqlEditorProps>(
    ({value, onChange, onExecute, language = 'sql', height = '200px'}, ref) => {
        const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

        useImperativeHandle(ref, () => ({
            focus: () => editorRef.current?.focus()
        }));

        const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
            editorRef.current = editor;

            // Register RQL language if not already registered
            if (!monaco.languages.getLanguages().some(lang => lang.id === 'rql')) {
                monaco.languages.register({id: 'rql'});

                monaco.languages.setMonarchTokensProvider('rql', {
                    tokenizer: {
                        root: [
                            [/\b(select|from|filter|insert|update|delete|create|drop|alter|table|index|view|database|schema)\b/i, 'keyword'],
                            [/\b\d+\b/, 'number'],
                            [/'[^']*'/, 'string'],
                            [/"[^"]*"/, 'string'],
                            [/--.*$/, 'comment'],
                            [/\/\*[\s\S]*?\*\//, 'comment'],
                            [/[a-zA-Z_][a-zA-Z0-9_]*/, 'identifier'],
                            [/[{}()\[\]]/, '@brackets'],
                            [/[<>!=]=?/, 'operator'],
                            [/[+\-*/]/, 'operator'],
                            [/[;,.]/, 'delimiter'],
                        ]
                    }
                });

                monaco.languages.setLanguageConfiguration('rql', {
                    comments: {
                        lineComment: '--',
                        blockComment: ['/*', '*/']
                    },
                    brackets: [
                        ['{', '}'],
                        ['[', ']'],
                        ['(', ')']
                    ],
                    autoClosingPairs: [
                        {open: '{', close: '}'},
                        {open: '[', close: ']'},
                        {open: '(', close: ')'},
                        {open: '"', close: '"', notIn: ['string']},
                        {open: "'", close: "'", notIn: ['string', 'comment']}
                    ],
                    surroundingPairs: [
                        {open: '{', close: '}'},
                        {open: '[', close: ']'},
                        {open: '(', close: ')'},
                        {open: '"', close: '"'},
                        {open: "'", close: "'"}
                    ]
                });
            }

            // Configure editor
            editor.updateOptions({
                minimap: {enabled: false},
                scrollBeyondLastLine: false,
                fontSize: 14,
                fontFamily: 'Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                lineNumbers: 'on',
                automaticLayout: true,
                wordWrap: 'on',
                tabSize: 2,
                insertSpaces: true,
                folding: false,
                renderLineHighlight: 'all',
                contextmenu: true,
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: 'line',
                cursorWidth: 1,
                cursorBlinking: 'blink',
                hideCursorInOverviewRuler: false,
                overviewRulerLanes: 0,
                glyphMargin: false,
                lineNumbersMinChars: 3,
                lineDecorationsWidth: 12,
                rulers: [],
                scrollbar: {
                    useShadows: false,
                    verticalHasArrows: false,
                    horizontalHasArrows: false,
                    vertical: 'visible',
                    horizontal: 'visible',
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                }
            });

            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                onExecute();
                return null;
            });

            // Focus the editor
            editor.focus();
        };

        const handleEditorChange = (value: string | undefined) => {
            onChange(value || '');
        };

        //@ts-ignore
        return (
            <div className="border border-gray-700 rounded-sm overflow-hidden">
                <Editor
                    height={height}
                    defaultLanguage={language}
                    value={value}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    theme="vs-dark"
                    options={{
                        padding: {top: 16, bottom: 16},
                        bracketPairColorization: {enabled: true},
                        autoIndent: 'full',
                        formatOnType: true,
                        formatOnPaste: true,
                        suggest: {
                            showKeywords: true,
                            showSnippets: true,
                            showFunctions: true,
                            showVariables: true,
                            matchOnWordStartOnly: false,
                            filterGraceful: true,
                        },
                        quickSuggestions: {
                            other: true,
                            comments: false,
                            strings: false
                        },
                        acceptSuggestionOnEnter: 'on',
                        acceptSuggestionOnCommitCharacter: true,
                        snippetSuggestions: 'inline',
                        wordBasedSuggestions: 'off',
                        parameterHints: {enabled: true},
                        hover: {enabled: true},
                        links: false,
                        colorDecorators: false,
                        lightbulb: {enabled: false},
                        find: {
                            seedSearchStringFromSelection: 'always',
                            autoFindInSelection: 'never',
                        }
                    }}
                />
            </div>
        );
    }
);

RqlEditor.displayName = 'Editor';