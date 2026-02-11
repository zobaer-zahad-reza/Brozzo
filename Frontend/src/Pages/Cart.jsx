import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Trash2, Minus, Plus, ArrowRight, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, delivery_fee } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  
  const shippingFee = delivery_fee || 15;

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const productInfo = products.find((product) => product._id === items);
            if (productInfo) {
              tempData.push({
                _id: items,
                size: item,
                quantity: cartItems[items][item],
                ...productInfo
              });
            }
          }
        }
      }
      setCartData(tempData);
      setIsLoading(false); 
    } else {
        setIsLoading(true);
    }
  }, [cartItems, products]); 

  const getCartTotal = () => {
     return cartData.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  if (isLoading && products.length === 0) {
      return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">Loading Cart...</div>;
  }

  if (cartData.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">
            Add items to cart to see them here.
        </p>
        <Link to="/collection" className="bg-[#FFA24C] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#ff932e] transition">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({cartData.length} Items)</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items List */}
          <div className="lg:w-2/3 space-y-4">
            {cartData.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 sm:gap-6 items-center">
                
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={Array.isArray(item.image) ? item.image[0] : item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.category} | Size: <span className="font-semibold text-gray-700">{item.size}</span>
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => updateQuantity(item._id, item.size, 0)} 
                      className="text-gray-400 hover:text-red-500 transition p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 text-gray-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <p className="font-bold text-lg text-gray-900">{currency}{item.price}</p>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 text-gray-600 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">{currency}{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Estimate</span>
                  <span className="font-medium">{currency}{shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax Estimate</span>
                  <span className="font-medium">{currency}0.00</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between text-base font-bold text-gray-900">
                  <span>Order Total</span>
                  <span>{currency}{(getCartTotal() + shippingFee).toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/place-order')}
                className="w-full bg-black text-white mt-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition flex justify-center items-center gap-2 group"
              >
                Checkout Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="mt-4 flex justify-center gap-2 text-gray-400">
                 <span className="text-xs">Secure Checkout</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;