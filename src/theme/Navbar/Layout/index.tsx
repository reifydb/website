import React, {type ComponentProps, type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames, useThemeConfig} from '@docusaurus/theme-common';
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import {translate} from '@docusaurus/Translate';
import NavbarMobileSidebar from '@theme/Navbar/MobileSidebar';
import type {Props} from '@theme/Navbar/Layout';

function NavbarBackdrop(props: ComponentProps<'div'>) {
  return (
    <div
      role="presentation"
      {...props}
      className={clsx(
        'fixed inset-0 z-40 bg-black/50 lg:hidden',
        props.className
      )}
    />
  );
}

export default function NavbarLayout({children}: Props): ReactNode {
  const {
    navbar: {hideOnScroll, style},
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const {navbarRef, isNavbarVisible} = useHideableNavbar(hideOnScroll);
  
  return (
    <nav
      ref={navbarRef}
      aria-label={translate({
        id: 'theme.NavBar.navAriaLabel',
        message: 'Main',
        description: 'The ARIA label for the main navigation',
      })}
      className={clsx(
        ThemeClassNames.layout.navbar.container,
        'navbar',
        'navbar--fixed-top',
        // Tailwind classes for navbar styling
        'sticky top-0 z-50',
        'bg-white/95',
        'backdrop-blur-xl',
        'border-b-4 border-comic-border [data-theme="dark"]:border-dark-comic-border',
        'shadow-comic [data-theme="dark"]:shadow-dark-comic',
        'transition-all duration-300',
        'min-h-[60px] flex items-center',
        // Hide on scroll behavior
        hideOnScroll && [
          'transition-transform duration-300',
          !isNavbarVisible && '-translate-y-full',
        ],
        {
          'navbar--dark': style === 'dark',
          'navbar--primary': style === 'primary',
          'navbar-sidebar--show': mobileSidebar.shown,
        },
      )}
      data-scrolled={!isNavbarVisible}
    >
      {/* Gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-warm via-accent-vibrant to-accent-cool transform scale-x-0 transition-transform duration-300 hover:scale-x-100" />
      
      {children}
      {mobileSidebar.shown && <NavbarBackdrop onClick={mobileSidebar.toggle} />}
      <NavbarMobileSidebar />
    </nav>
  );
}