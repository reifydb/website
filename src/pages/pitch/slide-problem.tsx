import type { PitchSlide } from './pitch-data';

export const slideProblem: PitchSlide = {
  id: 'problem',
  content: (
    <div className="flex justify-center">
      <pre className="font-mono text-[11px] sm:text-sm md:text-base p-6 sm:p-10 md:p-14 whitespace-pre leading-relaxed">
        <span className="text-text-muted">+----------------------------------------------------------------------------------------------+</span>
        {'\n'}
        <span className="text-primary">{'                                         THE PROBLEM                                           '}</span>
        {'\n'}
        <span className="text-text-muted">+----------------------------------------------------------------------------------------------+</span>
        {'\n\n'}
        <span className="text-text-secondary">{'     Software stacks still treat the database as a passive storage layer.'}</span>
        {'\n\n'}
        <span className="text-text-secondary">{'     But modern applications need something very different:'}</span>
        {'\n'}
        <span className="text-text-secondary">{'     a system that can continuously hold, derive, validate, test, and react to live state.'}</span>
        {'\n\n'}
        <span className="text-text-secondary">{'     Instead, teams are forced to assemble this from a patchwork of:'}</span>
        {'\n\n'}
        <span className="text-primary">{'              [ DB ]   [ CACHE ]   [ QUEUE ]   [ WORKERS ]   [ SEARCH ]   [ GLUE ]'}</span>
        {'\n\n'}
        <span className="text-text-secondary">{'     The result:'}</span>
        {'\n'}
        <span className="text-text-secondary">{'     - business logic scattered across the stack'}</span>
        {'\n'}
        <span className="text-text-secondary">{'     - derived state that drifts out of sync'}</span>
        {'\n'}
        <span className="text-text-secondary">{'     - fragile operational workflows'}</span>
        {'\n'}
        <span className="text-text-secondary">{'     - correctness enforced outside the data system'}</span>
        {'\n'}
        <span className="text-text-secondary">{'     - rising complexity with every new feature'}</span>
        {'\n\n'}
        <span className="text-text-secondary">{'     Databases became systems of record.'}</span>
        {'\n'}
        <span className="text-text-secondary">{'     But applications now need systems of live state.'}</span>
        {'\n\n'}
        <span className="text-text-muted">+----------------------------------------------------------------------------------------------+</span>
      </pre>
    </div>
  ),
};
