import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Package, Search, Phone, Calendar, CreditCard } from "lucide-react";

const Orders = ({ token, backendUrl }) => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } },
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } },
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Status Updated");
      }
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();
    return (
      order._id.toLowerCase().includes(search) ||
      (order.address.firstName + " " + order.address.lastName)
        .toLowerCase()
        .includes(search) ||
      order.address.phone.includes(search)
    );
  });

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h3 className="font-bold text-xl text-gray-800">Order Management</h3>

        {/* Search Bar Section */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by Order ID, Name or Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFA24C] outline-none transition-all shadow-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2.5fr_1.5fr_1fr_1fr] gap-4 items-start border border-gray-200 p-5 md:p-6 text-xs sm:text-sm text-gray-700 bg-white rounded-2xl shadow-sm hover:border-[#FFA24C]/50 transition-colors"
            >
              <div className="bg-orange-50 p-3 rounded-2xl w-fit">
                <Package className="text-[#FFA24C]" size={35} />
              </div>

              <div>
                {/* ID Badge */}
                <div className="mb-3">
                  <span className="bg-gray-800 text-white px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                    ID: {order._id.toUpperCase()}
                  </span>
                </div>

                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <p className="font-semibold text-gray-800" key={idx}>
                      • {item.name} x {item.quantity}
                      <span className="text-gray-500 ml-2">[{item.size}]</span>
                    </p>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50">
                  <p className="font-bold text-gray-900 text-base mb-1">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <p className="text-gray-500 leading-relaxed">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state}, {order.address.country} -{" "}
                    {order.address.zipcode}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[#FFA24C] font-bold">
                    <Phone size={14} /> {order.address.phone}
                  </div>
                </div>
              </div>

              <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                <p className="flex items-center gap-2 font-medium">
                  <Package size={16} className="text-gray-400" /> Items:{" "}
                  {order.items.length}
                </p>
                <p className="flex items-center gap-2 font-medium">
                  <CreditCard size={16} className="text-gray-400" />{" "}
                  {order.paymentMethod}
                </p>
                <p className="flex items-center gap-2 font-medium">
                  <span
                    className={`w-2 h-2 rounded-full ${order.payment ? "bg-green-500" : "bg-red-500"}`}
                  ></span>
                  Payment: {order.payment ? "Done" : "Pending"}
                </p>
                <p className="flex items-center gap-2 font-medium text-gray-500">
                  <Calendar size={16} />{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-lg font-black text-gray-900 mb-2">
                  ${order.amount}
                </p>
              </div>

              <div className="flex items-center h-full">
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className={`w-full p-2.5 font-bold border rounded-xl outline-none shadow-sm transition-all cursor-pointer 
                    ${
                      order.status === "Delivered"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : order.status === "Cancelled"
                          ? "bg-red-50 border-red-200 text-red-700"
                          : "bg-orange-50 border-orange-200 text-[#FFA24C]"
                    }`}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Order Canceled">Order Canceled</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-medium">
              No orders matched your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
