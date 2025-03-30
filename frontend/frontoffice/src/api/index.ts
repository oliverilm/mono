import { Admin } from './services/admin';
import { Public } from './services/public';
import { User } from './services/user';

export class Api {
	public static public = Public;
	public static user = User;
	public static admin = Admin;
}

/* 
╔═══════════╤═══════════════════════════════════════════╗
║ Method(s) │ Path                                      ║
╟───────────┼───────────────────────────────────────────╢
║   OPTIONS │ *                                         ║
║      POST │ /admin/user/impersonate                   ║
║       GET │ /admin/user/list                          ║
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
