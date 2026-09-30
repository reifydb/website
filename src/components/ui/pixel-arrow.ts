export const RIGHT_ARROW = ['x...', 'xx..', 'xxx.', 'xxxx', 'xxx.', 'xx..', 'x...'];
export const LEFT_ARROW = RIGHT_ARROW.map((row) => [...row].reverse().join(''));
export const ARROW_COLORS = { x: 'currentColor' };
