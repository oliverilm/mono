/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { api } from '../api/client';
import { TOKEN_KEY } from '../constants';
import { useAuthStore } from '../stores/auth';

export function useSystemAuth() {
	const authStore = useAuthStore();

	const validateSession = async () => {
		const token = localStorage.getItem(TOKEN_KEY);

		if (!token) {
			authStore.logout();
			authStore.setReady(true);
			return;
		}

		try {
			const { data } = await api.user.profile.get();
			if (data) {
				authStore.setProfile(data);
			} else {
				authStore.logout();
			}
		} catch {
			authStore.logout();
		} finally {
			authStore.setReady(true);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: validate session once on mount and when auth state changes
	useEffect(() => {
		if (authStore.isAuthenticated) {
			authStore.setReady(true);
			return;
		}

		validateSession();

		window.addEventListener('storage', validateSession);

		return () => {
			window.removeEventListener('storage', validateSession);
		};
	}, [authStore.isAuthenticated]);
}
