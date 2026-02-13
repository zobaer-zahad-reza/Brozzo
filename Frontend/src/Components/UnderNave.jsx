import React from "react";
import { NavLink } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { BsTiktok } from "react-icons/bs";

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
      <div className="container mx-auto px-2 md:px-4 relative flex items-center justify-center md:justify-between h-10 md:h-14">


        <div className="hidden md:block w-[140px]"></div>

        <ul className="flex items-center h-full overflow-x-auto md:overflow-visible w-full md:w-auto gap-1 md:gap-0 no-scrollbar justify-start md:justify-center">
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

        {/* Social Icons  */}
        <div className="hidden md:flex items-center gap-3 w-[140px] justify-end">
          <a 
            href="https://www.facebook.com/brozzo.bd?rdid=wfXu23nMoiwSI6m7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16d6LGkDpM%2F#"
            target='_blank'
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-[#FF4955] hover:text-white transition-all duration-300 group shadow-sm border border-zinc-800 hover:border-[#FF4955]"
          >
            <Facebook size={16} />
          </a>
          <a 
            href="https://www.instagram.com/brozzo.bd?igsh=Y3JkcG02OWp4Y3M4" 
            target='_blank'
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-[#FF4955] hover:text-white transition-all duration-300 group shadow-sm border border-zinc-800 hover:border-[#FF4955]"
          >
            <Instagram size={16} />
          </a>
          <a 
            href="https://www.tiktok.com/@brozzo.bd?_r=1&_t=ZS-93l2ayVD1CK"
            target='_blank'
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-gray-400 hover:bg-[#FF4955] hover:text-white transition-all duration-300 group shadow-sm border border-zinc-800 hover:border-[#FF4955]"
          >
            <BsTiktok size={14} />
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