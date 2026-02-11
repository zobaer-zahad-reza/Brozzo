import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { TbFaceIdError } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";

const Collection = () => {
  const { products, showSearch } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const categories = [
    "Watch", "Fashion", "Beauty & Personal Care", "Health & Household", 
    "Home & Kitchen", "Electronics", "Toys & Games", "Baby Products", 
    "Pet Supplies", "Arts, Crafts & Sewing", "Office Products", 
    "Sports & Outdoors", "Automotive Accessories",
  ];

  const { categorySlug } = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

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

  // Search , Category , Sort logic
  useEffect(() => {
    let cp = [...products];
    
    const urlSearch = searchParams.get("search");

    if (showSearch && urlSearch) {
      cp = cp.filter(item => item.name.toLowerCase().includes(urlSearch.toLowerCase()));
    }

    if (category.length > 0) {
      cp = cp.filter(item => 
        category.some(c => item.category && item.category.toLowerCase() === c.toLowerCase())
      );
    }

    if (sortType === "low-high") cp.sort((a, b) => a.price - b.price);
    else if (sortType === "high-low") cp.sort((a, b) => b.price - a.price);

    setFilterProducts(cp);
  }, [products, category, searchParams, showSearch, sortType]);

  const toggleCategory = (e) => {
    const val = e.target.value;
    setCategory(prev => prev.includes(val) ? prev.filter(a => a !== val) : [...prev, val]);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-24 px-4 bg-white min-h-screen">
      {/* Filters Sidebar */}
      <div className={`fixed sm:static top-0 right-0 z-[110] h-full sm:h-auto w-[280px] sm:w-64 bg-white p-5 sm:p-0 transition-transform ${showFilter ? "translate-x-0" : "translate-x-full sm:translate-x-0 shadow-none"}`}>
        <div className="flex justify-between items-center sm:hidden mb-6">
            <span className="text-xl font-bold">Filters</span>
            <IoClose onClick={() => setShowFilter(false)} className="text-2xl cursor-pointer" />
        </div>
        <p className="hidden sm:block my-2 text-xl font-bold text-gray-700">CATALOG FILTERS</p>
        <div className="border border-gray-200 pl-5 py-4 mt-6 rounded-md">
          <p className="mb-4 text-sm font-bold uppercase">Categories</p>
          <div className="flex flex-col gap-3 text-sm text-gray-600 max-h-[500px] overflow-y-auto custom-scrollbar">
            {categories.map((cat) => (
              <label key={cat} className="flex gap-3 items-center cursor-pointer hover:text-[#FF751F]">
                <input className="w-4 h-4 accent-[#FF751F]" type="checkbox" value={cat} onChange={toggleCategory} checked={category.includes(cat)} />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Area */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between mb-8 items-center gap-4">
          <div className="inline-flex items-center gap-2">
            <p className="text-gray-500 text-xl">ALL <span className="text-gray-800 font-extrabold">COLLECTIONS</span></p>
            <div className="w-12 h-[2px] bg-gray-800"></div>
          </div>
          
          <div className="flex gap-4 w-full sm:w-auto">
            <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-200 text-sm py-2 px-3 rounded-md w-1/2 sm:w-48 outline-none">
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
            <button onClick={() => setShowFilter(true)} className="sm:hidden flex items-center gap-2 border-2 px-4 py-2 text-sm font-bold rounded-md w-1/2 justify-center"><FaFilter className="text-[#FF751F]" /> Filters</button>
          </div>
        </div>

        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-8">
            {filterProducts.map((item) => (
              <ProductCard key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} offerPrice={item.offerPrice} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
            <TbFaceIdError className="text-8xl text-gray-300 mx-auto mb-4" />
            <h1 className="text-gray-800 font-black text-3xl">No Products Found</h1>
            <p className="text-gray-500 mt-2">Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;