import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import { COLORS, Shell, WasmExecutor, reifydb_dark_theme, rql_highlighter } from '@reifydb/shell';
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

const PROMPT = `${C.cyan}reifydb${C.reset}${C.brightBlack}>${C.reset} `;
const PROMPT_LENGTH = 9;

const INITIAL_INPUT = 'from app::users map { name, role, age } take 3;';

const HIGHLIGHT = rql_highlighter();

const SHELL_VARS = {
  '--rdb-shell-bg': '#18181b',
  '--rdb-shell-scrollbar-thumb': '#3f3f46',
  '--rdb-shell-scrollbar-thumb-hover': '#52525b',
  '--rdb-shell-padding': '16px',
} as CSSProperties;

export default function ExecutableShellLive() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    let shell: Shell | null = null;
    let cancelled = false;

    void getWasmDB().then((db) => {
      if (cancelled) return;
      shell = new Shell(element, {
        executor: new WasmExecutor(db),
        theme: reifydb_dark_theme,
        welcomeMessage: WELCOME,
        prompt: PROMPT,
        promptLength: PROMPT_LENGTH,
        history_key: 'reifydb-hero-shell',
        initialInput: INITIAL_INPUT,
        highlight: HIGHLIGHT,
        displayMode: 'truncate',
      });
      shell.start();
    });

    return () => {
      cancelled = true;
      shell?.dispose();
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" style={SHELL_VARS} />;
}
