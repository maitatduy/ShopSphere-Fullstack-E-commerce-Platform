import { useEffect, useState } from "react";

export function useAutoSlider(length: number, intervalMs = 5000) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (length <= 1) return;

        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % length);
        }, intervalMs);

        return () => window.clearInterval(timer);
    }, [length, intervalMs]);

    const goToNext = () => setActiveIndex((current) => (current + 1) % length);
    const goToPrevious = () => setActiveIndex((current) => (current - 1 + length) % length);

    return {
        activeIndex,
        goToNext,
        goToPrevious,
    };
}
