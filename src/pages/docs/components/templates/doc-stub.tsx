import type { ReactNode } from 'react';

export interface DocStubSection {
  heading: string;
  body: ReactNode;
}

interface DocStubProps {
  title: string;
  kicker?: string;
  description: string;
  sections: DocStubSection[];
  children?: ReactNode;
}

export function DocStub({ title, kicker, description, sections, children }: DocStubProps) {
  return (
    <div className="space-y-8">
      <div>
        {kicker && (
          <div className="pixel-label uppercase text-[#4b52d6] mb-3">
            {kicker}
          </div>
        )}
        <h1 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] mb-4">{title}</h1>
        <p className="text-[clamp(16px,1.6vw,18.5px)] leading-[1.65] text-text-muted">{description}</p>
      </div>
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-[24px] font-normal leading-[1.15] tracking-[-0.03em] mb-4">{section.heading}</h2>
          <div className="text-text-secondary space-y-4">{section.body}</div>
        </section>
      ))}
      {children}
    </div>
  );
}
