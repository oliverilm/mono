import crypto from 'node:crypto';

class SecurityService {
	hashPassword(password: string): string {
		return crypto.createHash('sha256').update(password).digest('base64');
	}
}

export default new SecurityService();
