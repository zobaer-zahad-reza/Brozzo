import React, { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { TbFaceIdError } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";

const Collection = () => {
  // --- STATIC DEMO DATA FOR BROZZO ---
  const demoProducts = [
    {
      _id: "1",
      name: "Midnight Chronograph Watch",
      price: 150,
      offerPrice: 120,
      image: [
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop",
      ],
      category: "Watch",
    },
    {
      _id: "2",
      name: "Noir Leather Belt",
      price: 45,
      offerPrice: 35,
      image: [
        "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1000&auto=format&fit=crop",
      ],
      category: "Men Accesoric",
    },
    {
      _id: "3",
      name: "Bass Pro Wireless Headphones",
      price: 200,
      offerPrice: 180,
      image: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      ],
      category: "Tech Accesoric",
    },
    // ... বাকি ডাটা
  ];

  const categories = [
    "Watch",
    "Men Accesoric",
    "Sun Glasses",
    "Tech Accesoric",
    "Men Cloths",
  ];

  const [searchParams] = useSearchParams();
  const { categorySlug } = useParams();

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(demoProducts);
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
  }, [categorySlug, searchParams]);

  useEffect(() => {
    let cp = [...demoProducts];
    if (category.length > 0) {
      cp = cp.filter((item) =>
        category.some(
          (c) =>
            item.category && item.category.toLowerCase() === c.toLowerCase(),
        ),
      );
    }
    if (sortType === "low-high") cp.sort((a, b) => a.price - b.price);
    else if (sortType === "high-low") cp.sort((a, b) => b.price - a.price);

    setFilterProducts(cp);
  }, [category, sortType]);

  const toggleCategory = (e) => {
    const val = e.target.value;
    setCategory((prev) =>
      prev.includes(val) ? prev.filter((a) => a !== val) : [...prev, val],
    );
  };

  return (
    <div className="relative flex flex-col sm:flex-row gap-1 sm:gap-10 pt-16 px-4 bg-black min-h-screen text-gray-200">
      {/* --- Mobile Filter Overlay (Darkened Background) --- */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/70 z-[60] sm:hidden transition-opacity"
          onClick={() => setShowFilter(false)}
        ></div>
      )}

      {/* --- Filters Sidebar --- */}
      <div
        className={`fixed sm:static top-0 right-0 h-full z-[70] sm:z-auto w-[280px] sm:w-64 bg-[#0a0a0a] sm:bg-transparent p-6 sm:p-0 transition-transform duration-300 ease-in-out border-l sm:border-l-0 border-zinc-800 ${showFilter ? "translate-x-0" : "translate-x-full sm:translate-x-0"}`}
      >
        {/* Mobile Filter Header */}
        <div className="flex justify-between items-center sm:hidden mb-8 border-b border-zinc-900 pb-4">
          <span className="text-xl font-bold text-white uppercase tracking-wider">
            Filters
          </span>
          <button
            onClick={() => setShowFilter(false)}
            className="p-2 bg-zinc-900 rounded-full text-[#FF4955]"
          >
            <IoClose size={24} />
          </button>
        </div>

        <p className="hidden sm:block mb-4 text-xl font-bold text-white uppercase tracking-wider">
          Filters
        </p>

        <div className="border border-zinc-800 bg-[#111113] pl-5 py-5 rounded-2xl shadow-xl sm:shadow-none">
          <p className="mb-4 text-xs font-black uppercase text-[#FF4955] tracking-[2px]">
            Categories
          </p>
          <div className="flex flex-col gap-4 text-sm text-gray-300">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex gap-3 items-center cursor-pointer hover:text-white transition-colors group"
              >
                <input
                  className="w-5 h-5 accent-[#FF4955] bg-zinc-800 border-zinc-700 rounded cursor-pointer"
                  type="checkbox"
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
                <span className="group-hover:translate-x-1 transition-transform duration-300 font-medium">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* --- Product Area --- */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between mb-8 items-center gap-4 border-b border-zinc-900 pb-6">
          <div className="inline-flex items-center gap-3">
            <p className="text-zinc-500 text-xl uppercase tracking-[3px]">
              Brozzo <span className="text-white font-black">Collection</span>
            </p>
            <div className="hidden sm:block w-12 h-[2px] bg-[#FF4955]"></div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-gray-300 text-xs font-bold py-3 px-4 rounded-xl w-1/2 sm:w-56 outline-none focus:border-[#FF4955] transition-all cursor-pointer"
            >
              <option value="relavent tracking-widest">
                Sort by: Relevant
              </option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>

            <button
              onClick={() => setShowFilter(true)}
              className="sm:hidden flex items-center gap-2 bg-[#FF4955] px-4 py-3 text-xs font-black rounded-xl w-1/2 justify-center text-white shadow-lg shadow-[#ff49551a] active:scale-95 transition-all"
            >
              <FaFilter size={14} /> FILTERS
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-10">
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
          <div className="text-center py-24 bg-[#111113] rounded-[32px] border border-zinc-900 mt-5">
            <TbFaceIdError className="text-7xl text-zinc-800 mx-auto mb-4" />
            <h1 className="text-white font-black text-lg uppercase tracking-widest">
              No Matches Found
            </h1>
            <p className="text-zinc-600 mt-2 text-sm font-medium">
              Try different filters or keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
