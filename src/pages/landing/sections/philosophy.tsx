import { Database, Lock, RefreshCw, Cpu } from 'lucide-react';

const principles = [
  {
    title: 'State is First-Class',
    description: 'Not an afterthought bolted onto a query engine. ReifyDB is built from the ground up around mutable, live state.',
    icon: Database,
  },
  {
    title: 'Transactional Boundaries',
    description: 'All mutations go through transactions. No side-channel updates, no eventual consistency surprises.',
    icon: Lock,
  },
  {
    title: 'Incremental Maintenance',
    description: 'Derived state is updated as data changes, not recomputed on read. Views are always fresh.',
    icon: RefreshCw,
  },
  {
    title: 'Colocation',
    description: 'Logic lives next to data, reducing network hops and eliminating consistency gaps between services.',
    icon: Cpu,
  },
];

export function PhilosophySection() {
  return (
    <section id="philosophy" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Design Philosophy
          </h2>
          <p className="max-w-2xl mx-auto text-text-secondary text-lg">
            The architectural decisions behind ReifyDB.
          </p>
        </div>

        {/* Principles Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="bg-white border-2 border-border-default rounded-lg p-6 shadow-minimal text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-bg-secondary rounded-lg">
                <principle.icon className="h-6 w-6 text-primary" strokeWidth={2} />
              </div>
              <h3 className="text-base font-bold mb-2">{principle.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
