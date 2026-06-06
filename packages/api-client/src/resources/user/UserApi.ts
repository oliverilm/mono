import type { HttpTransport } from '../../client/HttpTransport';
import { UserClubResource } from './UserClubResource';
import { UserCompetitionResource } from './UserCompetitionResource';
import { UserInvitationResource } from './UserInvitationResource';
import { UserMetadataResource } from './UserMetadataResource';
import { UserProfileResource } from './UserProfileResource';

export class UserApi {
	readonly profile: UserProfileResource;
	readonly metadata: UserMetadataResource;
	readonly club: UserClubResource;
	readonly invitation: UserInvitationResource;
	readonly competition: UserCompetitionResource;

	constructor(http: HttpTransport) {
		this.profile = new UserProfileResource(http);
		this.metadata = new UserMetadataResource(http);
		this.club = new UserClubResource(http);
		this.invitation = new UserInvitationResource(http);
		this.competition = new UserCompetitionResource(http);
	}
}
