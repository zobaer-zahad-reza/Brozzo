import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { backendUrl, setToken, navigate } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Please wait...",
        allowOutsideClick: false,
        background: "#111113",
        color: "#fff",
        didOpen: () => Swal.showLoading(),
      });

      const response = await axios.post(backendUrl + "/api/user/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        Swal.fire({
          icon: "success",
          title: "Welcome!",
          text: "Logged in successfully.",
          timer: 2000,
          showConfirmButton: false,
          background: "#111113",
          color: "#fff",
          iconColor: "#FF4955",
        });

        // Buy Now
        const pendingBuyNow = localStorage.getItem("pendingBuyNow");

        if (pendingBuyNow) {
          const buyNowItem = JSON.parse(pendingBuyNow);
          localStorage.removeItem("pendingBuyNow");
          navigate("/place-order", { state: { buyNowItem } });
        } else {
          navigate("/");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: response.data.message || "Invalid email or password.",
          confirmButtonColor: "#FF4955",
          background: "#111113",
          color: "#fff",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Unable to connect to the server.",
        confirmButtonColor: "#FF4955",
        background: "#111113",
        color: "#fff",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 font-sans text-gray-200">
      {/* Login Card */}
      <div className="bg-[#111113] w-full max-w-md rounded-[32px] shadow-2xl border border-zinc-800 p-8 md:p-12 relative overflow-hidden">
        {/* Decorative Light Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4955]/10 rounded-full blur-[80px] -z-0"></div>

        {/* Header */}
        <div className="text-center mb-10 relative z-10">
          <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
            Login
          </h1>
          <p className="text-zinc-500 font-medium text-sm">
            Welcome back to Brozzo Collection
          </p>
          <div className="w-12 h-1 bg-[#FF4955] mx-auto mt-4 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#FF4955] transition-colors"
                size={18}
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-zinc-900/50 pl-12 pr-4 py-4 rounded-2xl border border-zinc-800 focus:border-[#FF4955] focus:ring-4 focus:ring-[#FF4955]/5 outline-none transition-all text-white font-medium"
                onChange={handleChange}
                value={formData.email}
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                Password
              </label>
              <Link
                to="/forgot-password"
                size={14}
                className="text-[10px] font-black uppercase tracking-widest text-[#FF4955] hover:text-white transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#FF4955] transition-colors"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="w-full bg-zinc-900/50 pl-12 pr-12 py-4 rounded-2xl border border-zinc-800 focus:border-[#FF4955] focus:ring-4 focus:ring-[#FF4955]/5 outline-none transition-all text-white font-medium"
                onChange={handleChange}
                value={formData.password}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FF4955] hover:bg-[#e63e49] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#FF4955]/20 transition-all flex items-center justify-center gap-3 uppercase text-xs tracking-[3px] active:scale-95"
          >
            Enter Store <ArrowRight size={18} />
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-10 text-center relative z-10">
          <p className="text-zinc-500 text-sm font-medium">
            New to Brozzo?{" "}
            <Link
              to="/signup"
              className="text-white font-black uppercase tracking-widest hover:text-[#FF4955] transition-colors ml-2 underline underline-offset-4 decoration-[#FF4955]"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
