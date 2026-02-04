export interface NavDropdownItem {
    label: string;
    href: string;
    description?: string;
}

export interface NavDropdownColumn {
    title: string;
    items: NavDropdownItem[];
}

export interface NavDropdown {
    id: string;
    label: string;
    columns: NavDropdownColumn[];
}

export interface NavDirectLink {
    href: string;
    label: string;
}

export const navDropdowns: NavDropdown[] = [
    {
        id: 'resources',
        label: 'Resources',
        columns: [
            {
                title: 'Learn',
                items: [
                    {label: 'Documentation', href: '/docs', description: 'Guides and references'},
                    {label: 'FAQ', href: '/faq', description: 'Common questions'},
                    {label: 'GitHub', href: 'https://github.com/reifydb/reifydb', description: 'Source code'},
                ],
            },
            {
                title: 'Connect',
                items: [
                    {label: 'Contact', href: '/contact', description: 'Get in touch'},
                    {label: 'Support', href: '/support', description: 'Technical help'},
                    {label: 'Book a Call', href: 'https://cal.com/reifydb/30min', description: 'Schedule a demo'},
                ],
            },
        ],
    },
    {
        id: 'company',
        label: 'Company',
        columns: [
            {
                title: 'About',
                items: [
                    {label: 'Values', href: '/company/values'},
                    {label: 'Mission', href: '/company/mission'},
                ],
            },
        ],
    },
];

export const navDirectLinks: NavDirectLink[] = [
    {href: '/docs', label: 'Docs'},
    {href: '/#pricing', label: 'Pricing'},
];
