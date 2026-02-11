import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/slider/list`);
        if (response.data.success) {
          setSlides(response.data.sliders);
        }
      } catch (error) {
        console.error("Slider loading failed:", error);
      }
    };
    fetchSlides();
  }, [backendUrl]);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        handleNext();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [slides.length, currentIndex]);

  useEffect(() => {
    if (carouselRef.current && slides.length > 0) {
      const scrollAmount = carouselRef.current.clientWidth * currentIndex;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex, slides.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  if (slides.length === 0) return null;

  return (
    <div className="w-full mt-6 relative group overflow-hidden rounded-md">
      
      <div
        className="carousel w-full h-[200px] sm:h-[300px]  flex overflow-x-hidden scroll-smooth"
        ref={carouselRef}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            onClick={() => slide.link && navigate(slide.link)}
            className="carousel-item relative w-full flex-shrink-0 cursor-pointer"
          >
            <img
              src={slide.image}
              className="w-full h-full object-cover md:object-fill"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between px-2">
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="btn btn-circle btn-sm sm:btn-md bg-black/30 hover:bg-black/50 text-[#FFA24C] border-none"
        >
          ❮
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="btn btn-circle btn-sm sm:btn-md bg-black/30 hover:bg-black/50 text-[#FFA24C] border-none"
        >
          ❯
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-[#FFA24C] w-4" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;