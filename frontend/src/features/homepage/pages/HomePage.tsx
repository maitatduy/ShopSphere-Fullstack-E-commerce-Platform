import { CategoryShowcase } from "../components/CategoryShowcase";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HeroBanner } from "../components/HeroBanner";
import { ProductGrid } from "../components/ProductGrid";
import { heroSlides, menCategories, newArrivals, womenCategories } from "../data/homepageData";
import { useAutoSlider } from "../hooks/useAutoSlider";

export function HomePage() {
    const { activeIndex, goToNext, goToPrevious } = useAutoSlider(heroSlides.length);

    return (
        <div className="min-h-screen bg-[#fafafa] text-[#171717]">
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
