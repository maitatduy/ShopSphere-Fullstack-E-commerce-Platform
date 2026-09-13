import { FiFilter, FiSearch } from "react-icons/fi";
import {
    categories,
    colorOptions,
    sizeOptions,
    statusOptions,
} from "../data/productsData";

const colorSwatches: Record<string, string> = {
    All: "#f3f4f6",
    Sand: "#d8c7a4",
    Ivory: "#f4efe8",
    Cocoa: "#7b4b3a",
    Charcoal: "#4a4a4a",
    Black: "#1f1f1f",
    Olive: "#65714a",
    Sky: "#83b6d8",
    Rose: "#d99aa3",
    Lilac: "#b7a4d7",
    Terracotta: "#c77557",
    Stone: "#b8b2a5",
    Navy: "#284a73",
};

const priceOptions = [
    { label: "All", value: "all" },
    { label: "Under $100", value: "0-100" },
    { label: "$100 - $180", value: "100-180" },
    { label: "Over $180", value: "180+" },
] as const;

export type ProductFilterSidebarProps = {
    category: (typeof categories)[number];
    selectedPrice: string;
    selectedColor: (typeof colorOptions)[number];
    selectedSize: (typeof sizeOptions)[number];
    selectedStatus: (typeof statusOptions)[number];
    search: string;
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: (typeof categories)[number]) => void;
    onPriceChange: (value: string) => void;
    onColorChange: (value: (typeof colorOptions)[number]) => void;
    onSizeChange: (value: (typeof sizeOptions)[number]) => void;
    onStatusChange: (value: (typeof statusOptions)[number]) => void;
    onReset: () => void;
};

export function ProductFilterSidebar({
    category,
    selectedPrice,
    selectedColor,
    selectedSize,
    selectedStatus,
    search,
    onSearchChange,
    onCategoryChange,
    onPriceChange,
    onColorChange,
    onSizeChange,
    onStatusChange,
    onReset,
}: ProductFilterSidebarProps) {
    return (
        <aside className="h-fit rounded-3xl border border-[#ebebeb] bg-white p-5 shadow-[0_10px_22px_rgba(23,23,23,0.02)] lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3 border-b border-[#f1f1f1] pb-4">
                <div className="flex items-center gap-2 text-[#171717]">
                    <FiFilter className="text-base" />
                    <span className="text-sm font-medium tracking-[0.14em] text-[#4d4d4d] uppercase">
                        Filter
                    </span>
                </div>
                <button
                    type="button"
                    onClick={onReset}
                    className="text-xs font-medium tracking-[0.12em] text-[#171717] uppercase transition hover:text-[#4d4d4d]"
                >
                    Reset
                </button>
            </div>

            <div className="mt-5 space-y-6">
                <label className="block">
                    <span className="mb-2 block text-xs font-medium tracking-[0.14em] text-[#8f8f8f] uppercase">
                        Search
                    </span>
                    <div className="flex items-center gap-2 rounded-full border border-[#ebebeb] bg-[#fafafa] px-3 py-2.5">
                        <FiSearch className="text-sm text-[#8f8f8f]" />
                        <input
                            value={search}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder="Search products"
                            className="w-full bg-transparent text-sm text-[#171717] placeholder:text-[#8f8f8f] outline-none"
                        />
                    </div>
                </label>

                <div>
                    <p className="mb-3 text-xs font-medium tracking-[0.14em] text-[#8f8f8f] uppercase">
                        Category
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => onCategoryChange(item)}
                                className={[
                                    "rounded-full border px-3 py-2 text-sm font-medium transition",
                                    category === item
                                        ? "border-[#171717] bg-[#171717] text-white"
                                        : "border-[#ebebeb] bg-white text-[#171717] hover:border-[#171717]",
                                ].join(" ")}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <span className="mb-2 block text-xs font-medium tracking-[0.14em] text-[#8f8f8f] uppercase">
                            Price
                        </span>
                        <div className="grid gap-2">
                            {priceOptions.map((option) => (
                                <label
                                    key={option.value}
                                    className={[
                                        "flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition",
                                        selectedPrice === option.value
                                            ? "border-[#171717] bg-[#171717] text-white"
                                            : "border-[#ebebeb] bg-[#fafafa] text-[#171717] hover:border-[#171717]",
                                    ].join(" ")}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedPrice === option.value}
                                        onChange={() => onPriceChange(option.value)}
                                        className="h-4 w-4 accent-[#171717]"
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="mb-2 block text-xs font-medium tracking-[0.14em] text-[#8f8f8f] uppercase">
                            Color
                        </span>
                        <div className="flex flex-wrap gap-2.5">
                            {colorOptions.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => onColorChange(color)}
                                    className={[
                                        "flex h-11 w-11 items-center justify-center rounded-full border-2 transition",
                                        selectedColor === color
                                            ? "border-[#171717] scale-105"
                                            : "border-white hover:border-[#d9d9d9]",
                                    ].join(" ")}
                                    title={color}
                                    aria-label={`Filter by ${color}`}
                                    style={{ backgroundColor: colorSwatches[color] }}
                                >
                                    {color === "All" ? (
                                        <span className="text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-[#171717]">
                                            All
                                        </span>
                                    ) : null}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="mb-2 block text-xs font-medium tracking-[0.14em] text-[#8f8f8f] uppercase">
                            Size
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {sizeOptions.filter((size) => size !== "All").map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => onSizeChange(size)}
                                    className={[
                                        "min-w-13 rounded-lg border px-3 py-2 text-sm font-medium transition",
                                        selectedSize === size
                                            ? "border-[#171717] bg-[#171717] text-white"
                                            : "border-[#ebebeb] bg-[#fafafa] text-[#171717] hover:border-[#171717]",
                                    ].join(" ")}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="mb-2 block text-xs font-medium tracking-[0.14em] text-[#8f8f8f] uppercase">
                            Status
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {statusOptions.filter((status) => status !== "All").map((status) => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => onStatusChange(status)}
                                    className={[
                                        "rounded-lg border px-3 py-2 text-sm font-medium capitalize transition",
                                        selectedStatus === status
                                            ? "border-[#171717] bg-[#171717] text-white"
                                            : "border-[#ebebeb] bg-[#fafafa] text-[#171717] hover:border-[#171717]",
                                    ].join(" ")}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
