import React, { useState } from "react";
import assets from "../assets/logo.png";
import Swal from "sweetalert2";
import LocationMap from "../Components/LocationMap";

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
      text: "Please wait.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      confirmButtonColor: "#FF751F",
    });
  };

  return (
    <div>
      <div className="flex justify-center text-4xl pt-10 border-gray-100 uppercase">
        <h1>
          <span className="text-[#6B7280]">Contact</span>{" "}
          <span className="text-[#6B7280]">Us</span>
        </h1>
        <span className="w-10 mt-5 ml-4  border-t-2 border-[#6B7280]"></span>
      </div>

      <div className="bg-white font-sans text-gray-800 py-12 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-gray-500  max-w-2xl mx-auto">
              We'd love to hear from you. Whether you have a question about{" "}
              <span className="font-semibold text-[#FEA14A]">Vivid Valley</span>{" "}
              products, pricing, or anything else, our team is ready to answer
              all your questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Contact Form Section */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-semibold mb-6 text-[#6B7280]">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FEA14A] focus:border-transparent outline-none transition"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FEA14A] focus:border-transparent outline-none transition"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#FEA14A] focus:border-transparent outline-none transition"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-[#FEA14A] text-white font-bold py-3 px-8 rounded-md hover:bg-[#FEA14A] transition-all duration-300 ease-in-out uppercase text-sm tracking-wider shadow-md hover:shadow-lg hover:cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-center items-start gap-10">
              <div className="w-full relative group">
                <img
                  className="w-full rounded-lg shadow-md object-cover h-64 transition-transform duration-300 group-hover:scale-[1.01]"
                  src={assets}
                  alt="Vivid Valley Storefront"
                />
                <div className="absolute inset-0 bg-black/5 rounded-lg pointer-events-none"></div>
              </div>

              <div className="flex flex-col justify-center items-start gap-3">
                <h3 className="font-semibold text-xl text-[#6B7280] border-l-4 border-[#FEA14A] pl-3">
                  Head Office
                </h3>
                <p className="text-gray-600 leading-relaxed pl-4">
                  88-26 201st St, Jamaica, NY 11423
                  <br />
                  USA
                </p>
                <div className="text-gray-600 leading-relaxed pl-4 ">
                  <p>
                    <span className="font-medium text-gray-900">Tel:</span>{" "}
                    <a
                      href="tel:+8801608068403"
                      className="hover:text-[#FEA14A] hover:underline transition-all"
                    >
                      +1347 632-6743
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Email:</span>{" "}
                    <a
                      href="mailto:support@vividvalley.com"
                      className="hover:text-[#FEA14A] hover:underline transition-all"
                    >
                      info@vividvalley.net
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center items-start gap-4 border-t border-gray-200 pt-8 w-full">
                <h3 className="font-semibold text-xl text-[#6B7280] border-l-4 border-[#FEA14A] pl-3">
                  Careers At Vivid Valley
                </h3>
                <p className="text-gray-600 pl-4">
                  Interested in joining our innovative team? Learn more about
                  our company culture and open positions.
                </p>
                <button className="ml-4 mt-2 border border-gray-300 px-6 py-2 text-sm font-medium bg-[#FEA14A] text-white hover:bg-[#FEA14A] hover:text-white transition-all duration-300 hover:cursor-pointer rounded-md">
                  Explore Jobs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="w-full">
          <LocationMap />
        </div>
      </div>
    </div>
  );
};

export default Contact;
