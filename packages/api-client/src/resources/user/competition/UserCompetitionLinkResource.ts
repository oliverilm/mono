import type { ApiData } from '../../../client/types';
import type { CreateCompetitionLink } from '../../../types';
import type { CreateCompetitionLinkResponse } from '../../../types/responses';
import { BaseResource } from '../../BaseResource';

export class UserCompetitionLinkResource extends BaseResource {
	constructor(
		http: ConstructorParameters<typeof BaseResource>[0],
		private readonly prefix: string,
	) {
		super(http);
	}

	/** POST /user/competition/link/create */
	create(
		input: CreateCompetitionLink,
	): Promise<ApiData<CreateCompetitionLinkResponse>> {
		return this.doPost(`${this.prefix}/create`, input);
	}
}
