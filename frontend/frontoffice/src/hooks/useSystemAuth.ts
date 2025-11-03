/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useLayoutEffect } from 'react';
import { Api } from '../api';
import { LS_TOKEN_KEY } from '../constants';
import { useAuthStore } from '../stores/auth';

export function useSystemAuth() {
	const authStore = useAuthStore();

	const validateSession = useCallback(async () => {
		const tokenFromLocalStorage = localStorage.getItem(LS_TOKEN_KEY);

		if (!tokenFromLocalStorage) {
			authStore.logout();
			return;
		}

		const profile = await Api.user.auth.getProfile();

		if (profile) {
			authStore.setProfile(profile.data);
			return;
		}
	}, [authStore]);

	useLayoutEffect(() => {
		if (authStore.isAuthenticated) return;

		validateSession();

		window.addEventListener('storage', validateSession);

		return () => {
			window.removeEventListener('storage', validateSession);
		};
	}, [authStore.isAuthenticated, validateSession]);
}
