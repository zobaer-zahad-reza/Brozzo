import React from "react";

export default function LocationMap() {
  return (
    <div className="bg-white font-sans py-12 md:py-16 w-[98%] mx-auto rounded-lg">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-medium text-[#6B7280] tracking-wider uppercase">
            Head Office
          </h2>

          <p className="text-[#FEA14A] font-semibold mt-1 text-sm">
            Jamaica, NY
          </p>
        </div>

        <div className="w-full md:h-[600px] overflow-hidden rounded-lg shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9631514950233!2d-73.76503542397391!3d40.718827671392695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2619e86ad2309%3A0x74fc7476eeb01e8c!2sVivid%20Valley!5e0!3m2!1sen!2sbd!4v1766602182575!5m2!1sen!2sbd"
            className="w-full h-80 md:h-96 lg:h-[700px]"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Head Office Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

