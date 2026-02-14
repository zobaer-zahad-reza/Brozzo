import React, { useState } from "react";
import assets from "../assets/logo.png"; // Brozzo Logo
import Swal from "sweetalert2";
import LocationMap from "../Components/LocationMap";
import { Phone, Mail, MapPin, Briefcase } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Sending your message...",
      text: "Please wait while we connect with Brozzo support.",
      allowOutsideClick: false,
      background: "#18181b",
      color: "#fff",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // এখানে আপনার API কল করতে পারেন
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting Brozzo. We will get back to you soon.",
        confirmButtonColor: "#FF4955",
        background: "#18181b",
        color: "#fff",
      });
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Page Title */}
      <div className="flex flex-col items-center justify-center pt-16 pb-10 uppercase tracking-widest">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="text-gray-500">Contact</span>{" "}
          <span className="text-white">Us</span>
        </h1>
        <div className="w-20 h-1 bg-[#FF4955] mt-4"></div>
      </div>

      <div className="font-sans py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-16">
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Have a question about{" "}
              <span className="text-[#FF4955] font-semibold">Brozzo</span>{" "}
              products or an order? Our team is dedicated to providing you with
              the best fashion experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Contact Form Section */}
            <div className="bg-[#111113] p-8 rounded-2xl border border-zinc-800 shadow-2xl">
              <h2 className="text-2xl font-bold mb-8 text-white flex items-center gap-2">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl focus:ring-2 focus:ring-[#FF4955] focus:border-transparent outline-none transition text-white placeholder-zinc-600"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl focus:ring-2 focus:ring-[#FF4955] focus:border-transparent outline-none transition text-white placeholder-zinc-600"
                    placeholder="example@mail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-zinc-900 border border-zinc-800 p-3 rounded-xl focus:ring-2 focus:ring-[#FF4955] focus:border-transparent outline-none transition text-white placeholder-zinc-600 resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#FF4955] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#e63e49] transition-all duration-300 uppercase text-sm tracking-[2px] shadow-lg active:scale-95"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Info Section */}
            <div className="flex flex-col gap-10">
              {/* Image with Logo */}
              <div className="relative group overflow-hidden rounded-2xl border border-zinc-800 shadow-xl bg-zinc-900 flex items-center justify-center h-64">
                <img
                  className="w-48 object-contain transition-transform duration-500 group-hover:scale-110"
                  src={assets}
                  alt="Brozzo Logo"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Office Details */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white border-l-4 border-[#FF4955] pl-4">
                  Get in Touch
                </h3>

                <div className="space-y-4 pl-5">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[#FF4955] shrink-0" size={22} />
                    <p className="text-gray-400">
                      Pagla, Fatullah, Narayanganj 1421, Bangladesh
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="text-[#FF4955] shrink-0" size={22} />
                    <a
                      href="tel:+8801737912273"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      +880 1737 912 273
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="text-[#FF4955] shrink-0" size={22} />
                    <a
                      href="mailto:brozzo.bd71@gmail.com"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      brozzo.bd71@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Location Map Section */}
        <div className="w-full mt-10 grayscale-[1] contrast-[1.2] hover:grayscale-0 transition-all duration-700">
          <LocationMap />
        </div>
      </div>
    </div>
  );
};

export default Contact;
