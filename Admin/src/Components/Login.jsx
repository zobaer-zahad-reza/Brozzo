import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from "../assets/logo.png"; // Make sure to import the Brozzo logo

const Login = ({ setToken, backendUrl }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Backend call
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

            if (response.data.success) {
                const token = response.data.token;
                setToken(token);
                // Token local storage-e save rakha bhalo
                localStorage.setItem('token', token);
                toast.success("Welcome Back, Admin!");
            } else {
                toast.error(response.data.message || "Login failed.");
            }

        } catch (error) {
            console.error("Login Error Details:", error);
            
            // Backend error message handle kora
            if (error.response) {
                toast.error(error.response.data.message || "Invalid Email or Password");
            } else if (error.request) {
                toast.error("Server is not responding. Please check your backend.");
            } else {
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-[#0a0a0a] px-4'>
            
            <div className='bg-[#121215] shadow-2xl rounded-xl px-8 py-10 max-w-md w-full border border-zinc-800 relative overflow-hidden'>
                
                {/* Decorative element */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF4955] to-transparent opacity-50"></div>

                {/* Logo Section */}
                <div className="flex justify-center mb-8">
                    <img src={logo} alt="Brozzo Admin" className="w-32 object-contain" />
                </div>

                <h1 className='text-xl font-bold mb-8 text-center text-white uppercase tracking-widest'>
                    Admin Control
                </h1>

                <form onSubmit={onSubmitHandler}>
                    <div className='mb-5'>
                        <p className='text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider'>Admin Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='rounded-md w-full px-4 py-3 bg-[#18181b] text-white border border-zinc-700 outline-none focus:ring-1 focus:ring-[#FF4955] focus:border-[#FF4955] transition-all placeholder-zinc-600 text-sm'
                            type="email"
                            placeholder='admin@brozzo.com'
                            required
                        />
                    </div>

                    <div className='mb-8'>
                        <p className='text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider'>Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='rounded-md w-full px-4 py-3 bg-[#18181b] text-white border border-zinc-700 outline-none focus:ring-1 focus:ring-[#FF4955] focus:border-[#FF4955] transition-all placeholder-zinc-600 text-sm'
                            type="password"
                            placeholder='••••••••'
                            required
                        />
                    </div>

                    <button
                        className={`w-full py-3.5 px-4 rounded-md text-white transition-all duration-300 font-bold uppercase tracking-widest text-sm shadow-lg ${
                            loading 
                            ? 'bg-zinc-600 cursor-not-allowed' 
                            : 'bg-[#FF4955] hover:bg-[#e03e49] shadow-[#FF4955]/20 active:scale-[0.98]'
                        }`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Verifying...
                            </div>
                        ) : 'Login to Dashboard'}
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;