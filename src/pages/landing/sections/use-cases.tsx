import { PixelIcon, ScrollReveal } from '@/components/ui';
import { EditorialSection } from './editorial-section';

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

function UseCaseRow({ useCase, index }: { useCase: (typeof useCases)[number]; index: number }) {
  return (
    <ScrollReveal delay={index * 75}>
      <div className="flex items-start gap-5 py-7">
        <PixelIcon rows={useCase.icon} colors={ICON_COLORS} className="h-10 w-10 shrink-0" />
        <div>
          <h3 className="text-lg font-bold mb-2">{useCase.title}</h3>
          <p className="text-text-muted text-sm leading-relaxed max-w-2xl">{useCase.description}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function UseCasesSection() {
  return (
    <EditorialSection
      id="use-cases"
      eyebrow="USE CASES"
      title="Built for Live Application State"
      intro="If your application reads it, writes it, and reasons about it on every request, that is the state ReifyDB was built for."
    >
      <div className="divide-y divide-[#e3e5f4] border-y border-[#e3e5f4]">
        {useCases.map((useCase, index) => (
          <UseCaseRow key={useCase.title} useCase={useCase} index={index} />
        ))}
      </div>
    </EditorialSection>
  );
}
