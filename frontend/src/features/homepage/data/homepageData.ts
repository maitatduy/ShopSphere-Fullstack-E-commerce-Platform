export type HeroSlide = {
    id: number;
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    accent: string;
};

export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    oldPrice?: number;
    image: string;
    accent: string;
};

export type CategoryBlock = {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    href: string;
};

export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        eyebrow: "THU ĐÔNG 2026",
        title: "Những lớp tối giản cho chuyển động mỗi ngày.",
        subtitle: "Thiết kế cơ bản",
        description:
            "Những món đồ hiện đại được thiết kế cho sự thoải mái, chất liệu cao cấp và tính linh hoạt suốt cả ngày.",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
        accent: "from-cyan-400 via-blue-500 to-violet-500",
    },
    {
        id: 2,
        eyebrow: "BỘ SƯU TẬP MỚI",
        title: "Sang trọng tinh tế gặp gỡ năng lượng đô thị.",
        subtitle: "Cấu trúc mềm mại",
        description:
            "May đo tinh tế, tông màu trung tính ấm áp và layering sắc sảo cho những buổi sáng lạnh và chiều tươi sáng.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
        accent: "from-violet-500 via-fuchsia-500 to-amber-400",
    },
    {
        id: 3,
        eyebrow: "TUYỂN CHỌN ĐẶC BIỆT",
        title: "Xây dựng tủ đồ sắc sảo hơn trong tích tắc.",
        subtitle: "Mua capsule collection",
        description:
            "Từ những lớp oversized đến những món đồ tinh tế, mỗi sản phẩm được tạo ra để phối, mix và di chuyển tự do.",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
        accent: "from-sky-400 via-cyan-400 to-emerald-400",
    },
];

export const newArrivals: Product[] = [
    {
        id: 1,
        name: "Aero Knit Jacket",
        category: "Men",
        price: 138,
        oldPrice: 179,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
        accent: "bg-stone-100",
    },
    {
        id: 2,
        name: "Lune Wool Coat",
        category: "Women",
        price: 196,
        oldPrice: 240,
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
        accent: "bg-amber-50",
    },
    {
        id: 3,
        name: "Contour Leather Tote",
        category: "Accessories",
        price: 118,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
        accent: "bg-rose-50",
    },
    {
        id: 4,
        name: "Monarch Overshirt",
        category: "Men",
        price: 126,
        oldPrice: 162,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
        accent: "bg-slate-100",
    },
];

export const menCategories: CategoryBlock[] = [
    {
        id: 1,
        title: "Áo khoác ngoài",
        subtitle: "Layered essentials",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
        href: "/men/outerwear",
    },
    {
        id: 2,
        title: "Denim",
        subtitle: "Relaxed everyday fits",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
        href: "/men/denim",
    },
    {
        id: 3,
        title: "Phụ kiện",
        subtitle: "Complete the look",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
        href: "/men/accessories",
    },
];

export const womenCategories: CategoryBlock[] = [
    {
        id: 1,
        title: "Váy đầm",
        subtitle: "Modern lines",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
        href: "/women/dresses",
    },
    {
        id: 2,
        title: "Len dệt kim",
        subtitle: "Soft textures",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
        href: "/women/knitwear",
    },
    {
        id: 3,
        title: "Túi xách",
        subtitle: "Polished carryalls",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
        href: "/women/bags",
    },
];
