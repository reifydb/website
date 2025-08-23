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
        // Clean brutalist styling
        'relative',
        {
          'footer--dark': style === 'dark',
        }
      )}>
      <div className="container container-fluid relative">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom">
            {logo && <div className="mb-4">{logo}</div>}
            {copyright && <div className="footer__copyright">{copyright}</div>}
          </div>
        )}
      </div>
    </footer>
  );
}
