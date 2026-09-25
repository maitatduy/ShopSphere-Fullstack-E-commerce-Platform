export type { ProductListItem } from "../features/products/data/productsData";

export type ProductSummary = {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
    color: string;
};
