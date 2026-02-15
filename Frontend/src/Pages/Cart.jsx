import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    delivery_fee,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const shippingFee = delivery_fee || 0;

  useEffect(() => {
    // ডাটা প্রসেসিং শুরু
    const updateCartData = () => {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const productInfo = products.find(
              (product) => product._id === items,
            );
            if (productInfo) {
              tempData.push({
                _id: items,
                size: item,
                quantity: cartItems[items][item],
                ...productInfo,
              });
            }
          }
        }
      }
      setCartData(tempData);
      setIsLoading(false);
    };

    if (products && products.length > 0) {
      updateCartData();
    } else if (products && products.length === 0 && isLoading) {
      // যদি প্রোডাক্ট লিস্ট খালি থাকে কিছুক্ষণ পর লোডিং অফ হবে
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [cartItems, products]);

  const getCartTotal = () => {
    return cartData.reduce((total, item) => {
      const price = item.offerPrice > 0 ? item.offerPrice : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  // ১. লোডিং স্ক্রিন
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <span className="loading loading-spinner text-[#FF4955] w-12"></span>
        <p className="text-zinc-500 mt-4 animate-pulse uppercase tracking-[3px] text-xs">
          Authenticating Collection...
        </p>
      </div>
    );
  }

  // ২. কার্ট খালি থাকলে
  if (cartData.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-[#111113] border border-zinc-800 rounded-full flex items-center justify-center mb-6 shadow-2xl">
          <ShoppingCart size={40} className="text-zinc-600" />
        </div>
        <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
          Your Bag is Empty
        </h2>
        <p className="text-zinc-500 mb-8 max-w-sm">
          Looks like you haven't added any premium styles to your cart yet.
        </p>
        <Link
          to="/collection"
          className="bg-[#FF4955] text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[2px] hover:bg-[#e63e49] transition-all shadow-xl shadow-[#ff49552a]"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // ৩. কার্টে প্রোডাক্ট থাকলে
  return (
    <div className="bg-black min-h-screen py-12 px-4 md:px-8 font-sans text-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            Your <span className="text-[#FF4955]">Bag</span>
          </h1>
          <span className="bg-zinc-800 text-zinc-400 px-4 py-1 rounded-full text-xs font-bold">
            {cartData.length} {cartData.length > 1 ? "Items" : "Item"}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items List */}
          <div className="lg:w-2/3 space-y-6">
            {cartData.map((item, index) => (
              <div
                key={`${item._id}-${item.size}`}
                className="bg-[#111113] p-5 rounded-[24px] border border-zinc-800 flex gap-4 sm:gap-6 items-center hover:border-zinc-700 transition-all group shadow-xl"
              >
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-36 sm:h-36 bg-zinc-900 rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-800">
                  <img
                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-white leading-tight uppercase tracking-tight line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#FF4955] mt-2 bg-[#FF4955]/10 w-fit px-2 py-1 rounded border border-[#FF4955]/20">
                        Size: {item.size}
                      </p>
                    </div>

                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="text-zinc-600 hover:text-[#FF4955] transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-zinc-800 bg-black rounded-xl p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity - 1)
                        }
                        className="p-2 text-zinc-500 hover:text-[#FF4955] disabled:opacity-20"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-black text-sm text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.size, item.quantity + 1)
                        }
                        className="p-2 text-zinc-500 hover:text-[#FF4955]"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                        Total Price
                      </p>
                      <p className="font-black text-xl text-white tracking-tighter">
                        {currency}{" "}
                        {(
                          (item.offerPrice > 0 ? item.offerPrice : item.price) *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-[#111113] p-8 rounded-[32px] border border-zinc-800 sticky top-24 shadow-2xl">
              <h2 className="text-xl font-black text-white mb-8 uppercase tracking-widest border-l-4 border-[#FF4955] pl-4">
                Checkout Summary
              </h2>

              <div className="space-y-4 text-zinc-400 text-sm">
                <div className="flex justify-between font-medium">
                  <span className="uppercase tracking-widest text-[10px]">
                    Subtotal
                  </span>
                  <span className="text-white font-bold">
                    {currency}
                    {getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="uppercase tracking-widest text-[10px]">
                    Shipping
                  </span>
                  <span className="text-white font-bold">
                    {shippingFee > 0
                      ? `${currency}${shippingFee.toFixed(2)}`
                      : "FREE"}
                  </span>
                </div>

                <div className="border-t border-zinc-800 pt-6 mt-6 flex justify-between">
                  <div className="flex flex-col">
                    <span className="text-white font-black uppercase tracking-[2px] text-xs">
                      Grand Total
                    </span>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase mt-1">
                      Tax Included
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[#FF4955] tracking-tighter">
                    {currency}
                    {(getCartTotal() + shippingFee).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigate("/place-order")}
                className="w-full bg-[#FF4955] text-white mt-8 py-5 rounded-2xl font-black uppercase text-xs tracking-[3px] hover:bg-[#e63e49] transition-all shadow-xl shadow-[#ff49552a] flex justify-center items-center gap-3 group active:scale-95"
              >
                PROCEED TO CHECKOUT
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-zinc-600">
                <ShieldCheck size={14} className="text-[#FF4955]" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  100% Secure Checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
