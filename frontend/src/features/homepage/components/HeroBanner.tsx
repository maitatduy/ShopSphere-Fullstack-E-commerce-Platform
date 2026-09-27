import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { HeroSlide } from "../data/homepageData";

type HeroBannerProps = {
    slides: HeroSlide[];
    activeIndex: number;
    onNext: () => void;
    onPrev: () => void;
    onSelect: (index: number) => void;
};

export function HeroBanner({ slides, activeIndex, onNext, onPrev, onSelect }: HeroBannerProps) {
    const slide = slides[activeIndex];

    const eyebrowRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const subtitleRef = useRef<HTMLParagraphElement | null>(null);
    const descriptionRef = useRef<HTMLParagraphElement | null>(null);
    const actionsRef = useRef<HTMLDivElement | null>(null);
    const imageWrapRef = useRef<HTMLDivElement | null>(null);
    const isFirstRender = useRef(true);
    const isAnimatingRef = useRef(false);

    useLayoutEffect(() => {
        const textTargets = [
            eyebrowRef.current,
            titleRef.current,
            subtitleRef.current,
            descriptionRef.current,
            actionsRef.current,
        ].filter(Boolean);

        isAnimatingRef.current = true;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                onComplete: () => {
                    isAnimatingRef.current = false;
                },
            });

            if (isFirstRender.current) {
                tl.from(textTargets, {
                    y: 24,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.08,
                }).from(imageWrapRef.current, { opacity: 0, scale: 1.05, duration: 0.9 }, "<");
                isFirstRender.current = false;
                return;
            }

            tl.to(textTargets, {
                y: -16,
                opacity: 0,
                duration: 0.3,
                stagger: 0.03,
            })
                .to(imageWrapRef.current, { opacity: 0, scale: 0.97, duration: 0.3 }, "<")
                .set(textTargets, { y: 24 })
                .to(textTargets, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                })
                .to(imageWrapRef.current, { opacity: 1, scale: 1, duration: 0.7 }, "<");
        });

        return () => {
            ctx.revert();
            isAnimatingRef.current = false;
        };
    }, [activeIndex]);

    const handleNext = () => {
        if (isAnimatingRef.current) return;
        onNext();
    };

    const handlePrev = () => {
        if (isAnimatingRef.current) return;
        onPrev();
    };

    const handleSelect = (index: number) => {
        if (isAnimatingRef.current || index === activeIndex) return;
        onSelect(index);
    };

    return (
        <section data-homepage-animate className="relative overflow-hidden bg-[#fafafa]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(80,227,194,0.22),transparent_26%),radial-gradient(circle_at_top_right,rgba(121,40,202,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,0,128,0.12),transparent_35%)]" />
            <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-8 lg:py-20">
                <div className="flex flex-col justify-center">
                    <h1
                        ref={titleRef}
                        className="max-w-xl text-[2rem] font-semibold leading-[1.15] tracking-[-0.06em] text-[#171717] sm:text-[2.8rem] lg:text-[4.2rem]"
                    >
                        {slide.title}
                    </h1>
                    <p
                        ref={subtitleRef}
                        className="mt-5 text-[0.95rem] font-medium text-[#4d4d4d] sm:text-[1.1rem] lg:mt-8 lg:text-[1.2rem]"
                    >
                        {slide.subtitle}
                    </p>

                    <div ref={actionsRef} className="mt-5 flex flex-wrap items-center gap-3 lg:mt-7">
                        <button type="button" className="rounded-full bg-[#171717] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2b2b2b] sm:px-7 sm:py-3">
                            Mua ngay
                        </button>
                        <button type="button" className="rounded-full border border-[#d1d1d1] bg-white px-5 py-2.5 text-sm font-medium text-[#171717] transition hover:border-[#171717] sm:px-7 sm:py-3">
                            Khám phá
                        </button>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3 lg:mt-8">
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#171717] transition hover:border-[#171717]"
                            aria-label="Slide trước"
                        >
                            <FiChevronLeft />
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#171717] transition hover:border-[#171717]"
                            aria-label="Slide tiếp theo"
                        >
                            <FiChevronRight />
                        </button>
                        <div className="ml-1 flex items-center gap-2">
                            {slides.map((item, index) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelect(index)}
                                    className={[
                                        "h-2 rounded-full transition-all duration-500",
                                        index === activeIndex
                                            ? "w-8 bg-[#171717]"
                                            : "w-2 bg-[#d9d9d9] hover:bg-[#8f8f8f]",
                                    ].join(" ")}
                                    aria-label={`Chuyển đến slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Image: shown on all screen sizes, positioned differently on mobile */}
                <div className="relative flex items-center justify-center">
                    <div
                        className={`absolute inset-2 rounded-3xl bg-linear-to-br ${slide.accent} opacity-50 blur-3xl sm:inset-4 lg:inset-6`}
                    />
                    <div
                        ref={imageWrapRef}
                        className="relative w-full overflow-hidden rounded-2xl border border-[#ebebeb] bg-white p-1.5 shadow-[0_8px_30px_rgba(23,23,23,0.07)] sm:rounded-3xl sm:p-2 lg:rounded-[1.8rem] lg:p-3"
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            loading="eager"
                            decoding="async"
                            className="h-52 w-full rounded-xl object-cover sm:h-72 sm:rounded-2xl lg:h-112 lg:rounded-[1.3rem]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
