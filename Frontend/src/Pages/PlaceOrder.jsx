import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Truck, Plus, Minus, CheckCircle, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    products,
    cartItems,
    updateQuantity,
    backendUrl,
    token,
    setCartItems,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    division: "",
  });

  const [orderList, setOrderList] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // Popup state
  const isBuyNow = location.state && location.state.buyNowItem;

  useEffect(() => {
    if (isBuyNow) {
      setOrderList([location.state.buyNowItem]);
    } else {
      let tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const productInfo = products.find(
              (product) => product._id === items,
            );
            if (productInfo) {
              const [sizeVal, colorVal] = item.includes("||")
                ? item.split("||")
                : [item, ""];
              tempData.push({
                ...productInfo,
                _id: items,
                size: item,
                displaySize: sizeVal,
                displayColor: colorVal,
                color: colorVal,
                quantity: cartItems[items][item],
              });
            }
          }
        }
      }
      setOrderList(tempData);
    }
  }, [cartItems, products, isBuyNow, location.state]);

  const isDhaka = formData.division === "Inside Dhaka";
  const delivery_fee = formData.division ? (isDhaka ? 80 : 130) : 0;
  const currency = "৳";

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get(backendUrl + "/api/user/profile", {
            headers: { token },
          });
          if (response.data.success) {
            const user = response.data.userData;
            const nameParts = user.name.split(" ");
            const savedAddr =
              user.address && user.address.length > 0 ? user.address[0] : {};

            setFormData((prev) => ({
              ...prev,
              firstName: nameParts[0] || "",
              lastName: nameParts.slice(1).join(" ") || "",
              email: user.email || "",
              phone: user.phone || "",
              street: savedAddr.street || "",
              division: savedAddr.division || "",
            }));
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };
    fetchUserData();
  }, [token, backendUrl]);

  const calculateTotal = () => {
    if (!orderList || orderList.length === 0) return 0;
    return orderList.reduce((total, item) => {
      const price = item.offerPrice > 0 ? item.offerPrice : item.price;
      return total + Number(price) * item.quantity;
    }, 0);
  };

  const currentTotalAmount = calculateTotal();

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;

    if (isBuyNow) {
      setOrderList([{ ...item, quantity: newQuantity }]);
    } else {
      updateQuantity(item._id, item.size, newQuantity);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      if (orderList.length === 0) {
        toast.error("No items in the order!");
        return;
      }

      if (!formData.division) {
        toast.error("Please select a delivery location!");
        return;
      }

      const orderData = {
        address: formData,
        items: orderList,
        amount: currentTotalAmount + delivery_fee,
        paymentMethod: method === "cod" ? "COD" : method,
        payment: false,
        date: new Date().toISOString(),
      };

      if (method === "cod") {
        if (token) {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } },
          );
          if (response.data.success) {
            if (!isBuyNow) setCartItems({});
            setShowSuccessPopup(true); // Show popup instead of immediate navigation
          } else {
            toast.error(response.data.message);
          }
        } else {
          const response = await axios.post(
            backendUrl + "/api/order/place-guest",
            orderData,
          );

          if (response.data.success) {
            const existingGuestOrders =
              JSON.parse(localStorage.getItem("brozzo_guest_orders")) || [];

            const guestOrderData = {
              ...orderData,
              orderId:
                response.data.orderId ||
                "GUEST-" + Date.now().toString().slice(-6),
              status: "Order Placed",
            };

            existingGuestOrders.push(guestOrderData);
            localStorage.setItem(
              "brozzo_guest_orders",
              JSON.stringify(existingGuestOrders),
            );

            if (!isBuyNow) setCartItems({});
            setShowSuccessPopup(true); // Show popup instead of immediate navigation
          } else {
            toast.error(response.data.message || "Failed to place order.");
          }
        }
      } else {
        toast.info("Payment gateway integration coming soon.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong! Please try again.",
      );
    }
  };

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    navigate("/orders");
  };

  return (
    <div className="bg-black min-h-screen pt-28 pb-20 px-4 md:px-8 font-sans text-gray-200">
      <form
        onSubmit={handlePlaceOrder}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[80vh]"
      >
        {/* Delivery Info */}
        <div className="flex flex-col gap-6 lg:w-[60%]">
          <div className="flex items-center gap-3 mb-2 border-b border-zinc-900 pb-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-[#FF4955] transition"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-widest">
              Delivery Details
            </h2>
          </div>

          <div className="bg-[#121215] p-6 md:p-8 rounded-xl border border-zinc-800 space-y-5">
            <div className="">
              <input
                required
                name="firstName"
                onChange={onChangeHandler}
                value={formData.firstName}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none"
                type="text"
                placeholder="আপনার নাম লেখুন *"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="email"
                onChange={onChangeHandler}
                value={formData.email}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none"
                type="email"
                placeholder="ইমেইল"
              />
              <input
                required
                name="phone"
                onChange={onChangeHandler}
                value={formData.phone}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none"
                type="tel"
                placeholder="আপনার ফোন নাম্বার লিখুন *"
              />
            </div>
            <input
              required
              name="street"
              onChange={onChangeHandler}
              value={formData.street}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none"
              type="text"
              placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন *"
            />

            {/* Location Select (Inside/Outside Dhaka) */}
            <div className="relative">
              <select
                required
                name="division"
                onChange={onChangeHandler}
                value={formData.division}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  SHIPPING (Inside/Outside Dhaka)
                </option>
                <option value="Inside Dhaka">
                  ঢাকার শহরের ভিতরে ডেলিভারি চার্জ ৮০ ৳
                </option>
                <option value="Outside Dhaka">
                  ঢাকার বাইরে ডেলিভারি চার্জ ১৩০ ৳
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary & Payment */}
        <div className="flex flex-col gap-6 lg:w-[40%]">
          <div className="bg-[#121215] p-6 rounded-xl border border-zinc-800">
            <h2 className="text-[#FF4955] text-xs font-bold mb-4 uppercase tracking-[2px]">
              Order Items
            </h2>
            <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
              {orderList.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
                >
                  <img
                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                    className="w-16 h-16 object-cover rounded bg-zinc-900 border border-zinc-800"
                    alt=""
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-sm font-bold text-gray-300 mt-1">
                      {currency}{" "}
                      {item.offerPrice > 0 ? item.offerPrice : item.price}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {(item.displaySize || item.size) && (
                        <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                          {item.displaySize || item.size}
                        </span>
                      )}
                      {(item.displayColor || item.color) && (
                        <span className="flex items-center gap-1 text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-zinc-600"
                            style={{
                              backgroundColor:
                                (item.colors || []).find(
                                  (c) =>
                                    c.name ===
                                    (item.displayColor || item.color),
                                )?.hex || "#888",
                            }}
                          />
                          {item.displayColor || item.color}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2 bg-zinc-900 border border-zinc-800 rounded-md w-max px-2 py-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        className="text-zinc-500 hover:text-white transition-colors p-1"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        className="text-zinc-500 hover:text-[#FF4955] transition-colors p-1"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#121215] p-6 rounded-xl border border-zinc-800">
            <h2 className="text-[#FF4955] text-xs font-bold mb-4 uppercase tracking-[2px]">
              Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 border p-4 cursor-pointer rounded-lg transition-all ${method === "cod" ? "border-[#FF4955] bg-[#FF4955]/10 text-white" : "border-zinc-800 text-gray-400"}`}
              >
                <Truck
                  size={20}
                  className={method === "cod" ? "text-[#FF4955]" : ""}
                />
                <span className="font-semibold text-sm">Cash On Delivery</span>
              </div>
            </div>

            <div className="mt-8 space-y-3 text-sm border-t border-zinc-800 pt-6">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span>
                  {currency} {currentTotalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Delivery Fee</span>
                <span>
                  {currency} {delivery_fee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white pt-2">
                <span>Total</span>
                <span className="text-[#FF4955]">
                  {currency} {(currentTotalAmount + delivery_fee).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF4955] hover:bg-[#e03e49] text-white py-4 rounded-md font-bold mt-6 transition-all uppercase tracking-widest text-sm active:scale-[0.98]"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </form>

      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111113] border border-zinc-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full relative flex flex-col items-center text-center animate-in zoom-in duration-300">
            <button
              onClick={handlePopupClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-[#FF4955] transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="text-green-500 w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-widest mb-2">
              Order Successful!
            </h2>
            <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
              Brozzo থেকে কেনাকাটা করার জন্য আপনাকে অসংখ্য ধন্যবাদ। আপনার
              অর্ডারটি সফলভাবে রিসিভ করা হয়েছে! 🎉
            </p>
            <button
              onClick={handlePopupClose}
              className="w-full py-3.5 bg-[#FF4955] text-white font-black uppercase text-xs tracking-[2px] rounded-xl hover:bg-[#e03e49] transition-all shadow-lg shadow-[#FF4955]/20 active:scale-95"
            >
              View Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
