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
        {kicker && <div className="text-sm text-text-muted mb-2 font-bold">{kicker}</div>}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">{title}</h1>
        <p className="text-lg text-text-secondary leading-relaxed">{description}</p>
      </div>
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="text-2xl font-black tracking-tight mb-4">{section.heading}</h2>
          <div className="text-text-secondary space-y-4">{section.body}</div>
        </section>
      ))}
      {children}
    </div>
  );
}
