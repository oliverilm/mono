import type { ApiData } from '../../../client/types';
import type { CreateCompetitor, DeleteCompetitor } from '../../../types';
import type {
	CreateCompetitorResponse,
	DeleteCompetitorResponse,
	PrivateCompetitor,
} from '../../../types/responses';
import { BaseResource } from '../../BaseResource';

export class UserCompetitionCompetitorResource extends BaseResource {
	constructor(
		http: ConstructorParameters<typeof BaseResource>[0],
		private readonly prefix: string,
	) {
		super(http);
	}

	/** POST /user/competition/competitor/create */
	create(
		input: CreateCompetitor,
	): Promise<ApiData<CreateCompetitorResponse>> {
		return this.doPost(`${this.prefix}/create`, input);
	}

	/** GET /user/competition/competitor/get-personal/:slug */
	listPersonal(slug: string): Promise<ApiData<PrivateCompetitor[]>> {
		return this.doGet(`${this.prefix}/get-personal/${slug}`);
	}

	/** POST /user/competition/competitor/delete */
	delete(
		input: DeleteCompetitor,
	): Promise<ApiData<DeleteCompetitorResponse>> {
		return this.doPost(`${this.prefix}/delete`, input);
	}
}
