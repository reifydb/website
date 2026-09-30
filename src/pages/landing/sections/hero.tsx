import { GameButton, InstallCommand, PixelScene, PocketShell } from '@/components/ui';

export function HeroSection() {
  return (
    <section className="sky relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-8 pt-[clamp(36px,6vw,72px)] pb-[clamp(24px,3vw,36px)]">
        <div className="grid gap-[clamp(28px,5vw,64px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-center">
          <div>
            <p className="eyebrow-pixel mb-5">LIVE MARKETS, ONE FLIP AT A TIME</p>

            <h1 className="text-[clamp(34px,4.6vw,56px)] leading-[1.04] tracking-[-0.035em] text-text-primary mb-[18px] text-balance">
              One database instead of Postgres + Redis + a queue + a cron job.
            </h1>

            <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted mb-[30px] max-w-[46ch] text-pretty">
              Writes, business rules, and derived views commit in one transaction, inside the database,
              as the user who asked. Nothing to invalidate. Nothing to babysit.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <GameButton href="/docs/quick-start" size="lg">
                Get started <span className="game-button__arrow">→</span>
              </GameButton>
              <GameButton href="/playground" size="lg" variant="secondary">
                Open the playground
              </GameButton>
            </div>

            <InstallCommand className="w-full sm:w-auto text-left" />
          </div>

          <div className="w-full min-w-0">
            <PocketShell deferLoad />
          </div>
        </div>
      </div>

      <PixelScene kind="hall" className="-mb-px" />
    </section>
  );
}
