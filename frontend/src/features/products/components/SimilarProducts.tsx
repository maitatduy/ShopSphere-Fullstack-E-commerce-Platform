import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { productListItems } from "../data/productsData";

const productToneMap: Record<string, string> = {
    Sand: "bg-stone-100",
    Ivory: "bg-amber-50",
    Cocoa: "bg-rose-50",
    Charcoal: "bg-slate-100",
    Black: "bg-zinc-100",
    Olive: "bg-emerald-50",
    Sky: "bg-cyan-50",
    Rose: "bg-rose-50",
    Lilac: "bg-violet-50",
    Terracotta: "bg-orange-50",
    Stone: "bg-stone-100",
    Navy: "bg-sky-50",
};

export function SimilarProducts() {
    const items = productListItems.slice(0, 4);

    return (
        <section data-product-detail-animate className="space-y-6">
            <div className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
                        Sản phẩm tương tự
                    </p>
                    <h2 className="mt-2 text-2xl font-medium tracking-tighter text-[#171717]">
                        Gợi ý cho bạn
                    </h2>
                </div>
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#171717] underline-offset-4 hover:underline"
                >
                    Xem tất cả <FiChevronRight className="text-base" />
                </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        to={`/products/${item.id}`}
                        className="group overflow-hidden rounded-[1.6rem] border border-[#ebebeb] bg-white transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(23,23,23,0.06)]"
                    >
                        <div className={`relative overflow-hidden ${productToneMap[item.color] ?? "bg-stone-100"}`}>
                            <img
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                decoding="async"
                                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-[#171717]">
                                {item.status === "new" ? "Mới" : "Nổi bật"}
                            </div>
                        </div>

                        <div className="space-y-3 p-4">
                            <div className="flex items-center justify-between gap-2 text-[0.62rem] uppercase tracking-[0.14em] text-[#8f8f8f]">
                                <span>{item.category}</span>
                                <span>{item.color}</span>
                            </div>
                            <h3 className="text-lg font-medium text-[#171717]">{item.name}</h3>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-lg font-semibold text-[#171717]">${item.price}</span>
                                {item.oldPrice ? (
                                    <span className="text-sm text-[#8f8f8f] line-through">${item.oldPrice}</span>
                                ) : null}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
