import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { productService } from "../../products/services/productService";
import type { Product } from "../../products/types";

type CategoryProductSectionProps = {
    categoryId: string | number;
    title: string;
};

export function CategoryProductSection({ categoryId, title }: CategoryProductSectionProps) {
    const navigate = useNavigate();
    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productService
            .getProducts({ categoryId: String(categoryId), size: 4, sort: "createdAt,desc" })
            .then((data) => setItems(data.content))
            .catch(() => setItems([]))
            .finally(() => setLoading(false));
    }, [categoryId]);

    const handleCardEnter = (event: React.MouseEvent<HTMLElement>) => {
        const card = event.currentTarget;
        gsap.to(card, {
            y: -12,
            rotateX: 2,
            rotateY: -2,
            boxShadow: "0 26px 48px rgba(23,23,23,0.12)",
            duration: 0.35,
            ease: "power3.out",
        });
    };

    const handleCardLeave = (event: React.MouseEvent<HTMLElement>) => {
        const card = event.currentTarget;
        gsap.to(card, {
            y: 0,
            rotateX: 0,
            rotateY: 0,
            boxShadow: "0 0 0 rgba(23,23,23,0)",
            duration: 0.3,
            ease: "power3.out",
        });
    };

    if (!loading && items.length === 0) return null;

    return (
        <section
            data-homepage-animate
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
        >
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-semibold tracking-[-0.07em] text-[#171717] sm:text-3xl">
                    {title}
                </h2>
                <button
                    type="button"
                    onClick={() => navigate(`/products?category=${categoryId}`)}
                    className="w-fit rounded-full border border-[#ebebeb] bg-white px-4 py-2 text-sm font-medium text-[#171717] transition hover:border-[#171717]"
                >
                    Xem tất cả
                </button>
            </div>

            {loading ? (
                <div className="py-12 text-center text-sm text-[#8f8f8f]">Đang tải...</div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {items.map((item) => (
                        <article
                            key={item.id}
                            onMouseEnter={handleCardEnter}
                            onMouseLeave={handleCardLeave}
                            onClick={() => navigate(`/products/${item.id}`)}
                            className="group cursor-pointer overflow-hidden rounded-[1.25rem] border border-[#ebebeb] bg-white transition-transform"
                        >
                            <div className="relative overflow-hidden bg-[#f5f5f5]">
                                <div className="flex h-52 w-full items-center justify-center text-sm text-[#8f8f8f] sm:h-64 lg:h-72">
                                    {item.name}
                                </div>
                                {item.newArrival ? (
                                    <div className="absolute left-4 top-4">
                                        <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-[#171717]">
                                            Mới
                                        </span>
                                    </div>
                                ) : null}
                                <button
                                    type="button"
                                    className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow-sm hover:bg-white"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    ♡
                                </button>
                            </div>
                            <div className="space-y-3 p-5">
                                <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
                                    <span>{item.categoryName}</span>
                                    <span>{item.brand}</span>
                                </div>
                                <h3 className="text-lg font-medium text-[#171717]">{item.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-semibold text-[#171717]">
                                        ${item.price}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className="w-full rounded-full bg-[#171717] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Thêm vào giỏ
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
