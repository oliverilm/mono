/* eslint-disable @typescript-eslint/no-namespace */
import { Admin } from './services/admin';
import { Public } from './services/public';
import { User } from './services/user';

export namespace Api {
	export const publicApi = Public;
	export const user = User;
	export const admin = Admin;
}

/* 
╔═══════════╤═════════════════════════════════════════════════╗
║ Method(s) │ Path                                            ║
╟───────────┼─────────────────────────────────────────────────╢
║   OPTIONS │ *                                               ║
║      POST │ /admin/user/impersonate                         ║
║       GET │ /admin/user/list                                ║
║      HEAD │ /admin/user/list   							  ║
║                            								  ║
║      POST │ /public/auth/login                              ║
║      POST │ /public/auth/register                           ║
║      HEAD │ /public/club                                    ║
║       GET │ /public/club/                                   ║
║      HEAD │ /public/club/                                   ║
║       GET │ /public/club/get-by-id/:id                      ║
║      HEAD │ /public/club/get-by-id/:id                      ║
║       GET │ /public/club/get-by-slug/:slug                  ║
║      HEAD │ /public/club/get-by-slug/:slug                  ║
║       GET │ /public/club/metadata/:slug                     ║
║      HEAD │ /public/club/metadata/:slug                     ║
║       GET │ /public/common/categories                       ║
║      HEAD │ /public/common/categories                       ║
║      HEAD │ /public/competition                             ║
║       GET │ /public/competition/                            ║
║      HEAD │ /public/competition/                            ║
║       GET │ /public/competition/:slug                       ║
║      HEAD │ /public/competition/:slug                       ║
║       GET │ /public/competition/get-categories/:slug        ║
║      HEAD │ /public/competition/get-categories/:slug        ║
║       GET │ /public/competition/get-competitors/:slug       ║
║      HEAD │ /public/competition/get-competitors/:slug       ║
║       GET │ /public/competition/metadata/:slug              ║
║      HEAD │ /public/competition/metadata/:slug              ║
║       GET │ /user/club/:slug/competitions                   ║
║      HEAD │ /user/club/:slug/competitions                   ║
║       GET │ /user/club/:slug/members                        ║
║      HEAD │ /user/club/:slug/members                        ║
║      POST │ /user/club/create                               ║
║      POST │ /user/club/members/:slug                        ║
║      POST │ /user/competition/                              ║
║     PATCH │ /user/competition/                              ║
║      POST │ /user/competition/admin/                        ║
║      POST │ /user/competition/category/create               ║
║       GET │ /user/competition/category/list/:slug           ║
║      HEAD │ /user/competition/category/list/:slug           ║
║      POST │ /user/competition/competitor/create             ║
║      POST │ /user/competition/competitor/delete             ║
║       GET │ /user/competition/competitor/get-personal/:slug ║
║      HEAD │ /user/competition/competitor/get-personal/:slug ║
║    DELETE │ /user/competition/export/:slug                  ║
║       GET │ /user/competition/get-private                   ║
║      HEAD │ /user/competition/get-private                   ║
║      POST │ /user/competition/link/create                   ║
║      POST │ /user/invitation                                ║
║      POST │ /user/invitation/decide/:id                     ║
║       GET │ /user/invitation/from                           ║
║      HEAD │ /user/invitation/from                           ║
║       GET │ /user/invitation/to                             ║
║      HEAD │ /user/invitation/to                             ║
║       GET │ /user/profile                                   ║
║      HEAD │ /user/profile                                   ║
║     PATCH │ /user/profile                                   ║
║       GET │ /user/user-by-email                             ║
║      HEAD │ /user/user-by-email                             ║
║       GET │ /user/user-by-national-id                       ║
║      HEAD │ /user/user-by-national-id                       ║
╚═══════════╧═════════════════════════════════════════════════╝
*/
