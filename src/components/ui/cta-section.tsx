import { Link } from 'react-router-dom';
import { Button } from './button';
import { ScrollReveal } from './scroll-reveal';

interface CtaSectionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  variant?: 'banner' | 'minimal' | 'split';
}

export function CtaSection({
  title,
  description,
  buttonText = 'Book a Call',
  buttonHref = 'https://cal.com/reifydb/30min',
  variant = 'banner',
}: CtaSectionProps) {
  const isExternal = buttonHref.startsWith('http');

  if (variant === 'minimal') {
    return (
      <ScrollReveal>
        <div className="max-w-4xl mx-auto px-6 py-6 sm:py-8 text-center">
          <p className="text-base sm:text-lg text-text-muted mb-3 sm:mb-4">
            {title} <span className="font-bold text-text-primary">{description}</span>
          </p>
          {isExternal ? (
            <a href={buttonHref} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg">
                {buttonText}
              </Button>
            </a>
          ) : (
            <Link to={buttonHref}>
              <Button variant="secondary" size="lg">
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
      </ScrollReveal>
    );
  }

  if (variant === 'split') {
    return (
      <ScrollReveal>
        <div className="max-w-6xl mx-auto px-6 py-8 sm:py-12">
          <div className="bg-bg-tertiary border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 card-hover">
            <div className="grid md:grid-cols-2">
              <div className="p-6 sm:p-8 flex flex-col justify-center">
                <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 sm:mb-3">{title}</h3>
                <p className="text-sm sm:text-base text-text-muted">{description}</p>
              </div>
              <div className="p-6 sm:p-8 flex items-center justify-center bg-bg-secondary border-t md:border-t-0 md:border-l border-white/10">
                {isExternal ? (
                  <a href={buttonHref} target="_blank" rel="noopener noreferrer">
                    <Button size="lg">{buttonText}</Button>
                  </a>
                ) : (
                  <Link to={buttonHref}>
                    <Button size="lg">{buttonText}</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    );
  }

  // Default: banner variant
  return (
    <ScrollReveal>
      <div className="max-w-4xl mx-auto px-6 py-8 sm:py-12">
        <div className="bg-bg-tertiary border border-white/10 rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 card-hover">
          <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 sm:mb-4">{title}</h3>
          <p className="text-sm sm:text-base text-text-muted mb-4 sm:mb-6">{description}</p>
          {isExternal ? (
            <a href={buttonHref} target="_blank" rel="noopener noreferrer">
              <Button size="lg">{buttonText}</Button>
            </a>
          ) : (
            <Link to={buttonHref}>
              <Button size="lg">{buttonText}</Button>
            </Link>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
