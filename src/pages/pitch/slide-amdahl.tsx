import { AmdahlSimulator } from '@/components/amdahl';
import type { PitchSlide } from './pitch-data';

export const slideAmdahl: PitchSlide = {
  id: 'amdahl',
  content: <AmdahlSimulator />,
};
