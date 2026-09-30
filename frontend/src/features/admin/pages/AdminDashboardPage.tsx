import { useEffect, useState } from "react";
import { categoryService } from "../../categories/services/categoryService";
import type { Category } from "../../categories/types";
import { productService } from "../../products/services/productService";
import type { Product } from "../../products/types";
import { CategoryDistribution, DashboardMetrics, RecentProducts, RevenueOverview, StockAlert } from "../components/DashboardWidgets";
import { AdminLayout } from "../layouts/AdminLayout";

export function AdminDashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            productService.getProducts({ page: 0, size: 8, sort: "createdAt,desc" }),
            categoryService.getCategories({ page: 0, size: 12, sort: "id,asc" }),
        ])
            .then(([productPage, categoryList]) => {
                setProducts(productPage.content);
                setCategories(categoryList);
            })
            .catch(() => {
                setProducts([]);
                setCategories([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const totalStock = products.reduce(
        (sum, product) => sum + product.variants.reduce((variantSum, item) => variantSum + item.stockQuantity, 0),
        0,
    );

    return (
        <AdminLayout title="Tổng quan" actionLabel="Thêm mới">
            <div className="mx-auto max-w-375 px-5 py-7 sm:px-8 lg:px-12 lg:py-10">
                <DashboardMetrics totalStock={totalStock} loading={loading} />
                <section className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
                    <RevenueOverview />
                    <StockAlert products={products} />
                </section>
                <section className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_0.85fr]">
                    <RecentProducts products={products} loading={loading} />
                    <CategoryDistribution categories={categories} />
                </section>
            </div>
        </AdminLayout>
    );
}
