import type { ApiData } from '../../../client/types';
import type { CreateCompetitionCategory } from '../../../types';
import type { CompetitionCategory } from '../../../types/entities';
import type { CreateCompetitionCategoryResponse } from '../../../types/responses';
import { BaseResource } from '../../BaseResource';

export class UserCompetitionCategoryResource extends BaseResource {
	constructor(
		http: ConstructorParameters<typeof BaseResource>[0],
		private readonly prefix: string,
	) {
		super(http);
	}

	/** POST /user/competition/category/create */
	create(
		input: CreateCompetitionCategory,
	): Promise<ApiData<CreateCompetitionCategoryResponse>> {
		return this.doPost(`${this.prefix}/create`, input);
	}

	/** GET /user/competition/category/list/:slug */
	list(slug: string): Promise<ApiData<CompetitionCategory[]>> {
		return this.doGet(`${this.prefix}/list/${slug}`);
	}
}
