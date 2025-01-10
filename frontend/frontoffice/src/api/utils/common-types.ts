export interface CompetitionListItem {
	id: string;
	name: string;
	slug: string;
	clubName: string;
	isPublished: boolean;
	isArchived: boolean;
	description: string;
	startingAt: Date;
	location: string;
	registrationEndAt: string;
	additionalInfo: JSON;
	createdAt: string;
	updatedAt: string;
}

export interface CompetitionMetadata {
	competitionAdmins: {
		id: number;
		userId: string;
		email: string;
		role: string;
	}[];
	competitionLinks: {
		id: number;
		url: string;
		label: string;
	}[];
}

export interface CompetitionCategory {
	id: number;
	weights: string[];
	largestYearAllowed: number;
	smallestYearAllowed: number;
	sex: string;
	competitionId: string;
	competitionName: string;
	competitionSlug: string;
	categoryId: number;
	categoryName: string;
}

export interface PrivateCompetitor {
	id: string;
	firstName: string;
	lastName: string;
	sex: string;
	dateOfBirth: string;
	participations: {
		id: number;
		weight: string;
		seed: number;
		competitionCategory: {
			id: string;
			competitionName: string;
		};
	}[];
}

export interface Competitor {
	id: number;
	clubName: string;
	profileId: string;
	firstName: string;
	lastName: string;
	competitionCategoryId: number;
	competitionId: string;
	competitionName: string;
	competitionSlug: string;
	weight: string;
	seed: number;
	createdAt: string;
	updatedAt: string;
}
export interface Metadata {
	count: number;
}

export interface CompetitorResponse {
	competitors: Competitor[];
	metadata: Metadata;
}

export interface CreateCompetitorResponse {
	competitionCategoryId: number;
	competitionId: string;
	competitorId: string;
	weight: string;
	seed: number;
}

export interface Category {
	id: number;
	value: string;
}

export interface Club {
	id: string;
	name: string;
	slug: string;
}

export interface ClubMetadataAdmin {
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	userId: string;
}

export interface ClubMetadata {
	isAdmin: boolean;
	admins: ClubMetadataAdmin[];
}
