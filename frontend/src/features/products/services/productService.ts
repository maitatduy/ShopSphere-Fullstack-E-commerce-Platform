import { apiClient, type PageData } from "../../../shared/api/apiClient";
import type { Product } from "../types";

export type ProductQueryParams = {
    keyword?: string;
    categoryId?: string;
    newArrival?: boolean;
    page?: number;
    size?: number;
    sort?: string;
};

export const productService = {
    getProducts: async (params?: ProductQueryParams): Promise<PageData<Product>> => {
        const data = await apiClient.get<PageData<Product>>(
            "/v1/products",
            params as Record<string, string | number | undefined>,
        );
        return data;
    },

    getProductById: async (id: string): Promise<Product> => {
        return apiClient.get<Product>(`/v1/products/${id}`);
    },
};
