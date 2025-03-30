import type { ClubCreate, CreateMember } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../../client';
import { Profile } from '../../utils/common-types';

export class UserClub {
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
