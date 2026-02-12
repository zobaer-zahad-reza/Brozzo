import React, { useContext, useState } from 'react';
import { X, UserCircle, ChevronRight, ChevronDown, LogOut, Package, User, PhoneCall, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { token, setToken, navigate, setCartItems } = useContext(ShopContext);
  
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = [
    { name: "All", subCategories: [] },
    { name: "Watch", subCategories: [] },
    { 
      name: "Men Accesoric", 
      subCategories: ["Wallets", "Belts", "Perfumes", "Caps", "Ties"] 
    },
    { name: "Sun Glasses", subCategories: [] },
    { name: "Tech Accesoric", subCategories: ["Headphones", "Chargers", "Cases"] },
    { name: "Men Cloths", subCategories: ["T-Shirts", "Shirts", "Pants"] }
  ];

  const toggleCategory = (catName) => {
    if (expandedCategory === catName) {
        setExpandedCategory(null);
    } else {
        setExpandedCategory(catName);
    }
  };

  const logout = () => {
    onClose();
    navigate('/login');       
    localStorage.removeItem('token'); 
    setToken('');             
    setCartItems({});         
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/80 z-[1100] transition-opacity duration-300 backdrop-blur-sm ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      ></div>

      {/* Sidebar Content */}
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-black border-r border-zinc-800 z-[1200] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="bg-[#18181b] border-b border-zinc-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <UserCircle className="w-10 h-10 text-[#FF4955]" />
             <div className="flex flex-col">
                <span className="text-xs text-gray-400">Welcome, {token ? "User" : "Guest"}</span>
                <span className="font-bold text-lg leading-tight tracking-wide">{token ? "My Account" : "Sign In"}</span>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-zinc-700 rounded-full transition-colors text-gray-400 hover:text-white"
          >
             <X className="w-7 h-7" />
          </button>
        </div>

        {/* Menu Links Area */}
        <div className="overflow-y-auto flex-1 py-2 custom-scrollbar">
            
            {/* Categories Section */}
            <div className="px-4 py-4 border-b border-zinc-800">
                <h3 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-4 px-2">
                    Collections
                </h3>
                <ul className="space-y-1">
                    {categories.map((cat) => (
                        <li key={cat.name} className="flex flex-col">
                            <div className="flex justify-between items-center px-3 py-3 text-gray-300 hover:bg-zinc-900 hover:text-white rounded-md transition-all cursor-pointer group">
                                {/* Link Logic */}
                                {cat.subCategories.length > 0 ? (
                                    <div 
                                        className="flex-1 flex justify-between items-center"
                                        onClick={() => toggleCategory(cat.name)}
                                    >
                                        <span className="font-medium text-sm">{cat.name}</span>
                                        <ChevronDown 
                                            size={16} 
                                            className={`text-gray-500 transition-transform duration-300 ${expandedCategory === cat.name ? 'rotate-180 text-[#FF4955]' : ''}`} 
                                        />
                                    </div>
                                ) : (
                                    <Link 
                                        to={cat.name === "All" ? '/collection' : `/collection?category=${encodeURIComponent(cat.name)}`}
                                        className="flex-1 flex justify-between items-center"
                                        onClick={onClose}
                                    >
                                        <span className="font-medium text-sm">{cat.name}</span>
                                        <ChevronRight size={16} className="text-gray-500 group-hover:text-[#FF4955]" />
                                    </Link>
                                )}
                            </div>

                            {/* Sub-categories Dropdown */}
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCategory === cat.name ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                                <ul className="pl-6 border-l border-zinc-800 ml-3 my-1 space-y-1">
                                    {cat.subCategories.map((sub) => (
                                        <li key={sub}>
                                            <Link 
                                                to={`/collection?category=${encodeURIComponent(cat.name)}&sub=${encodeURIComponent(sub)}`}
                                                onClick={onClose}
                                                className="block px-3 py-2 text-sm text-gray-500 hover:text-[#FF4955] transition-colors"
                                            >
                                                {sub}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Help & Account Settings */}
            <div className="px-4 py-6">
                <h3 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-4 px-2">
                    Settings & Help
                </h3>
                <ul className="space-y-1">
                    {token && (
                        <>
                            <li>
                                <Link to="/profile" className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-zinc-900 hover:text-white rounded-md transition-colors" onClick={onClose}>
                                    <User size={18} className="text-[#FF4955]" /> <span>My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-zinc-900 hover:text-white rounded-md transition-colors" onClick={onClose}>
                                    <Package size={18} className="text-[#FF4955]" /> <span>My Orders</span>
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to="/contact" className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-zinc-900 hover:text-white rounded-md transition-colors" onClick={onClose}>
                            <PhoneCall size={18} className="text-gray-500 group-hover:text-white" /> <span>Contact Us</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-us" className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-zinc-900 hover:text-white rounded-md transition-colors" onClick={onClose}>
                            <Info size={18} className="text-gray-500 group-hover:text-white" /> <span>About Brozzo</span>
                        </Link>
                    </li>
                    
                    <div className="pt-4 mt-4 border-t border-zinc-800">
                        {token ? (
                            <button 
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-3 py-3 text-red-500 font-bold hover:bg-red-900/10 rounded-md transition-colors"
                            >
                                <LogOut size={18} /> <span>Sign Out</span>
                            </button>
                        ) : (
                            <Link 
                                to="/login" 
                                className="flex items-center gap-3 px-3 py-3 text-[#FF4955] font-bold hover:bg-[#FF4955]/10 rounded-md transition-colors" 
                                onClick={onClose}
                            >
                                <UserCircle size={20} /> <span>Sign In / Register</span>
                            </Link>
                        )}
                    </div>
                </ul>
            </div>

        </div>

        {/* Footer Branding */}
        <div className="p-4 bg-black border-t border-zinc-900 text-center">
            <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">
                © 2026 <Link to={"startedge.net"}>Startedge</Link>
            </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;