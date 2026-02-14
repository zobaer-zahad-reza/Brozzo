import React from "react";

export default function LocationMap() {
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14619.544838634563!2d90.46115985!3d23.644214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b0df05e0f7e1%3A0x69687b1c34a269c3!2sPagla%2C%20Fatullah!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd";

  return (
    <div className="bg-black font-sans py-12 md:py-16 w-full mx-auto">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wider uppercase">
            Visit Our <span className="text-[#FF4955]">Office</span>
          </h2>
          <div className="w-16 h-1 bg-[#FF4955] mx-auto mt-4 rounded-full"></div>
          <p className="text-zinc-500 font-medium mt-4 text-sm md:text-lg">
            Pagla, Fatullah, Narayanganj 1421, Bangladesh
          </p>
        </div>

        {/* Map Container */}
        <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl relative group">
          <iframe
            src={mapUrl}
            className="w-full h-full "
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Brozzo Shop Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
