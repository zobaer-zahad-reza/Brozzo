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
    getCartTotal,
    getCartCount,
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const shippingFee = delivery_fee || 0;

  useEffect(() => {
    const updateCartData = () => {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const productInfo = products.find((p) => p._id === items);
            if (productInfo) {
              const [sizeVal, colorVal] = item.includes('||') ? item.split('||') : [item, ''];
              tempData.push({
                ...productInfo,
                _id: items,
                size: item,
                displaySize: sizeVal,
                displayColor: colorVal,
                quantity: cartItems[items][item],
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
    } else {
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [cartItems, products]);

  const handleQuantityChange = (itemId, itemSize, currentQuantity, change) => {
    const newQuantity = Number(currentQuantity) + Number(change);
    if (newQuantity > 0) {
      updateQuantity(itemId, itemSize, newQuantity);
    } else if (newQuantity === 0) {
      updateQuantity(itemId, itemSize, 0);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-[#FF4955] uppercase font-black tracking-widest animate-pulse">
        Loading Bag...
      </div>
    );

  if (cartData.length === 0)
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4">
        <ShoppingCart size={50} className="text-zinc-800 mb-4" />
        <h2 className="text-2xl font-black text-white uppercase mb-6">
          Your Bag is Empty
        </h2>
        <Link
          to="/collection"
          className="bg-[#FF4955] text-white px-10 py-4 rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-105 transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className="bg-black min-h-screen py-12 px-4 md:px-8 font-sans text-gray-200">
      <div className="max-w-7xl mx-auto pt-20">
        <h1 className="text-3xl font-black text-white mb-10 uppercase tracking-tighter flex items-center gap-4">
          YOUR <span className="text-[#FF4955]">BAG</span>
          <span className="text-sm bg-zinc-800 text-white px-4 py-1.5 rounded-full font-bold tracking-widest">
            {getCartCount()} Items
          </span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3 space-y-6">
            {cartData.map((item) => (
              <div
                key={`${item._id}-${item.size}`}
                className="bg-[#111113] p-5 rounded-2xl border border-zinc-800 flex gap-4 sm:gap-6 items-center hover:border-zinc-700 transition-all shadow-xl"
              >
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-24 h-24 sm:w-36 sm:h-36 bg-zinc-900 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-white uppercase line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[10px] font-black uppercase text-[#FF4955] mt-2 bg-[#FF4955]/10 w-fit px-2 py-1 rounded">
                        {item.displaySize}
                        {item.displayColor && (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="inline-block w-3.5 h-3.5 rounded-full border border-zinc-600"
                              style={{ backgroundColor: (item.colors || []).find(c => c.name === item.displayColor)?.hex || item.displayColor }}
                            />
                            {item.displayColor}
                          </span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="text-zinc-600 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-6">
                    <div className="flex items-center border border-zinc-800 bg-black rounded-xl p-1 h-10">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.size,
                            item.quantity,
                            -1,
                          )
                        }
                        className="w-10 h-full flex items-center justify-center text-zinc-500 hover:text-white disabled:opacity-20"
                        disabled={Number(item.quantity) <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-black text-sm text-white select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.size,
                            item.quantity,
                            1,
                          )
                        }
                        className="w-10 h-full flex items-center justify-center text-zinc-500 hover:text-[#FF4955]"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">
                        Total Price
                      </p>
                      <p className="font-black text-xl text-white">
                        {currency}
                        {(
                          Number(
                            item.offerPrice > 0 ? item.offerPrice : item.price,
                          ) * Number(item.quantity)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:w-1/3">
            <div className="bg-[#111113] p-8 rounded-[32px] border border-zinc-800 sticky top-24 shadow-2xl">
              <h2 className="text-xl font-black text-white mb-8 uppercase tracking-widest border-l-4 border-[#FF4955] pl-4">
                Checkout Summary
              </h2>
              <div className="space-y-4 text-sm font-bold">
                <div className="flex justify-between text-zinc-400 uppercase tracking-tighter">
                  <span>Subtotal</span>
                  <span className="text-white">
                    {currency}
                    {getCartTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400 uppercase tracking-tighter">
                  <span>Shipping Fee</span>
                  <span className="text-white">
                    {currency}
                    {shippingFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-zinc-800 pt-6 flex justify-between">
                  <span className="text-white uppercase tracking-widest">
                    Grand Total
                  </span>
                  <span className="text-2xl font-black text-[#FF4955]">
                    {currency}
                    {(getCartTotal() + shippingFee).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate("/place-order")}
                className="w-full bg-[#FF4955] text-white mt-8 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#e63e49] transition-all flex justify-center items-center gap-3 active:scale-95 shadow-xl shadow-[#ff49552a]"
              >
                PROCEED TO CHECKOUT <ArrowRight size={18} />
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
