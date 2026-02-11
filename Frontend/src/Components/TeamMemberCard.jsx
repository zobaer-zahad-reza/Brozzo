import React from 'react';

const TeamMemberCard = ({ name, role, image }) => {
  return (
    <div className="text-center group p-4 hover:bg-gray-50 rounded-3xl transition-all duration-300">
      {/* Image Container */}
      <div className="h-72 w-full bg-gray-100 rounded-2xl mb-5 overflow-hidden relative shadow-sm border border-gray-100">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Info Section */}
      <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#FEA24C] transition-colors duration-300 uppercase tracking-tight">
        {name}
      </h4>
      <p className="text-[#FEA24C] text-sm font-semibold uppercase tracking-widest mt-1 italic">
        {role}
      </p>
      
      {/* Visual Accent */}
      <div className="w-10 h-0.5 bg-gray-200 mx-auto mt-4 group-hover:w-20 group-hover:bg-[#FEA24C] transition-all duration-500"></div>
    </div>
  );
};

export default TeamMemberCard;