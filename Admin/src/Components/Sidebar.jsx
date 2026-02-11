import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { PlusCircle, List, Package, SquarePen, ChevronDown, ChevronRight } from "lucide-react";

const Sidebar = () => {

  const [isPageContentOpen, setIsPageContentOpen] = useState(false);

  const contentMenuParams = [
    { name: 'Home Page', path: '/edit-home-page' },
    // { name: 'Contact Us', path: '/edit-contact' },
    // { name: 'About Us', path: '/edit-about' },
    { name: 'Our Team', path: '/edit-team' },
    { name: 'Blog Page', path: '/edit-blog-page' },
    { name: 'Footer Info', path: '/edit-footer' },
  ];

  return (
    <div className="w-[18%] min-h-screen border-r-2 border-gray-100 bg-white">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        
        {/* Add Items */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${
              isActive
                ? "bg-[#FFA24C] text-white border-[#FFA24C]"
                : "bg-gray-50 hover:bg-gray-100"
            }`
          }
        >
          <PlusCircle size={20} />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${
              isActive
                ? "bg-[#FFA24C] text-white border-[#FFA24C]"
                : "bg-gray-50 hover:bg-gray-100"
            }`
          }
        >
          <List size={20} />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        {/*  Orders */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l transition-colors ${
              isActive
                ? "bg-[#FFA24C] text-white border-[#FFA24C]"
                : "bg-gray-50 hover:bg-gray-100"
            }`
          }
        >
          <Package size={20} />
          <p className="hidden md:block">Orders</p>
        </NavLink>

        {/*  Page Content Edit */}
        <div className="flex flex-col gap-2">
            
            <div 
                onClick={() => setIsPageContentOpen(!isPageContentOpen)}
                className={`flex items-center justify-between gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l cursor-pointer transition-colors ${
                    isPageContentOpen ? "bg-gray-100 border-gray-400" : "bg-gray-50 hover:bg-gray-100"
                }`}
            >
                <div className="flex items-center gap-3">
                    <SquarePen size={20} />
                    <p className="hidden md:block font-medium">Page Content Edit</p>
                </div>
                <div className="hidden md:block text-gray-500">
                    {isPageContentOpen ? <ChevronDown size={16}/> : <ChevronRight size={16}/>}
                </div>
            </div>

            {isPageContentOpen && (
                <div className="flex flex-col gap-1 ml-4 md:ml-6 transition-all duration-300 border-l-2 border-gray-200 pl-2">
                    {contentMenuParams.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-1.5 rounded-l text-sm transition-colors ${
                                isActive
                                    ? "text-[#FFA24C] font-semibold bg-orange-50"
                                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                                }`
                            }
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${item.path === location.pathname ? 'bg-[#FFA24C]' : 'bg-gray-400'}`}></span>
                            <p className="hidden md:block">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default Sidebar;