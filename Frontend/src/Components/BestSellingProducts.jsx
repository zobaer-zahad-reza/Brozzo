import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext"; 
import ProductCard from "./ProductCard";

const BestSellingProducts = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5)); 
    }
  }, [products]);

  return (
    <section className="mt-16 mx-auto px-4 md:px-0">
      
      {/* Header Section - Dark Theme Style */}
      <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-4">
        <div>
           <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide uppercase">
             Best Sellers
           </h2>
           <p className="text-gray-400 text-sm mt-2 font-light tracking-wider">
             Top rated premium products selected for you
           </p>
        </div>
        
        <Link
          to={"/collection"}
          className="text-sm font-semibold text-[#FF4955] hover:text-white transition-colors duration-300 flex items-center gap-1 group"
        >
          View All
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>
      </div>

      {/* Grid Layout */}
      {bestSeller.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-10">
          {bestSeller.map((item, index) => (
            <ProductCard 
              key={index} 
              id={item._id}
              image={item.image} 
              name={item.name} 
              price={item.price}
              offerPrice={item.offerPrice}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-40 flex items-center justify-center text-gray-500 text-sm tracking-widest animate-pulse">
            LOADING BEST SELLERS...
        </div>
      )}
    </section>
  );
};

export default BestSellingProducts;