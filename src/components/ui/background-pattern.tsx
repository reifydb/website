export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-[-10%] left-[15%] w-[700px] h-[700px] bg-primary/15 rounded-full animate-float animate-glow-breathe" />
      <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-accent-warm/12 rounded-full animate-float-delayed animate-glow-breathe" />
      <div className="absolute bottom-[-10%] left-[40%] w-[600px] h-[600px] bg-feature-blue/10 rounded-full animate-float" style={{ animationDelay: '10s' }} />

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg-primary to-transparent" />
    </div>
  );
}
