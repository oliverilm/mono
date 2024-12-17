import { create } from 'zustand';
import { Profile } from '../api/auth';
import { LS_TOKEN_KEY } from '../constants';

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
