import { useState } from 'react';

/* ── Border strings (widths match other pitch slides: 104 chars full) ── */
const FULL    = '+' + '='.repeat(102) + '+';
const F_DASH  = '+' + '-'.repeat(102) + '+';
const P_TOP   = '+-- PARAMETERS ' + '-'.repeat(88) + '+';
const B_LEFT  = '+' + '-'.repeat(54) + '+';
const B_RIGHT = '+' + '-'.repeat(43) + '+';

function pad(text: string, width: number): string {
  const left = Math.floor((width - text.length) / 2);
  return ' '.repeat(left) + text + ' '.repeat(width - text.length - left);
}

function formatTps(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(Math.round(n));
}

function ParameterSliders({
  rtt,
  setRtt,
  contention,
  setContention,
}: {
  rtt: number;
  setRtt: (v: number) => void;
  contention: number;
  setContention: (v: number) => void;
}) {
  return (
    <div className="py-3 px-2 flex flex-col sm:flex-row gap-4 sm:gap-8">
      <div className="flex-1">
        <label className="text-text-secondary block mb-2">
          Network Round Trip Time: <span className="text-primary">{rtt} ms</span>
        </label>
        <input
          type="range"
          className="amdahl-slider"
          min={1}
          max={10}
          step={1}
          value={rtt}
          onChange={e => setRtt(Number(e.target.value))}
        />
        <div className="flex justify-between text-text-muted text-[10px] sm:text-xs mt-1">
          <span>1 ms</span>
          <span>10 ms</span>
        </div>
      </div>
      <div className="flex-1">
        <label className="text-text-secondary block mb-2">
          Contention: <span className="text-primary">{contention}%</span>
        </label>
        <input
          type="range"
          className="amdahl-slider"
          min={1}
          max={90}
          step={1}
          value={contention}
          onChange={e => setContention(Number(e.target.value))}
        />
        <div className="flex justify-between text-text-muted text-[10px] sm:text-xs mt-1">
          <span>1%</span>
          <span>90%</span>
        </div>
      </div>
    </div>
  );
}

