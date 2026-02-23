import React, { useState, useContext, useEffect, useRef } from "react";
import {
  User,
  Package,
  MapPin,
  LogOut,
  Camera,
  Box,
  Save,
  Plus,
  Trash2,
  Home,
} from "lucide-react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Profile = () => {
  const { navigate, token, backendUrl, setToken, setCartItems } =
    useContext(ShopContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    joinDate: "",
    address: [],
  });

  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    countryCode: "+880",
  });
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "Bangladesh",
  });
  const [orders, setOrders] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/user/profile", {
        headers: { token },
      });
      if (response.data.success) {
        const data = response.data.userData;
        setUserData({
          name: data.name,
          email: data.email,
          phone: data.phone || "Not provided",
          avatar:
            data.image ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          address: data.address || [],
          joinDate: new Date(data.createdAt || Date.now()).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "short" },
          ),
        });

        const phoneMatch = data.phone?.match(/^(\+\d+)\s*(.*)$/);
        setEditData({
          name: data.name,
          phone: phoneMatch ? phoneMatch[2] : data.phone || "",
          countryCode: phoneMatch ? phoneMatch[1] : "+880",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserOrders = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } },
      );
      if (response.data.success) setOrders(response.data.orders.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
    else {
      fetchUserProfile();
      fetchUserOrders();
    }
  }, [token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Updating...",
        allowOutsideClick: false,
        background: "#18181b",
        color: "#fff",
        didOpen: () => Swal.showLoading(),
      });
      const fullPhone = `${editData.countryCode} ${editData.phone}`;
      const response = await axios.post(
        backendUrl + "/api/user/update-profile",
        { name: editData.name, phone: fullPhone },
        { headers: { token } },
      );
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          timer: 1500,
          showConfirmButton: false,
          background: "#18181b",
          color: "#fff",
        });
        fetchUserProfile();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        background: "#18181b",
        color: "#fff",
      });
    }
  };

  // FIXED: Add Handle Image Upload Function
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      Swal.fire({
        title: "Uploading Image...",
        background: "#18181b",
        color: "#fff",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      // API call to backend route defined in userRoute.js
      const response = await axios.post(
        backendUrl + "/api/user/update-image",
        formData,
        { headers: { token, "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Image Updated!",
          background: "#18181b",
          color: "#fff",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchUserProfile(); // Refresh avatar
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      Swal.close();
      toast.error(error.message);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Saving Address...",
        background: "#18181b",
        color: "#fff",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await axios.post(
        backendUrl + "/api/user/add-address",
        { address: newAddress },
        { headers: { token } }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Address Saved!",
          background: "#18181b",
          color: "#fff",
          timer: 1500,
          showConfirmButton: false
        });
        setNewAddress({ street: "", city: "", state: "", zip: "", country: "Bangladesh" });
        fetchUserProfile();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: response.data.message,
          background: "#18181b",
          color: "#fff",
        });
      }
    } catch (error) {
      Swal.close();
      const errorMsg = error.response?.status === 404 
        ? "API Route not found (404). Check backend!" 
        : error.message;
      toast.error(errorMsg);
    }
  };

  const removeAddress = async (index) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#FF4955",
        cancelButtonColor: "#27272a",
        confirmButtonText: "Yes, delete it!",
        background: "#18181b",
        color: "#fff",
      });

      if (result.isConfirmed) {
        const response = await axios.post(
          backendUrl + "/api/user/remove-address",
          { index },
          { headers: { token } }
        );

        if (response.data.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your address has been removed.",
            icon: "success",
            background: "#18181b",
            color: "#fff",
          });
          fetchUserProfile();
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#FF4955] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black pt-28 pb-10 px-4 font-sans text-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-[#111113] rounded-[32px] border border-zinc-800 p-6 md:p-10 mb-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#FF4955] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img src={userData.avatar} alt="Profile" className="relative w-32 h-32 rounded-full object-cover border-4 border-zinc-800 shadow-2xl" />
            
            <button onClick={() => fileInputRef.current.click()} className="absolute bottom-1 right-1 bg-[#FF4955] text-white p-2.5 rounded-full border-4 border-[#111113] shadow-lg hover:scale-110 transition-transform">
              <Camera size={18} />
            </button>
            
            {/* FIXED: Added onChange handler here */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*" 
            />

          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">{userData.name || "User"}</h1>
            <p className="text-zinc-500 font-medium text-lg mt-1">{userData.email}</p>
            <div className="mt-4">
              <span className="text-[10px] uppercase font-black bg-zinc-800 px-4 py-1.5 rounded-full text-zinc-400 tracking-widest">Since {userData.joinDate}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-[#111113] rounded-3xl border border-zinc-800 overflow-hidden sticky top-24 shadow-xl">
              <nav className="p-3">
                {[{ id: "dashboard", label: "Dashboard", icon: Box }, { id: "account", label: "Profile Settings", icon: User }, { id: "address", label: "My Addresses", icon: MapPin }].map((item) => (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all mb-2 ${activeTab === item.id ? "bg-[#FF4955] text-white shadow-lg shadow-[#FF4955]/20" : "text-zinc-500 hover:bg-zinc-800/50 hover:text-white"}`}>
                    <item.icon size={18} /> {item.label}
                  </button>
                ))}
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-all">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </nav>
            </div>
          </div>

          <div className="lg:w-3/4">
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="bg-[#111113] p-8 rounded-3xl border border-zinc-800 flex items-center gap-5">
                    <div className="bg-[#FF4955]/10 p-4 rounded-2xl text-[#FF4955]"><Box size={28} /></div>
                    <div><h3 className="text-3xl font-black text-white">{orders.length}</h3><p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Orders</p></div>
                  </div>
                  <div className="bg-[#111113] p-8 rounded-3xl border border-zinc-800 flex items-center gap-5">
                    <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-500"><Package size={28} /></div>
                    <div><h3 className="text-3xl font-black text-white">{orders.filter((o) => o.status !== "Delivered").length}</h3><p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Active Orders</p></div>
                  </div>
                </div>
                <div className="bg-[#111113] rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl p-6">
                    <h3 className="font-black text-white uppercase text-xs tracking-[2px] mb-6">Recent Orders</h3>
                    {orders.slice(0, 3).map((order, index) => (
                      <div key={index} className="flex justify-between items-center py-5 border-b border-zinc-800 last:border-0 group">
                        <div className="flex items-center gap-5">
                          <div className="bg-zinc-800 p-3 rounded-xl text-zinc-500 group-hover:bg-[#FF4955]/10 transition-colors"><Package size={22} /></div>
                          <div><p className="font-black text-white text-sm uppercase">#{order._id.slice(-8)}</p><p className="text-xs text-zinc-500">{new Date(order.date).toDateString()}</p></div>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">{order.status}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="bg-[#111113] rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl p-8">
                <h2 className="text-xl font-black text-white uppercase mb-8 border-l-4 border-[#FF4955] pl-4">Profile Settings</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500">Full Name</label>
                      <input type="text" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl focus:ring-2 focus:ring-[#FF4955] outline-none text-white" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500">Phone Number</label>
                      <div className="flex gap-3">
                        <select value={editData.countryCode} onChange={(e) => setEditData({ ...editData, countryCode: e.target.value })} className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-zinc-400 outline-none"><option value="+880">BD</option></select>
                        <input type="tel" value={editData.phone} onChange={(e) => setEditData({ ...editData, phone: e.target.value })} className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl focus:ring-2 focus:ring-[#FF4955] outline-none text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end"><button type="submit" className="flex items-center gap-3 bg-[#FF4955] text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-[2px] active:scale-95 shadow-xl"><Save size={18} /> Save Changes</button></div>
                </form>
              </div>
            )}

            {activeTab === "address" && (
              <div className="space-y-8">
                <div className="bg-[#111113] rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl p-8">
                    <h2 className="text-xl font-black text-white uppercase mb-8">Shipping Addresses</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userData.address.map((addr, index) => (
                            <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 relative group hover:border-[#FF4955]/40 transition-all">
                                <button onClick={() => removeAddress(index)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-500"><Trash2 size={18} /></button>
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#FF4955]/10 p-3 rounded-xl text-[#FF4955]"><Home size={22} /></div>
                                    <div className="text-sm"><p className="font-black text-white uppercase mb-2">Address {index + 1}</p><p className="text-zinc-500 font-medium">{addr.street}, {addr.city}, {addr.state} - {addr.zip}</p></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#111113] rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl p-8">
                    <h2 className="text-lg font-black text-white flex items-center gap-3 uppercase mb-6"><Plus size={22} className="text-[#FF4955]" /> New Address</h2>
                    <form onSubmit={handleAddAddress} className="space-y-5">
                        <input type="text" placeholder="Street Address" value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#FF4955] text-white" required />
                        <div className="grid grid-cols-2 gap-5">
                            <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-white outline-none" required />
                            <input type="text" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-white outline-none" required />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <input type="text" placeholder="ZIP Code" value={newAddress.zip} onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-white outline-none" required />
                            <input type="text" placeholder="Country" value={newAddress.country} onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })} className="w-full bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-white outline-none" required />
                        </div>
                        <button type="submit" className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-xs tracking-[2px] hover:bg-[#FF4955] hover:text-white transition-all active:scale-95">Save Address</button>
                    </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;