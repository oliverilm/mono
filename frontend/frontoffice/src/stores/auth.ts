import { create } from "zustand";

export type AuthStore = {
    profile: unknown | null

    setProfile: (data: unknown | null) => void;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    profile: null,
    setProfile: (profile: AuthStore["profile"]) => {
        return set({ profile, isAuthenticated: profile !== null })
    },
    isAuthenticated: false,
    login: () => set({ isAuthenticated: true }),
    logout: () => {
        return set({ isAuthenticated: false })
    },
}))

