import type { PitchSlide } from './pitch-data';

export const slideSecurity: PitchSlide = {
  id: 'security',
  content: (
    <div className="flex justify-center">
      <pre className="font-mono text-[11px] sm:text-sm md:text-base p-6 sm:p-10 md:p-14 whitespace-pre leading-relaxed">
        <span className="text-text-muted">+======================================================================================================+</span>
        {'\n'}
        <span className="text-primary">{'                                         THE SECURITY GAP                                            '}</span>
        {'\n'}
        <span className="text-text-secondary">{"                        Application user != database user in today's stack                           "}</span>
        {'\n'}
        <span className="text-text-muted">+======================================================================================================+</span>
        {'\n\n'}
        <span className="text-text-secondary">{'     End users talk to the app. The app talks to the database using shared service credentials.'}</span>
        {'\n\n'}
        <span className="text-text-secondary">{'     The database sees  '}</span>
        <span className="text-primary">{'[ app_service ]'}</span>
        <span className="text-text-secondary">{'  instead of  '}</span>
        <span className="text-primary">{'[ actual end user ]'}</span>
        {'\n\n'}
        <span className="text-text-secondary">{'     This forces teams to rebuild identity, policy, and access control outside the data layer:'}</span>
        {'\n\n'}
        <span className="text-text-muted">{'+------------------------------------------------------+   +-------------------------------------------+'}</span>
        {'\n'}
        <span className="text-primary">{'                     CONSEQUENCES                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-primary">{'              ECONOMIC IMPACT                '}</span>
        {'\n'}
        <span className="text-text-muted">{'+------------------------------------------------------+   +-------------------------------------------+'}</span>
        {'\n'}
        <span className="text-text-secondary">{'                                                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'                                            '}</span>
        {'\n'}
        <span className="text-text-secondary">{'  • SQL injection becomes possible when unsafe         '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  Security incidents are expensive:          '}</span>
        {'\n'}
        <span className="text-text-secondary">{'    query construction slips through                   '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  direct losses, downtime, legal risk,      '}</span>
        {'\n'}
        <span className="text-text-secondary">{'                                                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  incident response, and reputational       '}</span>
        {'\n'}
        <span className="text-text-secondary">{'  • Authorization logic is duplicated outside          '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  damage                                    '}</span>
        {'\n'}
        <span className="text-text-secondary">{'    the database                                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'                                            '}</span>
        {'\n'}
        <span className="text-text-secondary">{'                                                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  Even without a breach, teams pay an       '}</span>
        {'\n'}
        <span className="text-text-secondary">{'  • Security depends on every middleware layer         '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  ongoing tax in middleware, reviews,       '}</span>
        {'\n'}
        <span className="text-text-secondary">{'    behaving correctly                                 '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'  audits, and defensive engineering.        '}</span>
        {'\n'}
        <span className="text-text-secondary">{'                                                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'                                            '}</span>
        {'\n'}
        <span className="text-text-secondary">{'  • More glue code means more places to get            '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'                                            '}</span>
        {'\n'}
        <span className="text-text-secondary">{'    identity and access control wrong                  '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'                                            '}</span>
        {'\n'}
        <span className="text-text-secondary">{'                                                       '}</span><span className="text-text-muted">{'     '}</span><span className="text-text-secondary">{'                                            '}</span>
        {'\n'}
        <span className="text-text-muted">{'+------------------------------------------------------+   +-------------------------------------------+'}</span>
        {'\n\n'}
        <span className="text-text-secondary">{'     Every translation layer is another failure point. Every failure point has a price.'}</span>
        {'\n\n'}
        <span className="text-text-muted">+======================================================================================================+</span>
        {'\n'}
        <span className="text-primary">{'  The farther application identity is from database identity, the larger the security layer becomes.  '}</span>
        {'\n'}
        <span className="text-text-muted">+======================================================================================================+</span>
      </pre>
    </div>
  ),
};
