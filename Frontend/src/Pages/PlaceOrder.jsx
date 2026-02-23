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
    area: "",
    city: "",
    division: "",
  });

  const [orderList, setOrderList] = useState([]);
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
              tempData.push({
                ...productInfo,
                _id: items,
                size: item,
                quantity: cartItems[items][item],
              });
            }
          }
        }
      }
      setOrderList(tempData);
    }
  }, [cartItems, products, isBuyNow, location.state]);

  const isDhaka = formData.division === "Dhaka";
  const delivery_fee = formData.division ? (isDhaka ? 80 : 120) : 0;
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
      if (!token) {
        toast.error("Please login to place an order");
        return navigate("/login");
      }

      if (orderList.length === 0) {
        toast.error("No items in the order!");
        return;
      }

      if (!formData.division) {
        toast.error("Please select a division!");
        return;
      }

      const orderData = {
        address: formData,
        items: orderList,
        amount: currentTotalAmount + delivery_fee,
      };

      if (method === "cod") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          { headers: { token } },
        );
        if (response.data.success) {
          toast.success("Order Placed Successfully!");
          if (!isBuyNow) setCartItems({});
          navigate("/orders");
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.info("Payment gateway integration coming soon.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                name="firstName"
                onChange={onChangeHandler}
                value={formData.firstName}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none"
                type="text"
                placeholder="First Name"
              />
              <input
                required
                name="lastName"
                onChange={onChangeHandler}
                value={formData.lastName}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none"
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
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none"
                type="email"
                placeholder="Email Address"
              />
              <input
                required
                name="phone"
                onChange={onChangeHandler}
                value={formData.phone}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none"
                type="tel"
                placeholder="Phone Number"
              />
            </div>
            <input
              required
              name="street"
              onChange={onChangeHandler}
              value={formData.street}
              className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none"
              type="text"
              placeholder="House/Road No."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                required
                name="area"
                onChange={onChangeHandler}
                value={formData.area}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none"
                type="text"
                placeholder="Area"
              />
              <input
                required
                name="city"
                onChange={onChangeHandler}
                value={formData.city}
                className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none"
                type="text"
                placeholder="City/District"
              />
              <div className="relative">
                <select
                  required
                  name="division"
                  onChange={onChangeHandler}
                  value={formData.division}
                  className="w-full bg-[#18181b] border border-zinc-800 rounded-md p-3 text-sm focus:border-[#FF4955] outline-none appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Division
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
              </div>
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
              {/* <div
                onClick={() => setMethod("bkash")}
                className={`flex items-center gap-3 border p-4 cursor-pointer rounded-lg transition-all ${method === "bkash" ? "border-[#FF4955] bg-[#FF4955]/10 text-white" : "border-zinc-800 text-gray-400"}`}
              >
                <Smartphone
                  size={20}
                  className={method === "bkash" ? "text-[#FF4955]" : ""}
                />
                <span className="font-semibold text-sm">bKash/Nagad</span>
              </div> */}
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
    </div>
  );
};

export default PlaceOrder;
