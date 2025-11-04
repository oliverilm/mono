import { create } from 'zustand';
import type { Category } from '../api/utils/common-types';

interface CommonStore {
	categories: Category[];
	setCategories: (categories: Category[]) => void;
}
export const useCommonStore = create<CommonStore>((set) => ({
	categories: [],
	setCategories: (categories: Category[]) => set({ categories }),
}));
