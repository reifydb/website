interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="border-b border-[#c9c3dc] pb-6">
      <span className="pixel-label uppercase text-[#4b52d6]">{eyebrow}</span>
      <h1 className="mt-2 text-3xl sm:text-4xl font-normal tracking-[-0.03em] text-balance">{title}</h1>
      <p className="mt-3 max-w-2xl text-text-secondary leading-relaxed">{subtitle}</p>
    </header>
  );
}
