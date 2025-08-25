import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';

export interface CardProps {
    icon?: string | React.ReactNode;
    title: string;
    description: string;
    href?: string;
    className?: string;
    iconClassName?: string;
    onClick?: () => void;
}

export default function Card({
                                 icon,
                                 title,
                                 description,
                                 href,
                                 className,
                                 iconClassName = "text-4xl mb-4",
                                 onClick
                             }: CardProps) {
    const cardContent = (
        <>
            {icon && (
                <div className={iconClassName}>
                    {typeof icon === 'string' ? icon : icon}
                </div>
            )}
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white uppercase">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
            </p>
        </>
    );

    const cardClass = clsx('feature-card', className);

    if (href) {
        return (
            <Link to={href} className={cardClass}>
                {cardContent}
            </Link>
        );
    }

    if (onClick) {
        return (
            <div className={cardClass} onClick={onClick} style={{cursor: 'pointer'}}>
                {cardContent}
            </div>
        );
    }

    return (
        <div className={cardClass}>
            {cardContent}
        </div>
    );
}