import { FiShoppingBag } from "react-icons/fi";
import type { ProductListItem } from "../data/productsData";

export type ProductGridProps = {
    products: ProductListItem[];
    onCardEnter: (event: React.MouseEvent<HTMLElement>) => void;
    onCardLeave: (event: React.MouseEvent<HTMLElement>) => void;
};

export function ProductGrid({ products, onCardEnter, onCardLeave }: ProductGridProps) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((item) => (
                <article
                    key={item.id}
                    onMouseEnter={onCardEnter}
                    onMouseLeave={onCardLeave}
                    className="group overflow-hidden rounded-3xl border border-[#ebebeb] bg-white"
                >
                    <div className={`relative overflow-hidden ${item.accent}`}>
                        <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="h-80 w-full object-cover"
                        />
                        <div className="absolute left-4 top-4 flex items-center gap-2">
                            {item.status === "new" ? (
                                <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-[#171717]">
                                    New
                                </span>
                            ) : (
                                <span className="rounded-full bg-[#171717] px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-white">
                                    Recommend
                                </span>
                            )}
                        </div>
                        <button className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow-sm transition hover:bg-white">
                            ♡
                        </button>
                    </div>

                    <div className="space-y-3 p-5">
                        <div className="flex items-center justify-between gap-3 text-[0.625rem] tracking-[0.14em] text-[#8f8f8f] uppercase">
                            <span>{item.category}</span>
                            <span>{item.color}</span>
                        </div>

                        <h3 className="text-lg font-medium text-[#171717]">{item.name}</h3>

                        <div className="flex items-center gap-2 text-sm text-[#4d4d4d]">
                            <span>★ {item.rating}</span>
                            <span>•</span>
                            <span>{item.size.join(", ")}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-[#171717]">${item.price}</span>
                            {item.oldPrice ? (
                                <span className="text-sm text-[#8f8f8f] line-through">${item.oldPrice}</span>
                            ) : null}
                        </div>

                        <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2b2b2b]">
                            <FiShoppingBag className="text-sm" />
                            Add to cart
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
}
