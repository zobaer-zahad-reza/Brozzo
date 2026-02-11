import React, { useContext, useState } from "react";
import { ShoppingCart, ChevronDown, Search, Menu, User, LogOut, Package } from "lucide-react";
import Logo from "../assets/logo.png";
import UnderNav from "./UnderNave";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const { getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);
  
  const [category, setCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { t, i18n } = useTranslation();

  const categories = [
    "All", "Fashion", "Beauty & Personal Care", "Health & Household", 
    "Home & Kitchen", "Electronics", "Baby Products", "Toys & Games", 
    "Pet Supplies", "Arts, Crafts & Sewing", "Office Products", 
    "Sports & Outdoors", "Automotive Accessories"
  ];

  const logout = () => {
    navigate('/login');       
    localStorage.removeItem('token'); 
    setToken('');             
    setCartItems({});         
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
        navigate(`/collection?search=${searchTerm}`);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <style>{`
            @keyframes shineMove {
                0% { background-position: 0% center; }
                100% { background-position: -200% center; }
            }
            .text-glow-animation {
                background: linear-gradient(to left, #9ca3af 20%, #FF751F 50%, #9ca3af 80%);
                background-size: 200% auto;
                color: #9ca3af;
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: shineMove 3s linear infinite;
            }
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #4b5563;
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #FF751F;
            }
        `}</style>

        {/* MAIN HEADER - DARK THEME */}
        <div className="bg-black text-gray-200 flex flex-col md:flex-row items-center px-4 py-2 md:py-3 relative z-[60] shadow-sm border-b border-gray-800">
          
          {/* Logo & Menu */}
          <div className="flex justify-between items-center w-full md:w-auto">
            <div className="flex items-center gap-2 md:gap-4">
              <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-300 hover:bg-gray-800 p-1 rounded-md transition-colors">
                <Menu className="w-6 h-6" />
              </button>
              <Link to={"/"} className="flex-shrink-0">
                {/* Note: Ensure your Logo.png has white text or transparent background suitable for black themes */}
                <img className="w-28 md:w-36 object-contain" src={Logo} alt="Logo" />
              </Link>
            </div>
          </div>

          {/* Search Bar Section */}
          <div className="w-full mt-2 md:mt-0 md:flex-1 flex justify-center md:px-6">
            <form onSubmit={handleSearch} className="flex h-10 rounded-md border border-gray-700 focus-within:ring-2 focus-within:ring-[#FF751F] w-full md:max-w-[700px] relative bg-zinc-900">

              {/* Category Dropdown */}
              <div 
                className="relative hidden md:flex items-center bg-zinc-800 border-r border-gray-700 hover:bg-zinc-700 cursor-pointer h-full px-3 rounded-l-md transition-all group"
                onMouseEnter={() => setShowCategoryMenu(true)}
                onMouseLeave={() => setShowCategoryMenu(false)}
              >
                <span className="text-gray-300 text-xs font-semibold whitespace-nowrap">{category}</span>
                <ChevronDown className={`w-3 h-3 text-gray-400 ml-1 transition-transform duration-200 ${showCategoryMenu ? 'rotate-180' : ''}`} />

                {/* Dropdown Menu */}
                {showCategoryMenu && (
                  <div className="absolute top-[38px] left-0 w-64 bg-zinc-900 border border-gray-800 shadow-2xl rounded-b-md z-[100] py-2 max-h-80 overflow-y-auto custom-scrollbar">
                    {categories.map((item) => (
                      <p 
                        key={item}
                        onClick={() => { 
                          setCategory(item); 
                          setShowCategoryMenu(false);
                          if (item === "All") {
                            navigate('/collection');
                          } else {
                            navigate(`/collection?category=${encodeURIComponent(item)}`);
                          }
                        }}
                        className={`px-4 py-2.5 text-sm transition-all duration-150 cursor-pointer flex items-center
                          ${category === item 
                            ? 'bg-zinc-800 text-[#FF751F] font-bold border-l-4 border-[#FF751F]' 
                            : 'text-gray-300 hover:bg-[#FF751F] hover:text-white'
                          }`}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Input Field */}
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                className="grow px-3 bg-transparent text-white text-[15px] outline-none placeholder-gray-500 w-full"
                type="text"
                placeholder="Search Brozzo..."
              />

              {/* Search Button */}
              <button type="submit" className="bg-[#FF751F] hover:bg-[#e66a1c] w-12 flex-shrink-0 flex items-center justify-center text-white transition-colors rounded-r-md">
                <Search className="w-5 h-5 text-white" />
              </button>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5 ml-4">
            
            {/* Profile */}
            {token ? (
              <div className="group relative">
                <div className="flex items-center gap-2 cursor-pointer p-1">
                  <User className="w-6 h-6 text-gray-300 hover:text-[#FF751F] transition" />
                </div>
                <div className="group-hover:block hidden absolute right-0 pt-2 z-50 w-44">
                    <div className="flex flex-col gap-1 py-3 px-4 bg-zinc-900 shadow-xl rounded border border-gray-800 text-gray-300">
                        <p onClick={()=>navigate('/profile')} className="cursor-pointer hover:text-[#FF751F] flex items-center gap-2 font-medium transition-colors">
                            <User size={16}/> My Profile
                        </p>
                        <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:text-[#FF751F] flex items-center gap-2 font-medium transition-colors">
                            <Package size={16}/> Orders
                        </p>
                        <hr className="my-1 border-gray-700"/>
                        <p onClick={logout} className="cursor-pointer hover:text-red-500 flex items-center gap-2 font-medium transition-colors">
                            <LogOut size={16}/> Logout
                        </p>
                    </div>
                </div>
              </div>
            ) : (
              <Link to={'/login'} className="px-5 py-2 rounded-md bg-[#FF751F] font-bold text-sm text-white hover:bg-[#e66a1c] shadow-sm transition-all active:scale-95">
                {t("login")}
              </Link>
            )}

            {/* Cart Icon */}
            <Link to={'/cart'} className="relative flex items-center p-1 hover:bg-zinc-800 rounded-full transition-colors group">
              <ShoppingCart className="w-7 h-7 text-gray-300 group-hover:text-[#FF751F]" />
              <span className="absolute -top-1 -right-1 text-white font-bold text-[10px] bg-[#FF751F] rounded-full px-1.5 py-0.5 border-2 border-black">
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