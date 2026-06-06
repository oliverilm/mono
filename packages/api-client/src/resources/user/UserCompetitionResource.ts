import type { HttpTransport } from '../../client/HttpTransport';
import type { ApiData } from '../../client/types';
import type {
	CreateCompetition,
	UpdateCompetition,
} from '../../types';
import type { Competition } from '../../types/entities';
import type {
	CompetitorExportRow,
	CreateCompetitionResponse,
	UpdateCompetitionResponse,
} from '../../types/responses';
import { BaseResource } from '../BaseResource';
import { UserCompetitionAdminResource } from './competition/UserCompetitionAdminResource';
import { UserCompetitionCategoryResource } from './competition/UserCompetitionCategoryResource';
import { UserCompetitionCompetitorResource } from './competition/UserCompetitionCompetitorResource';
import { UserCompetitionLinkResource } from './competition/UserCompetitionLinkResource';

export class UserCompetitionResource extends BaseResource {
	private readonly prefix = '/user/competition';

	readonly category: UserCompetitionCategoryResource;
	readonly competitor: UserCompetitionCompetitorResource;
	readonly admin: UserCompetitionAdminResource;
	readonly link: UserCompetitionLinkResource;

	constructor(http: HttpTransport) {
		super(http);
		this.category = new UserCompetitionCategoryResource(
			http,
			`${this.prefix}/category`,
		);
		this.competitor = new UserCompetitionCompetitorResource(
			http,
			`${this.prefix}/competitor`,
		);
		this.admin = new UserCompetitionAdminResource(http, `${this.prefix}/admin`);
		this.link = new UserCompetitionLinkResource(http, `${this.prefix}/link`);
	}

	/** POST /user/competition/ */
	create(
		input: CreateCompetition,
	): Promise<ApiData<CreateCompetitionResponse>> {
		return this.doPost(`${this.prefix}/`, input);
	}

	/** PATCH /user/competition/ */
	update(
		input: UpdateCompetition,
	): Promise<ApiData<UpdateCompetitionResponse>> {
		return this.doPatch(`${this.prefix}/`, input);
	}

	/** GET /user/competition/get-private */
	listPrivate(): Promise<ApiData<Competition[]>> {
		return this.doGet(`${this.prefix}/get-private`);
	}

	/** DELETE /user/competition/export/:slug */
	exportCompetitors(slug: string): Promise<ApiData<CompetitorExportRow[]>> {
		return this.doDelete(`${this.prefix}/export/${slug}`);
	}
}
