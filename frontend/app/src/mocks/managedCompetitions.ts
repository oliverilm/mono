import type { CompetitionRole } from '@monorepo/api-client';

/** Competition the current user can manage (owner or admin). */
export type ManagedCompetition = {
	id: string;
	name: string;
	slug: string;
	clubName: string | null;
	location: string | null;
	startingAt: string | null;
	registrationEndAt: string | null;
	description: string | null;
	isPublished: boolean;
	isArchived: boolean;
	role: CompetitionRole;
};

export const MOCK_MANAGED_COMPETITIONS: ManagedCompetition[] = [
	{
		id: 'cmp-1',
		name: 'Spring National Open 2026',
		slug: 'spring-national-open-2026',
		clubName: 'Tokyo Judo Club',
		location: 'Osaka, Japan',
		startingAt: '2026-04-12T09:00:00.000Z',
		registrationEndAt: '2026-04-01T23:59:00.000Z',
		description:
			'National-level open tournament featuring senior and junior divisions across all weight classes.',
		isPublished: true,
		isArchived: false,
		role: 'OWNER',
	},
	{
		id: 'cmp-2',
		name: 'Regional Youth Championships',
		slug: 'regional-youth-championships',
		clubName: 'Budokan Academy',
		location: 'Lyon, France',
		startingAt: '2026-05-03T08:30:00.000Z',
		registrationEndAt: '2026-04-20T23:59:00.000Z',
		description:
			'Youth-focused regional event with U15 and U18 categories.',
		isPublished: false,
		isArchived: false,
		role: 'OWNER',
	},
	{
		id: 'cmp-3',
		name: 'Summer Invitational',
		slug: 'summer-invitational',
		clubName: 'Ippon Dojo',
		location: 'Berlin, Germany',
		startingAt: '2026-07-19T10:00:00.000Z',
		registrationEndAt: '2026-07-05T23:59:00.000Z',
		description:
			'Invitation-only summer tournament for club teams and invited athletes.',
		isPublished: true,
		isArchived: false,
		role: 'MANAGER',
	},
];
