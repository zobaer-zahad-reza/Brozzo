import React from "react";
import vividLogo from "../assets/logo.png";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";

const HeroMarquee = ({ message, targetDate }) => {
  return (
    <div className="relative bg-[#E2F8AF] rounded-lg mt-10 shadow-sm overflow-hidden h-14 md:h-20 lg:h-24">
      
      {/* Left Logo */}
      <div className="absolute left-0 z-20 h-full flex items-center bg-[#E2F8AF] pr-2 pl-2 md:pl-6 md:pr-10 shadow-[4px_0_10px_rgba(226,248,175,1)] hover:cursor-pointer">
        <img className="w-16 md:w-36 object-contain" src={vividLogo} alt="Logo" />
      </div>

      {/* Marquee Text */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="whitespace-nowrap font-bold text-gray-900 animate-scroll text-xs md:text-2xl">
            {message}
        </div>
      </div>

      {/* Right Controls */}
      <div className="absolute right-0 z-20 h-full flex items-center gap-1 md:gap-4 bg-[#E2F8AF] pl-2 pr-2 md:pl-10 md:pr-6 shadow-[-4px_0_10px_rgba(226,248,175,1)]">
        <div className="scale-[0.60] origin-right md:scale-100">
          <Countdown targetDate={targetDate} />
        </div>
        <Link to={'/collection'}>
          <button className="px-3 py-1.5 text-[10px] font-bold md:btn md:btn-md rounded-md md:rounded-lg bg-white text-[#0F3D3E] border-none hover:bg-gray-100 shadow-sm">
              Explore More
          </button>
        </Link>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
          display: inline-block;
        }
        .animate-scroll:hover { animation-play-state: paused; }
        @media (max-width: 767px) {
          .animate-scroll { animation: scroll 12s linear infinite; }
        }
      `}</style>
    </div>
  );
};

export default HeroMarquee;