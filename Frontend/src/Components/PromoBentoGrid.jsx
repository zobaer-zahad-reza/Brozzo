import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";

const PromoBentoGrid = () => {
  const { backendUrl } = useContext(ShopContext);
  const [gridData, setGridData] = useState({});
  const navigate = useNavigate();

  const fetchGrid = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/bento/list");
      if (res.data.success) {
        const dataMap = res.data.data.reduce((acc, item) => {
          acc[item.position] = item;
          return acc;
        }, {});
        setGridData(dataMap);
      }
    } catch (e) { console.log(e); }
  };

  useEffect(() => { fetchGrid(); }, []);

  const Box = ({ pos, className, titleClass = "text-2xl", imgClass = "w-32" }) => {
    const item = gridData[pos];
    if (!item) return <div className={`${className} bg-gray-200 animate-pulse rounded-md`}></div>;

    return (
      <div 
        style={{ backgroundColor: item.bgColor }}
        className={`${className} relative group overflow-hidden rounded-md text-white p-6 flex flex-col justify-between`}
      >
        <div className="z-10 relative">
          <h3 className={`${titleClass} font-bold leading-tight mb-4`} dangerouslySetInnerHTML={{ __html: item.title }}></h3>
          <button 
            onClick={() => navigate(`/collection?category=${item.category}`)}
            className="text-sm font-medium underline underline-offset-4 hover:text-gray-300 transition"
          >
            Shop now
          </button>
        </div>
        <img 
          src={item.image} 
          className={`absolute bottom-0 right-0 ${imgClass} object-contain transition duration-500 group-hover:scale-105 z-0`} 
        />
      </div>
    );
  };

  return (
    <div className="w-full my-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[480px]">
        {/* Pos 1: Large Left */}
        <Box pos={1} className="lg:col-span-2 h-[400px] lg:h-full" titleClass="text-4xl lg:text-5xl" imgClass="w-4/5 h-4/5 translate-x-8 translate-y-4" />

        {/* Middle Column */}
        <div className="lg:col-span-1 flex flex-col gap-4 h-full">
          {/* Pos 2: Cooking */}
          <Box pos={2} className="flex-1 min-h-[160px]" imgClass="w-40 translate-x-4 translate-y-4" />
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* Pos 3 & 4 */}
            <Box pos={3} className="min-h-[140px]" titleClass="text-lg" imgClass="w-24 translate-x-4" />
            <Box pos={4} className="min-h-[140px]" titleClass="text-lg" imgClass="w-24 translate-x-4" />
          </div>
        </div>

        {/* Pos 5: Right Column */}
        <Box pos={5} className="lg:col-span-1 h-[300px] lg:h-full" titleClass="text-3xl" imgClass="w-64 translate-x-6" />
      </div>
    </div>
  );
};

export default PromoBentoGrid;