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
        eyebrow: "AUTUMN 2026",
        title: "Minimal layers for everyday movement.",
        subtitle: "Essential silhouettes",
        description:
            "Modern staples designed for thought-through comfort, elevated textures, and all-day versatility.",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
        accent: "from-cyan-400 via-blue-500 to-violet-500",
    },
    {
        id: 2,
        eyebrow: "NEW DROP",
        title: "Quiet luxury meets city energy.",
        subtitle: "Soft structure",
        description:
            "Refined tailoring, warm neutrals, and sharp layering for colder mornings and brighter afternoons.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
        accent: "from-violet-500 via-fuchsia-500 to-amber-400",
    },
    {
        id: 3,
        eyebrow: "CURATED EDIT",
        title: "Build a sharper wardrobe in seconds.",
        subtitle: "Shop the capsule",
        description:
            "From oversized layers to elevated essentials, every piece is created to mix, match, and move.",
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
        title: "Outerwear",
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
        title: "Accessories",
        subtitle: "Complete the look",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
        href: "/men/accessories",
    },
];

export const womenCategories: CategoryBlock[] = [
    {
        id: 1,
        title: "Dresses",
        subtitle: "Modern lines",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
        href: "/women/dresses",
    },
    {
        id: 2,
        title: "Knitwear",
        subtitle: "Soft textures",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
        href: "/women/knitwear",
    },
    {
        id: 3,
        title: "Bags",
        subtitle: "Polished carryalls",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
        href: "/women/bags",
    },
];
