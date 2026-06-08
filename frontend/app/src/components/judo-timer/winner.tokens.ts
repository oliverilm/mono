import { font, radius, space } from './judoTimer.tokens';

/** Display sizes for the winner announcement overlay. */
export const winnerFont = {
	flag: 'clamp(3.5rem, 10vw, 5.5rem)',
	name: 'clamp(1.75rem, 5vw, 2.75rem)',
	title: 'clamp(1rem, 2.5vw, 1.25rem)',
} as const;

export const winnerSpace = {
	cardPadding: 'clamp(2rem, 5vw, 3rem)',
	cardMaxWidth: '42rem',
} as const;

export { font, radius, space };
