import axios from "axios";

const API_URL = 'http://localhost:8080';

export interface Producto{
    id: number
    image: string
    hoverImage: string
    tite: string
    price: number
}

export const fetchProducts = async (): Promise<Producto[]> => {
    try{
        const response = await axios.get(`${API_URL}/api/productos`)
        return response.data;
    } catch (error){
        console.log('Error fetching productos:', error);
        throw error
    }
}