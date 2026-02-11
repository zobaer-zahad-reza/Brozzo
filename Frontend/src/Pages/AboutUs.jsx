import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaHistory,
  FaHandshake,
  FaPaperPlane,
  FaGlobe,
  FaTruck,
  FaHeadset,
  FaTshirt,
  FaHome,
} from "react-icons/fa";
import { FaLocationDot, FaAt, FaMobile } from "react-icons/fa6";
import { FaGem, FaRocket, FaChartBar } from "react-icons/fa";
import CountUp from "react-countup";
import { fadeIn } from "../variants";
import { AnimatedOnScroll } from "../Components/AnimatedOnScroll";
import { GiVacuumCleaner } from "react-icons/gi";

const AboutUs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("history");

  // CSS for Gradient Animation
  const styles = `
    @keyframes gradient-x {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-text-gradient {
      background-size: 200% auto;
      animation: gradient-x 2s ease infinite;
    }
  `;

  const companyInfo = {
    name: "Vivid Valley",
    tagline: t("tagline"),
    established: "2020",
    description: t("description"),
    contact: {
      email: "info@vividvalley.net",
      phone: "+1(347) 632-6743",
      address: "88-26 201st St, Jamaica, NY 11423, UK",
    },
  };

  const branches = [
    {
      name: t("branch_usa"),
      location: "88-26 201st St, Jamaica, NY 11423",
      phone: "+1(347) 632-6743",
      email: "info@vividvalley.net",
      country: "USA",
    },
    {
      name: t("branch_italy"),
      location: "VIA ALBERTO EINSTEIN, 2. BOLOGNA, ITALY 40133",
      phone: "+39 3272233659",
      email: "npuitaly@vividvalley.net",
      country: "Italy",
    },
    {
      name: t("branch_bd"),
      location: "Din Nath Sen Road, Gendaria Dhaka-1204",
      phone: "+880 1624-059596",
      email: "rozybd@vividvalley.net",
      country: "Bangladesh",
    },
  ];

  const tabContent = {
    history: {
      title: t("our_story_title"),
      icon: <FaHistory className="text-2xl" />,
      content: t("our_story_content"),
    },
    experience: {
      title: t("global_reach_title"),
      icon: <FaGlobe className="text-2xl" />,
      content: t("global_reach_content"),
    },
    service: {
      title: t("customer_promise_title"),
      icon: <FaHandshake className="text-2xl" />,
      content: t("customer_promise_content"),
    },
  };

  const features = [
    { name: "Premium Products", icon: <FaGem /> },
    { name: "Fashion & Lifestyle", icon: <FaTshirt /> },
    { name: "Home & Living", icon: <FaHome /> },
    { name: "Health & Household", icon: <GiVacuumCleaner /> },
    { name: "24/7 Support", icon: <FaHeadset /> },
    { name: "Global Shipping", icon: <FaTruck /> },
  ];

  const strategyItems = [
    {
      title: t("strat_quality"),
      icon: <FaGem className="text-4xl text-[#FEA24D]" />,
      description: t("strat_quality_desc"),
    },
    {
      title: t("strat_mission"),
      icon: <FaPaperPlane className="text-4xl text-[#FEA24D]" />,
      description: t("strat_mission_desc"),
    },
    {
      title: t("strat_innovation"),
      icon: <FaRocket className="text-4xl text-[#FEA24D]" />,
      description: t("strat_innovation_desc"),
    },
    {
      title: t("strat_growth"),
      icon: <FaChartBar className="text-4xl text-[#FEA24D]" />,
      description: t("strat_growth_desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans">
      {/* Inject Styles */}
      <style>{styles}</style>

      {/* Title Section */}
      <div className="flex justify-center text-4xl pt-16 border-gray-100 uppercase">
        <h1>
          <span className="text-[#6B7280]">{t("about_title")}</span>{" "}
        </h1>
        <span className="w-10 mt-5 ml-4 border-t-2 border-[#6B7280]"></span>
      </div>

      {/* Info & Stats Section */}
      <AnimatedOnScroll
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 px-4 max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row gap-12 items-stretch">
          {/* Who We Are */}
          <div className="md:w-1/2 flex">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full border-t-4 border-[#FEA24D] flex flex-col">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {t("who_we_are")}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg flex-grow">
                {companyInfo.description}
              </p>
              <div className="flex items-center mt-6 text-[#FEA24D] font-semibold">
                <FaMapMarkerAlt className="mr-2" />
                <span>{t("hq_location")}</span>
              </div>
            </div>
          </div>

          {/* Vivid Numbers */}
          <div className="md:w-1/2 flex">
            <div className="bg-white rounded-xl shadow-xl p-8 w-full border-t-4 border-[#FEA24D] flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                {t("vivid_numbers")}
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-[#FEA24D] mb-2">
                    <CountUp end={5} />+
                  </div>
                  <div className="text-gray-600 font-medium">
                    {t("years_service")}
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-[#FEA24D] mb-2">
                    <CountUp end={3} />
                  </div>
                  <div className="text-gray-600 font-medium">
                    {t("global_branches")}
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-[#FEA24D] mb-2">
                    <CountUp end={800} />+
                  </div>
                  <div className="text-gray-600 font-medium">{t("Users")}</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-[#FEA24D] mb-2">
                    <CountUp end={24} />/<CountUp end={7} />
                  </div>
                  <div className="text-gray-600 font-medium">
                    {t("support")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedOnScroll>

      {/* Get To Know Us */}
      <AnimatedOnScroll
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t("get_know_us")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t("know_desc")}</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="flex flex-wrap border-b border-gray-200">
              {Object.keys(tabContent).map((tab) => (
                <button
                  key={tab}
                  className={`flex-1 px-6 py-5 font-medium text-sm md:text-base flex items-center justify-center transition-all duration-300 ${
                    activeTab === tab
                      ? "text-[#FEA24D] border-b-2 border-[#FEA24D] bg-white shadow-sm"
                      : "text-gray-500 hover:text-orange-500 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span className="mr-2">{tabContent[tab].icon}</span>
                  {tabContent[tab].title}
                </button>
              ))}
            </div>
            <div className="p-10">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {tabContent[activeTab].title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {tabContent[activeTab].content}
              </p>
            </div>
          </div>
        </div>
      </AnimatedOnScroll>

      {/* Locations */}
      <AnimatedOnScroll
        variants={fadeIn("up", 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="py-20 px-4 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t("our_locations")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("locations_desc")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-gray-100 group"
            >
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-200 transition-colors">
                <FaBuilding className="text-[#FEA24D] text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {branch.name}
              </h3>
              <span className="text-sm font-semibold text-[#FEA24D] uppercase tracking-wider mb-4 block">
                {branch.country}
              </span>
              <p className="text-gray-600 mb-4 min-h-[50px]">
                {branch.location}
              </p>

              <div className="space-y-2 text-sm text-gray-500 border-t pt-4 border-gray-100">
                <div className="flex items-center justify-center gap-2">
                  <FaMobile className="text-[#FEA24D]" />
                  <a
                    href={`tel:${branch.phone}`}
                    className="hover:text-[#FEA24D] transition-colors"
                  >
                    {branch.phone}
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <FaAt className="text-[#FEA24D]" />
                  <a
                    href={`mailto:${branch.email}`}
                    className="hover:text-[#FEA24D] transition-colors"
                  >
                    {branch.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedOnScroll>

      {/* Features Bar */}
      <div className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-amber-200 to-orange-400 bg-clip-text text-transparent animate-text-gradient">
              {t("what_we_offer")}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t("offer_desc")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-orange-400 mb-2 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-sm">{feature.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategy Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {t("strategy_title")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t("strategy_desc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {strategyItems.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 shadow-md border border-orange-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex justify-center mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Contact Info */}
          <div className="md:w-5/12 bg-[#FFA34E] text-white p-10 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-8">{t("get_in_touch")}</h3>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <FaLocationDot className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{t("main_office")}</h4>
                  <p className="text-orange-100 opacity-90 mt-1">
                    {companyInfo.contact.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <FaAt className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{t("email_us")}</h4>
                  <p className="text-orange-100 opacity-90 mt-1">
                    {companyInfo.contact.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white/20 p-3 rounded-full mr-4">
                  <FaMobile className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{t("call_us")}</h4>
                  <p className="text-orange-100 opacity-90 mt-1">
                    {companyInfo.contact.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="md:w-7/12 p-10 bg-white">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {t("send_msg")}
            </h3>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name Input */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("form_name")}
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA34E] focus:border-transparent transition-all"
                    placeholder="Your Name"
                  />
                </div>
                {/* Email Input */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("form_email")}
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA34E] focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number{" "}
                  <span className="text-gray-400 font-normal text-xs">
                    (Optional)
                  </span>
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA34E] focus:border-transparent transition-all"
                  placeholder="+1(347) XXXXXXX"
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t("form_msg")}
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA34E] focus:border-transparent transition-all"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-[#FFA34E] hover:cursor-pointer text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center shadow-lg transform active:scale-95"
              >
                <FaPaperPlane className="mr-2" />
                {t("btn_send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;