import type { HttpTransport } from '../../client/HttpTransport';
import { PublicAuthResource } from './PublicAuthResource';
import { PublicClubResource } from './PublicClubResource';
import { PublicCommonResource } from './PublicCommonResource';
import { PublicCompetitionResource } from './PublicCompetitionResource';

export class PublicApi {
	readonly auth: PublicAuthResource;
	readonly club: PublicClubResource;
	readonly common: PublicCommonResource;
	readonly competition: PublicCompetitionResource;

	constructor(http: HttpTransport) {
		this.auth = new PublicAuthResource(http);
		this.club = new PublicClubResource(http);
		this.common = new PublicCommonResource(http);
		this.competition = new PublicCompetitionResource(http);
	}
}
