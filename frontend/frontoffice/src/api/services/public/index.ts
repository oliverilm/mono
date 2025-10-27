/* eslint-disable @typescript-eslint/no-namespace */
import { PublicAuth } from './auth';
import { PublicClub } from './club';
import { PublicCommon } from './common';
import { PublicCompetition } from './competition';

export namespace Public {
	export const auth = PublicAuth;
	export const club = PublicClub;
	export const competition = PublicCompetition;
	export const common = PublicCommon;
}

/* 
╔═══════════╤═══════════════════════════════════════════╗
║ Method(s) │ Path                                      ║
╟───────────┼───────────────────────────────────────────╢
║   OPTIONS │ *                                         ║
║      POST │ /public/auth/login                        ║
║      POST │ /public/auth/register                     ║
║       GET │ /public/clubs/                            ║
║       GET │ /public/clubs/:slug/metadata              ║
║       GET │ /public/clubs/get-by-id/:id               ║
║       GET │ /public/clubs/get-by-slug/:slug           ║
║       GET │ /public/common/categories                 ║
║       GET │ /public/competition/                      ║
║       GET │ /public/competition/:slug                 ║
║       GET │ /public/competition/get-categories/:slug  ║
║       GET │ /public/competition/get-competitors/:slug ║
║       GET │ /public/competition/metadata/:slug        ║
╚═══════════╧═══════════════════════════════════════════╝
*/
