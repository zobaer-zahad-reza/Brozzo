import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import ProductCard from "./ProductCard";

const RelatedProducts = ({ currentCategory, currentProductId }) => {
  const { products } = useContext(ShopContext);
  const [relatedItems, setRelatedItems] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const filteredProducts = products.filter(
        (item) =>
          item.category === currentCategory && item._id !== currentProductId,
      );

      setRelatedItems(filteredProducts.slice(0, 4));
    }
  }, [products, currentCategory, currentProductId]);

  if (relatedItems.length === 0) return null;

  return (
    <div className="mt-20 border-t border-zinc-800 pt-16 font-sans">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-[#FF4955] font-black uppercase tracking-[3px] text-xs mb-2">
            You Might Also Like
          </h3>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
            Related <span className="text-[#FF4955]">Products</span>
          </h2>
        </div>
        <Link
          to="/collection"
          className="hidden md:flex text-zinc-400 hover:text-white font-bold tracking-widest text-xs uppercase transition items-center gap-2"
        >
          View Collection &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedItems.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
            offerPrice={product.offerPrice}
            category={product.category}
            brand={product.brand}
          />
        ))}
      </div>

      {/* Mobile View All Link */}
      <div className="mt-10 flex justify-center md:hidden">
        <Link
          to="/collection"
          className="bg-[#18181b] border border-zinc-800 text-white px-8 py-3 rounded-lg font-bold uppercase text-xs tracking-widest hover:border-[#FF4955] hover:text-[#FF4955] transition-all"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default RelatedProducts;
