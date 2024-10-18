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
        let intervalId: number | undefined; // Cambiado a number
        if (!isHovered) {
            intervalId = window.setInterval(nextSlide, 4000); // Usar window.setInterval para evitar ambigüedad
        }
        return () => {
            if (intervalId) {
                window.clearInterval(intervalId); // Usar window.clearInterval para evitar ambigüedad
            }
        };
    }, [isHovered, nextSlide]);

    return (
        <div className="relative w-full slider-height">
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

            <button onClick={prevSlide}>
                <FaChevronLeft />
            </button>
            <button onClick={nextSlide}>
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Slider;
