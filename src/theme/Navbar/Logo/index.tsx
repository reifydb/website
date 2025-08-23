import React, {type ReactNode} from 'react';
import Logo from '@theme/Logo';

export default function NavbarLogo(): ReactNode {
  return (
    <Logo
      className="navbar__brand flex items-center flex-shrink-0 gap-3"
      imageClassName="navbar__logo h-8 w-auto max-h-8 block"
      titleClassName="navbar__title text--truncate font-bold text-xl"
    />
  );
}