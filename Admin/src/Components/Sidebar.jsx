import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  PlusCircle,
  List,
  Package,
  SquarePen,
  ChevronDown,
  ChevronRight,
  UserCheck,
} from "lucide-react";

const Sidebar = () => {
  const [isPageContentOpen, setIsPageContentOpen] = useState(false);
  const location = useLocation();

  const contentMenuParams = [
    { name: "Home Page", path: "/edit-home-page" },
    // { name: 'Footer Info', path: '/edit-footer' },
  ];

  return (
    <div className="w-[70px] lg:w-[18%] min-h-screen border-r border-zinc-800 bg-[#121215] text-gray-300 transition-all duration-300">
      <div className="flex flex-col gap-4 pt-8 lg:pl-[15%] text-[14px]">
        {/* Add Items */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center justify-center lg:justify-start gap-3 border border-r-0 px-4 py-3 rounded-l-md transition-all ${
              isActive
                ? "bg-zinc-900 border-zinc-700 text-[#FF4955] shadow-[inset_4px_0_0_0_#FF4955]"
                : "border-transparent hover:bg-zinc-900 hover:text-white"
            }`
          }
        >
          <PlusCircle size={20} className="shrink-0" />
          <p className="hidden lg:block font-medium tracking-wide">Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center justify-center lg:justify-start gap-3 border border-r-0 px-4 py-3 rounded-l-md transition-all ${
              isActive
                ? "bg-zinc-900 border-zinc-700 text-[#FF4955] shadow-[inset_4px_0_0_0_#FF4955]"
                : "border-transparent hover:bg-zinc-900 hover:text-white"
            }`
          }
        >
          <List size={20} className="shrink-0" />
          <p className="hidden lg:block font-medium tracking-wide">
            List Items
          </p>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center justify-center lg:justify-start gap-3 border border-r-0 px-4 py-3 rounded-l-md transition-all ${
              isActive
                ? "bg-zinc-900 border-zinc-700 text-[#FF4955] shadow-[inset_4px_0_0_0_#FF4955]"
                : "border-transparent hover:bg-zinc-900 hover:text-white"
            }`
          }
        >
          <Package size={20} className="shrink-0" />
          <p className="hidden lg:block font-medium tracking-wide">Orders</p>
        </NavLink>

        {/* Page Content Edit */}
        <div className="flex flex-col gap-2">
          <div
            onClick={() => setIsPageContentOpen(!isPageContentOpen)}
            className={`flex items-center justify-center lg:justify-between gap-3 border border-r-0 px-4 py-3 rounded-l-md cursor-pointer transition-all ${
              isPageContentOpen
                ? "bg-zinc-900 border-zinc-700 text-white"
                : "border-transparent hover:bg-zinc-900 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <SquarePen
                size={20}
                className={`shrink-0 ${isPageContentOpen ? "text-[#FF4955]" : ""}`}
              />
              <p className="hidden lg:block font-medium tracking-wide">
                Page Content Edit
              </p>
            </div>
            <div className="hidden lg:block text-zinc-500">
              {isPageContentOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>
          </div>

          {/* Dropdown Menu Items */}
          {isPageContentOpen && (
            <div className="flex flex-col gap-1 lg:ml-8 mt-1 transition-all duration-300 lg:border-l border-zinc-800 lg:pl-3">
              {contentMenuParams.map((item, index) => {
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={`flex items-center justify-center lg:justify-start gap-3 px-3 py-2 rounded-l-md text-sm transition-all ${
                      isActive
                        ? "text-[#FF4955] font-semibold bg-zinc-900"
                        : "text-zinc-500 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        isActive
                          ? "bg-[#FF4955] shadow-[0_0_8px_#FF4955]"
                          : "bg-zinc-700"
                      }`}
                    ></span>
                    <p className="hidden lg:block">{item.name}</p>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>

        {/* Fraud Check */}
        <NavLink
          to="/fraud-check"
          className={({ isActive }) =>
            `flex items-center justify-center lg:justify-start gap-3 border border-r-0 px-4 py-3 rounded-l-md transition-all ${
              isActive
                ? "bg-zinc-900 border-zinc-700 text-[#FF4955] shadow-[inset_4px_0_0_0_#FF4955]"
                : "border-transparent hover:bg-zinc-900 hover:text-white"
            }`
          }
        >
          <UserCheck size={20} className="shrink-0" />
          <p className="hidden lg:block font-medium tracking-wide">
            Fraud Check
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
