import React, { useContext } from 'react';
import { X, UserCircle, ChevronRight, LogOut, Package, User, PhoneCall, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { token, setToken, navigate, setCartItems } = useContext(ShopContext);

  const categories = [
    "Fashion", "Beauty & Personal Care", "Health & Household", 
    "Home & Kitchen", "Electronics", "Baby Products", "Toys & Games", 
    "Pet Supplies", "Sports & Outdoors"
  ];

  const logout = () => {
    onClose();
    navigate('/login');       
    localStorage.removeItem('token'); 
    setToken('');             
    setCartItems({});         
  };

  return (
    <>
      {/* --- Overlay (Z-index high enough to cover Navbar) --- */}
      <div 
        className={`fixed inset-0 bg-black/60 z-[1100] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      ></div>

      {/* --- Sidebar Content --- */}
      <div className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white z-[1200] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header: Vivid Valley Theme */}
        <div className="bg-[#FF751F] text-white p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
             <UserCircle className="w-9 h-9" />
             <div className="flex flex-col">
                <span className="text-xs opacity-90">Hello, {token ? "User" : "Guest"}</span>
                <span className="font-bold text-lg leading-tight">{token ? "Your Account" : "Sign In"}</span>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
             <X className="w-7 h-7 text-white" />
          </button>
        </div>

        {/* Menu Links Area */}
        <div className="overflow-y-auto flex-1 py-2 custom-scrollbar">
            
            {/* Shop By Department */}
            <div className="px-4 py-4 border-b border-gray-100">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 mb-4 px-2">
                    Shop By Department
                </h3>
                <ul className="space-y-1">
                    {categories.map((cat) => (
                        <li key={cat}>
                            <Link 
                                to={`/collection?category=${encodeURIComponent(cat)}`} 
                                className="flex justify-between items-center px-3 py-3 text-gray-700 hover:bg-[#FFF5EE] hover:text-[#FF751F] rounded-md transition-all group" 
                                onClick={onClose}
                            >
                                <span className="font-medium">{cat}</span>
                                <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Help & Account Settings */}
            <div className="px-4 py-6">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-gray-900 mb-4 px-2">
                    Help & Settings
                </h3>
                <ul className="space-y-1">
                    {token && (
                        <>
                            <li>
                                <Link to="/profile" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md" onClick={onClose}>
                                    <User size={20} className="text-gray-400" /> <span>My Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md" onClick={onClose}>
                                    <Package size={20} className="text-gray-400" /> <span>My Orders</span>
                                </Link>
                            </li>
                        </>
                    )}
                    <li>
                        <Link to="/contact" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md" onClick={onClose}>
                            <PhoneCall size={20} className="text-gray-400" /> <span>Contact Us</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about-us" className="flex items-center gap-3 px-3 py-3 text-gray-700 hover:bg-gray-50 rounded-md" onClick={onClose}>
                            <Info size={20} className="text-gray-400" /> <span>About Vivid Valley</span>
                        </Link>
                    </li>
                    
                    <div className="pt-4 mt-4 border-t border-gray-100">
                        {token ? (
                            <button 
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-3 py-3 text-red-600 font-bold hover:bg-red-50 rounded-md transition-colors"
                            >
                                <LogOut size={20} /> <span>Sign Out</span>
                            </button>
                        ) : (
                            <Link 
                                to="/login" 
                                className="flex items-center gap-3 px-3 py-3 text-[#FF751F] font-bold hover:bg-[#FFF5EE] rounded-md transition-colors" 
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
        <div className="p-4 bg-gray-50 text-center">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                © 2026 Vivid Valley Global
            </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;