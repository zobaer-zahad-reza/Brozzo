import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HeroSlider = () => {
  // --- STATIC DATA (Temporary) ---
  const staticSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
      link: "/collection",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
      link: "/collection",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
      link: "/collection",
    },
  ];

  // Initialize state with static data
  const [slides, setSlides] = useState(staticSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  // const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // --- DYNAMIC DATA FETCHING (Commented Out) ---
  /*
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
  */

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
      {/* Slides Container */}
      <div
        className="carousel w-full h-[300px] sm:h-[450px] md:h-[600px] flex overflow-x-hidden scroll-smooth"
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
              className="w-full h-full object-cover"
              alt={`Slide ${index + 1}`}
            />

            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows  */}
      <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="btn btn-circle btn-sm sm:btn-md bg-black/50 hover:bg-[#FF4955] text-white border-none transition-all"
        >
          ❯
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="btn btn-circle btn-sm sm:btn-md bg-black/50 hover:bg-[#FF4955] text-white border-none transition-all"
        >
          ❯
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-[#FF4955] w-6"
                : "bg-white/50 w-2 hover:bg-white"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
