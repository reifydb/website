import { FlipCounter, PixelScene } from '@/components/ui';
import { cn } from '@/lib';
import { EditorialSection } from './editorial-section';

const boards = [
  { mode: 'full', label: 'RECOMPUTE EVERYTHING', accent: false },
  { mode: 'incremental', label: 'REIFYDB · INCREMENTAL', accent: true },
] as const;

export function OnlyChangesSection() {
  return (
    <EditorialSection
      title={
        <>
          <span className="marker">Only what changed</span>, changes.
        </>
      }
      intro="A trade lands. The board does not get wiped and rewritten. One bot flips the one number that moved, and every view stays ready to read."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        {boards.map((board) => (
          <div key={board.mode} className="overflow-hidden border border-border-light bg-white">
            <div className={cn('label px-[18px] py-3.5 border-b border-border-light', board.accent && 'text-[#4b52d6]')}>
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
    </EditorialSection>
  );
}
