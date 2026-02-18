import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { ShopContext } from "../Context/ShopContext";

const PromoBentoGrid = () => {
  const navigate = useNavigate();

  // --- STATIC DATA UPDATED WITH MATCHING IMAGES ---
  const staticGridData = {
    1: {
      title: "Mens <br/> Collection",
      image:
        "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop",
      category: "Men Cloths",
      bgColor: "#18181b",
      textColor: "text-white",
    },
    2: {
      title: "Luxury <br/> Timepiece",
      image:
        "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop",
      category: "Watch",
      bgColor: "#27272a",
      textColor: "text-gray-100",
    },
    3: {
      title: "Audio <br/> Gear",
      image:
        "https://i.pinimg.com/1200x/96/26/9f/96269fd0bf319760dac98ecda5b6de06.jpg",
      category: "Tech Accesoric",
      bgColor: "#18181b",
      textColor: "text-gray-200",
    },
    4: {
      title: "Sun <br/> Glasses",
      image:
        "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1000&auto=format&fit=crop",
      category: "Sun Glasses",
      bgColor: "#27272a",
      textColor: "text-gray-200",
    },
    5: {
      title: "Mens <br/> Accessories",
      image:
        "https://i.pinimg.com/736x/fd/c3/77/fdc3779f15afc03322967e51c6f91098.jpg",
      category: "Men Accessories",
      bgColor: "#18181b",
      textColor: "text-white",
    },
  };

  // Use static data
  const gridData = staticGridData;

  const Box = ({ pos, className, titleClass = "text-2xl" }) => {
    const item = gridData[pos];

    if (!item)
      return (
        <div
          className={`${className} bg-zinc-800 animate-pulse rounded-md`}
        ></div>
      );

    return (
      <div
        style={{ backgroundColor: item.bgColor }}
        className={`${className} relative group overflow-hidden rounded-md text-white p-6 flex flex-col justify-between border border-zinc-800 shadow-lg hover:border-[#FF4955]/40 transition-all duration-500`}
      >
        {/* Content Layer */}
        <div className="z-20 relative h-full flex flex-col justify-between items-start">
          <h3
            className={`${titleClass} font-bold leading-tight mb-2 ${item.textColor} drop-shadow-md`}
            dangerouslySetInnerHTML={{ __html: item.title }}
          ></h3>

          <button
            onClick={() => navigate(`/collection?category=${item.category}`)}
            className="text-sm font-medium flex items-center gap-1 hover:text-[#FF4955] transition-colors duration-300"
          >
            <span className="underline underline-offset-4 decoration-[#FF4955]">
              Shop Now
            </span>
          </button>
        </div>

        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>

        {/* Background Image */}
        <img
          src={item.image}
          alt={item.title.replace("<br/>", " ")}
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-60 transition duration-700 ease-in-out group-hover:scale-110 z-0"
        />
      </div>
    );
  };

  return (
    <div className="w-full my-6 px-4 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[520px]">
        {/* Large Left - MENS COLLECTION */}
        <Box
          pos={1}
          className="lg:col-span-2 h-[350px] lg:h-full"
          titleClass="text-4xl lg:text-6xl uppercase tracking-tighter"
        />

        {/* Middle Column */}
        <div className="lg:col-span-1 flex flex-col gap-4 h-full">
          {/* Middle Top (WATCH) */}
          <Box
            pos={2}
            className="flex-1 min-h-[200px]"
            titleClass="text-2xl uppercase tracking-wide"
          />

          <div className="flex-1 grid grid-cols-2 gap-4">
            {/* AUDIO */}
            <Box
              pos={3}
              className="min-h-[160px]"
              titleClass="text-lg font-bold uppercase"
            />
            {/* SUNGLASSES */}
            <Box
              pos={4}
              className="min-h-[160px]"
              titleClass="text-lg font-bold uppercase"
            />
          </div>
        </div>

        {/* Right Column (ACCESSORIES) */}
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
