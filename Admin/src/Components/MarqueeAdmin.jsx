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
      expiryDate.setDate(expiryDate.getDate() + parseInt(days));
      expiryDate.setHours(expiryDate.getHours() + parseInt(hours));

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Manage Announcement Marquee</h2>
      
      {/* Toggle Section */}
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border mb-6">
        <div>
          <p className="font-semibold">Display Marquee</p>
          <p className="text-xs text-gray-500">Enable or disable marquee on the homepage</p>
        </div>
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`w-12 h-6 rounded-full transition-colors ${isActive ? 'bg-orange-500' : 'bg-gray-300'} relative`}
        >
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isActive ? 'right-1' : 'left-1'}`} />
        </button>
      </div>

      {isActive ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Announcement Text</label>
            <input 
              type="text" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border p-2 rounded" 
              placeholder="Type your message..."
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Duration (Days)</label>
              <input type="number" value={days} onChange={(e)=>setDays(e.target.value)} className="w-full border p-2 rounded" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Duration (Hours)</label>
              <input type="number" value={hours} onChange={(e)=>setHours(e.target.value)} className="w-full border p-2 rounded" />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed rounded-lg text-gray-400">
          Marquee is currently disabled.
        </div>
      )}

      <button 
        onClick={handleUpdate}
        className="w-full mt-6 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800"
      >
        Update Announcement
      </button>
    </div>
  );
};

export default MarqueeAdmin;