import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme/vars.css';

export const panel = style({
	borderRadius: '1rem',
	border: `1px solid ${vars.color.border.default}`,
	background: vars.gradient.glassPanel,
	backdropFilter: 'blur(8px)',
	boxShadow: vars.shadow.lg,
});

export const interactivePanel = style([
	panel,
	{
		color: 'inherit',
		textDecoration: 'none',
		transition:
			'transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease',
		selectors: {
			'&:hover': {
				transform: 'translateY(-2px)',
				borderColor: vars.color.border.hover,
				boxShadow: vars.shadow.accent,
			},
		},
	},
]);
