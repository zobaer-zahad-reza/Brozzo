import React from "react";
import { NavLink } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { BsTiktok } from "react-icons/bs";

const UnderNav = () => {
  const navLinkStyles = ({ isActive }) => {
    return `flex items-center h-full border-b-2 transition-all duration-300 px-4 whitespace-nowrap tracking-wide text-[12px] md:text-[13px] uppercase font-semibold ${
      isActive
        ? "border-[#FF4955] text-[#FF4955]"
        : "border-transparent text-gray-300 hover:text-white hover:border-[#FF4955]/50"
    }`;
  };

  const divider = (
    <span className="h-3 w-px bg-zinc-700 mx-1 hidden md:block opacity-50"></span>
  );

  return (
    <div className="w-full bg-black border-b border-zinc-900 text-white shadow-md relative z-40">
      <div className="flex items-center justify-center md:justify-between h-9 md:h-11 px-6 md:px-32 lg:px-44 relative">
        <div className="hidden md:block w-[120px]"></div>

        {/* Menu Items */}
        <ul className="flex items-center h-full overflow-x-auto md:overflow-visible w-full md:w-auto gap-1 md:gap-0 no-scrollbar justify-start md:justify-center">
          <li className="h-full shrink-0 flex items-center">
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>
            {divider}
          </li>
          <li className="h-full shrink-0 flex items-center">
            <NavLink to="/collection" className={navLinkStyles}>
              Collection
            </NavLink>
            {divider}
          </li>
          <li className="h-full shrink-0 flex items-center">
            <NavLink to="/contact" className={navLinkStyles}>
              Contact
            </NavLink>
            {divider}
          </li>
          <li className="h-full shrink-0 flex items-center">
            <NavLink to="/about-us" className={navLinkStyles}>
              About Us
            </NavLink>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="hidden md:flex items-center gap-3 w-[120px] justify-end">
          <a
            href="https://www.facebook.com/brozzo.bd?rdid=wfXu23nMoiwSI6m7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16d6LGkDpM%2F#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-gray-200 hover:bg-[#FF4955] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,73,85,0.6)]"
          >
            <Facebook size={14} />
          </a>
          <a
            href="https://www.instagram.com/brozzo.bd?igsh=Y3JkcG02OWp4Y3M4"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-gray-200 hover:bg-[#FF4955] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,73,85,0.6)]"
          >
            <Instagram size={14} />
          </a>
          <a
            href="https://www.tiktok.com/@brozzo.bd?_r=1&_t=ZS-93l2ayVD1CK"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-gray-200 hover:bg-[#FF4955] hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,73,85,0.6)]"
          >
            <BsTiktok size={12} />
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
