import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  KeyRound,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    setIsSubmitted(true);
  };

  return (
    // Background updated to match Brozzo Theme
    <div className="min-h-screen flex items-center justify-center bg-black p-4 font-sans pt-24 md:pt-32 pb-10">
      {/* Container - Dark theme rounded borders */}
      <div className="bg-[#18181b] w-full max-w-4xl rounded-xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[550px]">
        {/* Branding Side (Left on Desktop) */}
        <div className="hidden md:flex w-1/2 bg-black relative flex-col justify-between p-12 text-white bg-[url('https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/80"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold leading-tight uppercase tracking-wider">
              Secure Account <br />{" "}
              <span className="text-[#FF4955]">Recovery.</span>
            </h2>
            <p className="mt-4 text-gray-400 text-sm">
              Don't worry, it happens to the best of us. We'll help you get back
              on track securely.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheckIcon className="text-[#FF4955]" size={18} />
            <span>End-to-end encrypted security</span>
          </div>
        </div>

        {/* Form Section (Right on Desktop) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-[#18181b] relative">
          <div className="max-w-sm mx-auto w-full z-10">
            {!isSubmitted ? (
              /* EMAIL INPUT FORM */
              <>
                <div className="mb-8 text-center md:text-left">
                  <div className="w-12 h-12 bg-[#FF4955]/10 rounded-lg flex items-center justify-center text-[#FF4955] mb-6 mx-auto md:mx-0">
                    <KeyRound size={24} />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                    Forgot Password?
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Enter the email address associated with your account and
                    we'll send you a link to reset your password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        size={18}
                      />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full pl-11 pr-4 py-3 rounded-md border border-zinc-700 focus:border-[#FF4955] focus:ring-1 focus:ring-[#FF4955] outline-none transition-all bg-[#121215] text-white placeholder-zinc-600 text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FF4955] hover:bg-[#e03e49] text-white font-bold py-3 rounded-md shadow-lg shadow-[#FF4955]/20 transition-all flex items-center justify-center gap-2 group text-sm uppercase tracking-wide"
                  >
                    Send Reset Link{" "}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm font-semibold transition-colors"
                  >
                    <ArrowLeft size={16} /> Back to Login
                  </Link>
                </div>
              </>
            ) : (
              /* SUCCESS MESSAGE */
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FF4955]/10 rounded-full flex items-center justify-center text-[#FF4955] mx-auto mb-6 animate-pulse">
                  <CheckCircle size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                  Check your mail
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  We have sent password recovery instructions to <br />
                  <span className="font-bold text-white">{email}</span>.
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => window.open("https://gmail.com", "_blank")}
                    className="w-full bg-[#FF4955] hover:bg-[#e03e49] text-white font-bold py-3 rounded-md shadow-lg shadow-[#FF4955]/20 transition-all text-sm uppercase tracking-wide"
                  >
                    Open Email App
                  </button>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full bg-zinc-800 hover:bg-zinc-700 text-gray-300 font-bold py-3 rounded-md transition-all text-sm uppercase tracking-wide border border-zinc-700"
                  >
                    Skip, I'll confirm later
                  </button>
                </div>

                <p className="mt-8 text-sm text-gray-500">
                  Did not receive the email? <br />
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#FF4955] font-semibold hover:underline mt-1"
                  >
                    Click to resend
                  </button>
                </p>

                <div className="mt-6">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm font-medium transition-colors"
                  >
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

// Reusable Shield Icon matching the theme
const ShieldCheckIcon = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export default ForgotPassword;
