import { PublicAuth } from './auth';
import { PublicClub } from './club';
import { PublicCommon } from './common';
import { PublicCompetition } from './competition';

export class Public {
	public static auth = PublicAuth;
	public static club = PublicClub;
	public static competition = PublicCompetition;
	public static common = PublicCommon;
}
