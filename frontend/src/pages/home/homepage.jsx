import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/common/footer';
import { GlobalContext } from '../../context/globalContext';

const Homepage = () => {
    const { isLoggedIn } = useContext(GlobalContext);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Hero Section */}
            <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                <span className="text-emerald-400 text-sm font-medium">✨ AI-Powered Matching</span>
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    Discover Your Perfect
                                </span>
                                <br />
                                <span className="text-white">Neighborhood Match</span>
                            </h1>
                            
                            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                                Transform your living experience with AI-driven insights. Find neighborhoods that perfectly align with your lifestyle, preferences, and dreams.
                            </p>
                            
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
                                    className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                                >
                                    Get Started
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                <Link 
                                    to='/features' 
                                    className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-2xl font-semibold hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10"
                                >
                                    Explore Features
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-8 pt-8">
                                <div className="text-center">
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">2K+</h3>
                                    <p className="text-gray-400 text-sm">Cities Covered</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">95%</h3>
                                    <p className="text-gray-400 text-sm">Match Accuracy</p>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">100+</h3>
                                    <p className="text-gray-400 text-sm">Data Points</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Visual */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-[3rem] blur-3xl animate-pulse" />
                            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-[2rem] p-8 shadow-2xl">
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <img
                                    src="/home-img.jpg"
                                    alt="Neighborhood Matching Visual"
                                    className="w-full rounded-2xl shadow-lg mt-8"
                                />
                                <div className="mt-6 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                        <span className="text-white text-sm">Finding perfect matches...</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                                        <span className="text-white text-sm">Analyzing lifestyle factors...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Preview Section */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Why Choose NeighborFit?
                        </h2>
                        <p className="text-lg text-gray-300">
                            Cutting-edge technology meets personalized lifestyle matching
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Smart AI Matching</h3>
                            <p className="text-gray-300">Advanced algorithms analyze your preferences and lifestyle to find the perfect neighborhood match.</p>
                        </div>
                        
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Real-Time Data</h3>
                            <p className="text-gray-300">Access up-to-date information about amenities, safety, transportation, and community vibes.</p>
                        </div>
                        
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Personalized Insights</h3>
                            <p className="text-gray-300">Get detailed insights and recommendations tailored specifically to your unique lifestyle needs.</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Homepage;