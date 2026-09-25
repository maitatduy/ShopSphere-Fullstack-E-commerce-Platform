import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppErrorBoundary } from "./shared/components/AppErrorBoundary";
import { AppLoadingScreen } from "./shared/components/AppLoadingScreen";
import {
    CartPage,
    CheckoutPage,
    HomePage,
    ProductDetailPage,
    ProductListPage,
} from "./router/lazyRoutes";

export default function App() {
    return (
        <BrowserRouter>
            <AppErrorBoundary>
                <Suspense fallback={<AppLoadingScreen />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductListPage />} />
                        <Route path="/products/:productId" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Suspense>
            </AppErrorBoundary>
        </BrowserRouter>
    );
}
