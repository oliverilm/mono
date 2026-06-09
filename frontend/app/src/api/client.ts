import { TOKEN_KEY } from '@/constants';
import { createApiClient } from '@monorepo/api-client';

export const api = createApiClient({
	baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000',
	tokenStorage: {
		getToken: () => localStorage.getItem(TOKEN_KEY),
		setToken: (token) => {
			if (token) {
				localStorage.setItem(TOKEN_KEY, token);
				return;
			}
			localStorage.removeItem(TOKEN_KEY);
		},
	},
});
