import { PixelIcon, ScrollReveal } from '@/components/ui';

const ICON_COLORS: Record<string, string> = {
  c: '#e0a83a',
  y: '#ffd166',
  w: '#fff3c4',
  d: '#b07a1a',
  r: '#e0708f',
  h: '#f0a3b8',
  s: '#c9c3dc',
  n: '#ffd166',
  b: '#4b52d6',
  k: '#3f3b99',
  g: '#7e85f2',
  1: '#a3a9ff',
  2: '#7e85f2',
  3: '#4b52d6',
};

const COIN = [
  '...cccc...',
  '.ccyyyycc.',
  '.cywyyyyc.',
  'cywyydyyyc',
  'cyyydddyyc',
  'cyyyydyyyc',
  'cyyydddyyc',
  '.cyyydyyc.',
  '.ccyyyycc.',
  '...cccc...',
];

const JOYSTICK = [
  '...rrr....',
  '..rhrrr...',
  '..rrrrr...',
  '...rrr....',
  '....s.....',
  '....s.....',
  '....s..n..',
  '.bbbbbbbb.',
  'bbbbbbbbbb',
  'kkkkkkkkkk',
];

const GEAR = [
  '....gg....',
  '.gg.gg.gg.',
  '.gggggggg.',
  '..gg..gg..',
  'ggg....ggg',
  'bbb....bbb',
  '..bb..bb..',
  '.bbbbbbbb.',
  '.bb.bb.bb.',
  '....bb....',
];

const METER = [
  '........33',
  '........33',
  '........33',
  '.....22.33',
  '.....22.33',
  '..11.22.33',
  '..11.22.33',
  '..11.22.33',
  'ssssssssss',
  '..........',
];

const useCases: { title: string; description: string; icon: string[] }[] = [
  {
    title: 'Trading & Financial State',
    icon: COIN,
    description: 'Positions, balances, order state. One bad write here can cost real money. ReifyDB makes sure that does not happen.',
  },
  {
    title: 'Game & Simulation State',
    icon: JOYSTICK,
    description: 'Player state, world state, simulation ticks. Everything stays consistent even when thousands of updates hit at once.',
  },
  {
    title: 'Workflow & Process State',
    icon: GEAR,
    description: 'Multi-step workflows, task queues, process coordination. No more duct-taping Redis, Postgres, and a cron job together.',
  },
  {
    title: 'Counters, Queues & Buffers',
    icon: METER,
    description: 'Counters, ring buffers, histograms, rate limiters. Built in, transactional, and ready to use. No external dependencies.',
  },
];

function UseCaseCell({ useCase, index }: { useCase: (typeof useCases)[number]; index: number }) {
  return (
    <ScrollReveal className="h-full" delay={index * 75}>
      <div className="level-card group">
        <div className="flex items-center gap-4 mb-4">
          <PixelIcon rows={useCase.icon} colors={ICON_COLORS} className="h-10 w-10 shrink-0" />
          <div>
            <p className="pixel-label text-[#4b52d6] mb-2">WORLD {index + 1}</p>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
              {useCase.title}
            </h3>
          </div>
        </div>
        <p className="text-text-muted text-sm leading-relaxed">
          {useCase.description}
        </p>
      </div>
    </ScrollReveal>
  );
}

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="eyebrow-pixel mb-3">USE CASES</p>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary mb-4 text-balance">
              Built for Live Application State
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              If your application reads it, writes it, and reasons about it on every request, that is the state ReifyDB was built for.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {useCases.map((useCase, index) => (
            <UseCaseCell key={useCase.title} useCase={useCase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
