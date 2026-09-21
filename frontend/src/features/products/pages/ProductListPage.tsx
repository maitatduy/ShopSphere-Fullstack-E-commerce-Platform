import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiFilter } from "react-icons/fi";
import { AppLayout } from "../../../shared/layouts/AppLayout";
import { ProductFilterSidebar } from "../components/ProductFilterSidebar";
import { ProductGrid } from "../components/ProductGrid";
import { ProductPagination } from "../components/ProductPagination";
import {
    categories,
    colorOptions,
    productListItems,
    sizeOptions,
    statusOptions,
} from "../data/productsData";

gsap.registerPlugin(ScrollTrigger);

export function ProductListPage() {
    const pageRef = useRef<HTMLDivElement | null>(null);
    const [category, setCategory] = useState<(typeof categories)[number]>("All");
    const [selectedPrice, setSelectedPrice] = useState("all");
    const [selectedColor, setSelectedColor] = useState<(typeof colorOptions)[number]>("All");
    const [selectedSize, setSelectedSize] = useState<(typeof sizeOptions)[number]>("All");
    const [selectedStatus, setSelectedStatus] = useState<(typeof statusOptions)[number]>("All");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const pageSize = 8;

    const resetFilters = () => {
        setCategory("All");
        setSelectedPrice("all");
        setSelectedColor("All");
        setSelectedSize("All");
        setSelectedStatus("All");
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
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            once: true,
                        },
                    },
                );
            });
        }, pageRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const filteredProducts = useMemo(() => {
        return productListItems.filter((item) => {
            const matchesCategory = category === "All" || item.category === category;
            const matchesPrice =
                selectedPrice === "all" ||
                (selectedPrice === "0-100" && item.price <= 100) ||
                (selectedPrice === "100-180" && item.price > 100 && item.price <= 180) ||
                (selectedPrice === "180+" && item.price > 180);
            const matchesColor = selectedColor === "All" || item.color === selectedColor;
            const matchesSize =
                selectedSize === "All" || item.size.some((size) => size === selectedSize);
            const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
            const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

            return (
                matchesCategory &&
                matchesPrice &&
                matchesColor &&
                matchesSize &&
                matchesStatus &&
                matchesSearch
            );
        });
    }, [category, search, selectedColor, selectedPrice, selectedSize, selectedStatus]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const paginatedProducts = filteredProducts.slice(
        (safeCurrentPage - 1) * pageSize,
        safeCurrentPage * pageSize,
    );

    const handleCardEnter = (event: MouseEvent<HTMLElement>) => {
        const card = event.currentTarget;
        const image = card.querySelector("img");

        gsap.to(card, {
            y: -10,
            rotateX: 2,
            boxShadow: "0 22px 42px rgba(23,23,23,0.08)",
            duration: 0.35,
            ease: "power3.out",
        });

        if (image) {
            gsap.to(image, {
                scale: 1.08,
                duration: 0.5,
                ease: "power3.out",
            });
        }
    };

    const handleCardLeave = (event: MouseEvent<HTMLElement>) => {
        const card = event.currentTarget;
        const image = card.querySelector("img");

        gsap.to(card, {
            y: 0,
            rotateX: 0,
            boxShadow: "0 0 0 rgba(23,23,23,0)",
            duration: 0.3,
            ease: "power3.out",
        });

        if (image) {
            gsap.to(image, {
                scale: 1,
                duration: 0.4,
                ease: "power3.out",
            });
        }
    };

    return (
        <AppLayout>
            <div ref={pageRef} className="min-h-screen bg-[#fafafa] text-[#171717]">
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-[11px] font-medium tracking-[0.2em] text-[#8f8f8f]">
                                Collection
                            </p>
                            <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em] text-[#171717] sm:text-4xl">
                                Curated essentials
                            </h1>
                        </div>
                        <button
                            type="button"
                            aria-label={isFilterOpen ? "Hide filters" : "Show filters"}
                            aria-expanded={isFilterOpen}
                            onClick={() => setIsFilterOpen((value) => !value)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#171717] shadow-sm transition hover:border-[#171717] hover:bg-[#fafafa]"
                        >
                            <FiFilter className="text-base" />
                        </button>
                    </div>
                    <p className="text-sm text-[#4d4d4d]">{filteredProducts.length} items available</p>
                </div>

                <div
                    className={
                        isFilterOpen ? "grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]" : "grid gap-6 lg:grid-cols-1"
                    }
                >
                    {isFilterOpen ? (
                        <ProductFilterSidebar
                            category={category}
                            selectedPrice={selectedPrice}
                            selectedColor={selectedColor}
                            selectedSize={selectedSize}
                            selectedStatus={selectedStatus}
                            search={search}
                            onSearchChange={(value) => {
                                setSearch(value);
                                setCurrentPage(1);
                            }}
                            onCategoryChange={(value) => {
                                setCategory(value);
                                setCurrentPage(1);
                            }}
                            onPriceChange={(value) => {
                                setSelectedPrice(value);
                                setCurrentPage(1);
                            }}
                            onColorChange={(value) => {
                                setSelectedColor(value);
                                setCurrentPage(1);
                            }}
                            onSizeChange={(value) => {
                                setSelectedSize(value);
                                setCurrentPage(1);
                            }}
                            onStatusChange={(value) => {
                                setSelectedStatus(value);
                                setCurrentPage(1);
                            }}
                            onReset={resetFilters}
                        />
                    ) : null}

                    <section data-product-animate className="space-y-6">
                        <div className="flex flex-col gap-4 rounded-3xl border border-[#ebebeb] bg-white p-4 shadow-[0_10px_22px_rgba(23,23,23,0.02)] sm:p-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-[11px] font-medium tracking-[0.18em] text-[#8f8f8f] uppercase">
                                    Showing products
                                </p>
                                <p className="mt-2 text-lg font-medium text-[#171717]">
                                    {filteredProducts.length > 0
                                        ? `Page ${safeCurrentPage} of ${totalPages}`
                                        : "No matches found"}
                                </p>
                            </div>
                            <div className="rounded-full border border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm text-[#4d4d4d]">
                                {filteredProducts.length} results
                            </div>
                        </div>

                        {paginatedProducts.length > 0 ? (
                            <ProductGrid
                                products={paginatedProducts}
                                onCardEnter={handleCardEnter}
                                onCardLeave={handleCardLeave}
                            />
                        ) : (
                            <div className="rounded-3xl border border-dashed border-[#d9d9d9] bg-white py-16 text-center">
                                <p className="text-xl font-medium text-[#171717]">
                                    No products match your filters.
                                </p>
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="mt-4 rounded-full border border-[#171717] bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
                                >
                                    Reset filters
                                </button>
                            </div>
                        )}

                        {filteredProducts.length > 0 ? (
                            <ProductPagination
                                currentPage={safeCurrentPage}
                                totalPages={totalPages}
                                filteredCount={filteredProducts.length}
                                pageSize={pageSize}
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
