import { create } from 'zustand';
import { LS_TOKEN_KEY } from '../constants';
import type { Profile } from '../api/utils/common-types';

export type AuthStore = {
	profile: Profile | null;
	setProfile: (data: Profile | null) => void;
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	profile: null,
	setProfile: (profile: AuthStore['profile']) => {
		if (profile === null) {
			localStorage.removeItem(LS_TOKEN_KEY);
		}

		return set({ profile, isAuthenticated: profile !== null });
	},
	isAuthenticated: false,
	login: () => set({ isAuthenticated: true }),
	logout: () => {
		localStorage.removeItem(LS_TOKEN_KEY);
		return set({ isAuthenticated: false });
	},
}));
