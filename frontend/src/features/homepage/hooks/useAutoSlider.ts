import { useEffect, useRef, useState } from "react";

export function useAutoSlider(length: number, intervalMs = 6000) {
    const [activeIndex, setActiveIndex] = useState(0);
    const timerRef = useRef<number | null>(null);

    const clearTimer = () => {
        if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };

    const startTimer = () => {
        clearTimer();
        if (length <= 1) return;
        timerRef.current = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % length);
        }, intervalMs);
    };

    useEffect(() => {
        startTimer();
        return clearTimer;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [length, intervalMs]);

    const goToNext = () => {
        setActiveIndex((current) => (current + 1) % length);
        startTimer();
    };

    const goToPrevious = () => {
        setActiveIndex((current) => (current - 1 + length) % length);
        startTimer();
    };

    const goToIndex = (index: number) => {
        setActiveIndex(((index % length) + length) % length);
        startTimer();
    };

    return {
        activeIndex,
        goToNext,
        goToPrevious,
        goToIndex,
    };
}