import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Globe, TrendingUp } from "lucide-react";
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
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // pass match validation
    if (formData.password !== formData.confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords do not match!',
            confirmButtonColor: '#FFA24C'
        });
        return;
    }

    Swal.fire({
        title: 'Creating Account...',
        didOpen: () => {
            Swal.showLoading();
        },
        allowOutsideClick: false
    });

    try {
        const registerResponse = await axios.post(backendUrl + '/api/user/register', {
            name: formData.fullName,
            email: formData.email,
            password: formData.password
        });

        if (registerResponse.data.success) {
            const token = registerResponse.data.token;
            setToken(token);
            localStorage.setItem('token', token);
            
            Swal.fire({
                icon: 'success',
                title: 'Welcome to Vivid Valley!',
                text: 'Your account has been created successfully.',
                timer: 2000,
                showConfirmButton: false
            });

            setTimeout(() => {
                navigate('/'); 
            }, 2000);
            
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: registerResponse.data.message,
                confirmButtonColor: '#FFA24C'
            });
        }

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || "Something went wrong. Please try again.",
            confirmButtonColor: '#FFA24C'
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-auto md:h-full">
        
        {/* Branding Section */}
        <div className="hidden md:flex w-1/2 bg-gray-900 relative flex-col justify-between p-12 text-white bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
          
          <div className="relative z-10">
             <h2 className="text-4xl font-bold leading-tight">
               Start Your <br/> <span className="text-[#FFA24C]">Global Journey.</span>
             </h2>
             <p className="mt-4 text-gray-300 text-lg">
               Join thousands of businesses sourcing premium products efficiently.
             </p>
          </div>

          <div className="relative z-10 space-y-6">
             <div className="flex items-start gap-4">
                <div className="bg-[#FFA24C]/20 p-2 rounded-lg text-[#FFA24C]">
                    <Globe size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-white">Global Network</h4>
                    <p className="text-sm text-gray-400">Access suppliers from USA, Italy & BD.</p>
                </div>
             </div>
             
             <div className="flex items-start gap-4">
                <div className="bg-[#FFA24C]/20 p-2 rounded-lg text-[#FFA24C]">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-white">Verified Suppliers</h4>
                    <p className="text-sm text-gray-400">100% authentic products guaranteed.</p>
                </div>
             </div>

             <div className="flex items-start gap-4">
                <div className="bg-[#FFA24C]/20 p-2 rounded-lg text-[#FFA24C]">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-white">Market Insights</h4>
                    <p className="text-sm text-gray-400">Get data-driven trends for your business.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFA24C]/10 rounded-bl-[4rem] -z-0"></div>

          <div className="max-w-md mx-auto w-full z-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-500">Sign up to get started with Vivid Valley.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Name"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#FFA24C] focus:ring-2 focus:ring-[#FFA24C]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#FFA24C] focus:ring-2 focus:ring-[#FFA24C]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a strong password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 focus:border-[#FFA24C] focus:ring-2 focus:ring-[#FFA24C]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 focus:border-[#FFA24C] focus:ring-2 focus:ring-[#FFA24C]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 mt-2">
                 <input 
                    type="checkbox" 
                    name="agreeTerm"
                    id="agreeTerm"
                    className="mt-1 w-4 h-4 text-[#FFA24C] border-gray-300 rounded focus:ring-[#FFA24C]"
                    onChange={handleChange}
                    required
                 />
                 <label htmlFor="agreeTerm" className="text-sm text-gray-500">
                    I agree to the <Link to="/terms" className="text-[#FFA24C] font-semibold hover:underline">Terms of Service</Link> and <Link to="/privacy-notice" className="text-[#FFA24C] font-semibold hover:underline">Privacy Policy</Link>.
                 </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FFA24C] hover:bg-[#e68a35] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 group mt-2 hover:cursor-pointer"
              >
                Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <p className="mt-8 text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#FFA24C] font-bold hover:underline">
                Login here
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;