import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { HeroSlide } from "../data/homepageData";

type HeroBannerProps = {
    slides: HeroSlide[];
    activeIndex: number;
    onNext: () => void;
    onPrev: () => void;
};

export function HeroBanner({ slides, activeIndex, onNext, onPrev }: HeroBannerProps) {
    const slide = slides[activeIndex];

    return (
        <section className="relative overflow-hidden bg-[#fafafa]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(80,227,194,0.22),transparent_26%),radial-gradient(circle_at_top_right,rgba(121,40,202,0.18),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,0,128,0.12),transparent_35%)]" />
            <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
                <div className="flex flex-col justify-center">
                    <div className="mb-4 inline-flex w-fit rounded-full border border-[#ebebeb] bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#4d4d4d]">
                        {slide.eyebrow}
                    </div>
                    <h1 className="max-w-xl text-[2.7rem] font-semibold leading-[0.96] tracking-[-0.08em] text-[#171717] sm:text-[3.5rem] lg:text-[5rem]">
                        {slide.title}
                    </h1>
                    <p className="mt-4 text-[1.1rem] font-medium text-[#171717] sm:text-[1.3rem]">
                        {slide.subtitle}
                    </p>
                    <p className="mt-3 max-w-lg text-[1rem] leading-7 text-[#4d4d4d]">
                        {slide.description}
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <button className="rounded-full bg-[#171717] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#2b2b2b]">
                            Shop now
                        </button>
                        <button className="rounded-full border border-[#171717] bg-white px-7 py-3 text-sm font-medium text-[#171717] transition hover:bg-[#f5f5f5]">
                            Explore lookbook
                        </button>
                    </div>

                    <div className="mt-10 flex items-center gap-4">
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
                        <div className="ml-2 flex items-center gap-2">
                            {slides.map((item, index) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        if (index !== activeIndex) {
                                            const difference = index - activeIndex;
                                            if (difference > 0) onNext();
                                            else onPrev();
                                        }
                                    }}
                                    className={[
                                        "h-2.5 rounded-full transition-all",
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

                <div className="relative flex items-center justify-center">
                    <div
                        className={`absolute inset-6 rounded-[2rem] bg-gradient-to-br ${slide.accent} opacity-60 blur-3xl`}
                    />
                    <div className="relative w-full overflow-hidden rounded-[2rem] border border-[#ebebeb] bg-white p-3 shadow-[0_12px_40px_rgba(23,23,23,0.08)]">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="h-[32rem] w-full rounded-[1.5rem] object-cover sm:h-[35rem]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
