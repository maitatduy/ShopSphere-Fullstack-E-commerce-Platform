import type { Product } from "../data/homepageData";

export function ProductGrid({ items, title }: { items: Product[]; title: string }) {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
                        Curated picks
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.07em] text-[#171717]">
                        {title}
                    </h2>
                </div>
                <button className="rounded-full border border-[#ebebeb] bg-white px-4 py-2 text-sm font-medium text-[#171717] transition hover:border-[#171717]">
                    View all
                </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {items.map((item) => (
                    <article
                        key={item.id}
                        className="group overflow-hidden rounded-[1.25rem] border border-[#ebebeb] bg-white transition hover:-translate-y-1 hover:shadow-[0_12px_20px_rgba(23,23,23,0.04)]"
                    >
                        <div className={`relative overflow-hidden ${item.accent}`}>
                            <img
                                src={item.image}
                                alt={item.name}
                                className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                            <button className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow-sm hover:bg-white">
                                ♡
                            </button>
                        </div>

                        <div className="space-y-3 p-5">
                            <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">
                                <span>{item.category}</span>
                                <span>New</span>
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

                            <button className="w-full rounded-full bg-[#171717] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2b2b2b]">
                                Add to cart
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
