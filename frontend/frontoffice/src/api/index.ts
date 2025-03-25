import { Auth } from './auth';
import { Competition } from './competition-api';

export class Api {
	public static auth = Auth;
	public static club = null;
	public static competition = Competition;
	public static invitation = null;
}
