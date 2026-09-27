import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";

export type ProductGridProps = {
    products: Product[];
    onCardEnter: (event: React.MouseEvent<HTMLElement>) => void;
    onCardLeave: (event: React.MouseEvent<HTMLElement>) => void;
};

export function ProductGrid({ products, onCardEnter, onCardLeave }: ProductGridProps) {
    const navigate = useNavigate();

    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((item) => (
                <article
                    key={item.id}
                    onMouseEnter={onCardEnter}
                    onMouseLeave={onCardLeave}
                    onClick={() => navigate(`/products/${item.id}`)}
                    className="group cursor-pointer overflow-hidden rounded-3xl border border-[#ebebeb] bg-white transition hover:border-[#171717]"
                >
                    <div className="relative overflow-hidden bg-[#f5f5f5]">
                        <div className="h-52 w-full bg-[#f0f0f0] flex items-center justify-center text-[#8f8f8f] text-sm sm:h-64 lg:h-72">
                            {item.name}
                        </div>
                        {item.newArrival ? (
                            <div className="absolute left-4 top-4">
                                <span className="rounded-full bg-white/90 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-[#171717]">
                                    New
                                </span>
                            </div>
                        ) : null}
                        <button
                            type="button"
                            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#171717] shadow-sm transition hover:bg-white"
                            onClick={(event) => event.stopPropagation()}
                        >
                            ♡
                        </button>
                    </div>

                    <div className="space-y-3 p-5">
                        <div className="flex items-center justify-between gap-3 text-[0.625rem] tracking-[0.14em] text-[#8f8f8f] uppercase">
                            <span>{item.categoryName}</span>
                            <span>{item.brand}</span>
                        </div>

                        <h3 className="text-lg font-medium text-[#171717]">{item.name}</h3>

                        {item.rating ? (
                            <div className="flex items-center gap-2 text-sm text-[#4d4d4d]">
                                <span>★ {item.rating}</span>
                            </div>
                        ) : null}

                        <div className="flex items-center gap-2">
                            <span className="text-lg font-semibold text-[#171717]">
                                ${item.price}
                            </span>
                        </div>

                        <button
                            type="button"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <FiShoppingBag className="text-sm" />
                            Thêm vào giỏ
                        </button>
                    </div>
                </article>
            ))}
        </div>
    );
}
