import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  CreditCard,
  Banknote,
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  Truck,
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
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const isBuyNow = location.state && location.state.buyNowItem;
  const [buyNowList, setBuyNowList] = useState(
    isBuyNow ? [location.state.buyNowItem] : [],
  );

  const finalOrderList = isBuyNow ? buyNowList : cart;
  const delivery_fee = 15;

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
              city: savedAddr.city || "",
              state: savedAddr.state || "",
              zipcode: savedAddr.zip || "",
              country: savedAddr.country || "",
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

  const updateLocalQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setBuyNowList((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const removeLocalItem = () => {
    setBuyNowList([]);
    navigate("/");
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

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } },
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "mobile":
          toast.info(
            "Mobile banking (bKash/Nagad) coming soon. Please use COD.",
          );
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
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-8 font-sans">
      <form
        onSubmit={handlePlaceOrder}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[80vh]"
      >
        {/* Delivery Information */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          <div className="flex items-center gap-2 mb-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-[#FFA24C] transition"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-900">
              Delivery Information
            </h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  required
                  name="firstName"
                  onChange={onChangeHandler}
                  value={formData.firstName}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FFA24C] outline-none"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  required
                  name="lastName"
                  onChange={onChangeHandler}
                  value={formData.lastName}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FFA24C] outline-none"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                required
                name="email"
                onChange={onChangeHandler}
                value={formData.email}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FFA24C] outline-none"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Street
              </label>
              <input
                required
                name="street"
                onChange={onChangeHandler}
                value={formData.street}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FFA24C] outline-none"
                type="text"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  required
                  name="city"
                  onChange={onChangeHandler}
                  value={formData.city}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FFA24C] outline-none"
                  type="text"
                  placeholder="New York"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  required
                  name="state"
                  onChange={onChangeHandler}
                  value={formData.state}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FFA24C] outline-none"
                  type="text"
                  placeholder="NY"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Zipcode
                </label>
                <input
                  required
                  name="zipcode"
                  onChange={onChangeHandler}
                  value={formData.zipcode}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FFA24C] outline-none"
                  type="text"
                  placeholder="10001"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  required
                  name="country"
                  onChange={onChangeHandler}
                  value={formData.country}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FFA24C] outline-none"
                  type="text"
                  placeholder="United States"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                required
                name="phone"
                onChange={onChangeHandler}
                value={formData.phone}
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#FFA24C] outline-none"
                type="tel"
                placeholder="+1 234 567 890"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase">
              Items
            </h2>
            <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pr-2">
              {finalOrderList.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center border-b pb-4 last:border-0"
                >
                  <img
                    src={Array.isArray(item.image) ? item.image[0] : item.image}
                    alt=""
                    className="w-14 h-14 object-cover rounded bg-gray-50"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      isBuyNow ? removeLocalItem() : removeFromCart(item._id)
                    }
                    className="text-gray-300 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${currentTotalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${delivery_fee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-3">
                <span>Total</span>
                <span>${(currentTotalAmount + delivery_fee).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm space-y-3">
            <h2 className="text-lg font-bold mb-4">Payment Method</h2>
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-4 cursor-pointer rounded-xl transition ${method === "stripe" ? "border-[#FFA24C] bg-orange-50" : "hover:bg-gray-50"}`}
            >
              <CreditCard
                size={20}
                className={
                  method === "stripe" ? "text-[#FFA24C]" : "text-gray-400"
                }
              />
              <span className="font-semibold flex-1">
                Online Payment (Stripe)
              </span>
            </div>
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-4 cursor-pointer rounded-xl transition ${method === "cod" ? "border-[#FFA24C] bg-orange-50" : "hover:bg-gray-50"}`}
            >
              <Truck
                size={20}
                className={
                  method === "cod" ? "text-[#FFA24C]" : "text-gray-400"
                }
              />
              <span className="font-semibold flex-1">Cash on Delivery</span>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl font-bold mt-4 hover:bg-gray-800 transition shadow-lg"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
