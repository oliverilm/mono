import { Auth } from './services/auth';
import { CampsAPI } from './services/camps';
import { ClubAPI } from './services/club';
import { Competition } from './services/competition';
import { InvitationApi } from './services/invitation';

export class Api {
	public static auth = Auth;
	public static club = ClubAPI;
	public static competition = Competition;
	public static invitation = InvitationApi;
	public static camp = CampsAPI
}
