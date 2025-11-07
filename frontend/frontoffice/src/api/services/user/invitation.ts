/* eslint-disable @typescript-eslint/no-namespace */
import type {
	InvitationCreate,
	InvitationDecide,
	InvitationQueryParam,
} from '@monorepo/utils';
import type { AxiosResponse } from 'axios';
import { client } from '../../client';
import type { Invitation } from '../../utils/common-types';

export namespace UserInvitation {
	/**
	 * Get invitations sent to the current user
	 * @returns Promise resolving to an array of invitations
	 * @route GET /user/invitation/to
	 */
	export function getMyInvitations(): Promise<AxiosResponse<Invitation[]>> {
		return client.get('/user/invitation/to');
	}

	/**
	 * Get invitations created by the current user
	 * @returns Promise resolving to an array of created invitations
	 * @route GET /user/invitation/from
	 */
	export function getCreatedInvitations(): Promise<AxiosResponse<unknown>> {
		return client.get('/user/invitation/from');
	}

	/**
	 * Create a new invitation
	 * @param data - Invitation creation data
	 * @returns Promise resolving to the created invitation
	 * @route POST /user/invitation
	 */
	export function createInvitation(
		data: InvitationCreate,
	): Promise<AxiosResponse<unknown>> {
		return client.post('/user/invitation', data);
	}

	/**
	 * Decide on an invitation (accept or decline)
	 * @param data - Invitation decision data containing id and isAccepted
	 * @returns Promise resolving to the decision result
	 * @route POST /user/invitation/decide/:id
	 */
	export function decideInvitation(
		data: InvitationQueryParam & InvitationDecide,
	): Promise<AxiosResponse<unknown>> {
		return client.post(`/user/invitation/decide/${data.id}`, {
			isAccepted: data.isAccepted,
		});
	}
}
