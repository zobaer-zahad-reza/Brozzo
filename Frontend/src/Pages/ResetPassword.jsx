import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";

const ResetPassword = () => {
    const { token } = useParams(); // URL থেকে টোকেন নিচ্ছে
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleReset = async (e) => {
        e.preventDefault();
        if(newPassword.length < 8){
            toast.error("Password must be at least 8 characters");
            return;
        }
        
        setIsLoading(true);
        try {
            const response = await axios.post(backendUrl + "/api/user/reset-password", { token, newPassword });
            if (response.data.success) {
                toast.success("Password reset successful! Please login.");
                navigate("/login"); // সাকসেস হলে লগিন পেজে নিয়ে যাবে
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Link expired or invalid. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 pt-24">
            <div className="bg-[#18181b] w-full max-w-md rounded-xl border border-zinc-800 p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-[#FF4955]/10 rounded-lg flex items-center justify-center text-[#FF4955] mx-auto mb-4">
                        <ShieldCheck size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Set New Password</h2>
                    <p className="text-gray-400 text-sm mt-2">Enter your secure new password below.</p>
                </div>

                <form onSubmit={handleReset} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-400 uppercase">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-11 pr-12 py-3 rounded-md border border-zinc-700 bg-[#121215] text-white outline-none focus:border-[#FF4955] transition-all text-sm"
                                placeholder="Min 8 characters"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-[#FF4955] text-white font-bold py-3 rounded-md shadow-lg hover:bg-[#e03e49] transition-all uppercase text-sm tracking-widest disabled:opacity-50"
                    >
                        {isLoading ? "Resetting..." : "Confirm Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;