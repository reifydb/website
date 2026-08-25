import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { Button, PageHero, ScrollReveal } from '@/components/ui';
import { Mail, Github, MessageCircle } from 'lucide-react';

const channels = [
  {
    title: 'Email',
    detail: 'founder@reifydb.com',
    note: 'Questions, use cases, anything else.',
    icon: Mail,
    href: 'mailto:founder@reifydb.com',
  },
  {
    title: 'GitHub',
    detail: 'reifydb/reifydb',
    note: 'Bugs, feature requests, and the source.',
    icon: Github,
    href: 'https://github.com/reifydb/reifydb',
  },
  {
    title: 'Discord',
    detail: 'Join the community',
    note: 'Talk to other people building on ReifyDB.',
    icon: MessageCircle,
    href: 'https://discord.gg/HPBwUSPuUS',
  },
];

export function ContactPage() {
  return (
    <>
      <PageMeta
        title="Contact | ReifyDB"
        description="Get in touch with the ReifyDB team by email or on GitHub."
      />
      <Navbar />

      <main>
        <PageHero
          eyebrow="Contact"
          title="Get in touch"
          subtitle="Questions about ReifyDB, or a use case you want to talk through? Thirty minutes is usually enough."
        >
          <Button href="https://cal.com/reifydb/30min" size="lg">
            Book a call
          </Button>
          <Button href="mailto:founder@reifydb.com" variant="secondary" size="lg">
            Send an email
          </Button>
        </PageHero>

        <section className="section-elevated py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <div className="grid gap-5 sm:grid-cols-3">
              {channels.map((channel, index) => (
                <ScrollReveal key={channel.title} delay={index * 75}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block h-full"
                  >
                    <div className="bento-tile lift-card h-full p-6 sm:p-8 flex flex-col">
                      <channel.icon className="h-6 w-6 text-primary mb-5" strokeWidth={2} />
                      <h2 className="font-bold text-lg mb-1">{channel.title}</h2>
                      <p className="font-mono text-sm text-primary mb-3 break-all">{channel.detail}</p>
                      <p className="text-text-muted text-sm leading-relaxed">{channel.note}</p>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
