/* eslint-disable @typescript-eslint/no-namespace */
import type { ClubCreate, CreateMember } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../../client';
import type { Profile } from '../../utils/common-types';

export namespace UserClub {
	export function createClub(data: ClubCreate) {
		return client.post('/user/club/create', data);
	}

	export function getClubMembers(
		slug?: string,
	): Promise<AxiosResponse<Profile[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/user/club/${slug}/members`);
	}

	export function getClubCompetitions(slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.get(`/user/club/${slug}/competitions`);
	}

	export function createMember(data: CreateMember, slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.post(`/user/club/members/${slug}`, data);
	}

	export function updateClub() {
		throw new Error('Method not implemented.');
	}

	export function getProfilesInClub() {
		throw new Error('Method not implemented.');
	}

	export function applyToClub() {
		throw new Error('Method not implemented.');
	}

	export function acceptApplicationToClub() {
		throw new Error('Method not implemented.');
	}

	export function declineApplicationToClub() {
		throw new Error('Method not implemented.');
	}

	export function createGhostProfileToClub() {
		throw new Error('Method not implemented.');
	}

	export function removeGhostProfileFromClub() {
		throw new Error('Method not implemented.');
	}
}
