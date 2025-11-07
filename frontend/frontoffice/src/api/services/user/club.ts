/* eslint-disable @typescript-eslint/no-namespace */
import type { ClubCreate, CreateMember } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../../client';
import type { Profile } from '../../utils/common-types';

export namespace UserClub {
	/**
	 * Create a new club
	 * @param data - Club creation data
	 * @returns Promise resolving to the created club
	 * @route POST /user/club/create
	 */
	export function createClub(data: ClubCreate) {
		return client.post('/user/club/create', data);
	}

	/**
	 * Get club members by slug
	 * @param slug - Club slug identifier
	 * @returns Promise resolving to an array of profiles or null if slug is not provided
	 * @route GET /user/club/:slug/members
	 */
	export function getClubMembers(
		slug?: string,
	): Promise<AxiosResponse<Profile[]> | null> {
		if (!slug) return Promise.resolve(null);
		return client.get(`/user/club/${slug}/members`);
	}

	/**
	 * Get club competitions by slug
	 * @param slug - Club slug identifier
	 * @returns Promise resolving to club competitions or null if slug is not provided
	 * @route GET /user/club/:slug/competitions
	 */
	export function getClubCompetitions(slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.get(`/user/club/${slug}/competitions`);
	}

	/**
	 * Create a member in a club
	 * @param data - Member creation data
	 * @param slug - Club slug identifier
	 * @returns Promise resolving to the created member or null if slug is not provided
	 * @route POST /user/club/members/:slug
	 */
	export function createMember(data: CreateMember, slug?: string) {
		if (!slug) return Promise.resolve(null);
		return client.post(`/user/club/members/${slug}`, data);
	}

	/**
	 * Update a club
	 * @throws Error - Method not implemented
	 */
	export function updateClub() {
		throw new Error('Method not implemented.');
	}

	/**
	 * Get profiles in a club
	 * @throws Error - Method not implemented
	 */
	export function getProfilesInClub() {
		throw new Error('Method not implemented.');
	}

	/**
	 * Apply to join a club
	 * @throws Error - Method not implemented
	 */
	export function applyToClub() {
		throw new Error('Method not implemented.');
	}

	/**
	 * Accept an application to join a club
	 * @throws Error - Method not implemented
	 */
	export function acceptApplicationToClub() {
		throw new Error('Method not implemented.');
	}

	/**
	 * Decline an application to join a club
	 * @throws Error - Method not implemented
	 */
	export function declineApplicationToClub() {
		throw new Error('Method not implemented.');
	}

	/**
	 * Create a ghost profile in a club
	 * @throws Error - Method not implemented
	 */
	export function createGhostProfileToClub() {
		throw new Error('Method not implemented.');
	}

	/**
	 * Remove a ghost profile from a club
	 * @throws Error - Method not implemented
	 */
	export function removeGhostProfileFromClub() {
		throw new Error('Method not implemented.');
	}
}
