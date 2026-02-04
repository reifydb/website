import { useState, useEffect } from 'react';

const commands = [
  'from blazingly_fast.queries limit 1ms',
  'create developer_first.experience { simple: true }',
  'from open_source.community join contributors',
  'from events stream real_time.updates',
  'embed database.anywhere { size: "small" }',
  'from rust.performance select speed::maximum',
  'insert get_things.done returning instantly',
];

const mobileCommands = [
  'embed database.anywhere',
  'create developer_first',
  'from events stream live',
  'select speed::maximum',
  'insert data instantly',
  'query limit 1ms',
  'join contributors',
];

export function HeroTerminal() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayCommand, setDisplayCommand] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const commandList = isMobile ? mobileCommands : commands;
    const currentCommand = commandList[currentCommandIndex];

    const typeInterval = setInterval(
      () => {
        if (!isDeleting) {
          // Typing
          if (charIndex < currentCommand.length) {
            setDisplayCommand(currentCommand.substring(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          // Deleting
          if (charIndex > 0) {
            setDisplayCommand(currentCommand.substring(0, charIndex - 1));
            setCharIndex(charIndex - 1);
          } else {
            // Move to next command
            setIsDeleting(false);
            setCurrentCommandIndex((prev) => (prev + 1) % commandList.length);
          }
        }
      },
      isDeleting ? 30 : 80
    );

    return () => clearInterval(typeInterval);
  }, [currentCommandIndex, charIndex, isDeleting, isMobile]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="group relative bg-bg-tertiary border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_50px_rgba(99,102,241,0.15)]">
      {/* Optional scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-[200%] animate-scanline" />
      </div>

      {/* macOS Chrome Header */}
      <div className="h-8 sm:h-10 bg-bg-elevated border-b border-white/10 flex items-center px-3 sm:px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-status-error" />
          <div className="w-3 h-3 rounded-full bg-status-warning" />
          <div className="w-3 h-3 rounded-full bg-status-success" />
        </div>
        <span className="text-xs font-medium text-text-muted ml-2">reifydb@terminal</span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-6 font-mono text-[clamp(0.75rem,2vw,0.875rem)] leading-relaxed text-left">
        <div className="flex items-center justify-start">
          <span className="text-feature-teal hidden sm:inline">you@reifydb</span>
          <span className="text-feature-teal sm:hidden">$</span>
          <span className="text-text-muted hidden sm:inline">: </span>
          <span className="text-text-primary ml-1">{displayCommand}</span>
          <span
            className={`ml-0.5 text-primary transition-opacity ${showCursor ? 'opacity-100 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'opacity-0'}`}
          >
            █
          </span>
        </div>
      </div>
    </div>
  );
}
