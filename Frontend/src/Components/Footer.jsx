import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import Logo from '../assets/logo.png'; 
import { BsTiktok } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 border-t border-zinc-900 mt-20 font-sans">
      


      {/* Footer Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <img src={Logo} alt="Brozzo Logo" className="w-32 mb-2 object-contain" />
            <p className="text-sm leading-relaxed text-gray-500">
              Brozzo is your ultimate destination for premium fashion and lifestyle accessories. We define style with elegance and quality.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="https://www.facebook.com/brozzo.bd?rdid=wfXu23nMoiwSI6m7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16d6LGkDpM%2F#"
              target='_blank'
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#FF4955] hover:text-white transition-all duration-300 group">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/brozzo.bd?igsh=Y3JkcG02OWp4Y3M4" 
              target='_blank'
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#FF4955] hover:text-white transition-all duration-300 group">
                <Instagram size={18} />
              </a>
              <a href="https://www.tiktok.com/@brozzo.bd?_r=1&_t=ZS-93l2ayVD1CK"
              target='_blank'
              className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-[#FF4955] hover:text-white transition-all duration-300 group">
                <BsTiktok size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link to="/" className="hover:text-[#FF4955] transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FF4955]" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-[#FF4955] transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FF4955]" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/collection" className="hover:text-[#FF4955] transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FF4955]" />
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF4955] transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FF4955]" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Policies</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-[#FF4955] transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FF4955]" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-[#FF4955] transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FF4955]" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-[#FF4955] transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FF4955]" />
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-[#FF4955] transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#FF4955]" />
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider">Get In Touch</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#FF4955] mt-1 shrink-0" size={18} />
                <p>123 Premium Street, Fashion City, Dhaka, Bangladesh</p>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#FF4955] shrink-0" size={18} />
                <p>+880 1234 567 890</p>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#FF4955] shrink-0" size={18} />
                <p>support@brozzo.com</p>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-[#0a0a0a] border-t border-zinc-900 py-6">
        <div className="text-center mx-auto px-4   text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} <Link to={"https://startedge.net/"} target='_blank' className='text-[#FF4955]' >Startedge</Link>. All rights reserved.</p>
          
        </div>
      </div>

    </footer>
  );
};

export default Footer;