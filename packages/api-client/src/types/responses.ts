import type {
	Club,
	Competition,
	CompetitionAdmin,
	CompetitionCategory,
	CompetitionLink,
	Competitor,
	Invitation,
	User,
	UserProfile,
} from './entities';

export type AuthenticationResponse = {
	profile: UserProfile;
	token: string;
};

export type ClubMetadataAdmin = {
	firstName: string | null;
	lastName: string | null;
	email: string;
	role: string;
	userId: string;
};

export type ClubMetadataResponse = {
	isAdmin: boolean;
	admins: ClubMetadataAdmin[];
};

export type CompetitionMetadataAdmin = {
	id: number;
	userId: string;
	email: string;
	role: string;
};

export type CompetitionMetadataResponse = {
	competitionAdmins: CompetitionMetadataAdmin[];
	competitionLinks: Pick<CompetitionLink, 'id' | 'url' | 'label'>[];
};

export type PublicCompetitorListItem = {
	id: number;
	firstName: string;
	lastName: string;
	clubName: string | null;
	competitionCategoryId: number;
	weight: string;
};

export type PaginatedMetadata = {
	count: number;
};

export type PublicCompetitorsResponse = {
	competitors: PublicCompetitorListItem[];
	metadata: PaginatedMetadata;
};

export type UserMetadataResponse = {
	competitionCount: number;
	upcomingCompetitionCount: number;
};

export type UserSearchByEmailResponse = {
	id: string;
	email: string;
	userProfile: {
		firstName: string | null;
		lastName: string | null;
		club: {
			name: string;
		} | null;
	};
};

export type UserSearchByNationalIdResponse = {
	id: string;
	userId: string | null;
	nationalId: string;
	firstName: string;
	lastName: string;
	club: {
		id: string;
		name: string;
	};
	dateOfBirth: string;
	nationalIdType: string;
	sex: string;
};

export type PrivateCompetitorParticipation = {
	id: number;
	weight: string;
	seed: number;
	competitionCategory: {
		id: number;
		competitionName: string;
	};
};

export type PrivateCompetitor = UserProfile & {
	participations: PrivateCompetitorParticipation[];
};

export type CompetitorExportRow = Competitor & {
	competitionCategory: string;
	competitionCategoryValue: string;
};

export type InvitationDecisionResponse = {
	isAccepted: boolean;
};

export type AdminCrudModel =
	| 'user'
	| 'userProfile'
	| 'club'
	| 'competition'
	| 'competitionAdmin'
	| 'clubAdmin'
	| 'competitor'
	| 'invitation'
	| 'category'
	| 'competitionCategory'
	| 'competitionLink';

export type AdminUserCrudModel = 'user' | 'userProfile';

export type AdminCrudModelsResponse = {
	models: AdminCrudModel[];
};

export type AdminCrudFormColumn = {
	name: string;
	typeName?: string;
	type?: string;
};

export type AdminCrudFormResponse = {
	form: {
		columns: AdminCrudFormColumn[];
	};
};

export type AdminImpersonateResponse = string;

export type CreateClubResponse = Club | null;

export type CreateCompetitorResponse = Competitor | null;

export type CreateCompetitionAdminResponse = CompetitionAdmin;

export type CreateCompetitionCategoryResponse = CompetitionCategory;

export type CreateCompetitionLinkResponse = CompetitionLink;

export type CreateCompetitionResponse = Competition;

export type UpdateCompetitionResponse = Competition;

export type DeleteCompetitorResponse = {
	id: number;
};

export type CreateInvitationResponse = Invitation;

export type RegisterResponse = AuthenticationResponse | undefined;

export type AdminUserListResponse = User[];

export type AdminCrudListResponse = Record<string, unknown>[];

export type AdminCrudItemResponse = Record<string, unknown> | null;

export type AdminUserCrudListResponse = User[] | UserProfile[];

export type AdminUserCrudItemResponse = User | UserProfile | null;
