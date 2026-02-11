import React from "react";
import { Link } from "react-router-dom";
import {
  FaDatabase,
  FaTools,
  FaShareAlt,
  FaShieldAlt,
  FaCookieBite,
  FaUserShield,
  FaChild,
  FaSyncAlt,
  FaTicketAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowLeft,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PrivacyNotice = () => {
  const policies = [
    {
      id: 1,
      title: "Information We Collect",
      desc: "When you visit or make a purchase from Vivid Valley, we may collect personal information including your name, phone number, email, billing/shipping address, and payment information necessary to process your order. We may also collect browsing data like IP address and cookies to improve your experience.",
      icon: <FaDatabase />,
    },
    {
      id: 2,
      title: "How We Use Your Information",
      desc: "We use your information to process and deliver orders, provide customer service, communicate updates and promotions, and improve website security and performance.",
      icon: <FaTools />,
    },
    {
      id: 3,
      title: "Sharing of Information",
      desc: "We do not sell your personal information. We may share it with trusted service providers for delivery, payment processing, or IT support, and with legal authorities if required.",
      icon: <FaShareAlt />,
    },
    {
      id: 4,
      title: "Data Security",
      desc: "We use SSL encryption, firewalls, and other technologies to protect your information. No online transmission is completely secure, but we prioritize keeping your data safe.",
      icon: <FaShieldAlt />,
    },
    {
      id: 5,
      title: "Cookies",
      desc: "Cookies enhance your shopping experience. You may disable them in your browser, but some site features may not function properly.",
      icon: <FaCookieBite />,
    },
    {
      id: 6,
      title: "Your Rights",
      desc: "You can access, update, or request deletion of your personal data and opt-out of marketing communications anytime.",
      icon: <FaUserShield />,
    },
    {
      id: 7,
      title: "Children's Privacy",
      desc: "Vivid Valley does not knowingly collect information from children under 13. Contact us if you believe a child has shared data.",
      icon: <FaChild />,
    },
    {
      id: 8,
      title: "Updates to Privacy Policy",
      desc: "We may update this policy periodically. Any changes will be posted here with the updated effective date.",
      icon: <FaSyncAlt />,
    },
    {
      id: 9,
      title: "Future Discounts",
      desc: "In the future, if we offer discounts or special promotions, we will notify you accordingly via email or website notifications.",
      icon: <FaTicketAlt />,
    },
  ];

  return (
    <div className="bg-gray-50 py-40 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Privacy & Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Last Updated: November 30, 2025
          </p>
        </div>

        {/* Policy Cards */}
        <div className="space-y-6">
          {policies.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-5 items-start transition-transform hover:-translate-y-1 duration-300"
            >
              {/* Icon Box */}
              <div className="shrink-0 w-12 h-12 bg-orange-100 text-[#FF7F27] rounded-full flex items-center justify-center text-xl">
                {item.icon}
              </div>
              {/* Text Content */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {item.id}. {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Us Section (Bottom Card) */}
        <div className="mt-10 bg-white p-10 rounded-lg shadow-sm border border-gray-100 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-8">
            10. Contact Us
          </h3>
          <p className="text-gray-500 text-sm mb-8 max-w-lg mx-auto">
            If you have questions about this policy or your data, please contact
            us using the information below:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 text-[#FF7F27] bg-orange-50 rounded-full flex items-center justify-center mb-3 text-lg">
                <FaPhoneAlt />
              </div>
              <p className="text-sm text-gray-700 font-semibold">
                +1(347) 632-6743
              </p>
              <p className="text-xs text-gray-500">USA Office</p>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 text-[#FF7F27] bg-orange-50 rounded-full flex items-center justify-center mb-3 text-lg">
                <FaLocationDot />
              </div>
              <p className="text-sm text-gray-700 font-semibold text-center">
                1 88-26 201st St
              </p>
              <p className="text-xs text-gray-500">Jamaica, NY 11423</p>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 text-[#FF7F27] bg-orange-50 rounded-full flex items-center justify-center mb-3 text-lg">
                <FaEnvelope />
              </div>
              <p className="text-sm text-gray-700 font-semibold">
                info@vividvalley.net
              </p>
              <p className="text-xs text-gray-500">Official Email</p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#FF7F27] text-white px-8 py-3 rounded-md font-semibold shadow-md hover:bg-[#e66e1e] transition-colors"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
