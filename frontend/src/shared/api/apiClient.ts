import axiosInstance from "../../lib/axios";

export type QueryParams = Record<string, string | number | undefined>;

export type ApiResponse<T> = {
    code: number;
    message: string;
    data: T;
};

export type PageData<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
};

export const apiClient = {
    get: async <T>(url: string, params?: QueryParams): Promise<T> => {
        const response = await axiosInstance.get<ApiResponse<T>>(url, { params });
        return response.data.data;
    },
    post: async <T>(url: string, body: unknown): Promise<T> => {
        const response = await axiosInstance.post<ApiResponse<T>>(url, body);
        return response.data.data;
    },
    put: async <T>(url: string, body: unknown): Promise<T> => {
        const response = await axiosInstance.put<ApiResponse<T>>(url, body);
        return response.data.data;
    },
    del: async <T>(url: string): Promise<T> => {
        const response = await axiosInstance.delete<ApiResponse<T>>(url);
        return response.data.data;
    },
};
