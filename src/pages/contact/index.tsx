import { Footer, Navbar } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { BUBBLE, CODE, Button, ICON_COLORS, MAIL, PixelIcon, PixelScene, ScrollReveal } from '@/components/ui';
import { Container, PageHero, Section } from '@reifydb/ui';

const channels = [
  {
    title: 'Email',
    detail: 'founder@reifydb.com',
    note: 'Questions, use cases, anything else.',
    icon: MAIL,
    href: 'mailto:founder@reifydb.com',
  },
  {
    title: 'GitHub',
    detail: 'reifydb/reifydb',
    note: 'Bugs, feature requests, and the source.',
    icon: CODE,
    href: 'https://github.com/reifydb/reifydb',
  },
  {
    title: 'Discord',
    detail: 'Join the community',
    note: 'Talk to other people building on ReifyDB.',
    icon: BUBBLE,
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
          scene={<PixelScene kind="plane" />}
        >
          <Button href="https://cal.com/reifydb/30min" size="lg">
            Book a call
          </Button>
          <Button href="mailto:founder@reifydb.com" variant="secondary" size="lg">
            Send an email
          </Button>
        </PageHero>

        <Section tone="plain">
          <Container className="grid gap-6 sm:grid-cols-3">
            {channels.map((channel, index) => (
              <ScrollReveal key={channel.title} className="h-full" delay={index * 75}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex h-full flex-col border-t border-[#e3e5f4] pt-6"
                >
                  <PixelIcon rows={channel.icon} colors={ICON_COLORS} className="h-8 w-9 text-[#4b52d6] mb-5" />
                  <h2 className="text-lg font-bold text-text-primary group-hover:text-[#4b52d6] transition-colors mb-1">
                    {channel.title}
                  </h2>
                  <p className="font-mono text-sm text-primary mb-3 break-all">{channel.detail}</p>
                  <p className="text-text-muted text-sm leading-relaxed">{channel.note}</p>
                </a>
              </ScrollReveal>
            ))}
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
