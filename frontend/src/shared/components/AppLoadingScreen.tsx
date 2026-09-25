import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function AppLoadingScreen({ text = "Đang tải..." }: { text?: string }) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const spinnerRef = useRef<HTMLDivElement | null>(null);
    const labelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const ctx = gsap.context(() => {
            if (prefersReducedMotion) {
                gsap.set(spinnerRef.current, { opacity: 1, scale: 1 });
                gsap.set(labelRef.current, { opacity: 1, y: 0 });
                return;
            }

            gsap.fromTo(
                spinnerRef.current,
                { scale: 0.7, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" },
            );

            gsap.fromTo(
                labelRef.current,
                { y: 12, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: "power3.out" },
            );

            gsap.to(spinnerRef.current, {
                rotate: 360,
                duration: 1.2,
                repeat: -1,
                ease: "none",
            });

            gsap.to(containerRef.current, {
                backgroundPositionX: "100%",
                duration: 1.5,
                ease: "none",
                repeat: -1,
                yoyo: true,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),rgba(250,250,250,1)_42%,rgba(245,245,245,1)_100%)] bg-size-[200%_200%] px-4"
        >
            <div className="flex flex-col items-center gap-4" aria-live="polite" role="status">
                <div
                    ref={spinnerRef}
                    className="h-14 w-14 rounded-full border-4 border-[#e5e5e5] border-t-[#171717] shadow-[0_12px_24px_rgba(23,23,23,0.08)]"
                    aria-hidden="true"
                />
                <div ref={labelRef} className="text-center">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8f8f8f]">
                        ShopSphere
                    </p>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-[#4d4d4d]">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
}
