import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiChevronRight, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../homepage/components/Footer";
import { Header } from "../../homepage/components/Header";
import { productListItems } from "../../products/data/productsData";

gsap.registerPlugin(ScrollTrigger);

const cartSeed = [
    { id: 1, quantity: 1 },
    { id: 2, quantity: 2 },
    { id: 4, quantity: 1 },
];

export function CartPage() {
    const pageRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState("");
    const [appliedPromo, setAppliedPromo] = useState(false);
    const [cartItems, setCartItems] = useState(() =>
        cartSeed
            .map(({ id, quantity }) => {
                const item = productListItems.find((product) => product.id === id);
                return item ? { ...item, quantity } : null;
            })
            .filter((item): item is (typeof productListItems)[number] & { quantity: number } => Boolean(item)),
    );

    const updateQuantity = (productId: number, change: number) => {
        setCartItems((currentItems) =>
            currentItems.flatMap((item) => {
                if (item.id !== productId) {
                    return [item];
                }

                const nextQuantity = item.quantity + change;
                return nextQuantity <= 0 ? [] : [{ ...item, quantity: nextQuantity }];
            }),
        );
    };

    const removeItem = (productId: number) => {
        setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
    };

    const subtotal = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        [cartItems],
    );

    const shipping = subtotal > 300 ? 0 : 24;
    const discount = appliedPromo ? subtotal * 0.1 : 0;
    const total = Math.max(subtotal + shipping - discount, 0);

    useEffect(() => {
        const sections = gsap.utils.toArray<HTMLElement>("[data-cart-animate]");

        const ctx = gsap.context(() => {
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
        <div ref={pageRef} className="min-h-screen bg-[#fafafa] text-[#171717]">
            <Header />

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <nav className="mb-8 flex items-center gap-2 text-sm text-[#8f8f8f]">
                    <Link to="/" className="transition hover:text-[#171717]">
                        Home
                    </Link>
                    <FiChevronRight className="text-base" />
                    <span className="text-[#171717]">Cart</span>
                </nav>

                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8f8f8f]">
                            Bag
                        </p>
                        <h1 className="mt-2 text-3xl font-medium tracking-[-0.06em] text-[#171717] sm:text-4xl">
                            Your cart
                        </h1>
                    </div>
                    <p className="text-sm text-[#4d4d4d]">{cartItems.length} items</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                    <section data-cart-animate className="space-y-5">
                        {cartItems.map((item) => (
                            <article
                                key={item.id}
                                className="flex flex-col gap-4 rounded-4xl border border-[#ebebeb] bg-white p-4 shadow-[0_16px_40px_rgba(23,23,23,0.02)] sm:flex-row sm:items-center"
                            >
                                <div className="relative overflow-hidden rounded-[1.4rem] bg-[#f5f5f5] sm:w-36">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                        className="h-32 w-full object-cover sm:h-28"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
                                                <span>{item.category}</span>
                                                <span>•</span>
                                                <span>{item.color}</span>
                                            </div>
                                            <h2 className="mt-2 text-xl font-medium text-[#171717]">
                                                {item.name}
                                            </h2>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeItem(item.id)}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-[#171717] transition hover:text-[#4d4d4d]"
                                            aria-label={`Remove ${item.name}`}
                                        >
                                            <FiTrash2 className="text-base" />
                                            Remove
                                        </button>
                                    </div>

                                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="inline-flex items-center rounded-full border border-[#ebebeb] bg-[#fafafa] p-1">
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#171717] transition hover:bg-white"
                                                aria-label={`Decrease quantity for ${item.name}`}
                                            >
                                                <FiMinus className="text-sm" />
                                            </button>
                                            <span className="min-w-10 text-center text-sm font-medium text-[#171717]">
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#171717] transition hover:bg-white"
                                                aria-label={`Increase quantity for ${item.name}`}
                                            >
                                                <FiPlus className="text-sm" />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="text-xl font-semibold text-[#171717]">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                            {item.oldPrice ? (
                                                <span className="text-sm text-[#8f8f8f] line-through">
                                                    ${((item.oldPrice ?? item.price) * item.quantity).toFixed(2)}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>

                    <aside data-cart-animate className="space-y-6">
                        <div className="rounded-4xl border border-[#ebebeb] bg-white p-6 shadow-[0_18px_40px_rgba(23,23,23,0.03)]">
                            <div className="flex items-center gap-3">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#fafafa] text-[#171717]">
                                    <FiShoppingBag className="text-base" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#8f8f8f]">
                                        Summary
                                    </p>
                                    <h3 className="mt-1 text-xl font-medium text-[#171717]">Order total</h3>
                                </div>
                            </div>

                            <div className="mt-6 space-y-3 text-sm text-[#4d4d4d]">
                                <div className="flex items-center justify-between">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-[#171717]">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Shipping</span>
                                    <span className="font-medium text-[#171717]">
                                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Discount</span>
                                    <span className="font-medium text-[#171717]">
                                        {discount > 0 ? `-$${discount.toFixed(2)}` : "$0.00"}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-5 rounded-2xl border border-[#ebebeb] bg-[#fafafa] p-3">
                                <label className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[#8f8f8f]">
                                    Discount code
                                </label>
                                <div className="mt-3 flex gap-2">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(event) => setPromoCode(event.target.value)}
                                        placeholder="SAVE10"
                                        className="w-full rounded-full border border-[#ebebeb] bg-white px-4 py-2.5 text-sm text-[#171717] placeholder:text-[#8f8f8f] focus:border-[#171717] focus:outline-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setAppliedPromo(promoCode.trim().toUpperCase() === "SAVE10")}
                                        className="rounded-full bg-[#171717] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between border-t border-[#ebebeb] pt-5">
                                <span className="text-lg font-medium text-[#171717]">Total</span>
                                <span className="text-2xl font-semibold tracking-tighter text-[#171717]">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => navigate("/checkout")}
                                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#171717] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#2b2b2b]"
                            >
                                Proceed to checkout
                                <FiChevronRight className="text-base text-white" />
                            </button>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
