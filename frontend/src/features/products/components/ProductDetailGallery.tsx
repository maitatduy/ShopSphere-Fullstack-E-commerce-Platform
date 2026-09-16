import { useState } from "react";
import { FiHeart } from "react-icons/fi";

export function ProductDetailGallery({ images }: { images: string[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div data-product-detail-animate className="grid gap-4 lg:grid-cols-[88px_minmax(0,1fr)]">
            <div className="order-2 grid grid-cols-4 gap-3 lg:order-1 lg:grid-cols-1">
                {images.map((image, index) => (
                    <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={[
                            "overflow-hidden rounded-2xl border transition-all duration-300",
                            activeIndex === index
                                ? "border-[#171717] shadow-[0_8px_18px_rgba(23,23,23,0.08)]"
                                : "border-[#ebebeb] hover:border-[#9a9a9a]",
                        ].join(" ")}
                        aria-label={`View product image ${index + 1}`}
                    >
                        <img
                            src={image}
                            alt="Product detail thumbnail"
                            loading="lazy"
                            decoding="async"
                            className="h-20 w-full object-cover lg:h-24"
                        />
                    </button>
                ))}
            </div>

            <div className="order-1 overflow-hidden rounded-4xl border border-[#ebebeb] bg-white p-2 shadow-[0_18px_40px_rgba(23,23,23,0.04)] lg:order-2">
                <div className="relative overflow-hidden rounded-3xl bg-[#f5f5f5]">
                    <img
                        src={images[activeIndex]}
                        alt="Selected product view"
                        loading="eager"
                        className="h-105 w-full object-cover transition duration-500 ease-out sm:h-130 lg:h-160"
                    />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-[#171717]">
                            New
                        </span>
                    </div>
                    <button
                        type="button"
                        className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow-sm transition hover:bg-white"
                        aria-label="Save product"
                    >
                        <FiHeart className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
}
