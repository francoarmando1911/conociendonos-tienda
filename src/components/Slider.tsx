import React, { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import '../App.css';

const slides = [
    { id: 1, imageDesktop: "/slider1.png", imageMobile: "/slider1mob.png" },
    { id: 2, imageDesktop: "/slider2.png", imageMobile: "/slider2mob.png" },
    { id: 3, imageDesktop: "/slider3.png", imageMobile: "/slider3mob.png" },
];

const Slider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        let intervalId: number | undefined;
        if (!isHovered) {
            intervalId = window.setInterval(nextSlide, 4000);
        }
        return () => {
            if (intervalId) {
                window.clearInterval(intervalId);
            }
        };
    }, [isHovered, nextSlide]);

    return (
        <div className="relative w-full slider-height z-10 "> {/* Asegúrate de que el slider tenga z-index bajo */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full h-full overflow-hidden"
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                    >
                        <picture>
                            <source media="(max-width: 640px)" srcSet={slide.imageMobile} />
                            <img src={slide.imageDesktop} alt={`Slide ${slide.id}`} className="object-cover w-full h-full" />
                        </picture>
                    </div>
                ))}
            </div>

            {/* Botón de anterior */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 text-black p-2 rounded-full hover:bg-opacity-100 transition z-20" // Añadido z-index aquí
            >
                <FaChevronLeft />
            </button>

            {/* Botón de siguiente */}
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 text-black p-2 rounded-full hover:bg-opacity-100 transition z-20" // Añadido z-index aquí
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Slider;
