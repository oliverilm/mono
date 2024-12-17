import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
	position: 'relative',
});

export const overlay = style({
	position: 'absolute',
	bottom: '0',
	left: '0',
	right: '0',
	height: '100%',
	padding: '1rem',
	zIndex: '1',
	display: 'flex',
	color: 'white',
	alignItems: 'end',
	justifyContent: 'space-between',
});
export const overlayVariants = styleVariants({
	bottom: {
		background: `linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8))`,
	},
	top: {
		background: `linear-gradient(to top, transparent, rgba(0, 0, 0, 0.8))`,
	},
	left: {
		background: `linear-gradient(to left, transparent, rgba(0, 0, 0, 0.8))`,
	},
	right: {
		background: `linear-gradient(to right, transparent, rgba(0, 0, 0, 0.8))`,
	},
});
