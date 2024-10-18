
interface Product {
    id: number;
    image: string;
    hoverImage: string; // Nueva propiedad
    title: string;
    price: number;
}

const discountedProducts: Product[] = [
    {
        id: 1,
        image: "/img1.png",
        hoverImage: "/img2.png",
        title: "Body",
        price: 19.794
    },
    {
        id: 2,
        image: "/short1.png",
        hoverImage: "/short2.png",
        title: "Short",
        price: 37.149
    },
    {
        id: 3,
        image: "/calza1.png",
        hoverImage: "/calza2.png",
        title: "Calza",
        price: 13.194
    },
    {
        id: 4,
        image: "/celeste1.jpg",
        hoverImage: "/celeste2.jpg",
        title: "Saquito peter",
        price: 29.793
    },
    {
        id: 5,
        image: "/ken1.jpg",
        hoverImage: "/ken2.jpg",
        title: "Buzo ken",
        price: 10.381
    },
    {
        id: 6,
        image: "/shortV1.jpg",
        hoverImage: "/shortV2.jpg",
        title: "Short jungle",
        price: 32.893
    }
];

export default discountedProducts;
