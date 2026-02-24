import React from "react";
import vividLogo from "../assets/logo.png";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";

const HeroMarquee = ({ message, targetDate }) => {
  return (
    <div className="relative bg-[#18181b] border border-zinc-800 rounded-md mt-10 shadow-lg overflow-hidden h-14 md:h-20">
      {/* Left Logo Section */}

      <div className="absolute left-0 z-20 h-full flex items-center bg-[#18181b] pr-4 pl-3 md:pl-6 md:pr-10 shadow-[15px_0_20px_rgba(24,24,27,1)] cursor-pointer">
        <Link to="/">
          <img
            className="w-16 md:w-24 object-contain"
            src={vividLogo}
            alt="Brozzo Logo"
          />
        </Link>
      </div>

      {/* Marquee Text */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="whitespace-nowrap font-bold text-gray-200 animate-scroll text-xs md:text-lg lg:text-xl uppercase tracking-widest">
          {message}
        </div>
      </div>

      {/* Right Controls Section */}
      <div className="absolute right-0 z-20 h-full flex items-center gap-2 md:gap-6 bg-[#18181b] pl-4 pr-3 md:pl-10 md:pr-6 shadow-[-15px_0_20px_rgba(24,24,27,1)]">
        <div className="scale-[0.65] origin-right md:scale-90">
          <Countdown targetDate={targetDate} />
        </div>
        <Link to={"/collection"}>
          <button className="px-4 py-2 text-[10px] md:text-xs font-bold rounded-sm md:rounded-md bg-[#FF4955] text-white hover:bg-[#e03e49] shadow-md transition-all uppercase tracking-wider active:scale-95">
            Explore
          </button>
        </Link>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
          display: inline-block;
        }
        .animate-scroll:hover { animation-play-state: paused; }
        @media (max-width: 767px) {
          .animate-scroll { animation: scroll 15s linear infinite; }
        }
      `}</style>
    </div>
  );
};

export default HeroMarquee;
