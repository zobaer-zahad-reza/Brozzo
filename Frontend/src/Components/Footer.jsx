import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowUp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full font-sans bg-[#111827]">
      {/* Back to Top */}
      <div
        onClick={scrollToTop}
        className="bg-[#232f3e] hover:bg-[#37475a] text-white py-4 cursor-pointer transition-all duration-300 flex justify-center items-center gap-2 text-sm font-semibold group"
      >
        <span>Back to top</span>
        <FaArrowUp className="group-hover:-translate-y-1 transition-transform duration-300" />
      </div>

      {/* Main Footer */}
      <div className="text-gray-300 py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 text-center">

            {/* USA */}
            <div className="flex flex-col items-center space-y-6 md:border-r border-gray-700">
              <div className="space-y-1">
                <h3 className="text-[#FEA24D] font-bold text-xl uppercase tracking-widest">
                  USA Office
                </h3>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest bg-gray-800 px-2 py-0.5 rounded">
                  Head Office
                </span>
              </div>

              <div className="flex flex-col gap-5 items-center max-w-[260px]">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="p-2 rounded-full bg-gray-800 group-hover:bg-[#FEA24D] transition">
                    <FaMapMarkerAlt className="text-gray-400 group-hover:text-white text-sm" />
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-white transition">
                    88-26 201st St, Jamaica,<br /> NY 11423, USA
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <FaPhoneAlt className="text-gray-500 group-hover:text-[#FEA24D] text-sm transition" />
                  <p className="text-sm text-gray-400 group-hover:text-white transition">
                    +1(347) 632-6743
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <FaEnvelope className="text-gray-500 group-hover:text-[#FEA24D] text-sm transition" />
                  <p className="text-sm text-gray-400 group-hover:text-white transition">
                    info@vividvalley.net
                  </p>
                </div>
              </div>
            </div>

            {/* Italy */}
            <div className="flex flex-col items-center space-y-6 md:border-r border-gray-700">
              <h3 className="text-[#FEA24D] font-bold text-xl uppercase tracking-widest">
                Italy Office
              </h3>

              <div className="flex flex-col gap-5 items-center max-w-[260px]">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="p-2 rounded-full bg-gray-800 group-hover:bg-[#FEA24D] transition">
                    <FaMapMarkerAlt className="text-gray-400 group-hover:text-white text-sm" />
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-white transition">
                    VIA ALBERTO EINSTEIN, 2.<br /> BOLOGNA, ITALY 40133
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <FaPhoneAlt className="text-gray-500 group-hover:text-[#FEA24D] text-sm transition" />
                  <p className="text-sm text-gray-400 group-hover:text-white transition">
                    +39 3272233659
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <FaEnvelope className="text-gray-500 group-hover:text-[#FEA24D] text-sm transition" />
                  <p className="text-sm text-gray-400 group-hover:text-white transition">
                    npuitaly@vividvalley.net
                  </p>
                </div>
              </div>
            </div>

            {/* Bangladesh */}
            <div className="flex flex-col items-center space-y-6">
              <h3 className="text-[#FEA24D] font-bold text-xl uppercase tracking-widest">
                BD Office
              </h3>

              <div className="flex flex-col gap-5 items-center max-w-[260px]">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="p-2 rounded-full bg-gray-800 group-hover:bg-[#FEA24D] transition">
                    <FaMapMarkerAlt className="text-gray-400 group-hover:text-white text-sm" />
                  </div>
                  <p className="text-sm text-gray-400 group-hover:text-white transition">
                    Din Nath Sen Road, Gendaria<br /> Dhaka-1204, Bangladesh
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <FaPhoneAlt className="text-gray-500 group-hover:text-[#FEA24D] text-sm transition" />
                  <p className="text-sm text-gray-400 group-hover:text-white transition">
                    +880 1624-059596
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <FaEnvelope className="text-gray-500 group-hover:text-[#FEA24D] text-sm transition" />
                  <p className="text-sm text-gray-400 group-hover:text-white transition">
                    rozybd@vividvalley.net
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#0f1522] py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 flex flex-col items-center gap-8">

          {/* Social Icons */}
          <div className="flex gap-4">
            {[
              { icon: <FaFacebookF />, link: "https://facebook.com" },
              { icon: <FaInstagram />, link: "https://instagram.com" },
              { icon: <FaTiktok />, link: "https://tiktok.com" },
              { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-gray-400 hover:bg-[#FEA24D] hover:text-[#111827] transition shadow-sm"
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Nav */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-gray-400">
              {["Home", "Collection", "Blog", "Contact", "About Us", "Our Team"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                      className="hover:text-[#FEA24D] transition"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <hr className="w-full max-w-4xl border-gray-800" />

          <div className="text-center space-y-3">
            <div className="flex justify-center gap-6 text-[11px] text-gray-500 uppercase tracking-widest">
              <Link to="/privacy-notice" className="hover:text-[#FEA24D] transition">
                Privacy Notice
              </Link>
              <Link to="/conditions" className="hover:text-[#FEA24D] transition">
                Conditions of Use
              </Link>
            </div>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-bold text-gray-400">VIVID VALLEY</span> &{" "}
              <a
                className="hover:text-[#FEA24D] transition"
                target="_blank"
                rel="noreferrer"
                href="https://startedge.net/"
              >
                Startedge
              </a>
              . All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
