import { UserAuth } from './auth';
import { UserClub } from './club';
import { UserCompetition } from './competition';
import { UserInvitation } from './invitation';

export class User {
	public static auth = UserAuth;
	public static club = UserClub;
	public static invitation = UserInvitation;
	public static competition = UserCompetition;
}
