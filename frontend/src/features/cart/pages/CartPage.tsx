import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiChevronRight, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AppLayout } from "../../../shared/layouts/AppLayout";
import { useCartStore } from "../store/cartStore";

gsap.registerPlugin(ScrollTrigger);

export function CartPage() {
    const pageRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState("");
    const [appliedPromo, setAppliedPromo] = useState(false);
    const { items: cartItems, removeItem, updateQuantity, subtotal: getSubtotal } = useCartStore();

    const subtotal = getSubtotal();

    const shipping = subtotal > 300 ? 0 : 24;
    const discount = appliedPromo ? subtotal * 0.1 : 0;
    const total = Math.max(subtotal + shipping - discount, 0);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const sections = gsap.utils.toArray<HTMLElement>("[data-cart-animate]");

        const ctx = gsap.context(() => {
            if (prefersReducedMotion) {
                sections.forEach((section) =>
                    gsap.set(section, { opacity: 1, y: 0, filter: "blur(0px)" }),
                );
                return;
            }

            sections.forEach((section) => {
                gsap.fromTo(
                    section,
                    { opacity: 0, y: 30, filter: "blur(6px)" },
                    {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 82%",
                            once: true,
                        },
                    },
                );
            });
        }, pageRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <AppLayout>
            <div ref={pageRef} className="min-h-screen bg-[#fafafa] text-[#171717]">
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                    <nav className="mb-8 flex items-center gap-2 text-sm text-[#8f8f8f]">
                        <Link to="/" className="transition hover:text-[#171717]">
                            Trang chủ
                        </Link>
                        <FiChevronRight className="text-base" />
                        <span className="text-[#171717]">Giỏ hàng</span>
                    </nav>

                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-medium tracking-tighter text-[#171717] sm:text-3xl">
                            Giỏ hàng
                        </h1>
                        <p className="text-sm text-[#8f8f8f]">{cartItems.length} sản phẩm</p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
                        <section data-cart-animate className="space-y-4">
                            {cartItems.map((item) => (
                                <article
                                    key={item.id}
                                    className="flex gap-4 rounded-3xl border border-[#ebebeb] bg-white p-4 shadow-[0_4px_16px_rgba(23,23,23,0.03)]"
                                >
                                    <div className="relative shrink-0 overflow-hidden rounded-2xl bg-[#f5f5f5]">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            loading="lazy"
                                            className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                                        />
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[#8f8f8f]">
                                                    {item.category}
                                                </p>
                                                <h2 className="mt-0.5 truncate text-base font-medium text-[#171717] sm:text-lg">
                                                    {item.name}
                                                </h2>
                                                {item.color ? (
                                                    <p className="mt-0.5 text-xs text-[#8f8f8f]">{item.color}</p>
                                                ) : null}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeItem(item.id)}
                                                className="shrink-0 p-1 text-[#c0c0c0] transition hover:text-[#171717]"
                                                aria-label={`Xóa ${item.name}`}
                                            >
                                                <FiTrash2 className="text-base" />
                                            </button>
                                        </div>

                                        <div className="mt-3 flex items-center justify-between gap-2">
                                            <div className="inline-flex items-center rounded-full border border-[#ebebeb] bg-[#fafafa] p-0.5">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#171717] transition hover:bg-white"
                                                    aria-label={`Giảm số lượng`}
                                                >
                                                    <FiMinus className="text-xs" />
                                                </button>
                                                <span className="min-w-8 text-center text-sm font-medium text-[#171717]">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#171717] transition hover:bg-white"
                                                    aria-label={`Tăng số lượng`}
                                                >
                                                    <FiPlus className="text-xs" />
                                                </button>
                                            </div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-base font-semibold text-[#171717] sm:text-lg">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                                {item.oldPrice ? (
                                                    <span className="text-xs text-[#8f8f8f] line-through">
                                                        ${((item.oldPrice ?? item.price) * item.quantity).toFixed(2)}
                                                    </span>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </section>

                        <aside data-cart-animate>
                            <div className="rounded-4xl border border-[#ebebeb] bg-white p-6 shadow-[0_18px_40px_rgba(23,23,23,0.03)]">
                                <h3 className="text-lg font-medium text-[#171717]">
                                    Tổng đơn hàng
                                </h3>

                                <div className="mt-5 space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#8f8f8f]">Tạm tính</span>
                                        <span className="font-medium text-[#171717]">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#8f8f8f]">Vận chuyển</span>
                                        <span className="font-medium text-[#171717]">
                                            {shipping === 0
                                                ? "Miễn phí"
                                                : `$${shipping.toFixed(2)}`}
                                        </span>
                                    </div>
                                    {discount > 0 ? (
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#8f8f8f]">Giảm giá</span>
                                            <span className="font-medium text-green-600">
                                                −${discount.toFixed(2)}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="mt-5 border-t border-[#f1f1f1] pt-5">
                                    <p className="mb-2.5 text-sm text-[#4d4d4d]">Mã giảm giá</p>
                                    <div className="flex flex-col gap-2">
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(event) => setPromoCode(event.target.value)}
                                            placeholder="Nhập mã..."
                                            className="w-full rounded-2xl border border-[#ebebeb] bg-[#fafafa] px-4 py-2.5 text-sm text-[#171717] placeholder:text-[#b3b3b3] focus:border-[#171717] focus:bg-white focus:outline-none transition"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setAppliedPromo(
                                                    promoCode.trim().toUpperCase() === "SAVE10",
                                                )
                                            }
                                            className="w-full rounded-2xl border border-[#171717] bg-white px-4 py-2.5 text-sm font-medium text-[#171717] transition hover:bg-[#171717] hover:text-white"
                                        >
                                            Áp dụng
                                        </button>
                                    </div>
                                    {appliedPromo ? (
                                        <p className="mt-2 text-xs text-green-600">
                                            Đã áp dụng mã giảm giá 10%
                                        </p>
                                    ) : null}
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-[#f1f1f1] pt-5">
                                    <span className="text-base font-medium text-[#171717]">
                                        Tổng cộng
                                    </span>
                                    <span className="text-2xl font-semibold tracking-[-0.04em] text-[#171717]">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => navigate("/checkout")}
                                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
                                >
                                    Tiến hành thanh toán
                                    <FiChevronRight className="text-base" />
                                </button>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
