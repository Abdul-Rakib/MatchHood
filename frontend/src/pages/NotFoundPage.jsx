import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/common/footer';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
            {/* 404 Content */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full text-center">
                    <div className="mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                            <div className="relative text-8xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                404
                            </div>
                        </div>
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Page Not Found
                    </h1>
                    
                    <p className="text-lg text-gray-300 mb-8">
                        The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Go Home
                        </button>
                        
                        <button
                            onClick={() => navigate('/search')}
                            className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-2xl font-semibold hover:border-emerald-500 hover:text-emerald-400 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10 flex items-center justify-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Find PGs
                        </button>
                    </div>
                    
                    <div className="mt-8 text-center">
                        <Link 
                            to="/contact" 
                            className="text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                        >
                            Need help? Contact us
                        </Link>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default NotFoundPage;