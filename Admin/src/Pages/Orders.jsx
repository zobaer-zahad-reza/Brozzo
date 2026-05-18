import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Package, Search, Phone, Calendar, CreditCard } from "lucide-react";
import InvoiceGenerator from "../Components/InvoiceGenerator";


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
    const fullName = order.address ? `${order.address.firstName} ${order.address.lastName}`.toLowerCase() : "";
    const phone = order.address?.phone || "";
    
    return (
      order._id.toLowerCase().includes(search) ||
      fullName.includes(search) ||
      phone.includes(search)
    );
  });

  return (
    <div className="w-full text-gray-200">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-zinc-800 pb-4">
        <h2 className="text-xl font-bold text-white uppercase tracking-widest">
          Order Management
        </h2>

        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by Order ID, Name or Phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#18181b] border border-zinc-800 rounded-md focus:ring-1 focus:ring-[#FF4955] focus:border-[#FF4955] outline-none transition-all text-white placeholder-zinc-600 text-sm"
          />
          <Search className="absolute left-3 top-3 text-zinc-500" size={16} />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2.5fr_1.5fr_1fr_1fr] gap-5 items-start border border-zinc-800 bg-[#121215] p-5 md:p-6 text-sm text-gray-300 rounded-lg hover:border-[#FF4955]/50 transition-colors shadow-md"
            >
              {/* Icon */}
              <div className="bg-[#18181b] border border-zinc-800 p-3 rounded-md w-fit">
                <Package className="text-[#FF4955]" size={30} />
              </div>

              {/* Order Details */}
              <div>
                <div className="mb-3">
                  <span className="bg-[#FF4955]/10 border border-[#FF4955]/30 text-[#FF4955] px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                    ID: {order._id.toUpperCase()}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-1.5 mb-4">
                  {order.items.map((item, idx) => (
                    <p className="font-medium text-white" key={idx}>
                      • {item.name} <span className="text-zinc-500">x {item.quantity}</span>
                      {item.size && (() => {
                        const [sz, cl] = item.size.includes('||') ? item.size.split('||') : [item.size, ''];
                        return (
                          <>
                            {sz && sz !== 'Free Size' && <span className="text-[#FF4955] ml-2">[{sz}]</span>}
                            {cl && <span className="text-yellow-400 ml-1">[{cl}]</span>}
                          </>
                        );
                      })()}
                    </p>
                  ))}
                </div>

                {/* Address */}
                {order.address && (
                    <div className="pt-4 border-t border-zinc-800">
                    <p className="font-bold text-white text-base mb-1">
                        {order.address.firstName + " " + order.address.lastName}
                    </p>
                    <p className="text-zinc-400 leading-relaxed text-xs">
                        {order.address.street}, {order.address.area ? order.address.area + ", " : ""}
                        {order.address.city}, {order.address.division}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[#FF4955] font-bold text-xs">
                        <Phone size={14} /> {order.address.phone}
                    </div>
                    </div>
                )}
              </div>

              {/* Order Meta Info */}
              <div className="space-y-2.5 bg-[#18181b] border border-zinc-800 p-4 rounded-md text-xs">
                <p className="flex items-center gap-2 font-medium text-gray-300">
                  <Package size={14} className="text-zinc-500" /> Items:{" "}
                  <span className="text-white">{order.items.length}</span>
                </p>
                <p className="flex items-center gap-2 font-medium text-gray-300">
                  <CreditCard size={14} className="text-zinc-500" /> Method:{" "}
                  <span className="text-white uppercase">{order.paymentMethod}</span>
                </p>
                <p className="flex items-center gap-2 font-medium text-gray-300">
                  <span
                    className={`w-2 h-2 rounded-full shadow-sm ${order.payment ? "bg-green-500 shadow-green-500/50" : "bg-red-500 shadow-red-500/50"}`}
                  ></span>
                  Payment: <span className="text-white">{order.payment ? "Done" : "Pending"}</span>
                </p>
                <p className="flex items-center gap-2 font-medium text-zinc-500">
                  <Calendar size={14} />{" "}
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              {/* Amount */}
              <div className="flex flex-col justify-center lg:items-center">
                <p className="text-sm text-zinc-500 mb-1">Total Amount</p>
                <p className="text-lg font-black text-[#FF4955]">
                  ৳{order.amount}
                </p>
              </div>

              {/* Status Selector & Download Invoice */}
              <div className="flex flex-col gap-3 h-full justify-center">
                <select
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                  className={`w-full p-2.5 font-bold border rounded-md outline-none transition-all cursor-pointer text-xs uppercase tracking-wider
                    ${
                      order.status === "Delivered"
                        ? "bg-green-900/20 border-green-800 text-green-500"
                        : order.status === "Order Canceled"
                          ? "bg-red-900/20 border-red-800 text-red-500"
                          : "bg-zinc-900 border-zinc-700 text-[#FF4955]"
                    }`}
                >
                  <option value="Order Placed" className="bg-[#18181b] text-gray-300">Order Placed</option>
                  <option value="Packing" className="bg-[#18181b] text-gray-300">Packing</option>
                  <option value="Shipped" className="bg-[#18181b] text-gray-300">Shipped</option>
                  <option value="Out for delivery" className="bg-[#18181b] text-gray-300">Out for delivery</option>
                  <option value="Delivered" className="bg-[#18181b] text-green-500">Delivered</option>
                  <option value="Order Canceled" className="bg-[#18181b] text-red-500">Order Canceled</option>
                </select>

                {/* Invoice */}
                <InvoiceGenerator order={order} className="w-full" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-[#121215] rounded-lg border border-zinc-800">
            <p className="text-zinc-500 font-medium">
              No orders matched your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;