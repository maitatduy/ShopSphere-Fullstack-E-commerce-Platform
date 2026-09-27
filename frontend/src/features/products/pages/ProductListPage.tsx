import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiFilter } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { AppLayout } from "../../../shared/layouts/AppLayout";
import { useCategoryStore } from "../../categories/store/categoryStore";
import { ProductFilterSidebar } from "../components/ProductFilterSidebar";
import { ProductGrid } from "../components/ProductGrid";
import { ProductPagination } from "../components/ProductPagination";
import { productService } from "../services/productService";
import type { Product } from "../types";

gsap.registerPlugin(ScrollTrigger);

const PAGE_SIZE = 8;

export function ProductListPage() {
    const pageRef = useRef<HTMLDivElement | null>(null);
    const [searchParams] = useSearchParams();
    const { categories, fetchCategories } = useCategoryStore();

    const [products, setProducts] = useState<Product[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const [category, setCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState("all");
    const [selectedColor, setSelectedColor] = useState("All");
    const [selectedSize, setSelectedSize] = useState("All");
    const [onlyNew, setOnlyNew] = useState(false);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(true);

    const categoryId = searchParams.get("category") ?? undefined;

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const fetchProducts = useCallback(
        async (page: number, keyword: string) => {
            try {
                setLoading(true);
                const data = await productService.getProducts({
                    keyword: keyword || undefined,
                    categoryId,
                    page: page - 1,
                    size: PAGE_SIZE,
                    sort: "createdAt,desc",
                });
                setProducts(data.content);
                setTotalElements(data.totalElements);
                setTotalPages(data.totalPages);
            } catch {
                setProducts([]);
            } finally {
                setLoading(false);
            }
        },
        [categoryId],
    );

    useEffect(() => {
        fetchProducts(currentPage, search);
    }, [fetchProducts, currentPage, search]);

    const categoryNames = useMemo(() => categories.map((c) => c.name), [categories]);

    const availableColors = useMemo(
        () =>
            [
                ...new Set(products.flatMap((p) => p.variants.map((v) => v.color)).filter(Boolean)),
            ].sort(),
        [products],
    );

    const availableSizes = useMemo(
        () =>
            [
                ...new Set(products.flatMap((p) => p.variants.map((v) => v.size)).filter(Boolean)),
            ].sort(),
        [products],
    );

    const resetFilters = () => {
        setCategory("All");
        setSelectedPrice("all");
        setSelectedColor("All");
        setSelectedSize("All");
        setOnlyNew(false);
        setSearch("");
        setCurrentPage(1);
    };

    useEffect(() => {
        const sections = gsap.utils.toArray<HTMLElement>("[data-product-animate]");
        const ctx = gsap.context(() => {
            sections.forEach((section) => {
                gsap.fromTo(
                    section,
                    { opacity: 0, y: 35, filter: "blur(6px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: { trigger: section, start: "top 80%", once: true },
                    },
                );
            });
        }, pageRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    const filteredProducts = products.filter((item) => {
        const matchesCategory = category === "All" || item.categoryName === category;
        const matchesPrice =
            selectedPrice === "all" ||
            (selectedPrice === "0-100" && item.price <= 100) ||
            (selectedPrice === "100-180" && item.price > 100 && item.price <= 180) ||
            (selectedPrice === "180+" && item.price > 180);
        const matchesColor =
            selectedColor === "All" || item.variants.some((v) => v.color === selectedColor);
        const matchesSize =
            selectedSize === "All" || item.variants.some((v) => v.size === selectedSize);
        const matchesNew = !onlyNew || item.newArrival;

        return matchesCategory && matchesPrice && matchesColor && matchesSize && matchesNew;
    });

    const handleCardEnter = (event: MouseEvent<HTMLElement>) => {
        const card = event.currentTarget;
        gsap.to(card, {
            y: -10,
            rotateX: 2,
            boxShadow: "0 22px 42px rgba(23,23,23,0.08)",
            duration: 0.35,
            ease: "power3.out",
        });
    };

    const handleCardLeave = (event: MouseEvent<HTMLElement>) => {
        const card = event.currentTarget;
        gsap.to(card, {
            y: 0,
            rotateX: 0,
            boxShadow: "0 0 0 rgba(23,23,23,0)",
            duration: 0.3,
            ease: "power3.out",
        });
    };

    const filterProps = {
        categories: categoryNames,
        colors: availableColors,
        sizes: availableSizes,
        category,
        selectedPrice,
        selectedColor,
        selectedSize,
        onlyNew,
        search,
        onSearchChange: (value: string) => { setSearch(value); setCurrentPage(1); },
        onCategoryChange: (value: string) => { setCategory(value); setCurrentPage(1); },
        onPriceChange: (value: string) => { setSelectedPrice(value); setCurrentPage(1); },
        onColorChange: (value: string) => { setSelectedColor(value); setCurrentPage(1); },
        onSizeChange: (value: string) => { setSelectedSize(value); setCurrentPage(1); },
        onOnlyNewChange: (value: boolean) => { setOnlyNew(value); setCurrentPage(1); },
        onReset: resetFilters,
    };

    return (
        <AppLayout>
            <div ref={pageRef} className="min-h-screen bg-[#fafafa] text-[#171717]">
                {/* Mobile filter drawer */}
                {isFilterOpen ? (
                    <div className="lg:hidden">
                        <div
                            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                            onClick={() => setIsFilterOpen(false)}
                            aria-hidden="true"
                        />
                        <div className="fixed inset-y-0 left-0 z-50 w-[min(85vw,360px)] overflow-y-auto bg-[#fafafa] p-4 shadow-2xl">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-base font-medium text-[#171717]">Bộ lọc</span>
                                <button
                                    type="button"
                                    onClick={() => setIsFilterOpen(false)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#171717]"
                                    aria-label="Đóng bộ lọc"
                                >
                                    ✕
                                </button>
                            </div>
                            <ProductFilterSidebar {...filterProps} />
                        </div>
                    </div>
                ) : null}

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-medium tracking-[-0.04em] text-[#171717] sm:text-3xl lg:text-4xl">
                            {category !== "All" ? category : "Tất cả sản phẩm"}
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className="hidden text-sm text-[#8f8f8f] sm:block">
                                {loading ? "" : `${totalElements} sản phẩm`}
                            </span>
                            <button
                                type="button"
                                aria-label={isFilterOpen ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
                                aria-expanded={isFilterOpen}
                                onClick={() => setIsFilterOpen((v) => !v)}
                                className="inline-flex items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-4 py-2 text-sm font-medium text-[#171717] shadow-sm transition hover:border-[#171717]"
                            >
                                <FiFilter className="text-base" />
                                <span className="hidden sm:inline">Bộ lọc</span>
                            </button>
                        </div>
                    </div>

                    <div
                        className={
                            isFilterOpen
                                ? "grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]"
                                : "grid gap-6 lg:grid-cols-1"
                        }
                    >
                        {/* Desktop sidebar — hidden on mobile (drawer used instead) */}
                        {isFilterOpen ? (
                            <div className="hidden lg:block">
                                <ProductFilterSidebar {...filterProps} />
                            </div>
                        ) : null}

                        <section data-product-animate className="space-y-6">
                            {!loading && filteredProducts.length > 0 ? (
                                <ProductGrid
                                    products={filteredProducts}
                                    onCardEnter={handleCardEnter}
                                    onCardLeave={handleCardLeave}
                                />
                            ) : !loading ? (
                                <div className="rounded-3xl border border-dashed border-[#d9d9d9] bg-white py-16 text-center">
                                    <p className="text-lg font-medium text-[#171717]">
                                        Không có sản phẩm nào phù hợp.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={resetFilters}
                                        className="mt-4 rounded-full border border-[#171717] bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
                                    >
                                        Xóa bộ lọc
                                    </button>
                                </div>
                            ) : null}

                            {!loading && totalPages > 1 ? (
                                <ProductPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    filteredCount={totalElements}
                                    pageSize={PAGE_SIZE}
                                    onPageChange={(page) => setCurrentPage(page)}
                                />
                            ) : null}
                        </section>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
