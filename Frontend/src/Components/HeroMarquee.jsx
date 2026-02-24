import React from "react";
import vividLogo from "../assets/logo.png";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";

const HeroMarquee = ({ message, targetDate }) => {
  return (
    <div className="relative w-full bg-[#18181b] border border-zinc-800 rounded-xl mt-10 shadow-2xl overflow-hidden h-16 md:h-[76px] flex items-center group">
      {/* Marquee Text (Background Layer) */}
      <div className="absolute inset-0 z-0 flex items-center w-full">
        <div className="whitespace-nowrap font-bold text-gray-300/90 animate-scroll text-sm md:text-xl uppercase tracking-[0.2em] md:tracking-[0.3em]">
          {message}
          <span className="mx-10 md:mx-20 text-[#FF4955]">•</span>
          {message}
        </div>
      </div>

      {/* Left Logo Section (Foreground Layer) */}
      {/* FIXED: Reduced padding and shadow spread on mobile so it doesn't cover the text */}
      <div className="absolute left-0 z-10 h-full flex items-center justify-center bg-[#18181b] px-3 md:px-8 shadow-[15px_0_15px_5px_#18181b] md:shadow-[30px_0_30px_15px_#18181b]">
        <Link to="/" className="flex items-center">
          <img
            className="w-16 md:w-28 object-contain hover:scale-105 transition-transform duration-300"
            src={vividLogo}
            alt="Brozzo Logo"
          />
        </Link>
      </div>

      {/* Right Controls Section (Foreground Layer) */}
      {/* FIXED: Reduced left padding (pl-4) and shadow to leave space in the middle */}
      <div className="absolute right-0 z-10 h-full flex items-center justify-end gap-2 md:gap-6 bg-[#18181b] pl-4 pr-3 md:pl-12 md:pr-6 shadow-[-15px_0_15px_5px_#18181b] md:shadow-[-30px_0_30px_15px_#18181b]">
        {/* Countdown */}
        {/* FIXED: Scaled down slightly more on mobile (scale-[0.60]) to save space */}
        <div className="flex items-center justify-center scale-[0.60] sm:scale-75 md:scale-100 origin-right">
          <Countdown targetDate={targetDate} />
        </div>

        {/* Buttons (Responsive) */}
        <Link to={"/collection"}>
          {/* Desktop Button */}
          <button className="hidden sm:flex px-6 py-2.5 text-xs font-black rounded-md bg-[#FF4955] text-white hover:bg-[#e03e49] shadow-[0_0_15px_rgba(255,73,85,0.3)] transition-all uppercase tracking-widest active:scale-95 items-center gap-2">
            Explore
          </button>

          {/* Mobile Button (Space saver) */}
          <button className="flex sm:hidden px-2.5 py-1.5 text-[9px] font-black rounded text-[#FF4955] border border-[#FF4955] hover:bg-[#FF4955] hover:text-white transition-all uppercase tracking-widest active:scale-95">
            Shop
          </button>
        </Link>
      </div>

      {/* Styles for Animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-150%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
          display: inline-block;
          will-change: transform;
        }
        /* Pause on hover for better UX */
        .group:hover .animate-scroll { 
          animation-play-state: paused; 
        }
        @media (max-width: 768px) {
          .animate-scroll { 
            animation: scroll 15s linear infinite; 
          }
        }
      `}</style>
    </div>
  );
};

export default HeroMarquee;