export function AmdahlSimulator() {
  const [rtt, setRtt] = useState(5);
  const [contention, setContention] = useState(10);

  const currentAmdahl = 100_000 / (rtt * contention);

  return (
    <div className="flex justify-center">
      <div className="font-mono text-[11px] sm:text-sm md:text-base w-full max-w-5xl">
        <style>{`
          .amdahl-slider {
            appearance: none;
            -webkit-appearance: none;
            width: 100%;
            height: 2px;
            background: rgba(255,255,255,0.1);
            outline: none;
            cursor: pointer;
          }
          .amdahl-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 14px;
            height: 14px;
            background: #818cf8;
            border-radius: 0;
            cursor: pointer;
          }
          .amdahl-slider::-moz-range-thumb {
            width: 14px;
            height: 14px;
            background: #818cf8;
            border-radius: 0;
            border: none;
            cursor: pointer;
          }
        `}</style>

        {/* ── Desktop: ASCII art layout ── */}
        <div className="hidden md:block">
          {/* Title */}
          <div className="whitespace-pre leading-relaxed">
            <span className="text-text-muted">{FULL}</span>
            {'\n'}
            <span className="text-primary">{pad("AMDAHL'S LAW: THE NETWORK CEILING", 104)}</span>
            {'\n'}
            <span className="text-text-muted">{FULL}</span>
          </div>

          <div className="text-text-secondary text-center my-3 sm:my-4">
            Every database has a speed limit, set by the slowest step that can&#39;t run in parallel.
          </div>

          {/* Parameters */}
          <div>
            <div className="whitespace-pre text-text-muted">{P_TOP}</div>
            <ParameterSliders rtt={rtt} setRtt={setRtt} contention={contention} setContention={setContention} />
            <div className="whitespace-pre text-text-muted">{F_DASH}</div>
          </div>

          {/* Two-column comparison */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-[3ch] mt-4">
            {/* Traditional */}
            <div className="whitespace-pre leading-relaxed">
              <span className="text-text-muted">{B_LEFT}</span>
              {'\n'}
              <span className="text-primary">{pad('TRADITIONAL', 56)}</span>
              {'\n'}
              <span className="text-text-muted">{B_LEFT}</span>
              {'\n\n'}
              <span className="text-text-secondary">{'  ( [ APP ] -> [ DB ] -> [ APP ] ) \u00D7 N'}</span>
              {'\n\n'}
              <span className="text-text-secondary">{'  Engine: 100,000 TPS'}</span>
              {'\n'}
              <span className="text-text-secondary">{'  Network ceiling:'}</span>
              {'\n'}
              <span className="text-text-secondary">{'  (1,000 / '}</span>
              <span className="text-primary">{rtt}</span>
              <span className="text-text-secondary">{') \u00D7 (1 / '}</span>
              <span className="text-primary">{contention}</span>
              <span className="text-text-secondary">{'%) = '}</span>
              <span className="text-primary">{formatTps(currentAmdahl)} TPS</span>
              {'\n\n'}
              <span className="text-text-muted">{B_LEFT}</span>
            </div>

            {/* ReifyDB */}
            <div className="whitespace-pre leading-relaxed">
              <span className="text-text-muted">{B_RIGHT}</span>
              {'\n'}
              <span className="text-primary">{pad('REIFYDB', 45)}</span>
              {'\n'}
              <span className="text-text-muted">{B_RIGHT}</span>
              {'\n\n'}
              <span className="text-text-secondary">{'  [ APP ] ---[ N stmts · 1 ACID TX ]---> [ ReifyDB ]'}</span>
              {'\n\n'}
              <span className="text-text-secondary">{'  Engine: 100,000 TPS'}</span>
              {'\n'}
              <span className="text-text-secondary">{'  No round trips.'}</span>
              {'\n'}
              <span className="text-primary">{'  Actual: 100,000 TPS'}</span>
              {'\n\n'}
              <span className="text-text-muted">{B_RIGHT}</span>
            </div>
          </div>

          {/* Bottom callout */}
          <div className="whitespace-pre leading-relaxed mt-4">
            <span className="text-text-muted">{FULL}</span>
            {'\n'}
            <span className="text-primary">{"  The network is the hard limit. ReifyDB eliminates round trips from the hot path."}</span>
            {'\n'}
            <span className="text-text-muted">{FULL}</span>
          </div>
        </div>

        {/* ── Mobile: CSS border layout ── */}
        <div className="md:hidden">
          {/* Title */}
          <div className="border border-white/[0.08] p-3 text-center">
            <span className="text-primary font-bold text-xs">AMDAHL&#39;S LAW: THE NETWORK CEILING</span>
          </div>

          <p className="text-text-secondary text-center my-3 text-xs">
            Every database has a speed limit, set by the slowest step that can&#39;t run in parallel.
          </p>

          {/* Parameters */}
          <div className="border border-white/[0.08] p-3">
            <p className="text-text-muted text-[10px] mb-2">-- PARAMETERS</p>
            <ParameterSliders rtt={rtt} setRtt={setRtt} contention={contention} setContention={setContention} />
          </div>

          {/* Comparison cards */}
          <div className="flex flex-col gap-3 mt-3">
            {/* Traditional */}
            <div className="border border-white/[0.08] p-4">
              <p className="text-primary font-bold text-xs mb-2">TRADITIONAL</p>
              <p className="text-text-secondary text-xs mb-1">( [ APP ] → [ DB ] → [ APP ] ) × N</p>
              <p className="text-text-secondary text-xs mb-1">Engine: 100,000 TPS</p>
              <p className="text-text-secondary text-xs mb-1">Network ceiling:</p>
              <p className="text-xs">
                <span className="text-text-secondary">(1,000 / </span>
                <span className="text-primary">{rtt}</span>
                <span className="text-text-secondary">) × (1 / </span>
                <span className="text-primary">{contention}</span>
                <span className="text-text-secondary">%) = </span>
                <span className="text-primary">{formatTps(currentAmdahl)} TPS</span>
              </p>
            </div>

            {/* ReifyDB */}
            <div className="border border-white/[0.08] p-4">
              <p className="text-primary font-bold text-xs mb-2">REIFYDB</p>
              <p className="text-text-secondary text-xs mb-1">[ APP ] → [ N stmts · 1 ACID TX ] → [ ReifyDB ]</p>
              <p className="text-text-secondary text-xs mb-1">Engine: 100,000 TPS</p>
              <p className="text-text-secondary text-xs mb-1">No round trips.</p>
              <p className="text-primary text-xs">Actual: 100,000 TPS</p>
            </div>
          </div>

          {/* Bottom callout */}
          <div className="border border-white/[0.08] p-3 mt-3 text-center">
            <p className="text-primary text-xs">The network is the hard limit. ReifyDB eliminates round trips from the hot path.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
