import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type {Props} from '@theme/Footer/LinkItem';

export default function FooterLinkItem({item}: Props): ReactNode {
  const {to, href, label, prependBaseUrlToHref, className, ...props} = item;
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});

  return (
    <Link
      className={clsx(
        'footer__link-item',
        // Tailwind classes for link styling
        'text-[#E2D6E7] dark:text-[#F0E6F0]',
        'hover:text-[#FFB570] dark:hover:text-[#FFC490]',
        'transition-all duration-300',
        'font-medium no-underline',
        'relative inline-block',
        'py-2 px-3',
        'rounded-sm',
        'border-2 border-transparent',
        'hover:translate-x-1.5 hover:-rotate-[0.5deg]',
        'hover:border-[rgba(255,181,112,0.3)]',
        'hover:shadow-comic',
        'group',
        className
      )}
      {...(href
        ? {
            href: prependBaseUrlToHref ? normalizedHref : href,
          }
        : {
            to: toUrl,
          })}
      {...props}>
      {/* Background effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-br from-[rgba(255,107,53,0.1)] to-[rgba(214,51,132,0.08)] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      {/* Border effect */}
      <span className="absolute inset-[-2px] border border-comic-border rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {label}
      {href && !isInternalUrl(href) && <IconExternalLink />}
    </Link>
  );
}
