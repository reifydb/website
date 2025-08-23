import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import LinkItem from '@theme/Footer/LinkItem';
import type {Props} from '@theme/Footer/Links/MultiColumn';

type ColumnType = Props['columns'][number];
type ColumnItemType = ColumnType['items'][number];

function ColumnLinkItem({item}: {item: ColumnItemType}) {
  return item.html ? (
    <li
      className={clsx('mb-3', item.className)}
      // Developer provided the HTML, so assume it's safe.
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{__html: item.html}}
    />
  ) : (
    <li key={item.href ?? item.to} className="mb-3">
      <LinkItem item={item} />
    </li>
  );
}

function Column({column}: {column: ColumnType}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.footer.column,
        'col footer__col',
        // Tailwind classes for column styling
        'relative p-8 mb-6 rounded-lg',
        'transition-all duration-300',
        'hover:transform hover:-translate-y-1.5',
        'hover:bg-white/5 dark:hover:bg-white/10',
        'group',
        column.className,
      )}>
      {/* Hover border effect */}
      <div className="absolute inset-0 rounded-lg border-3 border-comic-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="footer__title text-[#FFB570] dark:text-[#FFC490] font-bold text-lg mb-6 uppercase tracking-wider relative pb-2">
        {column.title}
        {/* Title underline */}
        <div className="absolute bottom-0 left-0 w-8 h-0.75 bg-gradient-to-r from-accent-warm to-accent-vibrant rounded-sm" />
      </div>
      <ul className="footer__items list-none p-0 m-0">
        {column.items.map((item, i) => (
          <ColumnLinkItem key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinksMultiColumn({columns}: Props): ReactNode {
  return (
    <div className="row footer__links">
      {columns.map((column, i) => (
        <Column key={i} column={column} />
      ))}
    </div>
  );
}
