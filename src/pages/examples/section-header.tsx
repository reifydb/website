interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="border-b border-border-default pb-6">
      <span className="text-xs label-uppercase text-primary">{eyebrow}</span>
      <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-balance">{title}</h1>
      <p className="mt-3 max-w-2xl text-text-secondary leading-relaxed">{subtitle}</p>
    </header>
  );
}
