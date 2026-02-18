import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { TbFaceIdError } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Collection = () => {
  // --- UPDATED CATEGORY STRUCTURE ---
  const categories = [
    { name: "All", subCategories: [] },
    { name: "Watch", subCategories: [] },
    {
      name: "Men Accesoric",
      subCategories: ["Wallets", "Belts", "Caps", "Chain", "Ring"],
    },
    { name: "Sun Glasses", subCategories: [] },
    {
      name: "Tech Accesoric",
      subCategories: ["Headphones", "Chargers", "Cases"],
    },
    { name: "Men Cloths", subCategories: ["T-Shirts", "Shirts", "Pants"] },
  ];

  // --- STATIC DEMO DATA (Updated with SubCategories for testing) ---
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
      subCategory: "",
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
      subCategory: "Belts",
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
      subCategory: "Headphones",
    },
    {
      _id: "4",
      name: "Silver Chain",
      price: 80,
      offerPrice: 60,
      image: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop",
      ],
      category: "Men Accesoric",
      subCategory: "Chain",
    },
  ];

  const [searchParams] = useSearchParams();
  const { categorySlug } = useParams();

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(demoProducts);

  // State for selected categories and subcategories
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const [sortType, setSortType] = useState("relavent");

  // State to manage open/close of category accordion in sidebar
  const [expandedCategories, setExpandedCategories] = useState({});

  // Initialize from URL
  useEffect(() => {
    let catList = [];
    if (categorySlug) {
      catList.push(decodeURIComponent(categorySlug));
    } else {
      const categoryQuery = searchParams.get("category");
      if (categoryQuery && categoryQuery !== "All") {
        catList.push(categoryQuery);
      }
    }
    // If URL param matches a main category, select it
    setSelectedCategories(catList);
    // Expand the category if it has subcategories
    const newExpanded = {};
    catList.forEach((c) => {
      newExpanded[c] = true;
    });
    setExpandedCategories((prev) => ({ ...prev, ...newExpanded }));
  }, [categorySlug, searchParams]);

  // Filtering Logic
  useEffect(() => {
    let cp = [...demoProducts];

    // Filter by Main Category
    if (selectedCategories.length > 0) {
      cp = cp.filter((item) => selectedCategories.includes(item.category));
    }

    // Filter by Sub Category (if any selected)
    if (selectedSubCategories.length > 0) {
      cp = cp.filter((item) =>
        selectedSubCategories.includes(item.subCategory),
      );
    }

    // Sorting
    if (sortType === "low-high") cp.sort((a, b) => a.price - b.price);
    else if (sortType === "high-low") cp.sort((a, b) => b.price - a.price);

    setFilterProducts(cp);
  }, [selectedCategories, selectedSubCategories, sortType]);

  const toggleCategory = (catName) => {
    if (catName === "All") {
      setSelectedCategories([]);
      setSelectedSubCategories([]);
      return;
    }

    setSelectedCategories((prev) =>
      prev.includes(catName)
        ? prev.filter((c) => c !== catName)
        : [...prev, catName],
    );
  };

  const toggleSubCategory = (subName) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subName)
        ? prev.filter((s) => s !== subName)
        : [...prev, subName],
    );
  };

  const toggleExpand = (catName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  return (
    <div className="relative flex flex-col sm:flex-row gap-1 sm:gap-10 pt-4 px-4 bg-black min-h-screen text-gray-200">
      {/* --- Mobile Filter Overlay --- */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/70 z-[60] sm:hidden transition-opacity"
          onClick={() => setShowFilter(false)}
        ></div>
      )}

      {/* --- Filters Sidebar --- */}
      <div
        className={`fixed sm:static top-0 right-0 h-full z-[70] sm:z-auto w-[280px] sm:w-64 bg-[#0a0a0a] sm:bg-transparent p-6 sm:p-0 transition-transform duration-300 ease-in-out border-l sm:border-l-0 border-zinc-800 overflow-y-auto ${showFilter ? "translate-x-0" : "translate-x-full sm:translate-x-0"}`}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center sm:hidden mb-6 border-b border-zinc-900 pb-4">
          <span className="text-lg font-bold text-white uppercase tracking-wider">
            Filters
          </span>
          <button
            onClick={() => setShowFilter(false)}
            className="p-2 bg-zinc-900 rounded-full text-[#FF4955]"
          >
            <IoClose size={20} />
          </button>
        </div>

        <p className="hidden sm:block mb-4 text-xl font-bold text-white uppercase tracking-wider mt-4">
          Filters
        </p>

        {/* Category List */}
        <div className="border border-zinc-800 bg-[#111113] p-4 rounded-xl shadow-xl sm:shadow-none">
          <p className="mb-4 text-xs font-black uppercase text-[#FF4955] tracking-[2px]">
            Categories
          </p>

          <div className="flex flex-col gap-2 text-sm text-gray-300">
            {categories.map((cat) => {
              if (cat.name === "All") return null; // Skip 'All' in checkbox list usually

              return (
                <div key={cat.name} className="flex flex-col">
                  <div className="flex items-center justify-between group">
                    <label className="flex items-center gap-3 cursor-pointer py-1 flex-1">
                      <input
                        className="w-4 h-4 accent-[#FF4955] bg-zinc-800 border-zinc-700 rounded cursor-pointer"
                        type="checkbox"
                        value={cat.name}
                        onChange={() => toggleCategory(cat.name)}
                        checked={selectedCategories.includes(cat.name)}
                      />
                      <span
                        className={`transition-colors font-medium ${selectedCategories.includes(cat.name) ? "text-white" : "group-hover:text-white"}`}
                      >
                        {cat.name}
                      </span>
                    </label>

                    {/* Expand Icon for Subcategories */}
                    {cat.subCategories.length > 0 && (
                      <button
                        onClick={() => toggleExpand(cat.name)}
                        className="p-1 text-zinc-500 hover:text-white transition-colors"
                      >
                        {expandedCategories[cat.name] ? (
                          <FaChevronUp size={10} />
                        ) : (
                          <FaChevronDown size={10} />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Sub Categories */}
                  {cat.subCategories.length > 0 &&
                    expandedCategories[cat.name] && (
                      <div className="pl-7 flex flex-col gap-2 mt-1 mb-2 border-l border-zinc-800 ml-2">
                        {cat.subCategories.map((sub) => (
                          <label
                            key={sub}
                            className="flex items-center gap-2 cursor-pointer group/sub"
                          >
                            <input
                              className="w-3 h-3 accent-[#FF4955] bg-zinc-800 border-zinc-700 rounded cursor-pointer"
                              type="checkbox"
                              value={sub}
                              onChange={() => toggleSubCategory(sub)}
                              checked={selectedSubCategories.includes(sub)}
                            />
                            <span
                              className={`text-xs transition-colors ${selectedSubCategories.includes(sub) ? "text-[#FF4955]" : "text-zinc-500 group-hover/sub:text-zinc-300"}`}
                            >
                              {sub}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- Product Area --- */}
      <div className="flex-1 pb-10">
        <div className="flex flex-col sm:flex-row justify-between mb-6 items-center gap-4 border-b border-zinc-900 pb-4 mt-4">
          <div className="inline-flex items-center gap-3">
            <p className="text-zinc-500 text-lg md:text-xl uppercase tracking-[3px]">
              Brozzo <span className="text-white font-black">Collection</span>
            </p>
            <div className="hidden sm:block w-12 h-[2px] bg-[#FF4955]"></div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-gray-300 text-xs font-bold py-2.5 px-4 rounded-md w-1/2 sm:w-48 outline-none focus:border-[#FF4955] transition-all cursor-pointer"
            >
              <option value="relavent">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>

            <button
              onClick={() => setShowFilter(true)}
              className="sm:hidden flex items-center gap-2 bg-[#FF4955] px-4 py-2.5 text-xs font-black rounded-md w-1/2 justify-center text-white shadow-lg active:scale-95 transition-all"
            >
              <FaFilter size={12} /> FILTERS
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 gap-y-6 md:gap-y-8">
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
          <div className="text-center py-20 bg-[#111113] rounded-2xl border border-zinc-900 mt-5">
            <TbFaceIdError className="text-6xl text-zinc-800 mx-auto mb-4" />
            <h1 className="text-white font-bold text-lg uppercase tracking-widest">
              No Matches Found
            </h1>
            <p className="text-zinc-600 mt-2 text-sm">
              Try different filters or categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
