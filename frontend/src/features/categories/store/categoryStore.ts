import { create } from "zustand";
import type { Category } from "../types";
import { categoryService } from "../services/categoryService";

type CategoryState = {
    categories: Category[];
    loading: boolean;
    error: string | null;
    fetchCategories: () => Promise<void>;
};

export const useCategoryStore = create<CategoryState>((set, get) => ({
    categories: [],
    loading: false,
    error: null,
    fetchCategories: async () => {
        if (get().loading) {
            return;
        }

        try {
            set({ loading: true, error: null });
            const data = await categoryService.getCategories({ page: 0, size: 12, sort: "id,asc" });
            set({ categories: data, loading: false, error: null });
        } catch (err) {
            set({
                categories: [],
                loading: false,
                error: err instanceof Error ? err.message : "Unable to load categories",
            });
        }
    },
}));
