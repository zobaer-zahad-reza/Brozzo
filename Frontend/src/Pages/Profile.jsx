import React, { useState, useContext, useEffect, useRef } from "react";
import { 
  User, Package, MapPin, Heart, LogOut, 
  Camera, Box, Save, Plus, Trash2, Home 
} from "lucide-react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import Swal from "sweetalert2";

const Profile = () => {
  const { navigate, token, backendUrl, setToken, setCartItems } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    name: "", email: "", phone: "", avatar: "", joinDate: "", address: []
  });

  const [editData, setEditData] = useState({ name: "", phone: "", countryCode: "+880" });
  const [newAddress, setNewAddress] = useState({ street: "", city: "", state: "", zip: "", country: "Bangladesh" });
  const [orders, setOrders] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/user/profile', { headers: { token } });
      if (response.data.success) {
        const data = response.data.userData;
        setUserData({
          name: data.name,
          email: data.email,
          phone: data.phone || "Not provided",
          avatar: data.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          address: data.address || [],
          joinDate: new Date(data.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
        });
        
        const phoneMatch = data.phone?.match(/^(\+\d+)\s*(.*)$/);
        setEditData({ 
          name: data.name, 
          phone: phoneMatch ? phoneMatch[2] : (data.phone || ""), 
          countryCode: phoneMatch ? phoneMatch[1] : "+880" 
        });
      }
    } catch (error) { console.error(error); }
  };

  const fetchUserOrders = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) setOrders(response.data.orders.reverse());
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  useEffect(() => {
    if (!token) navigate('/login');
    else { fetchUserProfile(); fetchUserOrders(); }
  }, [token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({ title: 'Updating...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
      const fullPhone = `${editData.countryCode} ${editData.phone}`;
      const response = await axios.post(backendUrl + '/api/user/update-profile', { name: editData.name, phone: fullPhone }, { headers: { token } });
      if (response.data.success) {
        Swal.fire({ icon: 'success', title: 'Profile Updated!', timer: 1500, showConfirmButton: false });
        fetchUserProfile();
      }
    } catch (error) { Swal.fire({ icon: 'error', title: 'Error', text: error.message }); }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const updatedAddresses = [...userData.address, newAddress];
    try {
      const response = await axios.post(backendUrl + '/api/user/update-address', { address: updatedAddresses }, { headers: { token } });
      if (response.data.success) {
        Swal.fire({ icon: 'success', title: 'Address Added!', timer: 1000, showConfirmButton: false });
        setNewAddress({ street: "", city: "", state: "", zip: "", country: "Bangladesh" });
        fetchUserProfile();
      }
    } catch (error) { console.error(error); }
  };

  const removeAddress = async (index) => {
    const updatedAddresses = userData.address.filter((_, i) => i !== index);
    try {
      const response = await axios.post(backendUrl + '/api/user/update-address', { address: updatedAddresses }, { headers: { token } });
      if (response.data.success) fetchUserProfile();
    } catch (error) { console.error(error); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate("/login");
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="w-12 h-12 border-4 border-[#FFA24C] border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
           <div className="relative group">
              <img src={userData.avatar} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl" />
              <button onClick={() => fileInputRef.current.click()} className="absolute bottom-1 right-1 bg-[#FFA24C] text-white p-2 rounded-full border-2 border-white shadow-lg"><Camera size={16}/></button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
           </div>
           <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-extrabold text-gray-900 uppercase">{userData.name || 'User'}</h1>
              <p className="text-gray-500 font-medium">{userData.email}</p>
              <div className="mt-3"><span className="text-[10px] uppercase font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-600">Member Since {userData.joinDate}</span></div>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           {/* Sidebar Navigation */}
           <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
                 <nav className="p-2">
                    {[ { id: 'dashboard', label: 'Dashboard', icon: Box }, { id: 'account', label: 'Profile Settings', icon: User }, { id: 'address', label: 'My Addresses', icon: MapPin } ].map((item) => (
                      <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-bold transition-all mb-1 ${activeTab === item.id ? 'bg-orange-50 text-[#FFA24C]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}><item.icon size={20}/> {item.label}</button>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                       <button onClick={handleLogout} className="w-full flex items-center gap-3 px-6 py-4 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"><LogOut size={20}/> Logout</button>
                    </div>
                 </nav>
              </div>
           </div>

           {/* Tab Content */}
           <div className="lg:w-3/4">
              {activeTab === 'dashboard' && (
                <div className="space-y-6 animate-fadeIn">
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 flex items-center gap-4">
                         <div className="bg-[#FFA24C] p-3 rounded-full text-white"><Box size={24}/></div>
                         <div><h3 className="text-2xl font-bold text-gray-800">{orders.length}</h3><p className="text-sm text-gray-600">Total Orders</p></div>
                      </div>
                      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-center gap-4">
                         <div className="bg-blue-500 p-3 rounded-full text-white"><Package size={24}/></div>
                         <div><h3 className="text-2xl font-bold text-gray-800">{orders.filter(o => o.status !== 'Delivered').length}</h3><p className="text-sm text-gray-600">In Progress</p></div>
                      </div>
                      <div className="bg-pink-50 p-6 rounded-xl border border-pink-100 flex items-center gap-4">
                         <div className="bg-pink-500 p-3 rounded-full text-white"><Heart size={24}/></div>
                         <div><h3 className="text-2xl font-bold text-gray-800">0</h3><p className="text-sm text-gray-600">Wishlist</p></div>
                      </div>
                   </div>
                   <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                         <h3 className="font-bold text-gray-800">Recent Orders</h3>
                         <button onClick={() => navigate('/orders')} className="text-sm text-[#FFA24C] font-semibold hover:underline">View All</button>
                      </div>
                      <div className="p-4">
                         {orders.slice(0, 3).map((order, index) => (
                            <div key={index} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
                               <div className="flex items-center gap-4">
                                  <div className="bg-gray-100 p-2 rounded-lg text-gray-500"><Package size={20}/></div>
                                  <div>
                                     <p className="font-bold text-gray-800 text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                                     <p className="text-xs text-gray-400">{new Date(order.date).toDateString()}</p>
                                  </div>
                               </div>
                               <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-[#FFA24C]">{order.status}</span>
                            </div>
                         ))}
                         {orders.length === 0 && <p className="text-center text-gray-500 py-4">No orders yet.</p>}
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-6 animate-fadeIn">
                   <h2 className="text-xl font-bold text-gray-800 mb-6">Account Details</h2>
                   <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Full Name</label>
                            <input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFA24C] outline-none" required />
                         </div>
                         <div className="space-y-1">
                            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                            <div className="flex gap-2">
                               <select value={editData.countryCode} onChange={(e) => setEditData({...editData, countryCode: e.target.value})} className="p-3 border border-gray-200 rounded-xl bg-gray-50 outline-none">
                                  <option value="+880">+880 (BD)</option>
                                  <option value="+91">+91 (IN)</option>
                               </select>
                               <input type="tel" value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FFA24C] outline-none" placeholder="1700000000" />
                            </div>
                         </div>
                         <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700">Email Address (Read Only)</label>
                            <input type="email" value={userData.email} disabled className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed" />
                         </div>
                      </div>
                      <div className="flex justify-end pt-4">
                         <button type="submit" className="flex items-center gap-2 bg-[#FFA24C] text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-95">
                            <Save size={18}/> Save Changes
                         </button>
                      </div>
                   </form>
                </div>
              )}

              {activeTab === 'address' && (
                <div className="space-y-6 animate-fadeIn">
                   <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                      <div className="p-6 border-b border-gray-200 bg-gray-50/50 flex justify-between items-center">
                         <h2 className="text-xl font-bold text-gray-800">My Addresses</h2>
                         <span className="text-xs font-bold bg-[#FFA24C]/10 text-[#FFA24C] px-3 py-1 rounded-full">{userData.address.length} Saved</span>
                      </div>
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                         {userData.address.map((addr, index) => (
                            <div key={index} className="border border-gray-100 rounded-xl p-4 relative group hover:border-[#FFA24C] transition-colors">
                               <button onClick={() => removeAddress(index)} className="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                               <div className="flex items-start gap-3">
                                  <div className="bg-orange-50 p-2 rounded-lg text-[#FFA24C]"><Home size={20}/></div>
                                  <div className="text-sm">
                                     <p className="font-bold text-gray-800 mb-1">Address {index + 1}</p>
                                     <p className="text-gray-500 leading-relaxed">{addr.street}, {addr.city}, {addr.state} - {addr.zip}, {addr.country}</p>
                                  </div>
                               </div>
                            </div>
                         ))}
                         {userData.address.length === 0 && <div className="md:col-span-2 text-center py-10 text-gray-400 border-2 border-dashed rounded-2xl">No addresses saved yet.</div>}
                      </div>
                   </div>
                   <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                      <div className="p-6 border-b border-gray-200"><h2 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Plus size={20} className="text-[#FFA24C]"/> Add New Address</h2></div>
                      <form onSubmit={handleAddAddress} className="p-6 space-y-4">
                         <input type="text" placeholder="Street Address" value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#FFA24C]" required />
                         <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="City" value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none" required />
                            <input type="text" placeholder="State" value={newAddress.state} onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none" required />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="ZIP Code" value={newAddress.zip} onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none" required />
                            <input type="text" placeholder="Country" value={newAddress.country} onChange={(e) => setNewAddress({...newAddress, country: e.target.value})} className="w-full p-3 border border-gray-200 rounded-xl outline-none" required />
                         </div>
                         <button type="submit" className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-[#FFA24C] transition-all active:scale-95">Add Address</button>
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