import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import ProductCard from "./ProductCard";

const BestSellingProducts = () => {
  
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    
    setBestSeller(bestProduct.slice(0, 5)); 
  }, [products]);

  return (
    <section className="mt-10 mx-auto px-4 ">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6">
        <div>
           <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
             Best Seller Collection
           </h2>
           <p className="text-gray-500 text-sm mt-1">Top rated products for you</p>
        </div>
        
        <Link
          to={"/collection"}
          className="text-sm font-semibold text-[#FEA24D] hover:text-orange-600 underline hover:no-underline transition-colors"
        >
          See all products
        </Link>
      </div>

      {/* Grid Layout */}
      {bestSeller.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-6">
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
        null
      )}
    </section>
  );
};

export default BestSellingProducts;