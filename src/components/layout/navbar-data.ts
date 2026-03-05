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
        id: 'developers',
        label: 'Developers',
        columns: [
            {
                title: 'Build',
                items: [
                    {label: 'Docs', href: '/docs', description: 'Guides, references, and API documentation'},
                    {label: 'Tour', href: '/tour', description: 'Interactive walkthrough of core features'},
                    {label: 'Playground', href: '/playground', description: 'Try ReifyDB queries in the browser'},
                ],
            },
        ],
    },
    {
        id: 'resources',
        label: 'Resources',
        columns: [
            {
                title: 'Learn',
                items: [
                    {label: 'Blog', href: '/blog', description: 'Engineering deep dives and product updates'},
                    {label: 'FAQ', href: '/faq', description: 'Frequently asked questions'},
                    {label: 'Support', href: '/support', description: 'Get help from the team'},
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
                    {label: 'Mission', href: '/company/mission', description: 'Why we are building ReifyDB'},
                    {label: 'Values', href: '/company/values', description: 'The principles that guide our work'},
                    {label: 'Contact', href: '/contact', description: 'Reach out to the team'},
                ],
            },
        ],
    },
];

export const navDirectLinks: NavDirectLink[] = [];
