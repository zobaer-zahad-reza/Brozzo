import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react'; // আইকন ব্যবহারের জন্য লুব্রেরি

const FooterInfo = ({ officeName, isHeadOffice, address, phone, email }) => {
    return (
        <div className="flex flex-col items-center text-center px-4 py-8 md:py-0 border-gray-700 last:border-0 md:border-r">
            {/* Office Title */}
            <h4 className="text-[#FEA24C] text-lg font-bold uppercase tracking-widest mb-1">
                {officeName || "Office Name"}
            </h4>
            
            {/* Head Office Badge */}
            {isHeadOffice && (
                <span className="bg-[#242b3d] text-[#717b91] text-[10px] font-bold px-3 py-0.5 rounded mb-6 tracking-tighter uppercase border border-gray-700">
                    Head Office
                </span>
            )}

            {/* Address Section */}
            <div className="flex flex-col items-center gap-3 mt-4">
                <div className="bg-[#242b3d] p-2 rounded-full">
                    <MapPin size={16} className="text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm max-w-[200px] leading-relaxed">
                    {address || "Office Address line goes here"}
                </p>
            </div>

            {/* Phone Section */}
            <div className="flex flex-col items-center gap-3 mt-8">
                <div className="bg-[#242b3d] p-2 rounded-full">
                    <Phone size={16} className="text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm font-medium tracking-tight">
                    {phone || "+000 0000-000000"}
                </p>
            </div>

            {/* Email Section */}
            <div className="flex flex-col items-center gap-3 mt-8">
                <div className="bg-[#242b3d] p-2 rounded-full">
                    <Mail size={16} className="text-gray-400" />
                </div>
                <a 
                    href={`mailto:${email}`} 
                    className="text-gray-400 text-sm hover:text-[#FEA24C] transition-colors duration-300 underline-offset-4 decoration-[#FEA24C]/30"
                >
                    {email || "info@vividvalley.net"}
                </a>
            </div>
        </div>
    );
};

export default FooterInfo;