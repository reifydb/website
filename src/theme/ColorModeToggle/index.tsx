import React, {type ReactNode, useEffect, useRef} from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {translate} from '@docusaurus/Translate';
import IconLightMode from '@theme/Icon/LightMode';
import IconDarkMode from '@theme/Icon/DarkMode';
import IconSystemColorMode from '@theme/Icon/SystemColorMode';
import type {Props} from '@theme/ColorModeToggle';
import type {ColorMode} from '@docusaurus/theme-common';

import styles from './styles.module.css';

// The order of color modes is defined here, and can be customized with swizzle
function getNextColorMode(
  colorMode: ColorMode | null,
  respectPrefersColorScheme: boolean,
) {
  // 2-value transition
  if (!respectPrefersColorScheme) {
    return colorMode === 'dark' ? 'light' : 'dark';
  }

  // 3-value transition
  switch (colorMode) {
    case null:
      return 'light';
    case 'light':
      return 'dark';
    case 'dark':
      return null;
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function getColorModeLabel(colorMode: ColorMode | null): string {
  switch (colorMode) {
    case null:
      return translate({
        message: 'system mode',
        id: 'theme.colorToggle.ariaLabel.mode.system',
        description: 'The name for the system color mode',
      });
    case 'light':
      return translate({
        message: 'light mode',
        id: 'theme.colorToggle.ariaLabel.mode.light',
        description: 'The name for the light color mode',
      });
    case 'dark':
      return translate({
        message: 'dark mode',
        id: 'theme.colorToggle.ariaLabel.mode.dark',
        description: 'The name for the dark color mode',
      });
    default:
      throw new Error(`unexpected color mode ${colorMode}`);
  }
}

function getColorModeAriaLabel(colorMode: ColorMode | null) {
  return translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the color mode toggle',
    },
    {
      mode: getColorModeLabel(colorMode),
    },
  );
}

function CurrentColorModeIcon({value}: {value: ColorMode | null}): ReactNode {
  // Render only the active icon based on current value
  if (value === null) {
    return <IconSystemColorMode aria-hidden className={styles.toggleIcon} />;
  }
  if (value === 'light') {
    return <IconLightMode aria-hidden className={styles.toggleIcon} />;
  }
  return <IconDarkMode aria-hidden className={styles.toggleIcon} />;
}

function ColorModeToggle({
  className,
  buttonClassName,
  respectPrefersColorScheme,
  value,
  onChange,
}: Props): ReactNode {
  const isBrowser = useIsBrowser();
  const toggleRef = useRef<HTMLDivElement>(null);
  
  // Set data-theme-choice attribute for CSS
  useEffect(() => {
    if (toggleRef.current) {
      const themeChoice = value === null ? 'system' : value;
      toggleRef.current.setAttribute('data-theme-choice', themeChoice);
    }
  }, [value]);
  
  return (
    <div ref={toggleRef} className={clsx(styles.toggle, className)} data-theme-choice={value === null ? 'system' : value}>
      <button
        className={clsx(
          'clean-btn',
          styles.toggleButton,
          !isBrowser && styles.toggleButtonDisabled,
          buttonClassName,
          // Add Tailwind classes for better styling
          'flex items-center justify-center w-8 h-8 rounded-full',
          'hover:bg-primary-lightest dark:hover:bg-gray-800',
          'transition-all duration-200',
        )}
        type="button"
        onClick={() =>
          onChange(getNextColorMode(value, respectPrefersColorScheme))
        }
        disabled={!isBrowser}
        title={getColorModeLabel(value)}
        aria-label={getColorModeAriaLabel(value)}
      >
        <CurrentColorModeIcon value={value} />
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);