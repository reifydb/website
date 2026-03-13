import type { PitchSlide } from './pitch-data';

export const slideCover: PitchSlide = {
  id: 'cover',
  content: (
    <div className="flex justify-center">
      <pre className="font-mono text-[11px] sm:text-sm md:text-base p-6 sm:p-10 md:p-14 whitespace-pre leading-relaxed">
        <span className="text-text-muted">+----------------------------------------------------------------------------------------------+</span>
        {'\n'}
        {'                                                                                              '}
        {'\n'}
        {'                                                                                              '}
        {'\n'}
        {'                                                                                              '}
        {'\n'}
        <span className="text-primary">{'                                          ReifyDB                                             '}</span>
        {'\n'}
        {'                                                                                              '}
        {'\n'}
        <span className="text-text-secondary">{'                                   The Live State Database                                    '}</span>
        {'\n'}
        {'                                                                                              '}
        {'\n'}
        {'                                                                                              '}
        {'\n'}
        {'                                                                                              '}
        {'\n'}
        <span className="text-text-muted">+----------------------------------------------------------------------------------------------+</span>
      </pre>
    </div>
  ),
};
