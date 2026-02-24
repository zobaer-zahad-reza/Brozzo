import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/slider/list`);
        if (response.data.success && response.data.sliders.length > 0) {
          setSlides(response.data.sliders);
        }
      } catch (error) {
        console.error("Failed to fetch slides:", error);
      } finally {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="w-full mt-6 aspect-[16/9] sm:aspect-[21/7] bg-[#111113] rounded-md flex items-center justify-center animate-pulse border border-zinc-800">
        <span className="text-zinc-600 font-black uppercase tracking-widest text-sm">
          Loading Highlights...
        </span>
      </div>
    );
  }

  if (slides.length === 0) return null;

  return (
    // FIXED: border-0 sm:border added to remove border on mobile view
    <div className="w-full sm:mt-6 relative group overflow-hidden sm:rounded-md border-0 sm:border border-zinc-800 sm:shadow-2xl bg-black">
      <div
        className="carousel w-full aspect-[16/9] sm:aspect-[21/7] flex overflow-x-hidden scroll-smooth bg-[#111113]"
        ref={carouselRef}
      >
        {slides.map((slide, index) => (
          <div
            key={slide._id || index}
            onClick={() => slide.link && navigate(slide.link)}
            className="carousel-item relative w-full h-full flex-shrink-0 cursor-pointer"
          >
            <img
              src={slide.image}
              className="w-full h-full object-contain"
              alt={`Slide ${index + 1}`}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute left-2 right-2 sm:left-4 sm:right-4 top-1/2 flex -translate-y-1/2 transform justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-[#FF4955] text-white backdrop-blur-sm transition-all shadow-lg text-xs sm:text-base"
          >
            ❮
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-[#FF4955] text-white backdrop-blur-sm transition-all shadow-lg text-xs sm:text-base"
          >
            ❯
          </button>
        </div>
      )}

      {slides.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 shadow-md ${
                currentIndex === index
                  ? "bg-[#FF4955] w-6 sm:w-8"
                  : "bg-white/50 w-1.5 sm:w-2 hover:bg-white"
              }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSlider;
