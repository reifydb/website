import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import type {Props} from '@theme/Footer/Layout';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): ReactNode {
  return (
    <footer
      className={clsx(
        ThemeClassNames.layout.footer.container,
        'footer',
        // Tailwind classes for footer styling
        'relative overflow-hidden',
        // Use the correct class format without 'dark:' prefix duplication
        'bg-gradient-to-br from-[#2D1B69] via-[#4A154B] via-[#6F42C1] to-[#8E44AD]',
        '[data-theme=\'dark\']:bg-gradient-to-br [data-theme=\'dark\']:from-[#1A0F2E] [data-theme=\'dark\']:via-[#2D1B42] [data-theme=\'dark\']:to-[#6B3F73]',
        'border-t-4 border-comic-border [data-theme=\'dark\']:border-[#FFB570]',
        'shadow-comic',
        {
          'footer--dark': style === 'dark',
        }
      )}>
      {/* Gradient accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-warm via-accent-vibrant to-accent-cool transform scale-x-0 transition-transform duration-300 hover:scale-x-100" />
      
      {/* Background overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(255,107,53,0.08)_0%,transparent_50%)]" />
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(214,51,132,0.06)_0%,transparent_50%)]" />
      </div>
      
      <div className="container container-fluid relative z-10">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text-center mt-8">
            {logo && <div className="mb-4">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}
