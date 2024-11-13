export type Product = {
    id: number;
    image: string;
    hoverImage: string;
    title: string;
    price: number;
};

export interface CartItem extends Product {
    id: number;
    title: string;
    price: number;
    quantity: number;
}

export type ProductID = Product['id']

export type CartProps = {
    cart: CartItem[];
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
    cartTotal: number;
    isEmpty: boolean;
};

export interface HeaderProps {
    cart: CartItem[];
    removeFromCart: (id: ProductID) => void;
    increaseQuantity: (id: ProductID) => void;
    decreaseQuantity: (id: ProductID) => void;
    clearCart: () => void;
    showCart: boolean;
    cartTotal: number;
    isEmpty: boolean;
    toggleCart: () => void;
}