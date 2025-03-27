import type {
	ClubCreate,
	CreateMember,
	Search,
	SkipTake,
} from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import type { Profile } from './auth';
import { addSkipTakeSearch, client } from './client';
import type { Club, ClubMetadata } from './utils/common-types';

function getPublicClubs(
	query: SkipTake & Search,
): Promise<AxiosResponse<Club[]>> {
	return client.get(addSkipTakeSearch('/public/clubs', query));
}

function createClub(data: ClubCreate) {
	return client.post('/user/club/create', data);
}

function getClub(slug?: string) {
	if (!slug) return Promise.resolve(null);
	return client.get(`/public/clubs/get-by-slug/${slug}`);
}

export const ClubAPI = {
	getClub,
	createClub,
	getClubMembers: (slug?: string): Promise<AxiosResponse<Profile[]> | null> => {
		if (!slug) return Promise.resolve(null);
		return client.get(`/user/club/${slug}/members`);
	},
	createMember: (data: CreateMember, slug?: string) => {
		if (!slug) return Promise.resolve(null);
		return client.post(`/user/club/${slug}/members`, data);
	},
	getPublicClubs,
	getClubById: (id?: string | null): Promise<AxiosResponse<Club> | null> => {
		if (!id) return Promise.resolve(null);
		return client.get(`/public/clubs/get-by-id/${id}`);
	},
	getClubMetadata: (
		slug?: string,
	): Promise<AxiosResponse<ClubMetadata> | null> => {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/clubs/${slug}/metadata`);
	},
	updateClub: () => {},
	getProfilesInClub: () => {},
	applyToClub: () => {},

	acceptApplicationToClub: () => {},
	declineApplicationToClub: () => {},

	createGhostProfileToClub: () => {},
	removeGhostProfileFromClub: () => {},
};
