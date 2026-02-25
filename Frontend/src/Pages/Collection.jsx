import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { TbFaceIdError } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { FaFilter, FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { ShopContext } from "../Context/ShopContext";

const Collection = () => {
  const { products, search, setSearch } = useContext(ShopContext);

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

  const [searchParams] = useSearchParams();
  const { categorySlug } = useParams();

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  const [sortType, setSortType] = useState("relevant");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const sortMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Initialize Category and Search from URL
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
    setSelectedCategories(catList);

    const newExpanded = {};
    catList.forEach((c) => {
      newExpanded[c] = true;
    });
    setExpandedCategories((prev) => ({ ...prev, ...newExpanded }));

    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [categorySlug, searchParams, setSearch]);

  // Dynamic Filtering & Sorting Logic
  useEffect(() => {
    if (!products || products.length === 0) return;

    let cp = [...products];

    // Search filter logic added
    if (search && search.trim() !== "") {
      cp = cp.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      cp = cp.filter((item) => selectedCategories.includes(item.category));
    }

    // SubCategory filter
    if (selectedSubCategories.length > 0) {
      cp = cp.filter((item) =>
        selectedSubCategories.includes(item.subCategory),
      );
    }

    // Sort logic
    if (sortType === "low-high") {
      cp.sort((a, b) => {
        const priceA = a.offerPrice > 0 ? a.offerPrice : a.price;
        const priceB = b.offerPrice > 0 ? b.offerPrice : b.price;
        return priceA - priceB;
      });
    } else if (sortType === "high-low") {
      cp.sort((a, b) => {
        const priceA = a.offerPrice > 0 ? a.offerPrice : a.price;
        const priceB = b.offerPrice > 0 ? b.offerPrice : b.price;
        return priceB - priceA;
      });
    }

    setFilterProducts(cp);
  }, [products, selectedCategories, selectedSubCategories, sortType, search]);

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
    setExpandedCategories((prev) => ({ ...prev, [catName]: !prev[catName] }));
  };

  const sortOptions = [
    { label: "Sort by: Relevant", value: "relevant" },
    { label: "Sort by: Low to High", value: "low-high" },
    { label: "Sort by: High to Low", value: "high-low" },
  ];

  return (
    <div className="relative text-center flex flex-col sm:flex-row gap-1 sm:gap-10 sm:pt-4 px-4 bg-black min-h-screen text-gray-200 pt-28">
      {/* Mobile Filter Overlay */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/70 z-[60] sm:hidden transition-opacity"
          onClick={() => setShowFilter(false)}
        ></div>
      )}

      {/* Filters Sidebar */}
      <div
        className={`fixed sm:static top-0 right-0 h-full z-[70] sm:z-auto w-[280px] sm:w-64 bg-[#0a0a0a] sm:bg-transparent p-6 sm:p-0 transition-transform duration-300 ease-in-out border-l sm:border-l-0 border-zinc-800 overflow-y-auto ${
          showFilter ? "translate-x-0" : "translate-x-full sm:translate-x-0"
        }`}
      >
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

        <div className="border border-zinc-800 bg-[#111113] p-4 rounded-xl shadow-xl sm:shadow-none text-left">
          <p className="mb-4 text-xs font-black uppercase text-[#FF4955] tracking-[2px]">
            Categories
          </p>
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            {categories.map((cat) => {
              if (cat.name === "All") return null;
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

      {/* Product Area */}
      <div className="flex-1 pb-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between mb-6 items-center gap-4 border-b border-zinc-900 pb-4 mt-4">
          {/* Title & Search Indicator */}
          <div className="flex flex-col items-start gap-1 self-start sm:self-auto">
            <div className="inline-flex items-center gap-3">
              <p className="text-zinc-500 text-lg md:text-xl uppercase tracking-[3px]">
                Brozzo <span className="text-white font-black">Collection</span>
              </p>
              <div className="hidden sm:block w-12 h-[2px] bg-[#FF4955]"></div>
            </div>

            {/* Show what user is searching for */}
            {search && search.trim() !== "" && (
              <div className="flex items-center gap-2 mt-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full w-max">
                <FaSearch size={10} className="text-[#FF4955]" />
                <span className="text-xs font-medium text-gray-400">
                  Results for:{" "}
                  <strong className="text-white">"{search}"</strong>
                </span>
                <button
                  onClick={() => setSearch("")}
                  className="ml-1 text-zinc-500 hover:text-red-500"
                >
                  <IoClose size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Controls (Sort & Filter) */}
          <div className="flex gap-3 w-full sm:w-auto z-40 relative">
            {/* Custom Sort Dropdown */}
            <div className="relative w-1/2 sm:w-56" ref={sortMenuRef}>
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="w-full flex items-center justify-between bg-[#111113] border border-zinc-800 text-gray-300 text-xs font-bold py-3 px-4 rounded-md hover:border-zinc-600 transition-all shadow-sm h-11"
              >
                <span>
                  {sortOptions.find((opt) => opt.value === sortType)?.label}
                </span>
                <FaChevronDown
                  size={10}
                  className={`text-zinc-500 transition-transform duration-300 ${showSortMenu ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {showSortMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#18181b] border border-zinc-800 rounded-md shadow-2xl py-1 z-50 overflow-hidden">
                  {sortOptions.map((option) => (
                    <div
                      key={option.value}
                      onClick={() => {
                        setSortType(option.value);
                        setShowSortMenu(false);
                      }}
                      className={`px-4 py-2.5 text-xs font-medium cursor-pointer transition-colors flex items-center justify-between text-left
                        ${sortType === option.value ? "bg-zinc-800 text-[#FF4955]" : "text-gray-400 hover:bg-zinc-800 hover:text-white"}`}
                    >
                      {option.label}
                      {sortType === option.value && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF4955]"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilter(true)}
              className="sm:hidden flex items-center justify-center gap-2 bg-[#FF4955] px-4 py-2 text-xs font-black rounded-md w-1/2 text-white shadow-lg active:scale-95 transition-all h-11"
            >
              <FaFilter size={12} /> FILTERS
            </button>
          </div>
        </div>

        {/* Product Grid */}
        {!products || products.length === 0 ? (
          <div className="w-full h-40 flex items-center justify-center text-gray-500 text-sm tracking-widest animate-pulse mt-10">
            LOADING COLLECTION...
          </div>
        ) : filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 gap-y-6 md:gap-y-8 text-left">
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
              Try different keywords or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
