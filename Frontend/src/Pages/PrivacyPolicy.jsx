import React, { useEffect } from "react";
import {
  ShieldCheck,
  DatabaseZap,
  Cog,
  Share2,
  Cookie,
  UserCheck,
  RefreshCw,
  TicketPercent,
  Phone,
  MapPin,
  Mail,
  ArrowLeft,
  Watch, // Added an extra icon for the theme
} from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  // Page load on top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const policySections = [
    {
      icon: <DatabaseZap size={28} className="text-[#FF4955]" />,
      title: "1. Information We Collect",
      content:
        "When you visit Brozzo to browse or purchase our premium watches, men's accessories, or tech gadgets, we collect necessary personal information. This includes your name, phone number, email address, delivery location, and secure payment details to smoothly process your luxury orders. We also gather basic browsing data like IP addresses to optimize your shopping experience.",
    },
    {
      icon: <Cog size={28} className="text-[#FF4955]" />,
      title: "2. How We Use Your Information",
      content:
        "Your information is strictly used to fulfill and dispatch your orders quickly. We also use it to provide top-notch customer support, send important delivery updates, notify you about exclusive drops (like limited edition watches or new tech accessories), and maintain the overall security of our platform.",
    },
    {
      icon: <Share2 size={28} className="text-[#FF4955]" />,
      title: "3. Sharing of Information",
      content:
        "Brozzo values your privacy and will never sell your personal data. We only share necessary details with verified third-party partners—such as top-tier courier services for fast delivery and secure payment gateways (like bKash, Nagad, or Bank processors)—to complete your transaction. Data may also be shared if required by law.",
    },
    {
      icon: <ShieldCheck size={28} className="text-[#FF4955]" />,
      title: "4. Data Security",
      content:
        "Protecting your data is our priority. We implement advanced SSL encryption, robust firewalls, and strict server security protocols to ensure that your personal and payment details remain completely secure while shopping with us.",
    },
    {
      icon: <Cookie size={28} className="text-[#FF4955]" />,
      title: "5. Cookies & Tracking",
      content:
        "We use cookies to remember your cart items, keep you logged in, and show you products (like that specific smartwatch or wallet you were looking at) tailored to your taste. You can manage cookie preferences in your browser, though it may limit some website features.",
    },
    {
      icon: <UserCheck size={28} className="text-[#FF4955]" />,
      title: "6. Your Rights & Control",
      content:
        "You have full control over your Brozzo account. You can update your profile, change your delivery address, request the deletion of your account data, or easily opt-out of our promotional SMS and email campaigns at any time.",
    },
    {
      icon: <TicketPercent size={28} className="text-[#FF4955]" />,
      title: "7. Promotions & Future Discounts",
      content:
        "We occasionally run flash sales on our tech gadgets and premium watches. By agreeing to our policy, you may receive promotional notifications. However, you are always free to unsubscribe from these alerts.",
    },
    {
      icon: <RefreshCw size={28} className="text-[#FF4955]" />,
      title: "8. Updates to this Policy",
      content:
        "As Brozzo expands its collection and services, we may occasionally update this Privacy Policy. All major changes will be reflected on this page along with the latest updated date.",
    },
  ];

  return (
    <div className="bg-black min-h-screen font-sans text-gray-300 pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-16 relative">
          {/* Decorative blur element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FF4955]/10 rounded-full blur-[80px] -z-10"></div>

          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Privacy <span className="text-[#FF4955]">& Policy</span>
          </h1>
          <p className="text-sm text-zinc-500 font-bold tracking-widest uppercase">
            Last Updated: March 2026
          </p>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto space-y-8 relative z-10">
          {/* Policy Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policySections.map((section, index) => (
              <div
                key={index}
                className="bg-[#111113] p-6 sm:p-8 border border-zinc-800 rounded-2xl hover:border-zinc-700 hover:shadow-xl hover:shadow-[#FF4955]/5 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-[#FF4955]/50 group-hover:scale-105 transition-all">
                    {section.icon}
                  </div>
                  <h2 className="text-lg font-bold text-white uppercase tracking-wide">
                    {section.title}
                  </h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Us Section */}
          <div className="bg-[#111113] p-8 md:p-10 border border-zinc-800 rounded-2xl mt-12 text-center relative overflow-hidden">
            {/* Small decorative icon */}
            <Watch className="absolute -right-6 -bottom-6 text-zinc-900 w-48 h-48 opacity-50 rotate-12 pointer-events-none" />

            <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-4 relative z-10">
              Need Further Clarification?
            </h2>
            <p className="text-zinc-400 text-sm mb-10 max-w-lg mx-auto relative z-10">
              If you have any questions regarding our privacy practices or your
              data, feel free to reach out to our support team.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
              <div className="flex flex-col items-center p-4 bg-black rounded-xl border border-zinc-800 hover:border-[#FF4955] transition-colors">
                <Phone size={24} className="text-[#FF4955] mb-3" />
                <a
                  href="tel:8801737912273"
                  className="font-bold text-white hover:text-[#FF4955] transition-colors text-sm"
                >
                  +880 1737 912273
                </a>
              </div>

              <div className="flex flex-col items-center p-4 bg-black rounded-xl border border-zinc-800 hover:border-[#FF4955] transition-colors">
                <Mail size={24} className="text-[#FF4955] mb-3" />
                <a
                  href="mailto:brozzo.bd71@gmail.com"
                  className="font-bold text-white hover:text-[#FF4955] transition-colors text-sm"
                >
                  brozzo.bd71@gmail.com
                </a>
              </div>

              <div className="flex flex-col items-center p-4 bg-black rounded-xl border border-zinc-800 hover:border-[#FF4955] transition-colors">
                <MapPin size={24} className="text-[#FF4955] mb-3" />
                <p className="font-bold text-white text-sm text-center">
                  Pagla, Fatullah, Narayanganj 1421, Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="flex justify-center mt-12">
            <Link
              to={"/"}
              className="inline-flex items-center gap-3 bg-[#FF4955] text-white font-black uppercase text-xs tracking-[2px] py-4 px-8 rounded-xl hover:bg-[#e03e49] transition-all duration-300 shadow-lg shadow-[#FF4955]/20 active:scale-95"
            >
              <ArrowLeft size={18} />
              Return to Store
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
