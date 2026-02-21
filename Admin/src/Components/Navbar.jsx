import React from "react";
import logo from "../assets/logo.png";
import { LogOut } from "lucide-react";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-3 px-6 md:px-10 justify-between bg-[#121215] border-b border-zinc-800 shadow-md sticky top-0 z-50 transition-all">
      
      {/* Logo & Badge Section */}
      <div className="flex items-center gap-4">
        <img
          className="w-20 md:w-24 object-contain cursor-pointer"
          src={logo}
          alt="Brozzo Admin"
        />
        {/* Premium Admin Badge */}
        <span className="hidden sm:block border border-zinc-800 bg-zinc-900 rounded-md px-3 py-1 text-[10px] text-[#FF4955] font-black uppercase tracking-[2px] shadow-inner">
          Admin Panel
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className="group flex items-center gap-2 bg-zinc-900 hover:bg-[#FF4955] text-gray-300 hover:text-white border border-zinc-700 hover:border-[#FF4955] px-5 py-2 rounded-md text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
      >
        <LogOut size={16} className="text-zinc-400 group-hover:text-white transition-colors" />
        Logout
      </button>
      
    </div>
  );
};

export default Navbar;