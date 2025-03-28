import type {
	ClubCreate,
	CreateMember,
	Search,
	SkipTake,
} from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { addSkipTakeSearch, client } from '../client';
import type { Club, ClubMetadata, Profile } from '../utils/common-types';

export class ClubAPI {
	static getClub(slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/clubs/get-by-slug/${slug}`);
	}

	static createClub(data: ClubCreate) {
		return client.post('/user/club/create', data);
	}

	static getClubMembers(
		slug?: string,
	): Promise<AxiosResponse<Profile[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/user/club/${slug}/members`);
	}

	static createMember(data: CreateMember, slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.post(`/user/club/${slug}/members`, data);
	}

	static getPublicClubs(
		query: SkipTake & Search,
	): Promise<AxiosResponse<Club[]>> {
		return client.get(addSkipTakeSearch('/public/clubs', query));
	}

	static getClubById(id?: string | null): Promise<AxiosResponse<Club> | null> {
		if (!id) return Promise.resolve(null);
		return client.get(`/public/clubs/get-by-id/${id}`);
	}

	static getClubMetadata(
		slug?: string,
	): Promise<AxiosResponse<ClubMetadata> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/public/clubs/${slug}/metadata`);
	}

	static updateClub() {
		throw new Error('Method not implemented.');
	}

	static getProfilesInClub() {
		throw new Error('Method not implemented.');
	}

	static applyToClub() {
		throw new Error('Method not implemented.');
	}

	static acceptApplicationToClub() {
		throw new Error('Method not implemented.');
	}

	static declineApplicationToClub() {
		throw new Error('Method not implemented.');
	}

	static createGhostProfileToClub() {
		throw new Error('Method not implemented.');
	}

	static removeGhostProfileFromClub() {
		throw new Error('Method not implemented.');
	}
}
