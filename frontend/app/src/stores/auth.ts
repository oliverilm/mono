import type { UserProfile } from '@monorepo/api-client';
import { create } from 'zustand';
import { TOKEN_KEY } from '../constants';

export type AuthStore = {
	profile: UserProfile | null;
	isAuthenticated: boolean;
	isReady: boolean;
	setProfile: (profile: UserProfile | null) => void;
	setReady: (ready: boolean) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	profile: null,
	isAuthenticated: false,
	isReady: false,
	setProfile: (profile) => set({ profile, isAuthenticated: profile !== null }),
	setReady: (ready) => set({ isReady: ready }),
	logout: () => {
		localStorage.removeItem(TOKEN_KEY);
		set({ profile: null, isAuthenticated: false });
	},
}));
