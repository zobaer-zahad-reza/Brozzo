import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const UnderNav = () => {
  const navLinkStyles = ({ isActive }) => {
    return `flex items-center h-full border-b-2 transition-all duration-200 px-3 whitespace-nowrap ${
      isActive
        ? "border-white text-white font-bold"
        : "border-transparent text-white/90 hover:text-white hover:border-white/60"
    }`;
  };

  const divider = (
    <span className="h-3 w-px bg-white/40 mx-1 hidden md:block"></span>
  );

  return (
    <div className="w-full bg-linear-to-r from-[#fcae61] to-[#ff9e44] text-white font-medium text-sm font-sans shadow-md">
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
            <NavLink to="/about-us" className={navLinkStyles}>About Us</NavLink>{divider}
          </li>
        </ul>

        {/* Social Icons */}
        <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-2 py-1.5 rounded-full ">
          <a
            href="https://www.facebook.com/vividvalleypets"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#fcae61] transition"
          >
            <FaFacebookF size={14} />
          </a>

          <a
            href="https://www.instagram.com/vividvalleypets/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#fcae61] transition"
          >
            <FaInstagram size={15} />
          </a>

          <a
            href="https://www.tiktok.com/@vividvalleypets"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white hover:text-[#fcae61] transition"
          >
            <FaTiktok size={14} />
          </a>
        </div>
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
