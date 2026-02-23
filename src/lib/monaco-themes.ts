import type { editor } from 'monaco-editor';

export const brutalistLightTheme: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: '383838', fontStyle: 'bold' },
    { token: 'string', foreground: '16A34A' },
    { token: 'string.quote', foreground: '16A34A' },
    { token: 'number', foreground: 'B91C1C', fontStyle: 'bold' },
    { token: 'comment', foreground: '6B7280', fontStyle: 'italic' },
    { token: 'operator', foreground: '383838' },
    { token: 'identifier', foreground: '1A1A1A' },
    { token: 'key', foreground: '2563EB', fontStyle: 'bold' },
  ],
  colors: {
    'editor.background': '#FFFFFF',
    'editor.foreground': '#1A1A1A',
    'editor.lineHighlightBackground': '#F8F8F7',
    'editor.selectionBackground': '#FFD4A3',
    'editorCursor.foreground': '#FF8A3D',
    'editorLineNumber.foreground': '#9CA3AF',
    'editorLineNumber.activeForeground': '#383838',
  },
};

export const brutalistDarkTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: 'FF8A3D', fontStyle: 'bold' },
    { token: 'string', foreground: '4ADE80' },
    { token: 'string.quote', foreground: '4ADE80' },
    { token: 'number', foreground: 'F87171', fontStyle: 'bold' },
    { token: 'comment', foreground: '9CA3AF', fontStyle: 'italic' },
    { token: 'operator', foreground: 'E5E7EB' },
    { token: 'identifier', foreground: 'F3F4F6' },
    { token: 'key', foreground: '60A5FA', fontStyle: 'bold' },
  ],
  colors: {
    'editor.background': '#1A1A1A',
    'editor.foreground': '#F3F4F6',
    'editor.lineHighlightBackground': '#2A2A2A',
    'editor.selectionBackground': '#4B3D2F',
    'editorCursor.foreground': '#FF8A3D',
    'editorLineNumber.foreground': '#6B7280',
    'editorLineNumber.activeForeground': '#E5E7EB',
  },
};

export const premiumDarkTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: 'FBBF24', fontStyle: 'bold' },
    { token: 'string', foreground: '34D399' },
    { token: 'string.quote', foreground: '34D399' },
    { token: 'number', foreground: 'F472B6', fontStyle: 'bold' },
    { token: 'comment', foreground: '64748B', fontStyle: 'italic' },
    { token: 'operator', foreground: 'CBD5E1' },
    { token: 'identifier', foreground: 'F8FAFC' },
    { token: 'key', foreground: '60A5FA', fontStyle: 'bold' },
  ],
  colors: {
    'editor.background': '#222430',
    'editor.foreground': '#F8FAFC',
    'editor.lineHighlightBackground': '#2A2C3A',
    'editor.selectionBackground': '#F59E0B40',
    'editorCursor.foreground': '#F59E0B',
    'editorLineNumber.foreground': '#64748B',
    'editorLineNumber.activeForeground': '#CBD5E1',
  },
};
