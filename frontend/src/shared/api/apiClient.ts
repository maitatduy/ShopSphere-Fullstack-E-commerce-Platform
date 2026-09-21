import axiosInstance from "../../lib/axios";

export type QueryParams = Record<string, string | number | undefined>;

export type ApiListResponse<T> = {
    content?: T[];
    items?: T[];
    data?: T[];
    totalElements?: number;
    totalPages?: number;
    page?: number;
    size?: number;
};

export const normalizeList = <T>(payload: unknown): T[] => {
    if (Array.isArray(payload)) {
        return payload as T[];
    }

    const data = payload as ApiListResponse<T> | null;

    if (!data) {
        return [];
    }

    if (Array.isArray(data.content)) return data.content;
    if (Array.isArray(data.items)) return data.items;
    if (Array.isArray(data.data)) return data.data;

    return [];
};

export const apiClient = {
    get: <T>(url: string, params?: QueryParams) => axiosInstance.get<T>(url, { params }),
    post: <T>(url: string, body: unknown) => axiosInstance.post<T>(url, body),
    put: <T>(url: string, body: unknown) => axiosInstance.put<T>(url, body),
    del: <T>(url: string) => axiosInstance.delete<T>(url),
};
