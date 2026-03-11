import React, { useContext, useState } from "react";
import {
  ShoppingCart,
  ChevronDown,
  ChevronRight,
  Search,
  Menu,
  User,
  LogOut,
  Package,
} from "lucide-react";
import Logo from "../assets/logo.png";
import UnderNav from "./UnderNave";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const { getCartCount, navigate, token, setToken, setCartItems, setSearch } =
    useContext(ShopContext);

  const [category, setCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const { t } = useTranslation();

  const categories = [
    { name: "All", subCategories: [] },
    { name: "Watch", subCategories: [] },
    {
      name: "Men Accessories",
      subCategories: ["Wallets", "Belts", "Caps", "Chain", "Ring"],
    },
    { name: "Sun Glasses", subCategories: [] },
    {
      name: "Tech Accessories",
      subCategories: ["Headphones", "Wireless Earbuds", "Speakers"],
    },
    { name: "Men Cloths", subCategories: ["T-Shirts", "Shirts", "Pants"] },
  ];

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearch(searchTerm); 
      navigate(`/collection?search=${encodeURIComponent(searchTerm)}`); 
    }
  };

  const handleCategoryClick = (mainCat, subCat = null) => {
    const selected = subCat ? subCat : mainCat;
    setCategory(selected);
    setShowCategoryMenu(false);
    setHoveredCategory(null);

    if (selected === "All") {
      navigate("/collection");
    } else {
      navigate(`/collection?category=${encodeURIComponent(selected)}`);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <style>{`
            /* Smooth Scrollbar for Dropdown */
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: #18181b; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #FF4955; }
        `}</style>

        {/* MAIN HEADER */}
        <div className="bg-black text-white flex flex-col md:flex-row items-center px-6 md:px-32 lg:px-32 py-4 relative shadow-md border-b border-zinc-900 transition-all duration-300">
          {/* Logo & Menu Container */}
          <div className="flex justify-between items-center w-full md:w-auto md:mr-4">
            <Link to={"/"} className="flex-shrink-0 flex items-center">
              <img
                className="w-16 md:w-20 object-contain"
                src={Logo}
                alt="Logo"
              />
            </Link>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-gray-300 hover:text-white hover:bg-zinc-800 p-2 rounded-md transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar Section */}
          <div className="w-full mt-2 md:mt-0 md:flex-1 flex justify-center md:px-6 lg:px-12">
            <form
              onSubmit={handleSearch}
              className="flex h-10 rounded-md border border-zinc-800 focus-within:border-[#FF4955] focus-within:ring-1 focus-within:ring-[#FF4955] w-full md:max-w-[600px] relative bg-[#18181b] transition-all duration-300"
            >
              {/* Category Dropdown */}
              <div
                className="relative hidden md:flex items-center bg-[#18181b] border-r border-zinc-700 hover:bg-zinc-800 cursor-pointer h-full px-3 rounded-l-md transition-all group"
                onMouseEnter={() => setShowCategoryMenu(true)}
                onMouseLeave={() => {
                  setShowCategoryMenu(false);
                  setHoveredCategory(null);
                }}
              >
                <span className="text-gray-300 text-xs md:text-sm font-medium whitespace-nowrap group-hover:text-white transition-colors">
                  {category}
                </span>
                <ChevronDown
                  className={`w-3 h-3 md:w-4 md:h-4 text-gray-400 ml-2 transition-transform duration-200 group-hover:text-white ${showCategoryMenu ? "rotate-180" : ""}`}
                />

                {/* MAIN DROPDOWN MENU */}
                {showCategoryMenu && (
                  <div className="absolute top-[40px] left-0 w-64 bg-[#18181b] border border-zinc-800 shadow-2xl rounded-b-md z-[100] py-2">
                    {categories.map((item) => (
                      <div
                        key={item.name}
                        className="relative"
                        onMouseEnter={() => setHoveredCategory(item.name)}
                        onMouseLeave={() => setHoveredCategory(null)}
                      >
                        <div
                          onClick={() => handleCategoryClick(item.name)}
                          className={`px-4 py-2.5 text-sm transition-all duration-150 cursor-pointer flex items-center justify-between
                            ${category === item.name ? "bg-zinc-800 text-[#FF4955] font-bold border-l-2 border-[#FF4955]" : "text-gray-300 hover:bg-zinc-800 hover:text-white hover:pl-5"}`}
                        >
                          {item.name}
                          {item.subCategories.length > 0 && (
                            <ChevronRight size={14} className="text-gray-500" />
                          )}
                        </div>

                        {/* SUB-MENU */}
                        {item.subCategories.length > 0 &&
                          hoveredCategory === item.name && (
                            <div className="absolute left-full top-0 w-48 bg-[#18181b] border border-zinc-800 shadow-xl rounded-r-md -ml-[1px] z-[101]">
                              {item.subCategories.map((sub) => (
                                <p
                                  key={sub}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCategoryClick(item.name, sub);
                                  }}
                                  className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-zinc-800 cursor-pointer transition-colors block"
                                >
                                  {sub}
                                </p>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Input Field */}
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                className="grow px-3 bg-transparent text-gray-200 text-sm outline-none placeholder-gray-500 w-full"
                type="text"
                placeholder="Search products..."
              />

              {/* Search Button */}
              <button
                type="submit"
                className="bg-[#FF4955] hover:bg-[#e03e49] px-4 flex-shrink-0 flex items-center justify-center text-white transition-colors rounded-r-md"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5 ml-2">
            {/* Profile */}
            {token ? (
              <div className="group relative">
                <div className="flex items-center cursor-pointer py-1">
                  <div className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors">
                    <User className="w-5 h-5 text-gray-300 group-hover:text-[#FF4955] transition" />
                  </div>
                </div>
                <div className="group-hover:block hidden absolute right-0 pt-2 z-50 w-48">
                  <div className="flex flex-col py-2 px-1 bg-[#18181b] shadow-xl rounded-md border border-zinc-800 text-gray-300">
                    <p
                      onClick={() => navigate("/profile")}
                      className="cursor-pointer hover:bg-zinc-800 hover:text-[#FF4955] px-4 py-2 rounded-sm flex items-center gap-3 font-medium transition-all text-sm"
                    >
                      <User size={14} /> My Profile
                    </p>
                    <p
                      onClick={() => navigate("/orders")}
                      className="cursor-pointer hover:bg-zinc-800 hover:text-[#FF4955] px-4 py-2 rounded-sm flex items-center gap-3 font-medium transition-all text-sm"
                    >
                      <Package size={14} /> Orders
                    </p>
                    <div className="my-1 border-t border-zinc-700 mx-2"></div>
                    <p
                      onClick={logout}
                      className="cursor-pointer hover:bg-red-900/20 hover:text-red-500 px-4 py-2 rounded-sm flex items-center gap-3 font-medium transition-all text-sm"
                    >
                      <LogOut size={14} /> Logout
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">

                

                {/* Login Button */}
                <Link
                  to={"/login"}
                  className="px-5 py-1.5 rounded-full bg-[#FF4955] font-semibold text-xs text-white hover:bg-[#e03e49] shadow-[0_0_10px_rgba(255,73,85,0.3)] transition-all active:scale-95"
                >
                  {t("login")}
                </Link>


                <Link
                  to={"/orders"}
                  className="relative flex items-center p-1.5 hover:bg-zinc-800 rounded-full transition-colors group"
                  title="Track Orders"
                >
                  <Package  className="w-5 h-5 text-gray-300 group-hover:text-[#FF4955] transition-colors" />
                </Link>
              </div>
            )}

            {/* Cart Icon */}
            <Link
              to={"/cart"}
              className="relative flex items-center p-1.5 hover:bg-zinc-800 rounded-full transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-[#FF4955] transition-colors" />
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-[16px] text-white font-bold text-[9px] bg-[#FF4955] rounded-full border-2 border-black">
                {getCartCount()}
              </span>
            </Link>
          </div>
        </div>

        <UnderNav />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;