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
    <div className="flex flex-col text-gray-700 items-center justify-center p-1 md:p-2 bg-[#E2F8AF] rounded-lg">
      <h3 className="text-gray-700 font-bold mb-0.5 text-[10px] md:text-xs tracking-wide uppercase">
        Offer Ends In
      </h3>

      <div className="flex items-center gap-1 md:gap-2">
        <div className="flex flex-col items-center">
          <span className="text-sm md:text-xl font-black text-gray-800 leading-none">{hours}</span>
          <span className="text-[8px] font-bold text-gray-500 uppercase">Hrs</span>
        </div>
        <div className="text-lg font-bold text-gray-400">:</div>
        <div className="flex flex-col items-center">
          <span className="text-sm md:text-xl font-black text-gray-800 leading-none">{minutes}</span>
          <span className="text-[8px] font-bold text-gray-500 uppercase">Min</span>
        </div>
        <div className="text-lg font-bold text-gray-400">:</div>
        <div className="flex flex-col items-center">
          <span className="text-sm md:text-xl font-black text-gray-800 leading-none">{seconds}</span>
          <span className="text-[8px] font-bold text-gray-500 uppercase">Sec</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;