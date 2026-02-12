import React from "react";
import { NavLink } from "react-router-dom";

const UnderNav = () => {
  const navLinkStyles = ({ isActive }) => {
    return `flex items-center h-full border-b-2 transition-all duration-300 px-4 whitespace-nowrap tracking-wide text-[13px] md:text-sm uppercase font-medium ${
      isActive
        ? "border-[#FF4955] text-[#FF4955] font-bold"
        : "border-transparent text-gray-400 hover:text-white hover:border-[#FF4955]/50"
    }`;
  };

  const divider = (
    <span className="h-4 w-px bg-zinc-800 mx-2 hidden md:block"></span>
  );

  return (
    <div className="w-full bg-black border-b border-zinc-900 text-white shadow-md relative z-40">
      <div className="container mx-auto px-2 md:px-4 relative">

        {/* Navigation */}
        <ul className="flex items-center h-10 md:h-12 overflow-x-auto md:overflow-visible w-full gap-1 md:gap-0 md:justify-center no-scrollbar">
          <li className="h-full shrink-0 flex items-center">
            <NavLink to="/" className={navLinkStyles}>Home</NavLink>{divider}
          </li>
          <li className="h-full shrink-0 flex items-center">
            <NavLink to="/collection" className={navLinkStyles}>Collection</NavLink>{divider}
          </li>

          <li className="h-full shrink-0 flex items-center">
            <NavLink to="/contact" className={navLinkStyles}>Contact</NavLink>{divider}
          </li>
          <li className="h-full shrink-0 flex items-center">
            <NavLink to="/about-us" className={navLinkStyles}>About Us</NavLink>
          </li>
        </ul>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default UnderNav;