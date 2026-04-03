import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { book } from './types/Book';

export interface CartItem {
    book: book;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (book: book) => void;
    removeFromCart: (bookId: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (book: book) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.book.bookId === book.bookId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.book.bookId === book.bookId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { book, quantity: 1 }];
        });
    };

    const removeFromCart = (bookId: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.book.bookId === bookId);
            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map(item =>
                    item.book.bookId === bookId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            return prevCart.filter(item => item.book.bookId !== bookId);
        });
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
}