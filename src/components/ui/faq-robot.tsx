import { PixelIcon } from './pixel-icon';

const ROBOT = [
  '...a...',
  '...l...',
  '...l...',
  'lwwwwwl',
  'lwpwpwl',
  'lwwwwwl',
  'leeeeel',
  '.kk.kk.',
  '.kk.kk.',
];

const ROBOT_COLORS: Record<string, string> = {
  a: '#ffe08a',
  l: '#c9c3dc',
  w: '#ffffff',
  p: '#7e85f2',
  e: '#e6e4f5',
  k: '#3f3b99',
};

export function FaqRobot() {
  return <PixelIcon rows={ROBOT} colors={ROBOT_COLORS} className="h-9 w-7" />;
}
