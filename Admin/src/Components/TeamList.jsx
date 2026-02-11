import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiTrash2, FiStar, FiGrid, FiLoader } from "react-icons/fi";

const TeamList = ({ token, backendUrl }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetchList-কে useCallback দিয়ে র‍্যাপ করা হয়েছে যাতে রেন্ডারিং ইস্যু না হয়
  const fetchList = useCallback(async () => {
    if (!backendUrl) return;
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/team/list`);
      if (response.data.success) {
        setList(response.data.members);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  const removeMember = async (id) => {
    // ডিলিট করার আগে কনফার্মেশন নেওয়া ভালো
    if (!window.confirm("Are you sure you want to remove this member?")) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/team/remove`, 
        { id }, 
        { headers: { token } }
      );
      
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // ডিলিট হওয়ার পর লিস্ট আপডেট করা
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className='w-full p-8 bg-white rounded-xl shadow-sm border border-gray-100'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-black text-gray-800 uppercase tracking-tight'>
          Team Member List
        </h2>
        {loading && <FiLoader className="animate-spin text-[#FEA24C]" />}
      </div>

      {/* Table Header */}
      <div className='hidden md:grid grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider'>
        <p>Image</p>
        <p>Name</p>
        <p>Role</p>
        <p>Type</p>
        <p className='text-center'>Action</p>
      </div>

      {/* Member Items */}
      <div className='flex flex-col gap-3'>
        {list.length > 0 ? (
          list.map((item) => (
            <div 
              key={item._id} 
              className='grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center gap-2 py-3 px-4 border border-gray-100 rounded-xl hover:bg-orange-50/30 transition-all group'
            >
              <img 
                className='w-12 h-16 object-cover rounded-lg shadow-sm bg-gray-100' 
                src={item.image} 
                alt={item.name} 
              />
              <div>
                <p className='font-bold text-gray-800'>{item.name}</p>
                <p className='text-xs text-gray-500 md:hidden'>{item.role}</p>
              </div>
              <p className='text-sm text-gray-500 hidden md:block'>{item.role}</p>
              
              <div className='hidden md:flex items-center gap-1'>
                {item.isLeadership ? 
                  <span className='flex items-center gap-1 text-[10px] bg-orange-100 text-[#FEA24C] px-2 py-1 rounded-full font-black uppercase'>
                    <FiStar/> Lead
                  </span> : 
                  <span className='flex items-center gap-1 text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-black uppercase'>
                    <FiGrid/> Core
                  </span>
                }
              </div>

              <div className='flex justify-center'>
                <button 
                  onClick={() => removeMember(item._id)} 
                  className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all'
                >
                  <FiTrash2 className='text-lg' />
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && <p className='text-center text-gray-400 italic py-10'>No team members added yet.</p>
        )}
      </div>
    </div>
  );
};

export default TeamList;