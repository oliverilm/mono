import { globalStyle, style } from '@vanilla-extract/css';

export const linkCardPaper = style({
	transitionDuration: '200ms',
	border: '1px solid transparent',

	cursor: 'pointer',
});

globalStyle(`${linkCardPaper}:hover`, {
	transitionDuration: '200ms',
	border: '1px solid var(--mantine-color-gray-2)',
	inset: '1px',
});
