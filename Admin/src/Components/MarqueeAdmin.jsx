import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MarqueeAdmin = ({ token, backendUrl }) => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("");
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const fetchMarquee = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/marquee/get`);
        if (response.data.success) {
          const { isActive, text } = response.data.marquee;
          setIsActive(isActive);
          setText(text);
        }
      } catch (error) {
        console.error("Error fetching marquee", error);
      }
    };
    fetchMarquee();
  }, [backendUrl]);

  const handleUpdate = async () => {
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + parseInt(days || 0));
      expiryDate.setHours(expiryDate.getHours() + parseInt(hours || 0));

      const response = await axios.post(
        `${backendUrl}/api/marquee/update`,
        { isActive, text, expiryDate },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Marquee Updated Successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Prevent minus sign in number inputs
  const preventMinus = (e) => {
    if (e.key === '-' || e.key === 'e' || e.key === '+') {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-[#121215] border border-zinc-800 p-6 rounded-lg shadow-xl max-w-2xl text-gray-200">
      <h2 className="text-xl font-bold text-white uppercase tracking-widest mb-6 border-b border-zinc-800 pb-3">
        Manage Announcement Marquee
      </h2>
      
      {/* Toggle Section */}
      <div className="flex justify-between items-center p-4 bg-[#18181b] rounded-md border border-zinc-800 mb-6 shadow-sm">
        <div>
          <p className="font-bold text-sm text-white tracking-wide">Display Marquee</p>
          <p className="text-xs text-zinc-500 mt-1">Enable or disable marquee on the homepage</p>
        </div>
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`w-14 h-7 rounded-full transition-all duration-300 relative shadow-inner ${isActive ? 'bg-[#FF4955]' : 'bg-zinc-700'}`}
        >
          <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${isActive ? 'right-1' : 'left-1'}`} />
        </button>
      </div>

      {isActive ? (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Announcement Text
            </label>
            <input 
              type="text" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-[#18181b] border border-zinc-800 text-white p-3 rounded-md focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none transition-colors text-sm placeholder-zinc-600" 
              placeholder="Type your promotional message..."
            />
          </div>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Duration (Days)
              </label>
              <input 
                type="number" 
                min="0"
                onKeyDown={preventMinus}
                value={days} 
                onChange={(e)=>setDays(e.target.value)} 
                className="w-full bg-[#18181b] border border-zinc-800 text-white p-3 rounded-md focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none transition-colors text-sm" 
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Duration (Hours)
              </label>
              <input 
                type="number" 
                min="0"
                onKeyDown={preventMinus}
                value={hours} 
                onChange={(e)=>setHours(e.target.value)} 
                className="w-full bg-[#18181b] border border-zinc-800 text-white p-3 rounded-md focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none transition-colors text-sm" 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 bg-[#18181b] border border-zinc-800 rounded-md text-zinc-500 text-sm font-medium">
          Marquee is currently disabled.
        </div>
      )}

      <button 
        onClick={handleUpdate}
        className="w-full mt-8 bg-[#FF4955] text-white py-3.5 rounded-md font-bold hover:bg-[#e03e49] active:scale-[0.98] transition-all uppercase tracking-widest text-sm shadow-lg shadow-[#FF4955]/20"
      >
        Update Announcement
      </button>

      {/* Hide number input spinners */}
      <style>{`
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default MarqueeAdmin;