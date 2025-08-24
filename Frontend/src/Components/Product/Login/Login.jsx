import React, { useState } from 'react';

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../Api';
const Login = ({ onAuthSuccess, setUser }) => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    console.log(import.meta.env.API_URL)
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(apiUrl)

    // Adjust this to match your backend URL
    const handleSubmit = async (e) => {
        console.log(import.meta.env.VITE_API_URL)
        e.preventDefault();
        console.log(loginData)
        if (!loginData.email.trim() || !loginData.password.trim()) {
            setError("Please fill all fields");
            return;
        }
        setError('');
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.API_URL || API_URL}/login`,
                {
                    email: loginData.email.trim(),
                    password: loginData.password.trim(),

                },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            if (response.status === 200) {
                // Use 'token' or 'jwt' depending on your backend's key
                console.log(response)
                localStorage.setItem("jwt",response.data.jwt);
                // console.log(localStorage.setItem("jwt"))
                if (onAuthSuccess) onAuthSuccess();
                navigate("/home");
            } else {
                setError(response.data.error || response.data.message || "Invalid credentials");
            }
        } catch (error) {
            setError(
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };
    // Auto-close toast

    return (
        <div className="min-h-screen flex items-center justify-center box2 p-4">

            {/* Login Card */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Mahtha Bank</h1>
                    <h2 className="text-2xl font-semibold text-white">Welcome Back</h2>
                    <p className="text-gray-200 text-sm mt-2">Sign in to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="w-full p-3 rounded-md bg-white/20 backdrop-blur-md text-white text-sm placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    {error && <p className='text-red-500 text-sm mb-2 text-center'>{error}</p>}
                    <p className="text-gray-300">
                        Don't have an account?
                        <Link to="/signup" className="text-blue-400 hover:text-blue-300 ml-1 font-semibold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
