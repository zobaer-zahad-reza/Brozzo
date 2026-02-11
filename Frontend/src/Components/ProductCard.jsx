import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const ProductCard = ({ id, image, name, price, offerPrice }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { currency } = useContext(ShopContext);
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
      className="group cursor-pointer flex flex-col gap-3 w-full border border-gray-100 p-2 rounded-xl hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      
      {/* Image Container */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-100">
        <img
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
             e.target.src = "https://placehold.co/400x400/png?text=No+Image"; 
          }}
        />

        {/* Discount Badge */}
        {offerPrice > 0 && (
            <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm z-10">
                {Math.round(((price - offerPrice) / price) * 100)}% OFF
            </span>
        )}

        {/* Heart Icon Button */}
        {/* <button
          onClick={(e) => {
            e.preventDefault(); 
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm transition-colors shadow-sm z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "#ef4444" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-5 h-5 ${
              isLiked ? "stroke-red-500" : "stroke-gray-900"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button> */}
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-semibold text-gray-900 leading-snug line-clamp-2 min-h-10 group-hover:text-[#FEA24D] transition-colors">
          {name}
        </h3>
        
        {/* Price Section */}
        <div className='flex items-center justify-between'>
            <p className="text-sm text-gray-500">Price</p>
            
            <div className="flex flex-col items-end">
                {offerPrice > 0 ? (
                    <>
                        {/* offer Price */}
                        <p className="text-lg font-bold text-gray-900 leading-none">
                            {currency}{offerPrice}
                        </p>
                        <p className="text-xs text-gray-400 line-through">
                            {currency}{price}
                        </p>
                    </>
                ) : (
                    <p className="text-lg font-bold text-gray-900">{currency}{price}</p>
                )}
            </div>
        </div>

        {/* Buy Now Button */}
        <button 
          onClick={handleBuyNow} 
          className="w-full py-2 bg-[#FEA24D] hover:bg-[#e89344] text-white font-bold rounded-lg transition-colors text-sm shadow-sm mt-1 z-20 relative"
        >
          Buy Now
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;