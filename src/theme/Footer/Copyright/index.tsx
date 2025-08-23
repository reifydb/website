import React, {type ReactNode} from 'react';
import type {Props} from '@theme/Footer/Copyright';

export default function FooterCopyright({copyright}: Props): ReactNode {
  return (
    <div
      className={
        // Tailwind classes for copyright styling
        'footer__copyright ' +
        'text-[#C9A9C9] [data-theme=\'dark\']:text-[#D4C4D4] ' +
        'text-center ' +
        'mt-8 p-6 ' +
        'border-t border-[rgba(255,181,112,0.2)] ' +
        'font-medium ' +
        'relative ' +
        'bg-[rgba(45,27,105,0.3)] [data-theme=\'dark\']:bg-[rgba(26,15,46,0.5)] ' +
        'rounded-lg ' +
        'border-3 border-comic-border [data-theme=\'dark\']:border-[rgba(255,196,144,0.15)] ' +
        'shadow-comic ' +
        'before:absolute before:inset-[-3px] ' +
        'before:border-2 before:border-[rgba(255,181,112,0.2)] ' +
        'before:rounded-lg ' +
        'before:bg-gradient-to-br before:from-[rgba(255,107,53,0.05)] before:to-[rgba(214,51,132,0.03)] ' +
        'before:-z-10'
      }
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: copyright}}
    />
  );
}
