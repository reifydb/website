import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'path';

const config: Config = {
  title: 'ReifyDB',
  tagline: 'The Modern Database To Get Things Done',
  favicon: 'favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.reifydb.com',
  baseUrl: '/',

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
    },
  ],

  organizationName: 'reifydb',
  projectName: 'reifydb',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/reifydb/reifydb/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'ReifyDB Blog',
          blogDescription: 'Stay up to date with the latest ReifyDB news, features, and best practices',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 5,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // Index configuration
        hashed: true,
        language: ["en"],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        
        // Search behavior
        removeDefaultStopWordFilter: false,
        removeDefaultStemmer: false,
        highlightSearchTermsOnTargetPage: true,
        searchResultLimits: 10,
        searchResultContextMaxLength: 80,
        
        // UI configuration
        searchBarShortcut: true,
        searchBarShortcutHint: false,
        searchBarPosition: "auto",
        explicitSearchResultPath: false,
        docsRouteBasePath: "/docs",
        }
    ]
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/apple-touch-icon.png',
    navbar: {
      title: 'ReifyDB',
      logo: {
        alt: 'ReifyDB Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Documentation',
          position: 'left',
          className: 'navbar-center-item',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'Core Concepts',
              to: '/docs/core-concepts/architecture',
            },
            {
              label: 'RQL Reference',
              to: '/docs/rql-reference/data-types',
            },
            {
              label: 'API Reference',
              to: '/docs/api',
            },
          ],
        },
        { 
          to: '/playground', 
          label: 'Playground', 
          position: 'left',
          className: 'navbar-center-item',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
          className: 'navbar-center-item',
        },
        {
          href: 'https://github.com/reifydb/reifydb',
          position: 'left',
          className: 'navbar-github-link navbar-center-item',
          'aria-label': 'GitHub repository',
          html: `
            <div class="navbar-github-container">
              <svg class="navbar-github-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <div class="navbar-github-stars" id="github-stars-container">
                <svg class="navbar-star-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span id="github-stars"></span>
              </div>
            </div>
          `,
        },
        {
          to: '/contact',
          position: 'right',
          className: 'navbar-contact-link',
          label: 'Contact',
        },
        {
          to: '/support',
          position: 'right',
          className: 'navbar-support-link',
          label: 'Support',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'API Reference',
              to: '/docs/api',
            },
          ],
        },
        {
          title: 'Developer',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/reifydb/reifydb',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.com/invite/vuBrm5kuuF',
            },
            {
              label: 'X',
              href: 'https://x.com/reifydb',
            },
            {
              label: 'Contact Us',
              to: '/contact',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ReifyDB.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
  
  plugins: [
    async function webpackPlugin(context, options) {
      return {
        name: 'webpack-alias-plugin',
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              alias: {
                '@components': path.resolve(__dirname, 'src/components'),
                '@playground': path.resolve(__dirname, 'src/playground'),
                '@utils': path.resolve(__dirname, 'src/utils'),
                '@hooks': path.resolve(__dirname, 'src/hooks'),
                '@theme': path.resolve(__dirname, 'src/theme'),
              },
            },
          };
        },
      };
    },
  ],
};

export default config;
