import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { ShoppingCart, Zap } from "lucide-react";
import { toast } from "react-toastify";

const ProductCard = ({ id, image, name, price, offerPrice }) => {
  const { currency, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const nameSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') 
    .replace(/(^-|-$)+/g, '');   

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const finalPrice = offerPrice > 0 ? offerPrice : price;
    const productData = {
      _id: id,
      image: Array.isArray(image) ? image : [image],
      name,
      price: finalPrice,
      quantity: 1,
      size: "Free Size"
    };
    navigate("/place-order", { state: { buyNowItem: productData } });
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // শুধু id এবং ডিফল্ট সাইজ পাঠানো হচ্ছে
    addToCart(id, "Free Size");
    // toast.success এখানে না দিয়ে addToCart ফাংশনের ভেতরে দেওয়াই ভালো
  };

  const hasDiscount = offerPrice > 0 && offerPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - offerPrice) / price) * 100)
    : 0;

  return (
    <Link
      to={`/product/${nameSlug}/${id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="group block w-full bg-[#18181b] border border-zinc-800/60 rounded-md overflow-hidden hover:border-[#FF4955]/50 hover:shadow-lg transition-all duration-300 relative"
    >
      <div className="relative w-full aspect-square overflow-hidden bg-zinc-900">
        <img
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {hasDiscount && (
          <span className="absolute top-2 right-2 bg-[#FF4955] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
            -{discountPercentage}%
          </span>
        )}
      </div>

      <div className="p-3 flex flex-col gap-1.5">
        <h3 className="text-gray-300 text-sm font-medium leading-tight truncate group-hover:text-white transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2 mb-1">
          {hasDiscount ? (
            <>
              <span className="text-white font-bold text-base">{currency}{offerPrice}</span>
              <span className="text-gray-500 text-xs line-through">{currency}{price}</span>
            </>
          ) : (
            <span className="text-white font-bold text-base">{currency}{price}</span>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2 mt-1">
          <button
            onClick={handleAddToCart}
            className="col-span-1 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-[#FF4955] border border-zinc-700 rounded h-8 transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart size={16} />
          </button>
          <button
            onClick={handleBuyNow}
            className="col-span-3 flex items-center justify-center gap-1.5 bg-[#FF4955] hover:bg-[#e03e49] text-white text-xs font-semibold rounded h-8 transition-all active:scale-95"
          >
            <Zap size={14} fill="currentColor" />
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;