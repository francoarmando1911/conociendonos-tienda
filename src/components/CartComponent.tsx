import React from 'react';
import type { CartProps } from "../types/types"


const CartComponent: React.FC<CartProps> = ({
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    cartTotal,
    isEmpty
}) => {
    return(

        <>
        </>
    )
};

export default CartComponent;