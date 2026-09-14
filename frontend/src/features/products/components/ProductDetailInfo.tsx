import { useState } from "react";
import {
    FiCheck,
    FiMinus,
    FiPlus,
    FiShield,
    FiShoppingBag,
    FiStar,
    FiTruck,
} from "react-icons/fi";
import type { ProductListItem } from "../data/productsData";

function FeaturePill({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-[#ebebeb] bg-white p-3 text-sm text-[#4d4d4d]">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fafafa] text-[#171717]">
                {icon}
            </div>
            <span>{label}</span>
        </div>
    );
}

export function ProductDetailInfo({ product }: { product: ProductListItem }) {
    const [selectedSize, setSelectedSize] = useState(product.size[0] ?? "M");
    const [quantity, setQuantity] = useState(1);

    return (
        <div data-product-detail-animate className="space-y-6">
            <div className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#8f8f8f]">
                <span>{product.category}</span>
                <span className="text-[#d0d0d0]">/</span>
                <span>{product.color}</span>
            </div>

            <div>
                <h1 className="text-3xl font-medium tracking-[-0.06em] text-[#171717] sm:text-4xl lg:text-[2.9rem]">
                    {product.name}
                </h1>
                <div className="mt-4 flex items-center gap-3 text-sm text-[#4d4d4d]">
                    <div className="flex items-center gap-1 text-[#171717]">
                        <FiStar className="text-base fill-[#171717]" />
                        <span className="font-medium">{product.rating}</span>
                    </div>
                    <span>•</span>
                    <span>24 reviews</span>
                </div>
            </div>

            <div className="flex items-end gap-3">
                <span className="text-3xl font-semibold tracking-tighter text-[#171717]">
                    ${product.price}
                </span>
                {product.oldPrice ? (
                    <span className="pb-1 text-base text-[#8f8f8f] line-through">${product.oldPrice}</span>
                ) : null}
            </div>

            <div className="rounded-2xl border border-[#ebebeb] bg-[#fafafa] p-4">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#8f8f8f]">
                        Color
                    </p>
                    <span className="text-sm text-[#4d4d4d]">{product.color}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    {["Sand", "Ivory", "Charcoal", "Navy", "Black"].map((color) => (
                        <button
                            key={color}
                            type="button"
                            className={[
                                "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
                                product.color === color
                                    ? "border-[#171717] bg-[#171717] text-white shadow-[0_10px_20px_rgba(23,23,23,0.12)]"
                                    : "border-[#e7e7e7] bg-white text-[#171717] hover:border-[#171717]",
                            ].join(" ")}
                            aria-label={`Select ${color}`}
                            onClick={() => setSelectedSize(product.size[0] ?? "M")}
                        >
                            {product.color === color ? <FiCheck className="text-base" /> : null}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#8f8f8f]">
                        Size
                    </p>
                    <button type="button" className="text-sm font-medium text-[#171717] underline-offset-4 hover:underline">
                        Size guide
                    </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                    {product.size.map((size) => (
                        <button
                            key={size}
                            type="button"
                            onClick={() => setSelectedSize(size)}
                            className={[
                                "inline-flex min-w-12 items-center justify-center rounded-full border px-3 py-2 text-sm font-medium transition",
                                selectedSize === size
                                    ? "border-[#171717] bg-[#171717] text-white"
                                    : "border-[#ebebeb] bg-white text-[#171717] hover:border-[#171717]",
                            ].join(" ")}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
                <div className="inline-flex items-center rounded-full border border-[#ebebeb] bg-white p-1 shadow-[0_8px_16px_rgba(23,23,23,0.02)]">
                    <button
                        type="button"
                        onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#171717] transition hover:bg-[#f5f5f5]"
                        aria-label="Decrease quantity"
                    >
                        <FiMinus className="text-base" />
                    </button>
                    <span className="min-w-12 text-center text-base font-medium text-[#171717]">
                        {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() => setQuantity((value) => value + 1)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#171717] transition hover:bg-[#f5f5f5]"
                        aria-label="Increase quantity"
                    >
                        <FiPlus className="text-base" />
                    </button>
                </div>

                <button
                    type="button"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
                >
                    <FiShoppingBag className="text-base" />
                    Add to cart
                </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <FeaturePill icon={<FiTruck />} label="Free shipping over $150" />
                <FeaturePill icon={<FiShield />} label="2 year warranty" />
            </div>
        </div>
    );
}
