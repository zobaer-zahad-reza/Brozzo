import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Trash2,
  Truck,
  Smartphone,
  Plus,
  Minus,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, updateQuantity, removeFromCart, backendUrl, token, setCart } =
    useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "", // House/Road No.
    area: "", // Local Area (e.g. Jatrabari)
    city: "", // City/District (e.g. Dhaka)
    division: "", // Division (e.g. Dhaka)
  });

  const isBuyNow = location.state && location.state.buyNowItem;
  const [buyNowList, setBuyNowList] = useState(
    isBuyNow ? [location.state.buyNowItem] : [],
  );

  const finalOrderList = isBuyNow ? buyNowList : cart;

  // Custom Delivery Fee Logic for BD based on Division
  const isDhaka = formData.division === "Dhaka";
  // If division is selected, check if it's Dhaka (80) or others (120). If empty, 0.
  const delivery_fee = formData.division ? (isDhaka ? 80 : 120) : 0;
  const currency = "৳";

  // Fetch User Data to Auto-fill Address
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
              area: savedAddr.area || "",
              city: savedAddr.city || "",
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
    return finalOrderList.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0,
    );
  };

  const currentTotalAmount = calculateTotal();

  const removeLocalItem = () => {
    setBuyNowList([]);
    navigate("/");
  };

  const updateLocalQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setBuyNowList((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  // Quantity Handler
  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;

    if (isBuyNow) {
      updateLocalQuantity(item._id, newQuantity);
    } else {
      updateQuantity(item._id, newQuantity);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // Main Order Placing Function
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        toast.error("Please login to place an order");
        return navigate("/login");
      }

      let orderItems = finalOrderList;
      if (orderItems.length === 0) {
        toast.error("No items in the order!");
        return;
      }

      if (!formData.division) {
        toast.error("Please select a division for delivery!");
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: currentTotalAmount + delivery_fee,
      };

      // API Call based on method
      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } },
          );
          if (response.data.success) {
            toast.success("Order Placed Successfully!");
            if (!isBuyNow) setCart([]);
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "bkash":
          toast.info(
            "bKash/Nagad integration coming soon. Placing as COD for now.",
          );
          // Add your gateway redirect logic here
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-28 pb-20 px-4 md:px-8 font-sans text-gray-200">
      <form
        onSubmit={handlePlaceOrder}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[80vh]"
      >
        {/* Delivery Information (Left Side) */}
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
            <h3 className="text-[#FF4955] text-xs font-bold uppercase tracking-[2px] mb-2">
              Personal Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                name="firstName"
                onChange={onChangeHandler}
                value={formData.firstName}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none text-white placeholder-zinc-600 transition-all"
                type="text"
                placeholder="First Name"
              />
              <input
                required
                name="lastName"
                onChange={onChangeHandler}
                value={formData.lastName}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none text-white placeholder-zinc-600 transition-all"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                name="email"
                onChange={onChangeHandler}
                value={formData.email}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none text-white placeholder-zinc-600 transition-all"
                type="email"
                placeholder="Email Address"
              />
              <input
                required
                name="phone"
                onChange={onChangeHandler}
                value={formData.phone}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none text-white placeholder-zinc-600 transition-all"
                type="tel"
                placeholder="Phone Number (e.g. 017...)"
              />
            </div>

            <div className="w-full h-[1px] bg-zinc-800 my-4"></div>
            <h3 className="text-[#FF4955] text-xs font-bold uppercase tracking-[2px] mb-2">
              Shipping Address
            </h3>

            <input
              required
              name="street"
              onChange={onChangeHandler}
              value={formData.street}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none text-white placeholder-zinc-600 transition-all"
              type="text"
              placeholder="House/Road No., Building Name"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                required
                name="area"
                onChange={onChangeHandler}
                value={formData.area}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none text-white placeholder-zinc-600 transition-all"
                type="text"
                placeholder="Area (e.g. Dhanmondi)"
              />
              <input
                required
                name="city"
                onChange={onChangeHandler}
                value={formData.city}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none text-white placeholder-zinc-600 transition-all"
                type="text"
                placeholder="City/District"
              />

              {/* Custom styled select for Brozzo Theme */}
              <div className="relative">
                <select
                  required
                  name="division"
                  onChange={onChangeHandler}
                  value={formData.division}
                  className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none text-white appearance-none cursor-pointer transition-all"
                >
                  <option value="" disabled className="text-zinc-500">
                    Select Division
                  </option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
                {/* Custom Dropdown Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary & Payment (Right Side) */}
        <div className="flex flex-col gap-6 lg:w-[40%]">
          {/* Items List */}
          <div className="bg-[#121215] p-6 rounded-xl border border-zinc-800">
            <h2 className="text-[#FF4955] text-xs font-bold mb-4 uppercase tracking-[2px]">
              Order Items
            </h2>
            <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
              {finalOrderList.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center border-b border-zinc-800 pb-4 last:border-0 last:pb-0"
                >
                  <img
                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                    alt=""
                    className="w-20 h-20 object-cover rounded bg-zinc-900 border border-zinc-800"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-sm font-bold text-gray-300 mt-1">
                      {currency}
                      {item.price}
                    </p>

                    {/* Quantity Controller */}
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
                  <button
                    type="button"
                    onClick={() =>
                      isBuyNow ? removeLocalItem() : removeFromCart(item._id)
                    }
                    className="text-zinc-600 hover:text-red-500 p-2 transition-colors self-start"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-[#121215] p-6 rounded-xl border border-zinc-800 space-y-4">
            <h2 className="text-[#FF4955] text-xs font-bold uppercase tracking-[2px]">
              Payment Method
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 border p-4 cursor-pointer rounded-lg transition-all ${
                  method === "cod"
                    ? "border-[#FF4955] bg-[#FF4955]/10 text-white"
                    : "border-zinc-800 text-gray-400 hover:bg-zinc-900"
                }`}
              >
                <Truck
                  size={20}
                  className={method === "cod" ? "text-[#FF4955]" : ""}
                />
                <span className="font-semibold text-sm">Cash on Delivery</span>
              </div>

              <div
                onClick={() => setMethod("bkash")}
                className={`flex items-center gap-3 border p-4 cursor-pointer rounded-lg transition-all ${
                  method === "bkash"
                    ? "border-[#FF4955] bg-[#FF4955]/10 text-white"
                    : "border-zinc-800 text-gray-400 hover:bg-zinc-900"
                }`}
              >
                <Smartphone
                  size={20}
                  className={method === "bkash" ? "text-[#FF4955]" : ""}
                />
                <span className="font-semibold text-sm">bKash / Nagad</span>
              </div>
            </div>
          </div>

          {/* Total Calculation */}
          <div className="bg-[#121215] p-6 rounded-xl border border-zinc-800">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">
                  {currency}
                  {currentTotalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>
                  Delivery Fee
                  {formData.division
                    ? isDhaka
                      ? " (Inside Dhaka)"
                      : " (Outside Dhaka)"
                    : ""}
                </span>
                <span className="text-white font-medium">
                  {currency}
                  {delivery_fee.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-zinc-800 pt-4 mt-2 text-white">
                <span>Total</span>
                <span className="text-[#FF4955]">
                  {currency}
                  {(currentTotalAmount + delivery_fee).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF4955] hover:bg-[#e03e49] text-white py-4 rounded-md font-bold mt-6 transition-all shadow-lg shadow-[#FF4955]/20 uppercase tracking-widest text-sm active:scale-[0.98]"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </form>

      {/* Styles for scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #FF4955; }
      `}</style>
    </div>
  );
};

export default PlaceOrder;
