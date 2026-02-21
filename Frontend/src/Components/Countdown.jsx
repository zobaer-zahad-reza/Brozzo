import React, { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeRemaining(0);
      } else {
        setTimeRemaining(difference);
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const getFormattedTime = (ms) => {
    const total_seconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(total_seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((total_seconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(total_seconds % 60).padStart(2, "0");

    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = getFormattedTime(timeRemaining);

  return (
    <div className="flex flex-col items-center justify-center px-3 py-1.5 md:py-2  border border-zinc-800 rounded-md shadow-inner">
      <h3 className="text-[#FF4955] font-bold mb-1 text-[8px] md:text-[10px] tracking-[0.2em] uppercase">
        Offer Ends In
      </h3>

      <div className="flex items-center gap-1.5 md:gap-3">
        <div className="flex flex-col items-center min-w-[20px] md:min-w-[28px]">
          <span className="text-sm md:text-xl font-black text-white leading-none tracking-wider">{hours}</span>
          <span className="text-[8px] font-bold text-zinc-500 uppercase mt-0.5 tracking-widest">Hrs</span>
        </div>
        
        <div className="text-sm md:text-lg font-bold text-zinc-600 mb-3 animate-pulse">:</div>
        
        <div className="flex flex-col items-center min-w-[20px] md:min-w-[28px]">
          <span className="text-sm md:text-xl font-black text-white leading-none tracking-wider">{minutes}</span>
          <span className="text-[8px] font-bold text-zinc-500 uppercase mt-0.5 tracking-widest">Min</span>
        </div>
        
        <div className="text-sm md:text-lg font-bold text-zinc-600 mb-3 animate-pulse">:</div>
        
        <div className="flex flex-col items-center min-w-[20px] md:min-w-[28px]">
          <span className="text-sm md:text-xl font-black text-white leading-none tracking-wider">{seconds}</span>
          <span className="text-[8px] font-bold text-zinc-500 uppercase mt-0.5 tracking-widest">Sec</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;