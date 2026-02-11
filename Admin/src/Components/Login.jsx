import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
                // Jodi response success false hoy (unlikely with try-catch but safe)
                toast.error(response.data.message || "Login failed.");
            }

        } catch (error) {
            console.error("Login Error Details:", error);
            
            // Backend error message handle kora
            if (error.response) {
                // Server response diyeche (e.g., 401, 400, 500)
                toast.error(error.response.data.message || "Invalid Email or Password");
            } else if (error.request) {
                // Request pathano hoyeche kintu server theke response asheni
                toast.error("Server is not responding. Please check your backend.");
            } else {
                // Onno kono error
                toast.error("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-gray-50'>
            <div className='bg-white shadow-xl rounded-lg px-8 py-10 max-w-md w-full border border-gray-100'>
                <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>Vivid Valley Admin</h1>

                <form onSubmit={onSubmitHandler}>
                    <div className='mb-4'>
                        <p className='text-sm font-semibold text-gray-600 mb-2'>Admin Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='rounded-md w-full px-4 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                            type="email"
                            placeholder='admin@vividvalley.com'
                            required
                        />
                    </div>

                    <div className='mb-6'>
                        <p className='text-sm font-semibold text-gray-600 mb-2'>Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='rounded-md w-full px-4 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all'
                            type="password"
                            placeholder='••••••••'
                            required
                        />
                    </div>

                    <button
                        className={`w-full py-3 px-4 rounded-md text-white transition-all duration-300 font-bold uppercase tracking-wider ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 shadow-lg'
                        }`}
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Verifying...
                            </div>
                        ) : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;