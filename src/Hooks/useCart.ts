import { useState, useEffect, useMemo } from "react";
import bebes from "../data/bebes";
import ninas from "../data/ninas";
import ninos from "../data/ninos";
import type { CartItem, Product, ProductID } from "../types/types";

export const useCart = (type: string) => {
    // Obtener el carrito inicial desde el almacenamiento local
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [cart, setCart] = useState<CartItem[]>(initialCart);

    // Determinar los productos según el tipo seleccionado
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

    const MAX_ITEMS = 10;
    const MIN_ITEMS = 1;

    // Actualizar el carrito en el almacenamiento local cuando cambia
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Función para agregar un producto al carrito
    function addToCart(item: Product) {
        const itemExist = cart.findIndex((product) => product.id === item.id);

        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return;
            const updatedCart = cart.map((product, index) =>
                index === itemExist
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            );
            setCart(updatedCart);
        } else {
            const newItem: CartItem = { ...item, quantity: 1 };
            setCart([...cart, newItem]);
        }
    }

    // Función para eliminar un producto del carrito
    function removeFromCart(id: ProductID) {
        setCart((prevCart) => prevCart.filter((product) => product.id !== id));
    }

    // Función para incrementar la cantidad de un producto
    function increaseQuantity(id: ProductID) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
        setCart(updatedCart);
    }

    // Función para decrementar la cantidad de un producto
    function decreaseQuantity(id: ProductID) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        });
        setCart(updatedCart);
    }

    // Función para limpiar el carrito
    function clearCart() {
        setCart([]);
    }

    // Cálculo para verificar si el carrito está vacío
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    // Cálculo del total del carrito
    const cartTotal = useMemo(
        () =>
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
