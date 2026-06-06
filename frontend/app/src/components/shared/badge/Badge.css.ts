import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme/vars.css';

const badgeBase = {
	display: 'inline-flex',
	alignItems: 'center',
	padding: '0.2rem 0.55rem',
	borderRadius: '999px',
	fontSize: '0.6875rem',
	fontWeight: 700,
	letterSpacing: '0.04em',
	textTransform: 'uppercase' as const,
};

export const role = style({
	...badgeBase,
	backgroundColor: vars.color.badge.role.background,
	border: `1px solid ${vars.color.badge.role.border}`,
	color: vars.color.badge.role.text,
});

export const draft = style({
	...badgeBase,
	backgroundColor: vars.color.badge.draft.background,
	border: `1px solid ${vars.color.badge.draft.border}`,
	color: vars.color.badge.draft.text,
});

export const published = style({
	...badgeBase,
	backgroundColor: vars.color.badge.published.background,
	border: `1px solid ${vars.color.badge.published.border}`,
	color: vars.color.badge.published.text,
});

export const archived = style({
	...badgeBase,
	backgroundColor: vars.color.badge.archived.background,
	border: `1px solid ${vars.color.badge.archived.border}`,
	color: vars.color.badge.archived.text,
});

export const group = style({
	display: 'flex',
	flexWrap: 'wrap',
	gap: '0.5rem',
});
