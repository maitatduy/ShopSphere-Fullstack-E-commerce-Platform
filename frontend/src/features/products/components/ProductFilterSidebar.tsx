import { FiSearch } from "react-icons/fi";

const priceOptions = [
    { label: "Tất cả", value: "all" },
    { label: "Dưới $100", value: "0-100" },
    { label: "$100 – $180", value: "100-180" },
    { label: "Trên $180", value: "180+" },
] as const;

export type ProductFilterSidebarProps = {
    categories: string[];
    colors: string[];
    sizes: string[];
    category: string;
    selectedPrice: string;
    selectedColor: string;
    selectedSize: string;
    onlyNew: boolean;
    search: string;
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onPriceChange: (value: string) => void;
    onColorChange: (value: string) => void;
    onSizeChange: (value: string) => void;
    onOnlyNewChange: (value: boolean) => void;
    onReset: () => void;
};

export function ProductFilterSidebar({
    categories,
    colors,
    sizes,
    category,
    selectedPrice,
    selectedColor,
    selectedSize,
    onlyNew,
    search,
    onSearchChange,
    onCategoryChange,
    onPriceChange,
    onColorChange,
    onSizeChange,
    onOnlyNewChange,
    onReset,
}: ProductFilterSidebarProps) {
    const hasActiveFilter =
        category !== "All" ||
        selectedPrice !== "all" ||
        selectedColor !== "All" ||
        selectedSize !== "All" ||
        onlyNew ||
        search.trim() !== "";

    return (
        <aside className="h-fit rounded-3xl border border-[#ebebeb] bg-white p-6 shadow-[0_10px_22px_rgba(23,23,23,0.02)] lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3 pb-5 border-b border-[#f1f1f1]">
                <span className="text-base font-medium text-[#171717]">Bộ lọc</span>
                {hasActiveFilter ? (
                    <button
                        type="button"
                        onClick={onReset}
                        className="text-sm text-[#8f8f8f] transition hover:text-[#171717]"
                    >
                        Xóa tất cả
                    </button>
                ) : null}
            </div>

            <div className="mt-6 space-y-7">
                <label className="block">
                    <div className="flex items-center gap-2 rounded-2xl border border-[#ebebeb] bg-[#fafafa] px-4 py-3">
                        <FiSearch className="shrink-0 text-sm text-[#8f8f8f]" />
                        <input
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Tìm sản phẩm..."
                            className="w-full bg-transparent text-sm text-[#171717] placeholder:text-[#b3b3b3] outline-none"
                        />
                    </div>
                </label>

                {categories.length > 0 ? (
                    <div>
                        <p className="mb-3 text-sm font-medium text-[#171717]">Danh mục</p>
                        <div className="flex flex-wrap gap-2">
                            {["Tất cả", ...categories].map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() =>
                                        onCategoryChange(item === "Tất cả" ? "All" : item)
                                    }
                                    className={[
                                        "rounded-full border px-3.5 py-1.5 text-sm transition",
                                        (item === "Tất cả" ? category === "All" : category === item)
                                            ? "border-[#171717] bg-[#171717] text-white"
                                            : "border-[#ebebeb] bg-white text-[#4d4d4d] hover:border-[#d1d1d1] hover:text-[#171717]",
                                    ].join(" ")}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}

                <div>
                    <p className="mb-3 text-sm font-medium text-[#171717]">Giá</p>
                    <div className="flex flex-wrap gap-2">
                        {priceOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => onPriceChange(option.value)}
                                className={[
                                    "rounded-full border px-3.5 py-1.5 text-sm transition",
                                    selectedPrice === option.value
                                        ? "border-[#171717] bg-[#171717] text-white"
                                        : "border-[#ebebeb] bg-white text-[#4d4d4d] hover:border-[#d1d1d1] hover:text-[#171717]",
                                ].join(" ")}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {colors.length > 0 ? (
                    <div>
                        <p className="mb-3 text-sm font-medium text-[#171717]">Màu sắc</p>
                        <div className="flex flex-wrap gap-2">
                            {["Tất cả", ...colors].map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() =>
                                        onColorChange(color === "Tất cả" ? "All" : color)
                                    }
                                    className={[
                                        "rounded-full border px-3.5 py-1.5 text-sm transition",
                                        (
                                            color === "Tất cả"
                                                ? selectedColor === "All"
                                                : selectedColor === color
                                        )
                                            ? "border-[#171717] bg-[#171717] text-white"
                                            : "border-[#ebebeb] bg-white text-[#4d4d4d] hover:border-[#d1d1d1] hover:text-[#171717]",
                                    ].join(" ")}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}

                {sizes.length > 0 ? (
                    <div>
                        <p className="mb-3 text-sm font-medium text-[#171717]">Kích cỡ</p>
                        <div className="flex flex-wrap gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() =>
                                        onSizeChange(selectedSize === size ? "All" : size)
                                    }
                                    className={[
                                        "min-w-11 rounded-xl border px-3 py-1.5 text-center text-sm transition",
                                        selectedSize === size
                                            ? "border-[#171717] bg-[#171717] text-white"
                                            : "border-[#ebebeb] bg-white text-[#4d4d4d] hover:border-[#d1d1d1] hover:text-[#171717]",
                                    ].join(" ")}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : null}

                <div>
                    <button
                        type="button"
                        onClick={() => onOnlyNewChange(!onlyNew)}
                        className={[
                            "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm transition",
                            onlyNew
                                ? "border-[#171717] bg-[#171717] text-white"
                                : "border-[#ebebeb] bg-[#fafafa] text-[#4d4d4d] hover:border-[#d1d1d1] hover:text-[#171717]",
                        ].join(" ")}
                    >
                        <span>Hàng mới về</span>
                        <span
                            className={[
                                "flex h-4 w-4 items-center justify-center rounded-full border text-[10px] font-bold transition",
                                onlyNew
                                    ? "border-white bg-white text-[#171717]"
                                    : "border-[#d1d1d1] bg-white text-transparent",
                            ].join(" ")}
                        >
                            ✓
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
