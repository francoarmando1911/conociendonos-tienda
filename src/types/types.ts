export type Product = {
    id: number;
    image: string;
    hoverImage: string;
    title: string;
    price: number;
};

/*export type Products = {
    id: number;
    image: string;
    hoverImage: string;
    title: string;
    price: number;
};*/

export type CartItem = Product & {
    quantity: number;
};

export type ProductID = Product['id']