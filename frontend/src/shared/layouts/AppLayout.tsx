import type { ReactNode } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

type AppLayoutProps = {
    children: ReactNode;
    className?: string;
    showHeader?: boolean;
    showFooter?: boolean;
};

export function AppLayout({
    children,
    className = "",
    showHeader = true,
    showFooter = true,
}: AppLayoutProps) {
    return (
        <div className={`min-h-screen bg-[#fafafa] text-[#171717] ${className}`.trim()}>
            {showHeader ? <Header /> : null}
            {children}
            {showFooter ? <Footer /> : null}
        </div>
    );
}
