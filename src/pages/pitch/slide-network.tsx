import type { PitchSlide } from './pitch-data';

export const slideNetwork: PitchSlide = {
  id: 'network',
  content: (
    <div className="flex justify-center">
      <pre className="font-mono text-[11px] sm:text-sm md:text-base p-4 sm:p-6 md:p-8 whitespace-pre leading-normal">
        <span className="text-text-muted">+======================================================================================================+</span>
        {'\n'}
        <span className="text-primary">{'                                            THE NETWORK GAP                                             '}</span>
        {'\n'}
        <span className="text-text-muted">+======================================================================================================+</span>
        {'\n\n'}
        <span className="text-text-secondary">{'                     The bottleneck is not just storage. It is round-trip coordination.'}</span>
        {'\n\n'}
        <span className="text-text-muted">{'+------------------------------------------------------+   +-------------------------------------------+'}</span>
        {'\n'}
        <span className="text-primary">{'                 GENERAL-PURPOSE STACK                 '}</span><span className="text-text-muted">{'     '}</span><span className="text-primary">{'               WHY IT BREAKS                '}</span>
        {'\n'}
        <span className="text-text-muted">{'+------------------------------------------------------+   +-------------------------------------------+'}</span>
        {'\n'}
        <span className="text-text-secondary">{'                                                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'                                            '}</span>
        {'\n'}
        <span className="text-text-secondary">{'  Business logic lives in the application.             '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  Every extra step across the network      '}</span>
        {'\n'}
        <span className="text-text-secondary">{'  State changes happen through repeated db calls.      '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  adds:                                    '}</span>
        {'\n'}
        <span className="text-text-secondary">{'                                                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'                                            '}</span>
        {'\n'}
        <span className="text-text-secondary">{'  read -> check -> validate -> write -> update         '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  • latency                                '}</span>
        {'\n'}
        <span className="text-text-secondary">{'                                                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  • lock duration                          '}</span>
        {'\n'}
        <span className="text-text-secondary">{'  One logical operation becomes a sequence of          '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  • contention                             '}</span>
        {'\n'}
        <span className="text-text-secondary">{'  network hops.                                        '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  • retry complexity                       '}</span>
        {'\n'}
        <span className="text-text-secondary">{'                                                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  • operational fragility                  '}</span>
        {'\n'}
        <span className="text-text-secondary">{'                                                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'                                            '}</span>
        {'\n'}
        <span className="text-text-muted">{'+------------------------------------------------------+   +-------------------------------------------+'}</span>
        {'\n\n'}
        <span className="text-primary">{'                                     TRADITIONAL HOT PATH'}</span>
        {'\n\n'}
        {'                  '}<span className="text-primary">{'[ APP ]'}</span><span className="text-text-muted">{' <----> '}</span><span className="text-primary">{'[ DB ]'}</span><span className="text-text-muted">{' <----> '}</span><span className="text-primary">{'[ APP ]'}</span><span className="text-text-muted">{' <----> '}</span><span className="text-primary">{'[ DB ]'}</span><span className="text-text-muted">{' <----> '}</span><span className="text-primary">{'[ APP ]'}</span>
        {'\n\n'}
        <span className="text-text-muted">+======================================================================================================+</span>
        {'\n'}
        <span className="text-primary">{'                                                REIFYDB                                                '}</span>
        {'\n'}
        <span className="text-text-muted">+======================================================================================================+</span>
        {'\n\n'}
        <span className="text-text-secondary">{'               Because the query language is fully scriptable, the full request can run'}</span>
        {'\n'}
        <span className="text-text-secondary">{'                               inside one ACID transaction at the data layer.'}</span>
        {'\n\n'}
        <span className="text-primary">{'                                       REIFYDB HOT PATH'}</span>
        {'\n\n'}
        {'                              '}<span className="text-primary">{'[ APP ]'}</span><span className="text-text-muted">{' ----------------------> '}</span><span className="text-primary">{'[ ONE ACID TX ]'}</span>
        {'\n\n'}
        <span className="text-text-muted">+======================================================================================================+</span>
        {'\n'}
        <span className="text-primary">{'           ReifyDB keeps hot-path coordination inside the transaction boundary, not across              '}</span>
        {'\n'}
        <span className="text-primary">{'                                               the network.                                             '}</span>
        {'\n'}
        <span className="text-text-muted">+======================================================================================================+</span>
      </pre>
    </div>
  ),
};
