import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import Logo from "../assets/logo.png";
import { BsTiktok } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-zinc-900 mt-20 font-sans">
      {/* Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <img
              src={Logo}
              alt="Brozzo Logo"
              className="w-32 mb-2 object-contain"
            />
            <p className="text-sm leading-relaxed text-gray-500">
              Brozzo is your ultimate destination for premium fashion and
              lifestyle accessories. We define style with elegance and quality.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href="https://www.facebook.com/brozzo.bd?rdid=wfXu23nMoiwSI6m7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16d6LGkDpM%2F#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#FF4955] hover:text-white transition-all duration-300 group"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/brozzo.bd?igsh=Y3JkcG02OWp4Y3M4"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#FF4955] hover:text-white transition-all duration-300 group"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@brozzo.bd?_r=1&_t=ZS-93l2ayVD1CK"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#FF4955] hover:text-white transition-all duration-300 group"
              >
                <BsTiktok size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              {["Home", "Collection", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "-")}`
                    }
                    className="hover:text-[#FF4955] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FF4955]"
                    />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              Policies
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "Privacy Policy", link: "/privacy-policy" },
                { name: "Terms & Conditions", link: "/terms-conditions" },
              ].map((policy) => (
                <li key={policy.name}>
                  <Link
                    to={policy.link}
                    className="hover:text-[#FF4955] transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FF4955]"
                    />
                    {policy.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li className="flex items-start gap-3 group">
                <MapPin className="text-[#FF4955] mt-1 shrink-0" size={18} />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Pagla+Fatullah+Narayanganj+1421"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF4955] transition-colors"
                >
                  Pagla, Fatullah,
                  <br /> Narayanganj 1421
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="text-[#FF4955] shrink-0" size={18} />
                <a
                  href="tel:+8801737912273"
                  className="hover:text-[#FF4955] transition-colors"
                >
                  +880 1737 912 273
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="text-[#FF4955] shrink-0" size={18} />
                <a
                  href="mailto:brozzo.bd71@gmail.com"
                  className="hover:text-[#FF4955] transition-colors"
                >
                  brozzo.bd71@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#0a0a0a] border-t border-zinc-900 py-6">
        <div className="text-center mx-auto px-4 text-xs text-gray-600">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://startedge.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF4955] hover:underline"
            >
              Startedge
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
