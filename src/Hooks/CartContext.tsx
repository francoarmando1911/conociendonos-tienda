import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Definición de las acciones del carrito  
type Action =
    | { type: 'ADD_TO_CART'; product: Product }
    | { type: 'REMOVE_FROM_CART'; id: number }
    | { type: 'INCREASE_QUANTITY'; id: number }
    | { type: 'DECREASE_QUANTITY'; id: number }
    | { type: 'CLEAR_CART' };

// Estado del carrito  
interface CartState {
    cart: Array<Product>;
}

// Definición del tipo de producto  
interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const initialState: CartState = {
    cart: [],
};

// Crear el contexto  
const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

// Reducer del carrito  
const cartReducer = (state: CartState, action: Action): CartState => {
    switch (action.type) {
        case 'ADD_TO_CART':
            // Comprobar si ya existe el producto en el carrito  
            const existingProduct = state.cart.find(product => product.id === action.product.id);
            if (existingProduct) {
                return {
                    ...state,
                    cart: state.cart.map(product =>
                        product.id === action.product.id
                            ? { ...product, quantity: product.quantity + action.product.quantity }
                            : product
                    ),
                };
            }
            return { ...state, cart: [...state.cart, action.product] };

        case 'REMOVE_FROM_CART':
            return { ...state, cart: state.cart.filter(product => product.id !== action.id) };

        case 'INCREASE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(product =>
                    product.id === action.id ? { ...product, quantity: product.quantity + 1 } : product
                )
            };

        case 'DECREASE_QUANTITY':
            return {
                ...state,
                cart: state.cart.map(product =>
                    product.id === action.id && product.quantity > 1
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                )
            };

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
};

// Proveedor del contexto  
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar el contexto  
export const useCart = () => {
    return useContext(CartContext);
};