interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-lg section-dark window-shell px-6 py-7 sm:px-8 sm:py-9">
      <div className="absolute inset-0 z-0 dot-grid-dark" />
      <div className="absolute inset-0 z-0 hero-glow" />

      <div className="relative z-10">
        <span className="text-xs label-uppercase text-white/45">{eyebrow}</span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-white/60 leading-relaxed">{subtitle}</p>
      </div>
    </header>
  );
}
