import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showDivider?: boolean;
}

export default function PageHeader({ title, subtitle, showDivider = true }: PageHeaderProps): JSX.Element {
  return (
    <div className="page-header">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <h1 className="text-5xl text-white uppercase tracking-tight mb-4">
            {title}
          </h1>
          {showDivider && <div className="h-1 w-24 bg-white mb-6"></div>}
          {subtitle && (
            <p className="text-xl text-white/90 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}