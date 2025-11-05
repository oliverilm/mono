import type { AxiosResponse } from 'axios';
import { client } from '../../client';
import { UserAuth } from './auth';
import { UserClub } from './club';
import { UserCompetition } from './competition';
import { UserInvitation } from './invitation';

export namespace User {
	export const auth = UserAuth;
	export const club = UserClub;
	export const invitation = UserInvitation;
	export const competition = UserCompetition;

	export function getUserMetadata(): Promise<AxiosResponse<UserMetadata>> {
		return client.get('/user/metadata');
	}
}

type UserMetadata = {
	competitionCount: number;
	upcomingCompetitionCount: number;
};

/* 
╔═══════════╤═══════════════════════════════════════════╗
║ Method(s) │ Path                                      ║
╟───────────┼───────────────────────────────────────────╢
║   OPTIONS │ *                                         ║
║       GET │ /user/club/:slug/competitions             ║
║       GET │ /user/club/:slug/members                  ║
║      POST │ /user/club/create                         ║
║      POST │ /user/club/members/:slug                  ║
║      POST │ /user/competition/                        ║
║     PATCH │ /user/competition/                        ║
║      POST │ /user/competition/admin/                  ║
║      POST │ /user/competition/category/create         ║
║       GET │ /user/competition/category/list/:slug     ║
║      POST │ /user/competition/competitor/competitors  ║
║      POST │ /user/competition/link/create             ║
║      POST │ /user/invitation                          ║
║      POST │ /user/invitation/decide/:id               ║
║       GET │ /user/invitation/from                     ║
║       GET │ /user/invitation/to                       ║
║       GET │ /user/profile                             ║
║     PATCH │ /user/profile                             ║
║       GET │ /user/user-by-email                       ║
║       GET │ /user/user-by-national-id                 ║
╚═══════════╧═══════════════════════════════════════════╝
*/
