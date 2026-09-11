import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const HomePage = lazy(() =>
    import("./features/homepage/pages/HomePage").then((module) => ({
        default: module.HomePage,
    })),
);

function AppLoadingScreen({ text = "Loading page..." }: { text?: string }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#fafafa] px-4">
            <div className="flex flex-col items-center gap-4" aria-live="polite">
                <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#e5e5e5] border-t-[#171717]" />
                <div className="text-center">
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

export default function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<AppLoadingScreen />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
