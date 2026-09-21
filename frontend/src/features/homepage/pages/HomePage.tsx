import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCategories } from "../../categories/hooks/useCategories";
import { CategoryShowcase } from "../components/CategoryShowcase";
import { HeroBanner } from "../components/HeroBanner";
import { AppLayout } from "../../../shared/layouts/AppLayout";
import { ProductGrid } from "../components/ProductGrid";
import { heroSlides, menCategories, newArrivals, womenCategories } from "../data/homepageData";
import { useAutoSlider } from "../hooks/useAutoSlider";

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
    const { activeIndex, goToNext, goToPrevious, goToIndex } = useAutoSlider(heroSlides.length);
    const pageRef = useRef<HTMLDivElement | null>(null);
    const { categories, loading, error } = useCategories();

    const categoryGroups = useMemo(() => {
        const mapped = categories.slice(0, 6).map((category, index) => ({
            id: category.id,
            title: category.name,
            subtitle: category.description || (index % 2 === 0 ? "Curated essentials" : "Modern staples"),
            image:
                category.image ||
                [
                    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
                    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
                    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
                    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
                    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
                    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
                ][index % 6],
            href: `/products?category=${category.id}`,
        }));

        return mapped.length > 0 ? mapped : menCategories.slice(0, 3);
    }, [categories]);

    useEffect(() => {
        const sections = gsap.utils.toArray<HTMLElement>("[data-homepage-animate]");

        const ctx = gsap.context(() => {
            sections.forEach((section) => {
                gsap.fromTo(
                    section,
                    {
                        opacity: 0,
                        y: 50,
                        filter: "blur(8px)",
                    },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 82%",
                            once: true,
                        },
                    },
                );
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <AppLayout className="" showHeader showFooter>
            <div ref={pageRef} className="min-h-screen bg-[#fafafa] text-[#171717]">
                <main>
                <HeroBanner
                    slides={heroSlides}
                    activeIndex={activeIndex}
                    onNext={goToNext}
                    onPrev={goToPrevious}
                    onSelect={goToIndex}
                />

                <ProductGrid items={newArrivals} title="New Arrivals" />

                {error ? (
                    <div className="mx-auto max-w-7xl px-4 pb-4 text-sm text-[#8f8f8f] sm:px-6 lg:px-8">
                        Unable to load categories from server, showing demo categories instead.
                    </div>
                ) : null}

                {loading && categories.length === 0 ? (
                    <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-[#8f8f8f] sm:px-6 lg:px-8">
                        Loading categories...
                    </div>
                ) : null}

                <CategoryShowcase title="Shop by category" items={categoryGroups.slice(0, 3)} />
                <CategoryShowcase title="Featured styles" items={categoryGroups.slice(3, 6).length > 0 ? categoryGroups.slice(3, 6) : womenCategories} />
                </main>
            </div>
        </AppLayout>
    );
}