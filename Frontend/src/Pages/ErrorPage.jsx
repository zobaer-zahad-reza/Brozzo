import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-[#FDFBF7] flex items-center relative overflow-hidden font-sans">
      
      {/* Background World Map Patter */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full text-gray-400 fill-current" viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg">
             <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" />
             </pattern>
             <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center z-10 py-12">
        
        {/* Content & Action */}
        <div className="text-center lg:text-left order-2 lg:order-1 space-y-8">
            <div className="space-y-4">
                <p className="text-orange-500 font-bold tracking-widest uppercase text-sm md:text-base">
                    Error Code: 404
                </p>
                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
                    Shipment <br className="hidden md:block" /> Not Found
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed">
                    The page you are looking for might have been moved, deleted, or got lost in transit between our warehouses.
                </p>
            </div>

            {/* Fake Search Bar for UX */}
            <div className="max-w-md mx-auto lg:mx-0 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <svg className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input 
                    type="text" 
                    placeholder="Search for pages or products..." 
                    className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition duration-300 shadow-sm"
                />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <button 
                    onClick={() => navigate('/')}
                    className="px-8 py-4 bg-orange-500 text-white text-base font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300"
                >
                    Return Home
                </button>
                <button 
                    onClick={() => navigate(-1)}
                    className="px-8 py-4 bg-white text-gray-700 border border-gray-200 text-base font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                >
                    Go Back
                </button>
            </div>
        </div>

        {/* Right Side: Visual / Illustration */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            
            {/* The "404" Container Box */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                
                {/* Decorative Blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/50 rounded-full blur-3xl -z-10"></div>

                <div className="relative bg-white border-2 border-gray-900 rounded-3xl p-8 md:p-12 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                    <div className="absolute top-4 left-4 flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
                    </div>
                    
                    <div className="mt-8 text-center space-y-6">
                        <div className="w-24 h-24 bg-orange-500 mx-auto rounded-2xl flex items-center justify-center border-2 border-black">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-gray-900">404</h2>
                            <p className="text-gray-500 font-medium">Page Missing</p>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                             <div className="h-full bg-orange-500 w-2/3 animate-pulse"></div>
                        </div>
                        <p className="text-xs text-gray-400 font-mono">ID: VIVID-VALLEY-MISSING-PG</p>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl border-2 border-gray-900 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] animate-bounce hidden md:block">
                     <span className="text-2xl">📦</span>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default ErrorPage;