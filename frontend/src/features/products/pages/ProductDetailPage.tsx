import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowLeft, FiChevronRight } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { AppLayout } from "../../../shared/layouts/AppLayout";
import { ProductDescription } from "../components/ProductDescription";
import { ProductDetailGallery } from "../components/ProductDetailGallery";
import { ProductDetailInfo } from "../components/ProductDetailInfo";
import { SimilarProducts } from "../components/SimilarProducts";
import { productListItems } from "../data/productsData";

gsap.registerPlugin(ScrollTrigger);

export function ProductDetailPage() {
    const { productId } = useParams();
    const pageRef = useRef<HTMLDivElement | null>(null);

    const product = useMemo(
        () => productListItems.find((item) => item.id === Number(productId)) ?? productListItems[0],
        [productId],
    );

    const galleryImages = useMemo(() => {
        const base = productListItems.filter((item) => item.id !== product.id).map((item) => item.image);
        return [product.image, ...base.slice(0, 3)];
    }, [product]);

    useEffect(() => {
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
        <AppLayout>
            <div ref={pageRef} className="min-h-screen bg-[#fafafa] text-[#171717]">
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <nav className="mb-8 flex items-center gap-2 text-sm text-[#8f8f8f]">
                    <Link to="/" className="transition hover:text-[#171717]">
                        Home
                    </Link>
                    <FiChevronRight className="text-base" />
                    <Link to="/products" className="transition hover:text-[#171717]">
                        Shop
                    </Link>
                    <FiChevronRight className="text-base" />
                    <span className="text-[#171717]">{product.name}</span>
                </nav>

                <div className="mb-8 flex items-center justify-between gap-3">
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-4 py-2.5 text-sm font-medium text-[#171717] transition hover:border-[#171717]"
                    >
                        <FiArrowLeft className="text-base" />
                        Back to shop
                    </Link>
                    <div className="hidden items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-3 py-2 text-sm text-[#4d4d4d] sm:inline-flex">
                        <span>In stock</span>
                        <span className="h-2 w-2 rounded-full bg-[#1db954]" />
                    </div>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                    <ProductDetailGallery images={galleryImages} />
                    <ProductDetailInfo product={product} />
                </div>

                <div className="mt-10 space-y-8">
                    <ProductDescription product={product} />
                    <SimilarProducts />
                </div>
                </main>
            </div>
        </AppLayout>
    );
}
