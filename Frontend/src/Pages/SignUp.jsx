import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import Swal from "sweetalert2";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { backendUrl, setToken, navigate } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerm: false,
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
        confirmButtonColor: "#FF4955",
        background: "#111113",
        color: "#fff",
      });
      return;
    }

    Swal.fire({
      title: "Creating Account...",
      background: "#111113",
      color: "#fff",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    try {
      const registerResponse = await axios.post(
        backendUrl + "/api/user/register",
        {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
      );

      if (registerResponse.data.success) {
        const token = registerResponse.data.token;
        setToken(token);
        localStorage.setItem("token", token);

        Swal.fire({
          icon: "success",
          title: "Welcome to Brozzo!",
          text: "Your account has been created successfully.",
          timer: 2000,
          showConfirmButton: false,
          background: "#111113",
          color: "#fff",
          iconColor: "#FF4955",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: registerResponse.data.message,
          confirmButtonColor: "#FF4955",
          background: "#111113",
          color: "#fff",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong.",
        confirmButtonColor: "#FF4955",
        background: "#111113",
        color: "#fff",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 font-sans text-gray-200">
      <div className="bg-[#111113] w-full max-w-6xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-zinc-800">
        {/* Left Side: Branding Section */}
        <div className="hidden md:flex md:w-1/2 relative flex-col justify-between p-16 text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
              alt="Brozzo Premium"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#FF4955]/20 border border-[#FF4955]/30 px-4 py-1.5 rounded-full mb-8">
              <ShieldCheck size={16} className="text-[#FF4955]" />
              <span className="text-[10px] uppercase font-black tracking-widest text-[#FF4955]">
                Premium Access
              </span>
            </div>
            <h2 className="text-5xl font-black leading-tight tracking-tighter uppercase">
              Join the <br />{" "}
              <span className="text-[#FF4955]">Inner Circle.</span>
            </h2>
            <p className="mt-6 text-zinc-400 text-lg font-medium italic">
              Create an account to unlock exclusive collections and personalized
              style recommendations.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-4 group">
              <div className="bg-zinc-800 p-2 rounded-lg group-hover:bg-[#FF4955] transition-colors">
                <CheckCircle size={18} className="text-white" />
              </div>
              <span className="font-bold uppercase tracking-widest text-[10px]">
                Early Collection Access
              </span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="bg-zinc-800 p-2 rounded-lg group-hover:bg-[#FF4955] transition-colors">
                <CheckCircle size={18} className="text-white" />
              </div>
              <span className="font-bold uppercase tracking-widest text-[10px]">
                VIP Customer Support
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#111113] relative overflow-hidden">
          <div className="absolute top-[-5%] right-[-5%] w-48 h-48 bg-[#FF4955]/10 rounded-full blur-[80px] -z-0"></div>

          <div className="max-w-md mx-auto w-full z-10">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">
                Create Account
              </h1>
              <p className="text-zinc-500 font-medium">
                Join Brozzo and start your style journey.
              </p>
              <div className="w-12 h-1 bg-[#FF4955] mt-4"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                  Full Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#FF4955] transition-colors"
                    size={18}
                  />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your name"
                    className="w-full bg-zinc-900/50 pl-12 pr-4 py-3.5 rounded-2xl border border-zinc-800 focus:border-[#FF4955] focus:ring-4 focus:ring-[#FF4955]/10 outline-none transition-all text-white"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
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
                    placeholder="example@mail.com"
                    className="w-full bg-zinc-900/50 pl-12 pr-4 py-3.5 rounded-2xl border border-zinc-800 focus:border-[#FF4955] focus:ring-4 focus:ring-[#FF4955]/10 outline-none transition-all text-white"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                  Create Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#FF4955] transition-colors"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    className="w-full bg-zinc-900/50 pl-12 pr-12 py-3.5 rounded-2xl border border-zinc-800 focus:border-[#FF4955] focus:ring-4 focus:ring-[#FF4955]/10 outline-none transition-all text-white"
                    onChange={handleChange}
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#FF4955] transition-colors"
                    size={18}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="w-full bg-zinc-900/50 pl-12 pr-12 py-3.5 rounded-2xl border border-zinc-800 focus:border-[#FF4955] focus:ring-4 focus:ring-[#FF4955]/10 outline-none transition-all text-white"
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 mt-4">
                <input
                  type="checkbox"
                  name="agreeTerm"
                  id="agreeTerm"
                  className="mt-1 w-4 h-4 accent-[#FF4955] bg-zinc-900 border-zinc-800 rounded focus:ring-[#FF4955]"
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="agreeTerm"
                  className="text-[11px] text-zinc-500 font-medium"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#FF4955] hover:underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-[#FF4955] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF4955] hover:bg-[#e63e49] text-white font-black py-4 rounded-2xl shadow-xl shadow-[#FF4955]/20 transition-all flex items-center justify-center gap-3 group uppercase text-xs tracking-[3px] active:scale-95 mt-4"
              >
                Register Account{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>

            <p className="mt-10 text-center text-zinc-500 text-sm font-medium">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white font-black uppercase tracking-widest hover:text-[#FF4955] transition-colors ml-2 underline underline-offset-4 decoration-[#FF4955]"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
