import type {
	InvitationDecide,
	InvitationQueryParam,
} from '@monorepo/utils';

export type {
	ClubCreate,
	CreateCompetition,
	CreateCompetitionAdmin,
	CreateCompetitionCategory,
	CreateCompetitionLink,
	CreateCompetitor,
	CreateMember,
	DeleteCompetitor,
	InvitationCreate,
	InvitationDecide,
	InvitationQueryParam,
	LoginCredentials,
	Search,
	SkipTake,
	UpdateCompetition,
	UserIdObject,
	UserPatch,
} from '@monorepo/utils';

export type { Slug } from '@monorepo/utils';

export type IdParam = {
	id: string;
};

export type SlugParam = {
	slug: string;
};

export type InvitationDecideParams = InvitationQueryParam & InvitationDecide;
