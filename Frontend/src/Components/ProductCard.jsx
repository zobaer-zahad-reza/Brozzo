import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const ProductCard = ({ id, image, name, price, offerPrice }) => {
  // Use a default currency if context is not available (for static demo)
  const context = useContext(ShopContext);
  const currency = context?.currency || "$"; 
  
  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    const finalPrice = offerPrice > 0 ? offerPrice : price;

    const productData = {
      _id: id,
      image: Array.isArray(image) ? image : [image],
      name,
      price: finalPrice,
      quantity: 1
    };

    navigate('/place-order', { state: { buyNowItem: productData } });
  };

  return (
    <Link 
      to={`/product/${id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="group cursor-pointer flex flex-col gap-3 w-full border border-zinc-800 p-2 rounded-xl bg-[#18181b] hover:border-[#FF4955]/50 hover:shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-zinc-900">
        <img
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
             e.target.src = "https://placehold.co/400x400/18181b/FFFFFF/png?text=No+Image"; 
          }}
        />

        {/* Discount Badge */}
        {offerPrice > 0 && offerPrice < price && (
            <span className="absolute top-2 left-2 bg-[#FF4955] text-white text-[10px] font-bold px-2 py-1 rounded-sm shadow-sm z-10">
                {Math.round(((price - offerPrice) / price) * 100)}% OFF
            </span>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-2 p-1">
        <h3 className="text-[14px] md:text-[15px] font-medium text-gray-200 leading-snug line-clamp-2 min-h-[42px] group-hover:text-[#FF4955] transition-colors">
          {name}
        </h3>
        
        {/* Price Section */}
        <div className='flex items-center justify-between mt-1'>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Price</p>
            
            <div className="flex flex-col items-end">
                {offerPrice > 0 && offerPrice < price ? (
                    <>
                        <p className="text-lg font-bold text-white leading-none">
                            {currency}{offerPrice}
                        </p>
                        <p className="text-xs text-gray-500 line-through mt-0.5">
                            {currency}{price}
                        </p>
                    </>
                ) : (
                    <p className="text-lg font-bold text-white">{currency}{price}</p>
                )}
            </div>
        </div>

        {/* Buy Now Button */}
        <button 
          onClick={handleBuyNow} 
          className="w-full py-2 bg-zinc-800 hover:bg-[#FF4955] text-gray-300 hover:text-white font-semibold rounded-md transition-all duration-300 text-sm shadow-sm mt-2 border border-zinc-700 hover:border-[#FF4955] active:scale-95"
        >
          Buy Now
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;