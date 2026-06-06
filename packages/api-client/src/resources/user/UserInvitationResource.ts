import type { ApiData } from '../../client/types';
import type { InvitationCreate, InvitationDecideParams } from '../../types';
import type { Invitation } from '../../types/entities';
import type {
	CreateInvitationResponse,
	InvitationDecisionResponse,
} from '../../types/responses';
import { BaseResource } from '../BaseResource';

export class UserInvitationResource extends BaseResource {
	private readonly prefix = '/user/invitation';

	/** GET /user/invitation/to */
	listIncoming(): Promise<ApiData<Invitation[]>> {
		return this.doGet(`${this.prefix}/to`);
	}

	/** GET /user/invitation/from */
	listOutgoing(): Promise<ApiData<Invitation[]>> {
		return this.doGet(`${this.prefix}/from`);
	}

	/** POST /user/invitation */
	create(
		input: InvitationCreate,
	): Promise<ApiData<CreateInvitationResponse>> {
		return this.doPost(this.prefix, input);
	}

	/** POST /user/invitation/decide/:id */
	decide(
		input: InvitationDecideParams,
	): Promise<ApiData<InvitationDecisionResponse>> {
		return this.doPost(`${this.prefix}/decide/${input.id}`, {
			isAccepted: input.isAccepted,
		});
	}
}
