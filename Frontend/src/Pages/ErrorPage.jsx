import React from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Home, Search } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-black flex items-center relative overflow-hidden font-sans text-gray-200">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#FF4955]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#FF4955]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10 py-12">
        {/* Content & Action */}
        <div className="text-center lg:text-left order-2 lg:order-1 space-y-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4955] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4955]"></span>
              </span>
              <p className="text-[#FF4955] font-black tracking-[3px] uppercase text-[10px]">
                Error Code: 404
              </p>
            </div>

            <h1 className="text-5xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase">
              Style <br className="hidden md:block" />{" "}
              <span className="text-[#FF4955]">Out of Stock</span>
            </h1>

            <p className="text-zinc-500 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium italic">
              The look you're searching for isn't in our current collection. It
              might have been retired or moved to a new aisle.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <button
              onClick={() => navigate("/")}
              className="px-10 py-4 bg-[#FF4955] text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_20px_-5px_rgba(255,73,85,0.4)] hover:bg-[#e63e49] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Home size={18} /> Return Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-10 py-4 bg-transparent text-white border-2 border-zinc-800 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-900 hover:border-zinc-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> Back to Shop
            </button>
          </div>
        </div>

        {/* Right Side: Visual Illustration */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            {/* 404 Visual Card */}
            <div className="relative bg-[#111113] border border-zinc-800 rounded-[40px] p-12 md:p-16 shadow-[30px_30px_60px_-15px_rgba(0,0,0,0.5)] transform hover:rotate-2 transition-transform duration-700 ease-out group">
              {/* Brozzo Branding Badge */}
              <div className="absolute -top-4 -right-4 bg-white text-black text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-tighter">
                Brozzo Premium
              </div>

              <div className="text-center space-y-8">
                <div className="relative">
                  <h2 className="text-[120px] md:text-[150px] font-black text-white leading-none tracking-tighter opacity-10">
                    404
                  </h2>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-[#FF4955] rounded-3xl rotate-12 flex items-center justify-center border-4 border-black shadow-2xl group-hover:rotate-0 transition-transform duration-500">
                      <ShoppingBag size={40} className="text-white" />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-widest">
                    Page Missing
                  </h2>
                  <p className="text-zinc-600 font-bold mt-1 uppercase text-[10px] tracking-[4px]">
                    Verified Luxury Authenticity
                  </p>
                </div>

                {/* Animated Progress Bar */}
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF4955] w-1/3 animate-[shimmer_2s_infinite]"></div>
                </div>

                <p className="text-[10px] text-zinc-700 font-mono tracking-tighter">
                  REF: BROZZO-ERR-0404X-LOST
                </p>
              </div>
            </div>

            {/* Floating Tags */}
            <div className="absolute -bottom-4 -left-4 bg-[#FF4955] p-5 rounded-3xl shadow-2xl rotate-[-12deg] hidden md:block">
              <span className="text-white font-black text-sm uppercase tracking-tighter">
                Collection 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `,
        }}
      />
    </section>
  );
};

export default ErrorPage;
