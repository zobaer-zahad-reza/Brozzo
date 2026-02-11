import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
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

        const response = await axios.post(backendUrl + '/api/user/login', {
            email: formData.email,
            password: formData.password
        });


        if (response.data.success) {
            setToken(response.data.token); 
            localStorage.setItem('token', response.data.token); 
            
            // SweetAlert Success
            Swal.fire({
                icon: 'success',
                title: 'Welcome Back!',
                text: 'Login Successful!',
                timer: 2000,
                showConfirmButton: false,
                background: '#fff',
                iconColor: '#FFA24C',
            });

            navigate('/'); 
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: response.data.message || "Invalid email or password",
                confirmButtonColor: '#FFA24C',
            });
        }

    } catch (error) {
        console.log(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Connection failed. Please check your internet or server.',
            confirmButtonColor: '#FFA24C',
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row h-[600px] md:h-[700px]">
        
        {/* Left Side: Image & Branding */}
        <div className="hidden md:flex w-1/2 bg-gray-900 relative flex-col justify-between p-12 text-white bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
          
          <div className="relative z-10">
             <h2 className="text-4xl font-bold leading-tight">
               Global Sourcing <br/> <span className="text-[#FFA24C]">Simplified.</span>
             </h2>
             <p className="mt-4 text-gray-300 text-lg">
               Access premium products from Bangladesh, Italy, and the USA with seamless logistics.
             </p>
          </div>

          <div className="relative z-10 space-y-3">
             <div className="flex items-center gap-3">
                <CheckCircle className="text-[#FFA24C]" size={20} />
                <span className="font-medium">Secure B2B Transactions</span>
             </div>
             <div className="flex items-center gap-3">
                <CheckCircle className="text-[#FFA24C]" size={20} />
                <span className="font-medium">24/7 Expert Support</span>
             </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFA24C]/10 rounded-bl-full -z-0"></div>

          <div className="max-w-md mx-auto w-full z-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
              <p className="text-gray-500">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#FFA24C] focus:ring-2 focus:ring-[#FFA24C]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                   <label className="text-sm font-semibold text-gray-700">Password</label>
                   <Link to="/forgot-password" className="text-sm font-semibold text-[#FFA24C] hover:underline">
                      Forgot Password?
                   </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 focus:border-[#FFA24C] focus:ring-2 focus:ring-[#FFA24C]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                    onChange={handleChange}
                    value={formData.password}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#FFA24C] hover:bg-[#e68a35] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 group hover:cursor-pointer"
              >
                Sign In <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#FFA24C] font-bold hover:underline">
                Create account
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;