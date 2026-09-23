export type Category = {
    id: number;
    name: string;
    description?: string | null;
    slug?: string;
    image?: string | null;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: unknown;
};

export type CategoryType = {
    id: number;
    name: string;
    description?: string | null;
    categoryId?: number;
    image?: string | null;
    createdAt?: string;
    updatedAt?: string;
    [key: string]: unknown;
};

export type PageResponse<T> = {
    content?: T[];
    items?: T[];
    data?: T[];
    totalElements?: number;
    totalPages?: number;
    currentPage?: number;
    page?: number;
    size?: number;
    [key: string]: unknown;
};
