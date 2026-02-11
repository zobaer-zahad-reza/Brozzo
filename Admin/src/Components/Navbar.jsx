import React from "react";
import logo from "../assets/logo.png";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-3 px-[4%] justify-between bg-white border-b border-gray-200 shadow-sm">
      {/* Logo & Badge Section */}
      <div className="flex items-center gap-3">
        <img
          className="w-[120px] sm:w-[140px] cursor-pointer"
          src={logo}
          alt="Vivid Valley"
        />
        <span className="hidden sm:block border border-gray-400 rounded-full px-3 py-0.5 text-xs text-gray-600 font-semibold uppercase tracking-wider">
          Admin Panel
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => setToken("")}
        className="bg-[#FFA24C] hover:bg-[#e68a35] text-white px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
