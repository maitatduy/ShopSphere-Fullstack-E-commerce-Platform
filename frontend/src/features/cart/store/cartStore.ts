import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartState } from "../../../types/cart";

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (product, quantity = 1) => {
                set((state) => {
                    const existing = state.items.find((i) => i.id === product.id);
                    if (existing) {
                        return {
                            items: state.items.map((i) =>
                                i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
                            ),
                        };
                    }
                    return { items: [...state.items, { ...product, quantity }] };
                });
            },

            removeItem: (id) => {
                set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
            },

            updateQuantity: (id, change) => {
                set((state) => ({
                    items: state.items.flatMap((i) => {
                        if (i.id !== id) return [i];
                        const next = i.quantity + change;
                        return next <= 0 ? [] : [{ ...i, quantity: next }];
                    }),
                }));
            },

            clearCart: () => set({ items: [] }),

            totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

            subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        }),
        {
            name: "shopsphere-cart",
        },
    ),
);
