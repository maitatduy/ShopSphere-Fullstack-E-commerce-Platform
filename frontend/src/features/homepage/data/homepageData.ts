export type HeroSlide = {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    accent: string;
};

export const heroSlides: HeroSlide[] = [
    {
        id: 1,
        title: "Những lớp tối giản cho chuyển động mỗi ngày.",
        subtitle: "Thiết kế cơ bản",
        description:
            "Những món đồ hiện đại được thiết kế cho sự thoải mái, chất liệu cao cấp và tính linh hoạt suốt cả ngày.",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
        accent: "from-cyan-400 via-blue-500 to-violet-500",
    },
    {
        id: 2,
        title: "Sang trọng tinh tế gặp gỡ năng lượng đô thị.",
        subtitle: "Cấu trúc mềm mại",
        description:
            "May đo tinh tế, tông màu trung tính ấm áp và layering sắc sảo cho những buổi sáng lạnh và chiều tươi sáng.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
        accent: "from-violet-500 via-fuchsia-500 to-amber-400",
    },
    {
        id: 3,
        title: "Xây dựng tủ đồ sắc sảo hơn trong tích tắc.",
        subtitle: "Mua capsule collection",
        description:
            "Từ những lớp oversized đến những món đồ tinh tế, mỗi sản phẩm được tạo ra để phối, mix và di chuyển tự do.",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
        accent: "from-sky-400 via-cyan-400 to-emerald-400",
    },
];
