import React from "react";
import { NavLink } from "react-router-dom";
// import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const UnderNav = () => {
  const navLinkStyles = ({ isActive }) => {
    return `flex items-center h-full border-b-2 transition-all duration-200 px-3 whitespace-nowrap ${
      isActive
        ? "border-[#FF751F] text-[#FF751F] font-bold"
        : "border-transparent text-gray-300 hover:text-white hover:border-gray-500"
    }`;
  };

  const divider = (
    <span className="h-3 w-px bg-gray-700 mx-1 hidden md:block"></span>
  );

  return (
    <div className="w-full bg-black border-b border-gray-900 text-white font-medium text-sm font-sans shadow-md">
      <div className="container mx-auto px-2 md:px-4 relative">

        {/* Navigation */}
        <ul className="flex items-center h-10 md:h-12 overflow-x-auto md:overflow-visible w-full gap-2 md:gap-0 md:justify-center no-scrollbar">
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