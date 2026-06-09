import type { ApiData } from '../../../client/types';
import type { CompetitionAdmin, CreateCompetitionAdmin } from '../../../types';
import type { CreateCompetitionAdminResponse } from '../../../types/responses';
import { BaseResource } from '../../BaseResource';

export class UserCompetitionAdminResource extends BaseResource {
	constructor(
		http: ConstructorParameters<typeof BaseResource>[0],
		private readonly prefix: string,
	) {
		super(http);
	}

	/** POST /user/competition/admin/ */
	create(
		input: CreateCompetitionAdmin,
	): Promise<ApiData<CreateCompetitionAdminResponse>> {
		return this.doPost(`${this.prefix}/`, input);
	}

	/** GET /user/competition/admin/ */
	list(): Promise<ApiData<CompetitionAdmin[]>> {
		return this.doGet(`${this.prefix}/`);
	}
}
