export type CartItem = {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
    color: string;
    quantity: number;
};

export type CartState = {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, change: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    subtotal: () => number;
};
