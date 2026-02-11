import React, { useRef, useState, useEffect, useContext } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";

const CategoryCarousel = () => {
  const { backendUrl } = useContext(ShopContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/category/list');
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log("Category Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const checkForScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkForScrollPosition();
    window.addEventListener("resize", checkForScrollPosition);
    return () => window.removeEventListener("resize", checkForScrollPosition);
  }, [categories]);

  const scrollContainer = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full mt-6 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
          Shop Deals & more by category
        </h2>
        <Link
          to={"/collection"}
          className="text-xs sm:text-sm font-medium text-gray-700 underline hover:text-black whitespace-nowrap ml-4"
        >
          View all
        </Link>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={() => scrollContainer("left")}
            className="absolute left-0 top-[40%] transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-100 z-10 hidden md:flex items-center justify-center transition-opacity duration-300"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        )}

        {/* Scrollable Area */}
        <div
          ref={scrollRef}
          onScroll={checkForScrollPosition}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide scroll-smooth px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => navigate(`/collection?category=${encodeURIComponent(category.name)}`)}
              className="flex flex-col items-center cursor-pointer group/item flex-shrink-0"
            >

              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-[#c88b083a] rounded-xl flex items-center justify-center mb-3 shadow-sm hover:shadow-md transition-shadow p-2 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover/item:scale-110"
                />
              </div>
              {/* Label */}
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-center max-w-[80px] sm:max-w-[100px] truncate group-hover/item:underline">
                {category.name}
              </span>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            onClick={() => scrollContainer("right")}
            className="absolute right-0 top-[40%] transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-100 z-10 hidden md:flex items-center justify-center transition-opacity duration-300"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryCarousel;