import type { IconName } from '@monorepo/icons';

export const TOKEN_KEY = 'ippon-token';

export const TOURNAMENT_APPS = [
	{
		slug: 'weigh-in',
		name: 'Weigh In',
		description:
			'Register competitors and verify weight classes before competition.',
		icon: 'users',
	},
	{
		slug: 'judo-timer',
		name: 'Judo Timer',
		description: 'Run tatami timers, osaekomi counts, and match transitions.',
		icon: 'timer',
	},
	{
		slug: 'matches-board',
		name: 'Matches Board',
		description:
			'Display upcoming bouts on a live scoreboard for athletes and coaches.',
		icon: 'grid',
	},
	{
		slug: 'tournament-admin',
		name: 'Tournament Admin',
		description: 'Manage brackets, categories, and competition settings.',
		icon: 'settings',
	},
] as const satisfies readonly {
	slug: string;
	name: string;
	description: string;
	icon: IconName;
}[];

export type TournamentApp = (typeof TOURNAMENT_APPS)[number];

export type AppSlug = TournamentApp['slug'];
