import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CategoryShowcase } from "../components/CategoryShowcase";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HeroBanner } from "../components/HeroBanner";
import { ProductGrid } from "../components/ProductGrid";
import { heroSlides, menCategories, newArrivals, womenCategories } from "../data/homepageData";
import { useAutoSlider } from "../hooks/useAutoSlider";

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
    const { activeIndex, goToNext, goToPrevious } = useAutoSlider(heroSlides.length);
    const pageRef = useRef<HTMLDivElement | null>(null);

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

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div ref={pageRef} className="min-h-screen bg-[#fafafa] text-[#171717]">
            <Header />
            <main>
                <HeroBanner
                    slides={heroSlides}
                    activeIndex={activeIndex}
                    onNext={goToNext}
                    onPrev={goToPrevious}
                />

                <ProductGrid items={newArrivals} title="New Arrivals" />

                <CategoryShowcase title="Category for men" items={menCategories} />
                <CategoryShowcase title="Category for women" items={womenCategories} />
            </main>

            <Footer />
        </div>
    );
}
