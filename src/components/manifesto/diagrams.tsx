import { stackReify, stackToday } from './data';

const ARROW = '\n\n        |\n        v\n\n';

export function StackDiagram() {
  return (
    <div className="glass-card p-6 sm:p-12 flex justify-center">
      <pre className="font-mono text-xs sm:text-base leading-relaxed text-left">
        <span className="block text-xs label-uppercase text-text-muted mb-4">Today</span>
        <span className="text-text-secondary">{stackToday}</span>
        {'\n\n'}
        <span className="text-text-muted">five systems, one state</span>
        {ARROW}
        <span className="block text-xs label-uppercase text-primary mb-4">With ReifyDB</span>
        <span className="text-text-primary">{stackReify}</span>
        {'\n\n'}
        <span className="text-primary">one system, one transaction</span>
      </pre>
    </div>
  );
}
