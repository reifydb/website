import { FlipCounter, PixelScene } from '@/components/ui';
import { cn } from '@/lib';

const boards = [
  { mode: 'full', label: 'RECOMPUTE EVERYTHING', accent: false },
  { mode: 'incremental', label: 'REIFYDB · INCREMENTAL', accent: true },
] as const;

export function OnlyChangesSection() {
  return (
    <section className="bg-bg-primary py-[clamp(48px,7vw,88px)]">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <h2 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary mb-2.5 text-balance">
          Only what changed, changes.
        </h2>
        <p className="text-[15.5px] text-text-muted max-w-[56ch] mb-8 text-pretty">
          A trade lands. The board does not get wiped and rewritten. One bot flips the one number that moved, and
          every view stays ready to read.
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          {boards.map((board) => (
            <div key={board.mode} className="overflow-hidden rounded-[14px] border border-border-light bg-white">
              <div className={cn('pixel-label px-[18px] py-3.5 border-b border-border-light', board.accent && 'text-[#4b52d6]')}>
                {board.label}
              </div>
              <PixelScene kind={board.mode} className="bg-[linear-gradient(#f6f4fd,#fbf8f1)]" />
              <p className="px-[18px] pt-3 pb-4 text-[13.5px] text-text-muted border-t border-border-light">
                <b className={cn('font-mono text-[15px]', board.accent ? 'text-[#4b52d6]' : 'text-text-primary')}>
                  <FlipCounter mode={board.mode} />
                </b>{' '}
                tiles flipped
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
