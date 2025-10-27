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
	export function getMyInvitations(): Promise<AxiosResponse<Invitation[]>> {
		return client.get('/user/invitation/to');
	}

	export function getCreatedInvitations(): Promise<AxiosResponse<unknown>> {
		return client.get('/user/invitation/from');
	}

	export function createInvitation(
		data: InvitationCreate,
	): Promise<AxiosResponse<unknown>> {
		return client.post('/user/invitation', data);
	}

	export function decideInvitation(
		data: InvitationQueryParam & InvitationDecide,
	): Promise<AxiosResponse<unknown>> {
		return client.post(`/user/invitation/decide/${data.id}`, {
			isAccepted: data.isAccepted,
		});
	}
}
