export type ProductVariant = {
    id: string;
    color: string;
    size: string;
    stockQuantity: number;
    createdAt?: string;
    updatedAt?: string;
};

export type Product = {
    id: string;
    brand: string;
    name: string;
    description?: string;
    price: number;
    slug: string;
    rating?: number;
    newArrival: boolean;
    categoryId: string;
    categoryName: string;
    categoryTypeId: string;
    categoryTypeName: string;
    variants: ProductVariant[];
    createdAt?: string;
    updatedAt?: string;
};
