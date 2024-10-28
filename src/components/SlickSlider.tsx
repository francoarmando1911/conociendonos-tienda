import React from "react";
import { Link } from 'react-router-dom';

const SlickSlider: React.FC = () => {
    return (
        <div className="flex flex-col items-center p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 w-full max-w-5xl">
                <Link to="/descuentos" aria-label="Prueba" className="p-6 bg-[#f9c1d3] text-white text-center rounded-xl shadow-lg hover:bg-blue-400 hover:scale-105 transition transform duration-200 ease-in-out">
                    <h2 className="text-xl font-semibold">Envios sin cargo</h2>
                    <img src="/#" alt="icono" />
                    <p>Para compras superiores a $170000</p>
                </Link>
                <Link to="/descuentos" aria-label="Prueba" className="p-6 bg-[#f9c1d3] text-white text-center rounded-xl shadow-lg hover:bg-blue-400 hover:scale-105 transition transform duration-200 ease-in-out">
                    <h2 className="text-xl font-semibold">3 cuotas sin interes</h2>
                    <img src="#" alt="icono" />
                    <p>3 cuotas sin interes todos los dias</p>
                </Link>
                <Link to="/descuentos" aria-label="Prueba" className="p-6 bg-[#f9c1d3] text-white text-center rounded-xl shadow-lg hover:bg-blue-400 hover:scale-105 transition transform duration-200 ease-in-out">
                    <h2 className="text-xl font-semibold">Retira tu pedido en el local</h2>
                    <img src="/#" alt="icono" />
                    <p>Compra y retira en el local mas cercano</p>
                </Link>
            </div>
        </div>
    );

};

export default SlickSlider;