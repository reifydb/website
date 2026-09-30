import { Link } from 'react-router-dom';
import { Layout } from './layout.tsx';
import { Callout } from './components';
import { BOLT, BOOK, CODE, GEM, GEM_COLORS, ICON_COLORS, PixelIcon, PixelScene, ScrollReveal } from '@/components/ui';

const quickLinks = [
  {
    title: 'Quickstart',
    description: 'Build a live view in your browser, nothing to install.',
    href: '/docs/quick-start',
    icon: BOLT,
  },
  {
    title: 'RQL in Five Minutes',
    description: 'Learn the query language, one runnable concept at a time.',
    href: '/docs/rql',
    icon: CODE,
  },
  {
    title: 'Installation',
    description: 'Get ReifyDB running for real, embedded or as a server.',
    href: '/docs/installation',
    icon: BOOK,
  },
];

const keyFeatures = [
  {
    title: 'Transactional',
    body: 'Your application state stays consistent. Full ACID guarantees, real rollback.',
  },
  {
    title: 'Incremental',
    body: 'Your views update the moment your data changes. No cron, no polling.',
  },
  {
    title: 'Embeddable',
    body: 'Embed it in your app or run it as a standalone server. Your call.',
  },
  {
    title: 'RQL',
    body: 'A query language that fits how you think about your data, not how a database thinks about tables.',
  },
];

export function DocsOverview() {
  return (
    <Layout
      title="Documentation"
      description="ReifyDB documentation: a database for live application state with transactional guarantees, incremental derived views, and programmable state transitions."
    >
      <div className="space-y-8">
        <ScrollReveal>
          <div className="dialog overflow-hidden">
            <div className="sky">
              <div className="px-6 sm:px-10 pt-8 sm:pt-10 text-center">
                <p className="eyebrow-pixel uppercase mb-3">Documentation</p>
                <h1 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4 text-balance">
                  ReifyDB Documentation
                </h1>
                <p className="text-base text-text-muted mb-3 italic">
                  Your database should work the way you think. ReifyDB does.
                </p>
                <p className="text-lg text-text-secondary leading-relaxed">
                  ReifyDB is a database for live application state. You get transactional guarantees,
                  incremental derived views, programmable state transitions, and per-user access rules
                  in one coherent system.
                </p>
              </div>
              <PixelScene kind="library" className="mt-8" />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={50}>
          <Callout variant="warning" title="In Development">
            ReifyDB is under active development. Do not use in production yet. APIs and guarantees may change.
          </Callout>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <section>
            <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">What is ReifyDB?</h2>
            <p className="text-text-secondary mb-4">
              You have probably split your application state across a database, a cache, a queue, and maybe an in-memory store.
              ReifyDB brings all of that into one system.
            </p>
            <p className="text-text-secondary mb-4">
              <strong className="text-text-primary">Live application state</strong> is the data your application reads, writes, and reasons
              about on every request. User sessions, shopping carts, account balances, game state. The stuff that has to be right.
            </p>
            <p className="text-text-secondary">
              You get ACID transactions, materialized views that stay fresh automatically,
              and a query language (RQL) built for the way you actually work with state.
            </p>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <section>
            <h2 className="text-2xl font-normal tracking-[-0.03em] mb-6">Get Started</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {quickLinks.map((link) => (
                <Link key={link.href} to={link.href} className="level-card group flex flex-col">
                  <PixelIcon rows={link.icon} colors={ICON_COLORS} className="h-8 w-9 text-[#4b52d6] mb-5" />
                  <h3 className="font-bold text-text-primary mb-1 group-hover:text-[#4b52d6] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-text-muted">{link.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <section>
            <h2 className="text-2xl font-normal tracking-[-0.03em] mb-4">Key Features</h2>
            <ul className="space-y-3 text-text-secondary">
              {keyFeatures.map((feature, index) => (
                <li key={feature.title} className="flex items-start gap-3">
                  <PixelIcon rows={GEM} colors={{ x: GEM_COLORS[index] }} className="mt-1.5 h-3 w-3 shrink-0" />
                  <span>
                    <strong className="text-text-primary">{feature.title}</strong> - {feature.body}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <section className="pt-4 border-t border-[#c9c3dc]">
            <h2 className="text-lg font-normal tracking-[-0.03em] mb-4">Resources</h2>
            <ul className="space-y-2 text-text-secondary">
              <li>
                <a
                  href="https://github.com/reifydb/reifydb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4b52d6] hover:text-primary-dark font-medium transition-colors link-underline"
                >
                  GitHub Repository &rarr;
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/HPBwUSPuUS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4b52d6] hover:text-primary-dark font-medium transition-colors link-underline"
                >
                  Discord Community &rarr;
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-[#4b52d6] hover:text-primary-dark font-medium transition-colors link-underline">
                  Contact Me &rarr;
                </Link>
              </li>
            </ul>
          </section>
        </ScrollReveal>
      </div>
    </Layout>
  );
}
