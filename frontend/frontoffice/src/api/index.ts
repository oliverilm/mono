import { Admin } from './services/admin';
import { Public } from './services/public';
import { User } from './services/user';

export class Api {
	public static public = Public;
	public static user = User;
	public static admin = Admin;
}
