import { Button } from './button';

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
  buttonText = 'Book a Call →',
  buttonHref = 'https://cal.com/reifydb/30min',
  variant = 'banner',
}: CtaSectionProps) {
  const isExternal = buttonHref.startsWith('http');

  if (variant === 'minimal') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-6 sm:py-8 text-center">
        <p className="text-base sm:text-lg text-text-muted mb-3 sm:mb-4">
          {title} <span className="font-bold text-text-primary">{description}</span>
        </p>
        <a href={buttonHref} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          <Button
            variant="secondary"
            size="lg"
            className="border-2 border-primary hover:bg-primary hover:text-white transition-all"
          >
            {buttonText}
          </Button>
        </a>
      </div>
    );
  }

  if (variant === 'split') {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8 sm:py-12">
        <div className="bg-white border-2 border-border-default rounded-lg overflow-hidden shadow-minimal">
          <div className="grid md:grid-cols-2">
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-2 sm:mb-3">{title}</h3>
              <p className="text-sm sm:text-base text-text-muted">{description}</p>
            </div>
            <div className="p-6 sm:p-8 flex items-center justify-center bg-bg-primary border-t-2 md:border-t-0 md:border-l-2 border-border-default">
              <a href={buttonHref} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <Button size="lg">
                  {buttonText}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: banner variant
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 sm:py-12">
      <div className="bg-white border-2 border-border-default rounded-lg p-6 sm:p-8 text-center shadow-minimal">
        <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 sm:mb-4">{title}</h3>
        <p className="text-sm sm:text-base text-text-muted mb-4 sm:mb-6">{description}</p>
        <a href={buttonHref} {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          <Button size="lg">
            {buttonText}
          </Button>
        </a>
      </div>
    </div>
  );
}
