import { lazy } from "react";

export const HomePage = lazy(() =>
    import("../features/homepage/pages/HomePage").then((m) => ({ default: m.HomePage })),
);

export const ProductListPage = lazy(() =>
    import("../features/products/pages/ProductListPage").then((m) => ({ default: m.ProductListPage })),
);

export const ProductDetailPage = lazy(() =>
    import("../features/products/pages/ProductDetailPage").then((m) => ({ default: m.ProductDetailPage })),
);

export const CartPage = lazy(() =>
    import("../features/cart/pages/CartPage").then((m) => ({ default: m.CartPage })),
);

export const CheckoutPage = lazy(() =>
    import("../features/cart/pages/CheckoutPage").then((m) => ({ default: m.CheckoutPage })),
);
