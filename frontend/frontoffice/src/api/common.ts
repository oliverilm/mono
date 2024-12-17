import {
	CreateCompetition,
	Search,
	SkipTake,
	ClubCreate,
	UpdateCompetition,
} from '@monorepo/utils';
import { addSkipTakeSearch, client } from './client';
import { AxiosResponse } from 'axios';

function getPublicClubs(
	query: SkipTake & Search,
): Promise<AxiosResponse<unknown[]>> {
	return client.get(addSkipTakeSearch('/public/clubs', query));
}

function createClub(data: ClubCreate) {
	return client.post('/user/club/create', data);
}

export const ClubAPI = {
	createClub,
	getPublicClubs,
	updateClub: () => {},
	getProfilesInClub: () => {},
	applyToClub: () => {},

	acceptApplicationToClub: () => {},
	declineApplicationToClub: () => {},

	createGhostProfileToClub: () => {},
	removeGhostProfileFromClub: () => {},
};

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
}

function getPublicCompetitions(
	query: SkipTake & Search,
): Promise<AxiosResponse<CompetitionListItem[]>> {
	return client.get(addSkipTakeSearch('/public/competitions', query));
}

function createCompetition(
	data: CreateCompetition,
): Promise<AxiosResponse<CompetitionListItem>> {
	return client.post('/user/competitions', data);
}

function updateCompetition(
	data: UpdateCompetition,
): Promise<AxiosResponse<CompetitionListItem>> {
	return client.patch(`/user/competitions`, data);
}

function getPrivateCompetitions(): Promise<
	AxiosResponse<CompetitionListItem[]>
> {
	return client.get('/user/competitions/private');
}

function getCompetition(competitionSlug?: string) {
	if (!competitionSlug) return Promise.resolve(null);
	return client.get(`/public/competitions/${competitionSlug}`);
}

function getCompetitionMetadata(
	competitionSlug?: string,
): Promise<AxiosResponse<CompetitionMetadata> | null> {
	if (!competitionSlug) return Promise.resolve(null);
	return client.get(`/public/competitions/${competitionSlug}/metadata`);
}

export const CompetitionAPI = {
	getPublicCompetitions,
	createCompetition,
	updateCompetition,
	getPrivateCompetitions,
	getCompetition,
	getCompetitionMetadata,

	createCompetitor: () => {},
};

function getPublicCamps(query: SkipTake & Search) {
	return client.get(addSkipTakeSearch('/public/camps', query));
}

export const CampsAPI = {
	getPublicCamps,
	createCamp: () => {},
	updateCamp: () => {},
	getCamp: () => {},
};
