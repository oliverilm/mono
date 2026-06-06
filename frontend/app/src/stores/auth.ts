import { create } from 'zustand';

export type AuthStore = {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: true,
	login: () => set({ isAuthenticated: true }),
	logout: () => set({ isAuthenticated: false }),
}));
