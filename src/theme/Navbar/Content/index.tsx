import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  useThemeConfig,
  ErrorCauseBoundary,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({
  left,
  center,
  right,
}: {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between w-full px-6 lg:px-8 min-h-[60px] relative">
      {/* Left side - Logo */}
      <div className={clsx(
        ThemeClassNames.layout.navbar.containerLeft,
        'navbar__items',
        'flex items-center gap-4 flex-shrink-0 z-10'
      )}>
        {left}
      </div>
      
      {/* Center items - positioned absolutely */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6 h-[60px] z-10">
        <div className="flex items-center gap-2">
          {center}
        </div>
      </div>
      
      {/* Right side - Search, theme toggle */}
      <div className={clsx(
        ThemeClassNames.layout.navbar.containerRight,
        'navbar__items navbar__items--right',
        'flex items-center gap-2 flex-shrink-0 z-10'
      )}>
        {right}
      </div>
    </div>
  );
}

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();

  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  
  // Separate center items (Documentation, Playground, Blog, GitHub)
  const centerItems = leftItems.filter(item => 
    item.className && item.className.includes('navbar-center-item')
  );
  const actualLeftItems = leftItems.filter(item => 
    !item.className || !item.className.includes('navbar-center-item')
  );

  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <div className="hidden lg:flex items-center gap-2">
            <NavbarItems items={actualLeftItems} />
          </div>
        </>
      }
      center={
        <div className="hidden lg:flex items-center gap-2">
          <NavbarItems items={centerItems} />
        </div>
      }
      right={
        <>
          <div className="hidden lg:flex items-center gap-2">
            <NavbarItems items={rightItems} />
          </div>
          <NavbarColorModeToggle className="ml-2" />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}