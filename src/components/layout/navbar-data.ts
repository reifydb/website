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
        id: 'company',
        label: 'Company',
        columns: [
            {
                title: 'About',
                items: [
                    {label: 'Mission', href: '/company/mission'},
                    {label: 'Values', href: '/company/values'},
                    {label: 'Contact', href: '/contact'},
                ],
            },
        ],
    },
];

export const navDirectLinks: NavDirectLink[] = [
    {href: '/docs', label: 'Docs'},
    {href: '/blog', label: 'Blog'},
    {href: '/faq', label: 'FAQ'},
    {href: '/support', label: 'Support'},
];
