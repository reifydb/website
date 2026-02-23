import { Link } from 'react-router-dom';
import { BookOpen, Zap, Code, ArrowRight } from 'lucide-react';
import { Layout } from './layout.tsx';
import { Callout } from './components';
import { ScrollReveal } from '@/components/ui';

const quickLinks = [
  {
    title: 'Installation',
    description: 'Get ReifyDB running on your machine.',
    href: '/docs/installation',
    icon: Zap,
    color: 'text-primary',
    bgColor: 'from-primary/20 to-accent-warm/20',
  },
  {
    title: 'Quick Start',
    description: 'Write your first query in minutes.',
    href: '/docs/quick-start',
    icon: BookOpen,
    color: 'text-feature-blue',
    bgColor: 'from-feature-blue/20 to-feature-teal/20',
  },
  {
    title: 'RQL Basics',
    description: 'Learn the query language fundamentals.',
    href: '/docs/rql/basics',
    icon: Code,
    color: 'text-feature-green',
    bgColor: 'from-feature-green/20 to-feature-teal/20',
  },
];

export function DocsOverview() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <ScrollReveal>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              ReifyDB Documentation
            </h1>
            <p className="text-base text-text-muted mb-3 italic">
              Built on the premise that databases should optimize for reasoning about state,
              not just storing it.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              ReifyDB is a database for live application state. It provides transactional guarantees,
              incremental derived state, and programmable state transitions - all in one coherent model.
            </p>
          </div>
        </ScrollReveal>

        {/* Warning */}
        <ScrollReveal delay={50}>
          <Callout variant="warning" title="In Development">
            ReifyDB is under active development. Do not use in production yet. APIs and guarantees may change.
          </Callout>
        </ScrollReveal>

        {/* What is ReifyDB */}
        <ScrollReveal delay={100}>
          <section>
            <h2 className="text-2xl font-black tracking-tight mb-4">What is ReifyDB?</h2>
            <p className="text-text-secondary mb-4">
              Modern applications scatter state across databases, caches, queues, and in-memory stores.
              ReifyDB unifies live application state into a single, coherent system.
            </p>
            <p className="text-text-secondary mb-4">
              <strong className="text-text-primary">Live application state</strong> is the data your application reads, updates, and reasons
              about on every request—user sessions, shopping carts, account balances, game state, and more.
            </p>
            <p className="text-text-secondary">
              With ReifyDB, you get ACID transactions, incrementally-maintained materialized views,
              and a query language (RQL) designed specifically for application state.
            </p>
          </section>
        </ScrollReveal>

        {/* Quick Links */}
        <ScrollReveal delay={150}>
          <section>
            <h2 className="text-2xl font-black tracking-tight mb-6">Get Started</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {quickLinks.map((link, index) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group bg-bg-tertiary border border-white/10 rounded-2xl p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]"
                  style={{ animationDelay: `${index * 75}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${link.bgColor} flex items-center justify-center`}>
                      <link.icon className={`h-5 w-5 ${link.color}`} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-text-muted">{link.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Key Features */}
        <ScrollReveal delay={200}>
          <section>
            <h2 className="text-2xl font-black tracking-tight mb-4">Key Features</h2>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong className="text-text-primary">Transactional</strong> — Full ACID guarantees for your application state.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong className="text-text-primary">Incremental</strong> — Materialized views update automatically as data changes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong className="text-text-primary">Embeddable</strong> — Run in-process or as a standalone server.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span><strong className="text-text-primary">RQL</strong> — A query language designed for application state, not just tables.</span>
              </li>
            </ul>
          </section>
        </ScrollReveal>

        {/* Links */}
        <ScrollReveal delay={250}>
          <section className="pt-4 border-t border-white/10">
            <h2 className="text-lg font-black tracking-tight mb-4">Resources</h2>
            <ul className="space-y-2 text-text-secondary">
              <li>
                <a
                  href="https://github.com/reifydb/reifydb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light font-medium transition-colors link-underline"
                >
                  GitHub Repository →
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-primary hover:text-primary-light font-medium transition-colors link-underline">
                  Contact Me →
                </Link>
              </li>
            </ul>
          </section>
        </ScrollReveal>
      </div>
    </Layout>
  );
}
