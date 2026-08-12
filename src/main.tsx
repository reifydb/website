import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './app';
import '@fontsource/archivo-black/index.css';
import '@fontsource-variable/ibm-plex-sans/index.css';
import '@fontsource-variable/jetbrains-mono/index.css';
import '@reifydb/ui/styles.css';
import '@reifydb/console/styles.css';
import './index.css';

const root = document.getElementById('root')!;
const tree = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (root.childElementCount > 0) {
  hydrateRoot(root, tree);
} else {
  createRoot(root).render(tree);
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error);
}
