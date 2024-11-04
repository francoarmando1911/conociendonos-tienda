import { useState, useEffect, useMemo } from "react";
import bebes from "../data/bebes";
import ninas from "../data/ninas";
import ninos from "../data/ninos";
import type { CartItem, Product, ProductID } from "../types/types";

export const useCart = (type: string) => {
     
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    
    const [cart, setCart] = useState<CartItem[]>(initialCart);
    const [data, setData] = useState<Product[]>([]);

    
    useEffect(() => {
        let selectedData: Product[] = [];
        if (type === "bebes") {
            selectedData = bebes;
        } else if (type === "ninas") {
            selectedData = ninas;
        } else if (type === "ninos") {
            selectedData = ninos;
        }
        setData(selectedData);
    }, [type]); 

    
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const MAX_ITEMS = 10;
    const MIN_ITEMS = 1;

    
    const addToCart = (item: Product) => {
        setCart(prevCart => {
            const itemExist = prevCart.findIndex(product => product.id === item.id);
            if (itemExist >= 0) {
                if (prevCart[itemExist].quantity >= MAX_ITEMS) return prevCart;
                return prevCart.map((product, index) =>
                    index === itemExist
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                );
            } else {
                const newItem: CartItem = { ...item, quantity: 1 };
                return [...prevCart, newItem];
            }
        });
    };

    const removeFromCart = (id: ProductID) => {
        setCart(prevCart => prevCart.filter(product => product.id !== id));
    };

    const increaseQuantity = (id: ProductID) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        }));
    };

    const decreaseQuantity = (id: ProductID) => {
        setCart(prevCart => prevCart.map(item => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        }));
    };

    const clearCart = () => {
        setCart([]);
    };

     
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    const cartTotal = useMemo(() =>
        cart.reduce((total, item) => total + item.quantity * item.price, 0),
        [cart]
    );

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
    };
};