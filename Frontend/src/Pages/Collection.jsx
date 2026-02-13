import React, { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { TbFaceIdError } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
// import { ShopContext } from "../Context/ShopContext"; // Commented for static test

const Collection = () => {
  // --- DYNAMIC CONTEXT (Commented Out) ---
  /*
  const { products, showSearch } = useContext(ShopContext);
  */
  
  // --- STATIC DEMO DATA FOR BROZZO ---
  const demoProducts = [
    {
      _id: "1",
      name: "Midnight Chronograph Watch",
      price: 150,
      offerPrice: 120,
      image: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop"],
      category: "Watch"
    },
    {
      _id: "2",
      name: "Noir Leather Belt",
      price: 45,
      offerPrice: 35,
      image: ["https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1000&auto=format&fit=crop"],
      category: "Men Accesoric"
    },
    {
      _id: "3",
      name: "Bass Pro Wireless Headphones",
      price: 200,
      offerPrice: 180,
      image: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"],
      category: "Tech Accesoric"
    },
    {
      _id: "4",
      name: "Aviator Dark Shades",
      price: 80,
      offerPrice: 0,
      image: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop"],
      category: "Sun Glasses"
    },
    {
      _id: "5",
      name: "Urban Black Hoodie",
      price: 60,
      offerPrice: 50,
      image: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop"],
      category: "Men Cloths"
    },
    {
      _id: "6",
      name: "Classic Silver Timepiece",
      price: 250,
      offerPrice: 220,
      image: ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop"],
      category: "Watch"
    }
  ];

  // Brozzo Specific Categories
  const categories = [
    "Watch", "Men Accesoric", "Sun Glasses",
    "Tech Accesoric", "Men Cloths"
  ];

  const [searchParams] = useSearchParams();
  const { categorySlug } = useParams();
  
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState(demoProducts); // Using static data initially
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const showSearch = false; // Static showSearch

  // Initialize Category from URL
  useEffect(() => {
    let categoryList = [];
    if (categorySlug) {
      categoryList.push(decodeURIComponent(categorySlug));
    } else {
      const categoryQuery = searchParams.get("category");
      if (categoryQuery && categoryQuery !== "All") {
        categoryList.push(categoryQuery);
      }
    }
    setCategory(categoryList);
    setShowFilter(false); 
  }, [categorySlug, searchParams]);

  // Filter & Sort Logic
  useEffect(() => {
    let cp = [...demoProducts]; // Apply on demoProducts
    
    const urlSearch = searchParams.get("search");

    // Search Logic
    if (showSearch && urlSearch) {
      cp = cp.filter(item => item.name.toLowerCase().includes(urlSearch.toLowerCase()));
    }

    // Category Filter Logic
    if (category.length > 0) {
      cp = cp.filter(item => 
        category.some(c => item.category && item.category.toLowerCase() === c.toLowerCase())
      );
    }

    // Sort Logic
    if (sortType === "low-high") cp.sort((a, b) => a.price - b.price);
    else if (sortType === "high-low") cp.sort((a, b) => b.price - a.price);

    setFilterProducts(cp);
  }, [category, searchParams, showSearch, sortType]); // Removed 'products' dependency for static mode

  const toggleCategory = (e) => {
    const val = e.target.value;
    
    // Toggle logic: If clicked, add/remove from array
    setCategory(prev => {
        if (prev.includes(val)) {
            return prev.filter(a => a !== val);
        } else {
            // For single selection behavior (optional), uncomment next line:
            // return [val]; 
            return [...prev, val];
        }
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-16 px-4 bg-black min-h-screen text-gray-200">
      
      {/* --- Filters Sidebar --- */}
      <div className={`fixed sm:static top-0 right-0  h-full sm:h-auto w-[280px] sm:w-64 bg-[#18181b] sm:bg-transparent p-5 sm:p-0 transition-transform duration-300 ease-in-out border-l sm:border-l-0 border-zinc-800 ${showFilter ? "translate-x-0 shadow-2xl" : "translate-x-full sm:translate-x-0 shadow-none"}`}>
        
        {/* Mobile Filter Header */}
        <div className="flex justify-between items-center sm:hidden mb-6 border-b border-zinc-800 pb-4">
            <span className="text-xl font-bold text-white uppercase tracking-wider">Filters</span>
            <IoClose onClick={() => setShowFilter(false)} className="text-2xl cursor-pointer text-[#FF4955]" />
        </div>

        <p className="hidden sm:block my-2 text-xl font-bold text-white uppercase tracking-wider">Filters</p>
        
        {/* Category Filter Box */}
        <div className="border border-zinc-800 bg-[#18181b] pl-5 py-4 mt-6 rounded-md shadow-sm">
          <p className="mb-4 text-sm font-bold uppercase text-gray-400 tracking-widest">Categories</p>
          <div className="flex flex-col gap-3 text-sm text-gray-300 max-h-[500px] overflow-y-auto custom-scrollbar">
            {categories.map((cat) => (
              <label key={cat} className="flex gap-3 items-center cursor-pointer hover:text-[#FF4955] transition-colors group">
                <input 
                    className="w-4 h-4 accent-[#FF4955] bg-zinc-800 border-zinc-600 rounded cursor-pointer" 
                    type="checkbox" 
                    value={cat} 
                    onChange={toggleCategory} 
                    checked={category.includes(cat)} 
                />
                <span className="group-hover:translate-x-1 transition-transform">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* --- Product Area --- */}
      <div className="flex-1">
        
        {/* Top Bar: Title & Sort */}
        <div className="flex flex-col sm:flex-row justify-between mb-8 items-center gap-4 border-b border-zinc-800 pb-6">
          <div className="inline-flex items-center gap-2">
            <p className="text-gray-400 text-xl uppercase tracking-widest">
                Brozzo <span className="text-white font-extrabold">Collection</span>
            </p>
            <div className="w-12 h-[2px] bg-[#FF4955]"></div>
          </div>
          
          <div className="flex gap-4 w-full sm:w-auto">
            {/* Sort Dropdown */}
            <select 
                onChange={(e) => setSortType(e.target.value)} 
                className="border border-zinc-800 bg-[#18181b] text-gray-300 text-sm py-2 px-3 rounded-md w-1/2 sm:w-48 outline-none focus:border-[#FF4955] transition-colors"
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>

            {/* Mobile Filter Trigger */}
            <button 
                onClick={() => setShowFilter(true)} 
                className="sm:hidden flex items-center gap-2 border border-zinc-800 bg-[#18181b] px-4 py-2 text-sm font-bold rounded-md w-1/2 justify-center text-white hover:border-[#FF4955] transition-colors"
            >
                <FaFilter className="text-[#FF4955]" /> Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-8">
            {filterProducts.map((item) => (
              <ProductCard 
                key={item._id} 
                id={item._id} 
                image={item.image} 
                name={item.name} 
                price={item.price} 
                offerPrice={item.offerPrice} 
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-[#18181b] rounded-xl border border-dashed border-zinc-800 mt-10">
            <TbFaceIdError className="text-8xl text-zinc-700 mx-auto mb-4" />
            <h1 className="text-white font-bold text-2xl uppercase tracking-widest">No Products Found</h1>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;