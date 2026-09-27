import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { productService } from "../services/productService";
import type { Product } from "../types";

type SimilarProductsProps = {
    categoryId?: string;
    excludeId?: string;
};

export function SimilarProducts({ categoryId, excludeId }: SimilarProductsProps) {
    const navigate = useNavigate();
    const [items, setItems] = useState<Product[]>([]);

    useEffect(() => {
        productService
            .getProducts({ categoryId, size: 8, sort: "createdAt,desc" })
            .then((data) => {
                const filtered = excludeId
                    ? data.content.filter((p) => p.id !== excludeId)
                    : data.content;
                setItems(filtered.slice(0, 4));
            })
            .catch(() => setItems([]));
    }, [categoryId, excludeId]);

    if (items.length === 0) return null;

    return (
        <section data-product-detail-animate className="space-y-6">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
                        Sản phẩm tương tự
                    </p>
                    <h2 className="mt-2 text-2xl font-medium tracking-tighter text-[#171717]">
                        Gợi ý cho bạn
                    </h2>
                </div>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#171717] underline-offset-4 hover:underline"
                >
                    Xem tất cả <FiChevronRight className="text-base" />
                </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {items.map((item) => (
                    <article
                        key={item.id}
                        onClick={() => navigate(`/products/${item.id}`)}
                        className="group cursor-pointer overflow-hidden rounded-[1.6rem] border border-[#ebebeb] bg-white transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(23,23,23,0.06)]"
                    >
                        <div className="relative overflow-hidden bg-[#f5f5f5]">
                            <div className="flex h-72 w-full items-center justify-center text-sm text-[#8f8f8f]">
                                {item.name}
                            </div>
                            {item.newArrival ? (
                                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-[#171717]">
                                    Mới
                                </div>
                            ) : null}
                        </div>

                        <div className="space-y-3 p-4">
                            <div className="flex items-center justify-between gap-2 text-[0.62rem] uppercase tracking-[0.14em] text-[#8f8f8f]">
                                <span>{item.categoryName}</span>
                                <span>{item.brand}</span>
                            </div>
                            <h3 className="text-lg font-medium text-[#171717]">{item.name}</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold text-[#171717]">
                                    ${item.price}
                                </span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
