import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroMarquee from "../Components/HeroMarquee";
import HeroSlider from "../Components/HeroSlider";
import { useTranslation } from "react-i18next";
import { FaGem, FaHeadset, FaHome, FaTruck, FaTshirt, FaArrowRight } from "react-icons/fa";

import CategoryCarousel from "../Components/CategoryCarousel";
import PromoBentoGrid from "../Components/PromoBentoGrid";
import { GiVacuumCleaner } from "react-icons/gi";
import { Link } from "react-router-dom";
import BestSellingProducts from "../Components/BestSellingProducts";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const styles = `
  @keyframes gradient-x {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-text-gradient {
    background-size: 200% auto;
    animation: gradient-x 3s ease infinite;
  }
`;

const Home = () => {
  const { t } = useTranslation();
  const [marqueeData, setMarqueeData] = useState(null);

  useEffect(() => {
    const fetchMarquee = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/marquee/get`);
        if (response.data.success) {
          setMarqueeData(response.data.marquee);
        }
      } catch (error) {
        console.error("Marquee fetch error:", error);
      }
    };
    fetchMarquee();
  }, []);

  const shouldShowMarquee = () => {
    if (!marqueeData || !marqueeData.isActive) return false;

    const now = new Date().getTime();
    const expiry = new Date(marqueeData.expiryDate).getTime();

    return expiry > now;
  };

  const features = [
    { name: "Premium Products", icon: <FaGem /> },
    { name: "Fashion & Lifestyle", icon: <FaTshirt /> },
    { name: "Home & Living", icon: <FaHome /> },
    { name: "Health & Household", icon: <GiVacuumCleaner /> },
    { name: "24/7 Support", icon: <FaHeadset /> },
    { name: "Global Shipping", icon: <FaTruck /> },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="w-[98%] mx-auto">

        {marqueeData?.isActive && (
          <HeroMarquee
            message={marqueeData.text}
            targetDate={marqueeData.expiryDate}
          />
        )}

        <HeroSlider />

        {/* shop by category */}
        <CategoryCarousel />

        <PromoBentoGrid />

        <BestSellingProducts />

        <Link to={'/collection'} className="flex justify-center mt-12">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full text-white font-bold text-lg shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden hover:cursor-pointer">
            <span className="relative z-10 flex items-center gap-3">
              More Collection
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out skew-x-12"></div>
          </button>
        </Link>

        {/* Features Bar */}
        <div className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 mb-6 text-white mt-8 rounded-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-amber-200 to-orange-400 bg-clip-text text-transparent animate-text-gradient">
                {t("what_we_offer")}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{t("offer_desc")}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors"
                >
                  <div className="text-orange-400 mb-2 text-2xl">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-sm">{feature.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Home;