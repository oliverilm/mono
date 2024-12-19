import { create } from 'zustand';
import { Category } from '../api/common';

interface CommonStore {
	categories: Category[];
	setCategories: (categories: Category[]) => void;
}
export const useCommonStore = create<CommonStore>((set) => ({
	categories: [],
	setCategories: (categories: Category[]) => set({ categories }),
}));
