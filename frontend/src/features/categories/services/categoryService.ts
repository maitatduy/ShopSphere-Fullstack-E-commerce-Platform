import { apiClient, normalizeList } from "../../../shared/api/apiClient";
import type { Category, CategoryType } from "../types";

export const categoryService = {
    getCategories: async (params?: Record<string, string | number | undefined>) => {
        const response = await apiClient.get<{ content?: Category[]; items?: Category[]; data?: Category[] }>(
            "/v1/categories",
            params,
        );

        return normalizeList<Category>(response.data);
    },

    getCategoryById: async (id: number) => {
        const response = await apiClient.get<Category>(`/v1/categories/${id}`);
        return response.data;
    },

    createCategory: async (payload: Partial<Category>) => {
        const response = await apiClient.post<Category>("/v1/categories", payload);
        return response.data;
    },

    updateCategory: async (id: number, payload: Partial<Category>) => {
        const response = await apiClient.put<Category>(`/v1/categories/${id}`, payload);
        return response.data;
    },

    deleteCategory: async (id: number) => {
        const response = await apiClient.del<unknown>(`/v1/categories/${id}`);
        return response.data;
    },

    getCategoryTypes: async (params?: Record<string, string | number | undefined>) => {
        const response = await apiClient.get<{ content?: CategoryType[]; items?: CategoryType[]; data?: CategoryType[] }>(
            "/v1/category-types",
            params,
        );

        return normalizeList<CategoryType>(response.data);
    },

    getCategoryTypeById: async (id: number) => {
        const response = await apiClient.get<CategoryType>(`/v1/category-types/${id}`);
        return response.data;
    },

    createCategoryType: async (payload: Partial<CategoryType> & { categoryId: number }) => {
        const response = await apiClient.post<CategoryType>("/v1/category-types", payload);
        return response.data;
    },

    updateCategoryType: async (id: number, payload: Partial<CategoryType>) => {
        const response = await apiClient.put<CategoryType>(`/v1/category-types/${id}`, payload);
        return response.data;
    },

    deleteCategoryType: async (id: number) => {
        const response = await apiClient.del<unknown>(`/v1/category-types/${id}`);
        return response.data;
    },
};
