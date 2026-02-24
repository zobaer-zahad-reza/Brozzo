import React, { useState } from "react";
import {
  FaHistory,
  FaHandshake,
  FaGem,
  FaRocket,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import CountUp from "react-countup";
import { fadeIn } from "../variants";
import { AnimatedOnScroll } from "../Components/AnimatedOnScroll";
import LocationMap from "../Components/LocationMap";

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState("history");

  const tabContent = {
    history: {
      title: "Our Story",
      icon: <FaHistory />,
      content:
        "Brozzo started with a vision to redefine premium fashion. From a small boutique idea, we have grown into a brand that stands for elegance and superior quality, serving style enthusiasts across the globe.",
    },
    mission: {
      title: "Our Mission",
      icon: <FaRocket />,
      content:
        "Our mission is to provide premium fashion and lifestyle accessories that empower individuals to express their unique identity with confidence and class.",
    },
    promise: {
      title: "Our Promise",
      icon: <FaShieldAlt />,
      content:
        "We promise 100% authenticity and excellence. Every product in our collection undergoes rigorous quality checks to ensure you receive nothing but the best.",
    },
  };

  const stats = [
    { label: "Years of Style", value: 5, suffix: "+" },
    { label: "Happy Clients", value: 1000, suffix: "+" },
    { label: "Premium Products", value: 300, suffix: "+" },
  ];

  const whyChooseUs = [
    {
      title: "Premium Selection",
      icon: <FaGem />,
      desc: "Hand-picked luxury items that meet international standards and durability.",
    },
    {
      title: "Authenticity",
      icon: <FaCheckCircle />,
      desc: "We ensure every product is 100% original and directly sourced from top brands.",
    },
    {
      title: "Customer Centric",
      icon: <FaHandshake />,
      desc: "24/7 dedicated support to ensure a seamless and personalized shopping journey.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans overflow-hidden">
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center pt-24 pb-12 uppercase tracking-[6px]">
        <h1 className="text-4xl md:text-6xl font-black text-white">
          About <span className="text-[#FF4955]">Brozzo</span>
        </h1>
        <div className="w-24 h-1 bg-[#FF4955] mt-6 rounded-full shadow-[0_0_15px_rgba(255,73,85,0.5)]"></div>
      </div>

      {/* Brand Essence Section */}
      <AnimatedOnScroll
        variants={fadeIn("up", 0.2)}
        className="py-16 px-4 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Defining Style with <br />
              <span className="text-[#FF4955]">Elegance & Quality.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed font-light">
              Brozzo is your ultimate destination for premium fashion and
              lifestyle accessories. We believe that fashion is more than just
              clothing—it's a statement of who you are. Our curated collections
              are designed to bring out the best in you.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl text-center hover:border-[#FF4955]/40 transition-all duration-500 backdrop-blur-sm"
              >
                <div className="text-4xl font-black text-white mb-2">
                  <CountUp end={stat.value} duration={3} />
                  {stat.suffix}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedOnScroll>

      {/* Tabs Section - Interactive Story */}
      <div className="py-24 bg-[#080808]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex bg-zinc-900/80 rounded-2xl p-2 mb-12 overflow-x-auto scrollbar-hide border border-zinc-800">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#FF4955] text-white shadow-[0_10px_20px_rgba(255,73,85,0.2)]"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                <span className="text-lg">{tabContent[tab].icon}</span>{" "}
                {tabContent[tab].title}
              </button>
            ))}
          </div>

          <div className="bg-zinc-900/20 border border-zinc-800/50 p-12 rounded-[40px] text-center min-h-[300px] flex flex-col justify-center items-center transform transition-all">
            <div className="text-[#FF4955] text-5xl mb-8 animate-pulse">
              {tabContent[activeTab].icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">
              {tabContent[activeTab].title}
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl italic font-light">
              "{tabContent[activeTab].content}"
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-24 px-4 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-black text-white mb-16 uppercase tracking-[4px]">
          Why Choose <span className="text-[#FF4955]">Us?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {whyChooseUs.map((item, i) => (
            <div
              key={i}
              className="group p-10 bg-[#0c0c0e] border border-zinc-800/50 rounded-[32px] hover:border-[#FF4955]/30 transition-all duration-700 hover:-translate-y-2"
            >
              <div className="text-5xl text-[#FF4955] mb-8 flex justify-center group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-widest">
                {item.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Location Section Container */}
        <div className="mt-20  pt-20">
          <div className="rounded-[40px] overflow-hidden border border-zinc-800 shadow-2xl">
            <LocationMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
