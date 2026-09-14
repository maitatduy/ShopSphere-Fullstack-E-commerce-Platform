import { FiCheck } from "react-icons/fi";
import type { ProductListItem } from "../data/productsData";

export function ProductDescription({ product }: { product: ProductListItem }) {
    const details = [
        "Structured design with a relaxed, wearable fit.",
        "Premium fabric blend for breathability and softness.",
        "Crafted for layering across seasons and everyday styling.",
    ];

    return (
        <section data-product-detail-animate className="rounded-4xl border border-[#ebebeb] bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-[#ebebeb] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
                        Product details
                    </p>
                    <h2 className="mt-2 text-2xl font-medium tracking-tighter text-[#171717]">
                        Built for everyday movement
                    </h2>
                </div>
                <div className="rounded-full border border-[#ebebeb] bg-[#fafafa] px-3 py-2 text-sm text-[#4d4d4d]">
                    {product.category}
                </div>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="space-y-5">
                    <p className="text-base leading-7 text-[#4d4d4d]">
                        A refined everyday essential designed with quiet confidence and subtle structure.
                        Crafted to feel polished enough for city days while remaining easy and effortless for
                        everyday wear.
                    </p>
                    <p className="text-base leading-7 text-[#4d4d4d]">
                        The silhouette balances clean lines and relaxed comfort, making it a versatile piece
                        that works layered, dressed up, or styled simply with the rest of your wardrobe.
                    </p>
                </div>

                <ul className="space-y-3 text-sm text-[#4d4d4d]">
                    {details.map((detail) => (
                        <li key={detail} className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#171717] text-[10px] text-white">
                                <FiCheck />
                            </span>
                            <span>{detail}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
