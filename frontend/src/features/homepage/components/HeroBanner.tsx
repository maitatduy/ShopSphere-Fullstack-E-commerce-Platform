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

    useLayoutEffect(() => {
        const textTargets = [
            eyebrowRef.current,
            titleRef.current,
            subtitleRef.current,
            descriptionRef.current,
            actionsRef.current,
        ].filter(Boolean);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
            });

            if (isFirstRender.current) {
                tl.from(textTargets, {
                    y: 24,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.08,
                }).from(
                    imageWrapRef.current,
                    { opacity: 0, scale: 1.05, duration: 0.9 },
                    "<",
                );
                isFirstRender.current = false;
                return;
            }

            tl.to(textTargets, {
                y: -16,
                opacity: 0,
                duration: 0.3,
                stagger: 0.03,
            })
                .to(
                    imageWrapRef.current,
                    { opacity: 0, scale: 0.97, duration: 0.3 },
                    "<",
                )
                .set(textTargets, { y: 24 })
                .to(textTargets, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                })
                .to(
                    imageWrapRef.current,
                    { opacity: 1, scale: 1, duration: 0.7 },
                    "<",
                );
        });

        return () => ctx.revert();
    }, [activeIndex]);

    return (
        <section data-homepage-animate className="relative overflow-hidden bg-[#fafafa]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(80,227,194,0.22),transparent_26%),radial-gradient(circle_at_top_right,rgba(121,40,202,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,0,128,0.12),transparent_35%)]" />
            <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-8 lg:py-20">
                <div className="flex flex-col justify-center">
                    <div
                        ref={eyebrowRef}
                        className="mb-4 inline-flex w-fit rounded-full border border-[#ebebeb] bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#4d4d4d] sm:text-[11px]"
                    >
                        {slide.eyebrow}
                    </div>
                    <h1
                        ref={titleRef}
                        className="max-w-xl text-[2.2rem] font-semibold leading-[0.96] tracking-[-0.08em] text-[#171717] sm:text-[3rem] lg:text-[5rem]"
                    >
                        {slide.title}
                    </h1>
                    <p
                        ref={subtitleRef}
                        className="mt-4 text-[1rem] font-medium text-[#171717] sm:text-[1.2rem] lg:text-[1.3rem]"
                    >
                        {slide.subtitle}
                    </p>
                    <p
                        ref={descriptionRef}
                        className="mt-3 max-w-lg text-[0.96rem] leading-7 text-[#4d4d4d] sm:text-[1rem]"
                    >
                        {slide.description}
                    </p>

                    <div ref={actionsRef} className="mt-8 flex flex-wrap items-center gap-3">
                        <button className="rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#2b2b2b] sm:px-7">
                            Shop now
                        </button>
                        <button className="rounded-full border border-[#171717] bg-white px-6 py-3 text-sm font-medium text-[#171717] transition hover:bg-[#f5f5f5] sm:px-7">
                            Explore
                        </button>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-4">
                        <button
                            type="button"
                            onClick={onPrev}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#171717] transition hover:border-[#171717]"
                            aria-label="Previous slide"
                        >
                            <FiChevronLeft />
                        </button>
                        <button
                            type="button"
                            onClick={onNext}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#171717] transition hover:border-[#171717]"
                            aria-label="Next slide"
                        >
                            <FiChevronRight />
                        </button>
                        <div className="ml-1 flex items-center gap-2">
                            {slides.map((item, index) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => onSelect(index)}
                                    className={[
                                        "h-2.5 rounded-full transition-all duration-500",
                                        index === activeIndex
                                            ? "w-10 bg-[#171717]"
                                            : "w-2.5 bg-[#d9d9d9] hover:bg-[#8f8f8f]",
                                    ].join(" ")}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="hidden lg:relative lg:flex lg:items-center lg:justify-center">
                    <div
                        className={`absolute inset-4 rounded-4xl bg-linear-to-br ${slide.accent} opacity-60 blur-3xl sm:inset-6`}
                    />
                    <div
                        ref={imageWrapRef}
                        className="relative w-full overflow-hidden rounded-[1.8rem] border border-[#ebebeb] bg-white p-2 shadow-[0_12px_40px_rgba(23,23,23,0.08)] sm:rounded-4xl sm:p-3"
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            loading="eager"
                            decoding="async"
                            className="h-72 w-full rounded-[1.3rem] object-cover sm:h-96 lg:h-128"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}