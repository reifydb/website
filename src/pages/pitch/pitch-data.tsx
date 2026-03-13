import type { ReactNode } from 'react';

import { slideCover } from './slide-cover';
import { slideProblem } from './slide-problem';
import { slideAmdahl } from './slide-amdahl';
import { slideNetwork } from './slide-network';
import { slideSecurity } from './slide-security';

export interface PitchSlide {
  id: string;
  content: ReactNode;
}

export const pitchSlides: PitchSlide[] = [slideCover, slideProblem, slideSecurity, slideNetwork, slideAmdahl];
