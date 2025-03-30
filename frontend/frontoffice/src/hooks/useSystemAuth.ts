/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { LS_TOKEN_KEY } from '../constants';
import { useAuthStore } from '../stores/auth';
import { Api } from '../api';

export function useSystemAuth() {
	const authStore = useAuthStore();

	const validateSession = async () => {
		const tokenFromLocalStorage = localStorage.getItem(LS_TOKEN_KEY);

		if (!tokenFromLocalStorage) {
			authStore.logout();
			return;
		}

		const profile = await Api.user.auth.getProfile();

		if (profile) {
			authStore.setProfile(profile.data);
			return;
		} else {
			return;
		}
	};

	useEffect(() => {
		window.addEventListener('storage', validateSession);
		return () => {
			window.removeEventListener('storage', validateSession);
		};
	}, []);

	useEffect(() => {
		validateSession();
	}, []);
}
