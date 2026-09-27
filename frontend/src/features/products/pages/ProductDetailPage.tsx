import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import { Link, useParams, Navigate } from "react-router-dom";
import { AppLayout } from "../../../shared/layouts/AppLayout";
import { SimilarProducts } from "../components/SimilarProducts";
import { productService } from "../services/productService";
import type { Product } from "../types";

gsap.registerPlugin(ScrollTrigger);

export function ProductDetailPage() {
    const { productId } = useParams();
    const pageRef = useRef<HTMLDivElement | null>(null);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!productId) {
            setNotFound(true);
            return;
        }

        productService
            .getProductById(productId)
            .then(setProduct)
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [productId]);

    useEffect(() => {
        if (!product) return;

        const sections = gsap.utils.toArray<HTMLElement>("[data-product-detail-animate]");
        const ctx = gsap.context(() => {
            sections.forEach((section) => {
                gsap.fromTo(
                    section,
                    { opacity: 0, y: 40, filter: "blur(8px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: { trigger: section, start: "top 82%", once: true },
                    },
                );
            });
        }, pageRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [product]);

    if (notFound) return <Navigate to="/products" replace />;

    if (loading) {
        return (
            <AppLayout>
                <div className="flex min-h-screen items-center justify-center bg-[#fafafa]">
                    <p className="text-sm text-[#8f8f8f]">Đang tải...</p>
                </div>
            </AppLayout>
        );
    }

    if (!product) return <Navigate to="/products" replace />;

    const inStock = product.variants.some((v) => v.stockQuantity > 0);

    return (
        <AppLayout>
            <div ref={pageRef} className="min-h-screen bg-[#fafafa] text-[#171717]">
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                    <nav className="mb-8 flex min-w-0 items-center gap-1.5 text-sm text-[#8f8f8f]">
                        <Link to="/" className="shrink-0 transition hover:text-[#171717]">
                            Trang chủ
                        </Link>
                        <FiChevronRight className="shrink-0 text-base" />
                        <Link to="/products" className="shrink-0 transition hover:text-[#171717]">
                            Cửa hàng
                        </Link>
                        <FiChevronRight className="shrink-0 text-base" />
                        <span className="truncate text-[#171717]">{product.name}</span>
                    </nav>

                    <div className="mb-8 flex items-center justify-between gap-3">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-4 py-2.5 text-sm font-medium text-[#171717] transition hover:border-[#171717]"
                        >
                            <FiArrowLeft className="text-base" />
                            Quay lại cửa hàng
                        </Link>
                        {inStock ? (
                            <div className="hidden items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-3 py-2 text-sm text-[#4d4d4d] sm:inline-flex">
                                <span>Còn hàng</span>
                                <span className="h-2 w-2 rounded-full bg-[#1db954]" />
                            </div>
                        ) : (
                            <div className="hidden items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-3 py-2 text-sm text-[#4d4d4d] sm:inline-flex">
                                <span>Hết hàng</span>
                                <span className="h-2 w-2 rounded-full bg-[#d9d9d9]" />
                            </div>
                        )}
                    </div>

                    <div
                        data-product-detail-animate
                        className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
                    >
                        <div className="flex h-96 items-center justify-center rounded-3xl border border-[#ebebeb] bg-[#f5f5f5] text-[#8f8f8f] lg:h-140">
                            {product.name}
                        </div>

                        <div className="space-y-6">
                            <div className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#8f8f8f]">
                                {product.categoryName} / {product.brand}
                            </div>
                            <h1 className="text-3xl font-medium tracking-[-0.06em] text-[#171717] sm:text-4xl">
                                {product.name}
                            </h1>
                            {product.rating ? (
                                <div className="flex items-center gap-2 text-sm text-[#4d4d4d]">
                                    <span>★ {product.rating}</span>
                                </div>
                            ) : null}
                            <p className="text-3xl font-semibold tracking-tighter text-[#171717]">
                                ${product.price}
                            </p>
                            {product.description ? (
                                <p className="text-sm leading-7 text-[#4d4d4d]">
                                    {product.description}
                                </p>
                            ) : null}

                            {product.variants.length > 0 ? (
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#8f8f8f]">
                                            Kích cỡ
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {[...new Set(product.variants.map((v) => v.size))].map(
                                                (size) => (
                                                    <span
                                                        key={size}
                                                        className="inline-flex min-w-12 items-center justify-center rounded-full border border-[#ebebeb] bg-white px-3 py-2 text-sm font-medium text-[#171717]"
                                                    >
                                                        {size}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-[#8f8f8f]">
                                            Màu sắc
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {[...new Set(product.variants.map((v) => v.color))].map(
                                                (color) => (
                                                    <span
                                                        key={color}
                                                        className="rounded-full border border-[#ebebeb] bg-white px-3 py-2 text-sm text-[#171717]"
                                                    >
                                                        {color}
                                                    </span>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            <button
                                type="button"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
                            >
                                Thêm vào giỏ
                            </button>
                        </div>
                    </div>

                    <div className="mt-10">
                        <SimilarProducts categoryId={product.categoryId} excludeId={product.id} />
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
