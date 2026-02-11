import React from 'react';

const OurTeamMessage = ({ 
    name, 
    title, 
    message, 
    image, 
    isReverse, 
    bgColour = "#ffffff"
}) => {
  return (
    <div 
      style={{ backgroundColor: bgColour }} 
      className="w-full py-16 px-6 transition-colors duration-300 overflow-hidden"
    >
      
      <div className={`max-w-7xl mx-auto flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-16`}>
        
        {/* Text Content */}
        <div className="w-full md:w-[55%] flex flex-col justify-center space-y-10">
          {/* Title Section */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1] tracking-tighter">
            {title}
          </h2>
          
          {/* Message Section */}
          <div className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed text-justify space-y-6">
            {Array.isArray(message) ? message.map((para, index) => (
              <p key={index} className="opacity-95">{para}</p>
            )) : <p className="opacity-95">{message}</p>}
          </div>

          {/* Name Section */}
          <div className="pt-4">
            <h3 className="text-3xl font-black text-black tracking-tight">{name}</h3>
            <div className="h-2 w-32 bg-[#FEA24C] mt-4 rounded-full"></div>
          </div>
        </div>

        {/* Image Section */}
        <div className={`w-full md:w-[45%] flex ${isReverse ? 'justify-center md:justify-start' : 'justify-center md:justify-end'}`}>
          <div className="relative p-2 md:p-4 rounded-[3.5rem] overflow-visible">
            <div className="relative overflow-hidden w-full max-w-md rounded-[3rem] aspect-[3/4] md:h-[600px]">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform hover:scale-110 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurTeamMessage;