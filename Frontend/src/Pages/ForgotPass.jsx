import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, KeyRound, CheckCircle, ArrowRight } from "lucide-react";
import Logo from "../assets/logo.png"; // লোগো পাথ ঠিক রাখুন

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px]">
        
        {/* Branding */}
        <div className="hidden md:flex w-1/2 bg-gray-900 relative flex-col justify-between p-12 text-white bg-[url('https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/60"></div>
          
          <div className="relative z-10">
             <h2 className="text-3xl font-bold leading-tight">
               Secure Account <br/> <span className="text-[#FFA24C]">Recovery.</span>
             </h2>
             <p className="mt-4 text-gray-300">
               Don't worry, it happens to the best of us. We'll help you get back on track.
             </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-sm text-gray-400">
             <ShieldCheckIcon className="text-[#FFA24C]" size={18} />
             <span>End-to-end encrypted security</span>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          
          {/* Decorative Blob */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFA24C]/10 rounded-bl-[100px] -z-0"></div>

          <div className="max-w-sm mx-auto w-full z-10">
            
            {!isSubmitted ? (
              /* EMAIL INPUT FORM */
              <>
                <div className="mb-8">
                  <div className="w-12 h-12 bg-[#FFA24C]/10 rounded-xl flex items-center justify-center text-[#FFA24C] mb-4">
                     <KeyRound size={24} />
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
                  <p className="text-gray-500">
                    Enter the email address associated with your account and we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#FFA24C] focus:ring-2 focus:ring-[#FFA24C]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FFA24C] hover:bg-[#e68a35] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 group"
                  >
                    Send Reset Link <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="mt-8 text-center">
                   <Link to="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-semibold transition-colors">
                      <ArrowLeft size={18} /> Back to Login
                   </Link>
                </div>
              </>
            ) : (
              /* SUCCESS MESSAGE */
              <div className="text-center">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 animate-bounce">
                     <CheckCircle size={32} />
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your mail</h2>
                 <p className="text-gray-500 mb-8">
                    We have sent a password recover instructions to your email <span className="font-bold text-gray-800">{email}</span>.
                 </p>
                 
                 <div className="space-y-4">
                    <button 
                        onClick={() => window.open('https://gmail.com', '_blank')}
                        className="w-full bg-[#FFA24C] hover:bg-[#e68a35] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all"
                    >
                        Open Email App
                    </button>
                    
                    <button 
                        onClick={() => setIsSubmitted(false)}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all"
                    >
                        Skip, I'll confirm later
                    </button>
                 </div>

                 <p className="mt-8 text-sm text-gray-500">
                    Did not receive the email? <button onClick={() => setIsSubmitted(false)} className="text-[#FFA24C] font-semibold hover:underline">Click to resend</button>
                 </p>
                 
                 <div className="mt-6">
                   <Link to="/login" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors">
                      <ArrowLeft size={16} /> Back to Login
                   </Link>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

const ShieldCheckIcon = ({size, className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
);

export default ForgotPassword;