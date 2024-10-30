import { useState, useEffect, useMemo } from "react";
import bebes from "../data/bebes";
import ninas from "../data/ninas";
import ninos from "../data/ninos";
import type { CartItem, Products, ProductID } from "../types/types";

export const useCart = (type: string) => {
    const initialCart = (): CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    //Determinar los productos segun el tipo seleccionado
    const [data, setData] = useState<Products[]>([]);

    useEffect(() => {
        let selectedData: Products[] = [];
        if(type === 'bebes'){
            selectedData = bebes;
        } else if (type === 'ninas'){
            selectedData = ninas;
        } else if(type === 'ninos'){
            selectedData = ninos;
        }

        setData(selectedData);
    }, [type]);

    const MAX_ITEMS = 10;
    const MIN_ITEMS = 1;

    //Actualizar carrito en el storage cuando cambia
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    //Agregar al carrito

    function addToCart(item: Products) {
        const itemExist = cart.findIndex((products) => products.id === item.id)

        if(itemExist>=0){
            if(cart[itemExist].quantity >= MAX_ITEMS) return;
            const updatedCart = cart.map((product, index) =>
                indes === itemExist ? {...product, quantity: product.quantity + 1} : product
            );
            setCart(updatedCart);
        }else {
            const newItem : CartItem = {...item, quantity: 1};
            setCart([...CartPosition, newItem]);
        }
    }

}