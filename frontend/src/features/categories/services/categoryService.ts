import { apiClient, type PageData } from "../../../shared/api/apiClient";
import type { Category, CategoryType } from "../types";

export const categoryService = {
    getCategories: async (params?: Record<string, string | number | undefined>) => {
        const data = await apiClient.get<Category[]>("/v1/categories", params);
        return Array.isArray(data) ? data : [];
    },

    getCategoryById: async (id: string) => {
        return apiClient.get<Category>(`/v1/categories/${id}`);
    },

    createCategory: async (payload: Partial<Category>) => {
        return apiClient.post<Category>("/v1/categories", payload);
    },

    updateCategory: async (id: string, payload: Partial<Category>) => {
        return apiClient.put<Category>(`/v1/categories/${id}`, payload);
    },

    deleteCategory: async (id: string) => {
        return apiClient.del<void>(`/v1/categories/${id}`);
    },

    getCategoryTypes: async (params?: Record<string, string | number | undefined>) => {
        const data = await apiClient.get<PageData<CategoryType>>("/v1/category-types", params);
        return data?.content ?? [];
    },

    getCategoryTypeById: async (id: string) => {
        return apiClient.get<CategoryType>(`/v1/category-types/${id}`);
    },

    createCategoryType: async (payload: Partial<CategoryType> & { categoryId: string }) => {
        return apiClient.post<CategoryType>("/v1/category-types", payload);
    },

    updateCategoryType: async (id: string, payload: Partial<CategoryType>) => {
        return apiClient.put<CategoryType>(`/v1/category-types/${id}`, payload);
    },

    deleteCategoryType: async (id: string) => {
        return apiClient.del<void>(`/v1/category-types/${id}`);
    },
};
