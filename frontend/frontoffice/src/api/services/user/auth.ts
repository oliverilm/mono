/* eslint-disable @typescript-eslint/no-namespace */
import type { UserPatch } from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { addSkipTakeSearch, client } from '../../client';
import type { NationalIdSearchResult, Profile } from '../../utils/common-types';

export interface UserSearchResult {
	email: string;
	id: string;
	userProfile: {
		firstName: string | null;
		lastName: string | null;
		club: {
			name: string;
		};
	};
}

export namespace UserAuth {
	/**
	 * Get user by national ID
	 * @param nationalId - National ID to search for
	 * @returns Promise resolving to the user search result or null
	 * @route GET /user/user-by-national-id
	 */
	export function getUserByNationalId(
		nationalId: string,
	): Promise<AxiosResponse<NationalIdSearchResult | null>> {
		return client.get(`/user/user-by-national-id?search=${nationalId}`);
	}

	/**
	 * Get user by email address
	 * @param email - Email address to search for
	 * @returns Promise resolving to the user search result
	 * @route GET /user/user-by-email
	 */
	export function getUserByEmail(
		email: string,
	): Promise<AxiosResponse<UserSearchResult>> {
		return client.get(
			addSkipTakeSearch('/user/user-by-email', {
				skip: 0,
				take: 10,
				search: email,
			}),
		);
	}

	/**
	 * Update user profile
	 * @param data - User patch data
	 * @returns Promise resolving to the updated profile
	 * @route PATCH /user/profile
	 */
	export function updateUser(data: UserPatch): Promise<AxiosResponse<Profile>> {
		return client.patch('/user/profile', data);
	}

	/**
	 * Get current user profile
	 * @returns Promise resolving to the user profile
	 * @route GET /user/profile
	 */
	export function getProfile(): Promise<AxiosResponse<Profile>> {
		return client.get('/user/profile');
	}
}
