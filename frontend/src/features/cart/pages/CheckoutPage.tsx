import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiChevronRight, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AppLayout } from "../../../shared/layouts/AppLayout";
import { CheckoutDeliveryForm } from "../components/CheckoutDeliveryForm";
import { CheckoutOrderSummary } from "../components/CheckoutOrderSummary";

gsap.registerPlugin(ScrollTrigger);

export function CheckoutPage() {
    const pageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const sections = gsap.utils.toArray<HTMLElement>("[data-checkout-animate]");

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
        <AppLayout>
            <div ref={pageRef} className="min-h-screen bg-[#fafafa] text-[#171717]">
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
                <nav className="mb-8 flex items-center gap-2 text-sm text-[#8f8f8f]">
                    <Link to="/" className="transition hover:text-[#171717]">
                        Home
                    </Link>
                    <FiChevronRight className="text-base" />
                    <Link to="/cart" className="transition hover:text-[#171717]">
                        Cart
                    </Link>
                    <FiChevronRight className="text-base" />
                    <span className="text-[#171717]">Checkout</span>
                </nav>

                <div className="mb-8 flex justify-end">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-3 py-2 text-sm text-[#4d4d4d]">
                        <FiLock className="text-base" />
                        Secure checkout
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <CheckoutDeliveryForm />
                    <CheckoutOrderSummary />
                </div>
                </main>
            </div>
        </AppLayout>
    );
}
