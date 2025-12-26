import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';

const messages = [
  'Initializing documentation system...',
  'Loading ReifyDB knowledge base...',
  'Preparing RQL tutorials...',
  'Documentation coming soon...',
];

export function DocsWipTerminal() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState<'typing' | 'pause' | 'clearing'>('typing');

  // Typing effect
  useEffect(() => {
    const currentMessage = messages[messageIndex];

    if (phase === 'typing') {
      if (charIndex < currentMessage.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentMessage.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 60);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing
        if (messageIndex === messages.length - 1) {
          // Stay on the last message
          return;
        }
        const timeout = setTimeout(() => {
          setPhase('clearing');
        }, 1500);
        return () => clearTimeout(timeout);
      }
    } else if (phase === 'clearing') {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentMessage.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 25);
        return () => clearTimeout(timeout);
      } else {
        setMessageIndex((prev) => prev + 1);
        setPhase('typing');
      }
    }
  }, [charIndex, phase, messageIndex]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center bg-bg-primary px-6 py-16">
        <div className="w-full max-w-2xl">
          {/* Terminal Window */}
          <div className="bg-white border-2 border-border-default rounded-lg overflow-hidden shadow-minimal">
            {/* macOS Chrome Header */}
            <div className="h-10 sm:h-12 bg-bg-primary border-b-2 border-border-default flex items-center px-3 sm:px-4 gap-2">
              <div className="flex gap-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--color-status-error)' }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--color-accent-yellow)' }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: 'var(--color-feature-green)' }}
                />
              </div>
              <span className="text-xs font-bold tracking-wide ml-2">reifydb@docs</span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 sm:p-8 font-mono text-sm sm:text-base leading-relaxed bg-white text-text-primary min-h-[200px]">
              {/* Previous completed messages */}
              {messages.slice(0, messageIndex).map((msg, idx) => (
                <div key={idx} className="flex items-center mb-2 text-text-muted">
                  <span style={{ color: 'var(--color-feature-teal)' }}>$</span>
                  <span className="ml-2">{msg}</span>
                  <span className="ml-2" style={{ color: 'var(--color-feature-green)' }}>
                    OK
                  </span>
                </div>
              ))}

              {/* Current typing line */}
              <div className="flex items-center">
                <span style={{ color: 'var(--color-feature-teal)' }}>$</span>
                <span className="ml-2">{displayText}</span>
                <span
                  className={`ml-0.5 transition-opacity ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                >
                  █
                </span>
              </div>
            </div>
          </div>

          {/* Info text below terminal */}
          <div className="mt-8 text-center">
            <p className="text-text-secondary mb-4">
              We're actively writing comprehensive documentation for ReifyDB.
            </p>
            <p className="text-text-muted text-sm mb-6">
              In the meantime, check out our GitHub repository for examples and source code.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/reifydb/reifydb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-border-default text-white font-bold border-2 border-border-default rounded hover:shadow-minimal-md transition-all"
              >
                View on GitHub
              </a>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-text-primary font-bold border-2 border-border-default rounded hover:shadow-minimal-md transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
