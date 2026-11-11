interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <header className="border-b border-[#e3e5f4] pb-6">
      <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] text-balance">{title}</h1>
      <p className="mt-3 max-w-2xl text-text-secondary leading-relaxed">{subtitle}</p>
    </header>
  );
}
