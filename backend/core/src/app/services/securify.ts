import crypto from 'node:crypto';

export namespace SecurityService {
	export function hashPassword(password: string): string {
		return crypto.createHash('sha256').update(password).digest('base64');
	}
}
