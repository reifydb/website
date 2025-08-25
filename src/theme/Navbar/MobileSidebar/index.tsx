import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import {
  useLockBodyScroll,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import IconClose from '@theme/Icon/Close';

export default function NavbarMobileSidebar(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const location = useLocation();
  useLockBodyScroll(mobileSidebar.shown);

  if (!mobileSidebar.shouldRender) {
    return null;
  }

  const menuItems = [
    { label: 'DOCUMENTATION', href: '/docs/getting-started/installation' },
    { label: 'PLAYGROUND', href: '/playground' },
    { label: 'BLOG', href: '/blog' },
    { label: 'GITHUB', href: 'https://github.com/reifydb/reifydb', external: true },
    { label: 'CONTACT', href: '/contact' },
    { label: 'SUPPORT', href: '/support' },
  ];

  const isActive = (href: string) => {
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`mobile-sidebar-backdrop ${mobileSidebar.shown ? 'mobile-sidebar-backdrop--visible' : ''}`}
        onClick={mobileSidebar.toggle}
        aria-hidden="true"
      />
      
      {/* Drawer */}
      <div className={`mobile-sidebar ${mobileSidebar.shown ? 'mobile-sidebar--visible' : ''}`}>
        {/* Header */}
        <div className="mobile-sidebar-header">
          <Link to="/" className="mobile-sidebar-brand">
            <img src="/img/logo.png" alt="ReifyDB" className="mobile-sidebar-logo" />
            <span className="mobile-sidebar-title">REIFYDB</span>
          </Link>
          <button
            className="mobile-sidebar-close"
            onClick={mobileSidebar.toggle}
            aria-label="Close navigation"
          >
            <IconClose />
          </button>
        </div>
        
        {/* Menu Items */}
        <nav className="mobile-sidebar-nav">
          {menuItems.map((item) => (
            <React.Fragment key={item.label}>
              {/* Add separator before GitHub */}
              {item.label === 'GITHUB' && (
                <div className="mobile-sidebar-separator" />
              )}
              
              {item.external ? (
                <a
                  href={item.href}
                  className="mobile-sidebar-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={mobileSidebar.toggle}
                >
                  {item.label}
                  <span className="mobile-sidebar-external">↗</span>
                </a>
              ) : (
                <Link
                  to={item.href}
                  className={`mobile-sidebar-link ${isActive(item.href) ? 'mobile-sidebar-link--active' : ''}`}
                  onClick={mobileSidebar.toggle}
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </>
  );
}
