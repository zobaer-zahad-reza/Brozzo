import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { ShopContext } from "../Context/ShopContext"; // Commented for static
import ProductCard from "./ProductCard";

const BestSellingProducts = () => {
  
  // --- DYNAMIC LOGIC (Commented Out) ---
  /*
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5)); 
    }
  }, [products]);
  */

  // --- STATIC DEMO DATA FOR BROZZO ---
  const demoProducts = [
    {
        _id: "1",
        name: "Midnight Chronograph",
        image: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop"],
        price: 120,
        offerPrice: 99
    },
    {
        _id: "2",
        name: "Noir Leather Sneakers",
        image: ["https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1000&auto=format&fit=crop"],
        price: 85,
        offerPrice: 70
    },
    {
        _id: "3",
        name: "Bass Pro Wireless",
        image: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"],
        price: 150,
        offerPrice: 120
    },
    {
        _id: "4",
        name: "Obsidian Essence Perfume",
        image: ["https://images.unsplash.com/photo-1594913780356-e8d1a1b4119c?q=80&w=1000&auto=format&fit=crop"],
        price: 60,
        offerPrice: 45
    },
    {
        _id: "5",
        name: "Aviator Dark Shades",
        image: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop"],
        price: 40,
        offerPrice: 35
    }
  ];

  // Use static data
  const bestSeller = demoProducts;

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