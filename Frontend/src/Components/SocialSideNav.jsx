import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaCommentDots,
} from "react-icons/fa6";

// --- Data Array ---
const socialLinks = [
  {
    name: "X",
    href: "https://twitter.com/",
    icon: FaXTwitter,
    bgColor: "bg-gradient-to-br from-[#000000] to-[#14171a]",
    hoverBgColor: "hover:bg-gradient-to-br hover:from-[#333333] hover:to-[#000000]",
    shadow: "hover:shadow-[0_0_15px_rgba(0,0,0,0.7)]",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: FaLinkedinIn,
    bgColor: "bg-gradient-to-br from-[#0077b5] to-[#005582]",
    hoverBgColor: "hover:bg-gradient-to-br hover:from-[#00a0dc] hover:to-[#0077b5]",
    shadow: "hover:shadow-[0_0_15px_rgba(0,119,181,0.7)]",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com",
    icon: FaFacebookF,
    bgColor: "bg-gradient-to-br from-[#4267b2] to-[#3b5998]",
    hoverBgColor:
      "hover:bg-gradient-to-br hover:from-[#5b8fd9] hover:to-[#4267b2]",
    shadow: "hover:shadow-[0_0_15px_rgba(66,103,178,0.7)]",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com",
    icon: FaInstagram,
    bgColor:
      "bg-gradient-to-br from-[#833AB4] via-[#C13584] via-[#E1306C] via-[#FD1D1D] via-[#F56040] via-[#F77737] via-[#FCAF45] to-[#FFDC80]",
    hoverBgColor:
      "hover:bg-gradient-to-br hover:from-[#C13584] hover:via-[#E1306C] hover:via-[#FD1D1D] hover:to-[#F56040]",
    shadow: "hover:shadow-[0_0_15px_rgba(193,53,132,0.7)]",
  },
];

const SocialSideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const toggleBubble = () => {
    setIsOpen(!isOpen);
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-16 right-6 z-999">
        {/* Main Chat Bubble Button */}
        <button
          onClick={toggleBubble}
          className="relative w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center 
                      shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
        >
          {isOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaCommentDots className="text-2xl" />
          )}
        </button>

        <div
          className={`absolute bottom-full right-0 mb-4 flex flex-col items-end space-y-3 transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible translate-y-4"
          }`}
        >
          {socialLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                relative w-12 h-12 rounded-full text-white flex items-center justify-center 
                shadow-md transition-all duration-300 ease-in-out transform
                ${link.bgColor} ${link.hoverBgColor} ${link.shadow}
                ${isOpen ? "scale-100" : "scale-0"}
                `}
              style={{ transitionDelay: isOpen ? `${index * 0.05}s` : "0s" }}
            >
              <link.icon className="text-xl z-2" />
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <nav className="fixed top-1/2 right-0 -translate-y-1/2 z-999">
      <ul className="list-none m-0 p-0">
        {socialLinks.map((link) => (
          <li
            key={link.name}
            className="h-[50px] w-[50px] relative mb-px group"
          >
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                text-white flex items-center justify-end h-full w-[50px] pr-[15px]
                no-underline overflow-hidden absolute right-0 rounded-l-[10px]
                transition-all duration-300 ease-in-out
                
                group-hover:w-[120px] 
                
                after:content-[''] after:absolute after:top-0 after:left-0
                after:w-full after:h-full after:bg-white/20
                after:translate-x-full after:transition-transform after:duration-300 after:ease-in-out after:z-1
                
                group-hover:after:translate-x-0
                
                ${link.bgColor} ${link.hoverBgColor} ${link.shadow}
              `}
            >
              <span
                className="
                  opacity-0 invisible text-[12px] flex justify-center items-center
                  font-bold w-full absolute left-0 top-0 h-full
                  whitespace-nowrap transition-all duration-300 ease-in-out
                  pr-10 box-border 
                  group-hover:opacity-100 group-hover:visible
                "
              >
                {link.name}
              </span>
              <link.icon className="text-[18px] absolute right-[15px] z-2" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SocialSideNav;