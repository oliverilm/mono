import { globalStyle, style } from '@vanilla-extract/css';

export const linkCardPaper = style({
	transitionDuration: '200ms',
	cursor: 'pointer',
});

globalStyle(`${linkCardPaper}:hover`, {
	transitionDuration: '200ms',
	boxShadow: '3px 3px 3px 3px var(--mantine-color-dark-1)',
});
