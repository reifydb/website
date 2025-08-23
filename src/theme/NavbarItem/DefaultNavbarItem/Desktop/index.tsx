import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import NavbarNavLink from '@theme/NavbarItem/NavbarNavLink';
import type {Props} from '@theme/NavbarItem/DefaultNavbarItem/Desktop';

export default function DefaultNavbarItemDesktop({
  className,
  isDropdownItem = false,
  ...props
}: Props): ReactNode {
  const element = (
    <NavbarNavLink
      className={clsx(
        isDropdownItem ? [
          'dropdown__link',
          'block px-4 py-2.5 text-gray-700 dark:text-gray-300',
          'hover:text-primary hover:bg-primary-lightest dark:hover:bg-gray-800',
          'rounded-small transition-all duration-200',
          'hover:translate-x-1',
        ] : [
          'navbar__item navbar__link',
          'px-4 py-2.5 rounded-small',
          'font-medium text-gray-700 dark:text-gray-300',
          'hover:text-primary hover:bg-primary-lightest dark:hover:bg-gray-800',
          'transition-all duration-300',
          'border-2 border-transparent',
          'hover:border-comic-border dark:hover:border-dark-comic-border',
          'hover:-translate-y-0.5 hover:rotate-[-0.5deg]',
          'hover:shadow-soft',
        ],
        className,
      )}
      isDropdownLink={isDropdownItem}
      {...props}
    />
  );

  if (isDropdownItem) {
    return <li className="mb-1">{element}</li>;
  }

  return element;
}