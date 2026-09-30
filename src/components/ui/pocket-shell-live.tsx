import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import {
  COLORS,
  Shell,
  WasmExecutor,
  rqlHighlighter,
  type RqlPalette,
  type TableTheme,
  type TerminalTheme,
} from '@reifydb/shell';
import '@reifydb/shell/dist/index.css';
import { getWasmDB } from '@/lib/wasm-db-singleton';

const C = COLORS;

const WELCOME = [
  '',
  `${C.bold}${C.cyan}ReifyDB${C.reset} ${C.dim}shell${C.reset} ${C.brightBlack}- the whole database, in this browser tab${C.reset}`,
  '',
  `Press ${C.green}Enter${C.reset} to run the statement below, or type your own.`,
  `${C.brightBlack}.help${C.reset} for commands. Statements end with ${C.yellow};${C.reset}`,
  '',
];

const PROMPT = `${C.cyan}▶${C.reset} `;
const PROMPT_LENGTH = 2;

const INITIAL_INPUT = 'from app::users map { name, role, age } take 3;';

const FONT_FAMILY = "'VT323', ui-monospace, monospace";
const FONT_SIZE = 19;

const SCREEN = '#e6e8fd';
const TEXT = '#2a2f8f';
const INK = '#1c2080';
const BLUE = '#4b52d6';
const SOFT = '#6e74d8';
const MUTED = '#7f85e0';
const BORDER = '#9ca1f0';
const RED = '#d4506c';

const POCKET_THEME: TerminalTheme = {
  background: SCREEN,
  foreground: TEXT,
  cursor: INK,
  cursorAccent: SCREEN,
  selectionBackground: 'rgba(126, 133, 242, 0.30)',
  black: INK,
  red: RED,
  green: INK,
  yellow: INK,
  blue: BLUE,
  magenta: SOFT,
  cyan: INK,
  white: TEXT,
  brightBlack: MUTED,
  brightRed: RED,
  brightGreen: INK,
  brightYellow: INK,
  brightBlue: BLUE,
  brightMagenta: SOFT,
  brightCyan: INK,
  brightWhite: TEXT,
};

const POCKET_PALETTE: RqlPalette = {
  keyword: { color: INK, bold: true },
  string: { color: TEXT },
  number: { color: INK, bold: true },
  comment: { color: MUTED, italic: true },
  operator: { color: SOFT },
  identifier: { color: TEXT },
  key: { color: INK, bold: true },
  namespace: { color: BLUE },
  entity: { color: BLUE },
  function: { color: BLUE },
};

const POCKET_TABLE_THEME: TableTheme = {
  border: { color: BORDER },
  header: { color: INK, bold: true },
  values: {
    none: { color: MUTED, italic: true },
    boolean: { color: INK },
    number: { color: INK },
    temporal: { color: BLUE },
    uuid: { color: SOFT },
    string: { color: TEXT },
    blob: { color: MUTED },
  },
};

const HIGHLIGHT = rqlHighlighter(POCKET_PALETTE);

const SHELL_VARS = {
  '--rdb-shell-bg': SCREEN,
  '--rdb-shell-scrollbar-thumb': BORDER,
  '--rdb-shell-scrollbar-thumb-hover': MUTED,
  '--rdb-shell-padding': '14px 16px',
} as CSSProperties;

interface PocketShellLiveProps {
  onReady: (shell: Shell) => void;
}

export default function PocketShellLive({ onReady }: PocketShellLiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let shell: Shell | null = null;
    let cancelled = false;

    void Promise.all([getWasmDB(), document.fonts.load(`${FONT_SIZE}px VT323`)]).then(([db]) => {
      if (cancelled) return;
      shell = new Shell(element, {
        executor: new WasmExecutor(db),
        theme: POCKET_THEME,
        fontFamily: FONT_FAMILY,
        fontSize: FONT_SIZE,
        welcomeMessage: WELCOME,
        prompt: PROMPT,
        promptLength: PROMPT_LENGTH,
        historyKey: 'reifydb-hero-shell',
        initialInput: INITIAL_INPUT,
        highlight: HIGHLIGHT,
        tableBorder: 'none',
        tableTheme: POCKET_TABLE_THEME,
        displayMode: 'truncate',
      });
      shell.start();
      onReady(shell);
    });

    return () => {
      cancelled = true;
      shell?.dispose();
    };
  }, [onReady]);

  return <div ref={containerRef} className="h-full w-full" style={SHELL_VARS} />;
}
