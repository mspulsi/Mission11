// CartContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { book } from './types/Book';

interface CartContextType {
    cart: book[];
    addToCart: (book: book) => void;
    removeFromCart: (bookId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<book[]>([]);

    const addToCart = (book: book) => setCart([...cart, book]);
    const removeFromCart = (bookId: number) => setCart(cart.filter(b => b.bookId !== bookId));
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}