declare module 'monaco-editor/esm/vs/editor/editor.api' {
  export * from 'monaco-editor';
}

declare module 'monaco-editor/esm/vs/editor/editor.worker?worker' {
  const EditorWorker: new () => Worker;
  export default EditorWorker;
}
