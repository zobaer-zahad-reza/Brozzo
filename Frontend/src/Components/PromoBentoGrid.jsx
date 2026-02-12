import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ShopContext } from "../Context/ShopContext";

const PromoBentoGrid = () => {
  // --- DYNAMIC LOGIC (Commented Out) ---
  /*
  const { backendUrl } = useContext(ShopContext);
  const [gridData, setGridData] = useState({});

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
  */

  const navigate = useNavigate();

  // --- STATIC DATA FOR BROZZO THEME ---
  const staticGridData = {
    1: {
      title: "Urban <br/> Collection",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop", 
      category: "Fashion",
      bgColor: "#18181b", 
      textColor: "text-white"
    },
    2: {
      title: "Luxury <br/> Timepiece",
      image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=1000&auto=format&fit=crop", 
      category: "Watch",
      bgColor: "#27272a", 
      textColor: "text-gray-100"
    },
    3: {
      title: "Audio <br/> Gear",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop", // Changed to a darker mood image
      category: "Tech Accesoric",
      bgColor: "#18181b", 
      textColor: "text-gray-200"
    },
    4: {
      title: "Sneaker <br/> Heads",
      image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1000&auto=format&fit=crop", 
      category: "Men Cloths",
      bgColor: "#27272a", 
      textColor: "text-gray-200"
    },
    5: {
      title: "Essential <br/> Grooming",
      image: "https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=1000&auto=format&fit=crop", 
      category: "Beauty & Personal Care",
      bgColor: "#18181b", 
      textColor: "text-white"
    }
  };

  // Use static data instead of state
  const gridData = staticGridData;

  const Box = ({ pos, className, titleClass = "text-2xl" }) => {
    const item = gridData[pos];
    
    if (!item) return <div className={`${className} bg-zinc-800 animate-pulse rounded-md`}></div>;

    return (
      <div 
        style={{ backgroundColor: item.bgColor }} 
        className={`${className} relative group overflow-hidden rounded-md text-white p-6 flex flex-col justify-between border border-zinc-800 shadow-lg hover:border-[#FF4955]/40 transition-all duration-500`}
      >
        {/* Content Layer (Z-Index High) */}
        <div className="z-20 relative h-full flex flex-col justify-between items-start">
          <h3 
            className={`${titleClass} font-bold leading-tight mb-2 ${item.textColor} drop-shadow-md`} 
            dangerouslySetInnerHTML={{ __html: item.title }}
          ></h3>
          
          <button 
            onClick={() => navigate(`/collection?category=${item.category}`)}
            className="text-sm font-medium flex items-center gap-1 hover:text-[#FF4955] transition-colors duration-300"
          >
            <span className="underline underline-offset-4 decoration-[#FF4955]">Shop Now</span>
          </button>
        </div>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 pointer-events-none"></div>

        {/* Background Image (Cover Style like Urban Collection) */}
        <img 
          src={item.image} 
          alt={item.title.replace("<br/>", " ")}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 mix-blend-overlay transition duration-700 ease-in-out group-hover:scale-105 z-0" 
        />
      </div>
    );
  };

  return (
    <div className="w-full my-6 px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[520px]">
        
        {/* Pos 1: Large Left - Featured Item */}
        <Box 
            pos={1} 
            className="lg:col-span-2 h-[350px] lg:h-full" 
            titleClass="text-4xl lg:text-6xl uppercase tracking-tighter" 
        />

        {/* Middle Column */}
        <div className="lg:col-span-1 flex flex-col gap-4 h-full">
          {/* Pos 2: Middle Top (WATCH) */}
          <Box 
            pos={2} 
            className="flex-1 min-h-[200px]" 
            titleClass="text-2xl uppercase tracking-wide"
          />
          
          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* Pos 3 (TECH) */}
            <Box 
                pos={3} 
                className="min-h-[160px]" 
                titleClass="text-lg font-bold uppercase" 
            />
            {/* Pos 4 (SHOES) */}
            <Box 
                pos={4} 
                className="min-h-[160px]" 
                titleClass="text-lg font-bold uppercase" 
            />
          </div>
        </div>

        {/* Pos 5: Right Column (GROOMING) */}
        <Box 
            pos={5} 
            className="lg:col-span-1 h-[300px] lg:h-full" 
            titleClass="text-3xl uppercase tracking-widest" 
        />
      </div>
    </div>
  );
};

export default PromoBentoGrid;