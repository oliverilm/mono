import type { LoginCredentials } from '../../types';
import type {
	AuthenticationResponse,
	RegisterResponse,
} from '../../types/responses';
import type { ApiData } from '../../client/types';
import { BaseResource } from '../BaseResource';

export class PublicAuthResource extends BaseResource {
	private readonly prefix = '/public/auth';

	/** POST /public/auth/login */
	login(input: LoginCredentials): Promise<ApiData<AuthenticationResponse>> {
		return this.doPost(`${this.prefix}/login`, input);
	}

	/** POST /public/auth/register */
	register(input: LoginCredentials): Promise<ApiData<RegisterResponse>> {
		return this.doPost(`${this.prefix}/register`, input);
	}
}
