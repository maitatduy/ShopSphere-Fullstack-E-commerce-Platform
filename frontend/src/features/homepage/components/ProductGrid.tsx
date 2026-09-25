import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import type { Product } from "../data/homepageData";

export function ProductGrid({ items, title }: { items: Product[]; title: string }) {
    const navigate = useNavigate();

    const handleCardEnter = (event: React.MouseEvent<HTMLElement>) => {
        const card = event.currentTarget;
        const image = card.querySelector("img");

        gsap.to(card, {
            y: -12,
            rotateX: 2,
            rotateY: -2,
            boxShadow: "0 26px 48px rgba(23,23,23,0.12)",
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

    const handleCardLeave = (event: React.MouseEvent<HTMLElement>) => {
        const card = event.currentTarget;
        const image = card.querySelector("img");

        gsap.to(card, {
            y: 0,
            rotateX: 0,
            rotateY: 0,
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
        <section data-homepage-animate className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
                        Tuyển chọn nổi bật
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.07em] text-[#171717] sm:text-3xl">
                        {title}
                    </h2>
                </div>
                <button className="w-fit rounded-full border border-[#ebebeb] bg-white px-4 py-2 text-sm font-medium text-[#171717] transition hover:border-[#171717]">
                    Xem tất cả
                </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {items.map((item) => (
                    <article
                        key={item.id}
                        onMouseEnter={handleCardEnter}
                        onMouseLeave={handleCardLeave}
                        onClick={() => navigate(`/products/${item.id}`)}
                        className="group cursor-pointer overflow-hidden rounded-[1.25rem] border border-[#ebebeb] bg-white transition-transform"
                    >
                        <div className={`relative overflow-hidden ${item.accent}`}>
                            <img
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                decoding="async"
                                className="h-80 w-full object-cover transition duration-500"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow-sm hover:bg-white"
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                            >
                                ♡
                            </button>
                        </div>

                        <div className="space-y-3 p-5">
                            <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
                                <span>{item.category}</span>
                                <span>Mới</span>
                            </div>

                            <h3 className="text-lg font-medium text-[#171717]">{item.name}</h3>

                            <div className="flex items-center gap-2">
                                <span className="text-lg font-semibold text-[#171717]">
                                    ${item.price}
                                </span>
                                {item.oldPrice ? (
                                    <span className="text-sm text-[#8f8f8f] line-through">
                                        ${item.oldPrice}
                                    </span>
                                ) : null}
                            </div>

                            <button
                                type="button"
                                className="w-full rounded-full bg-[#171717] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
                                onClick={(event) => {
                                    event.stopPropagation();
                                }}
                            >
                                Thêm vào giỏ
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
