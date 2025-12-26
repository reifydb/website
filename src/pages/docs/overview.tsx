import { Link } from 'react-router-dom';
import { BookOpen, Zap, Code, ArrowRight } from 'lucide-react';
import { DocsLayout } from './docs-layout';
import { Callout } from './components';

const quickLinks = [
  {
    title: 'Installation',
    description: 'Get ReifyDB running on your machine.',
    href: '/docs/installation',
    icon: Zap,
  },
  {
    title: 'Quick Start',
    description: 'Write your first query in minutes.',
    href: '/docs/quick-start',
    icon: BookOpen,
  },
  {
    title: 'RQL Basics',
    description: 'Learn the query language fundamentals.',
    href: '/docs/rql/basics',
    icon: Code,
  },
];

export function DocsOverview() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            ReifyDB Documentation
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ReifyDB is a database for live application state. It provides transactional guarantees,
            incremental derived state, and programmable state transitions—all in one engine.
          </p>
        </div>

        {/* Warning */}
        <Callout variant="warning" title="In Development">
          ReifyDB is under active development. Do not use in production yet. APIs and guarantees may change.
        </Callout>

        {/* What is ReifyDB */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">What is ReifyDB?</h2>
          <p className="text-text-secondary mb-4">
            Modern applications scatter state across databases, caches, queues, and in-memory stores.
            ReifyDB unifies live application state into a single, coherent system.
          </p>
          <p className="text-text-secondary mb-4">
            <strong>Live application state</strong> is the data your application reads, updates, and reasons
            about on every request—user sessions, shopping carts, account balances, game state, and more.
          </p>
          <p className="text-text-secondary">
            With ReifyDB, you get ACID transactions, incrementally-maintained materialized views,
            and a query language (RQL) designed specifically for application state.
          </p>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-6">Get Started</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="group bg-white border-2 border-border-default p-5 shadow-minimal hover:shadow-minimal-md hover:border-primary-color transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-color/10 border-2 border-primary-color/30 flex items-center justify-center">
                    <link.icon className="h-5 w-5 text-primary-color" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-primary mb-1 group-hover:text-primary-color transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-text-muted">{link.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-text-muted group-hover:text-primary-color group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-2xl font-black tracking-tight mb-4">Key Features</h2>
          <ul className="space-y-3 text-text-secondary">
            <li className="flex items-start gap-3">
              <span className="text-primary-color font-bold">•</span>
              <span><strong>Transactional</strong> — Full ACID guarantees for your application state.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-color font-bold">•</span>
              <span><strong>Incremental</strong> — Materialized views update automatically as data changes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-color font-bold">•</span>
              <span><strong>Embeddable</strong> — Run in-process or as a standalone server.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary-color font-bold">•</span>
              <span><strong>RQL</strong> — A query language designed for application state, not just tables.</span>
            </li>
          </ul>
        </section>

        {/* Links */}
        <section className="pt-4 border-t-2 border-border-default">
          <h2 className="text-lg font-black tracking-tight mb-4">Resources</h2>
          <ul className="space-y-2 text-text-secondary">
            <li>
              <a
                href="https://github.com/reifydb/reifydb"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-color hover:underline font-medium"
              >
                GitHub Repository →
              </a>
            </li>
            <li>
              <Link to="/contact" className="text-primary-color hover:underline font-medium">
                Contact Me →
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </DocsLayout>
  );
}
