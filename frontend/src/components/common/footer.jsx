import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Company Info - Takes 4 columns on large screens */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                NeighborFit
              </span>
            </div>
            
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Transforming the way people discover neighborhoods through AI-powered, personalized lifestyle matching. Experience smarter living choices today.
            </p>

            <div className="flex space-x-4">
              <a href="#" className="group p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="group p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="group p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="group p-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.749.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Section - Takes 8 columns on large screens */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-cyan-500 rounded-full"></div>
                Product
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/features" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-400 transition-colors"></span>
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-400 transition-colors"></span>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-400 transition-colors"></span>
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/api" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-emerald-400 transition-colors"></span>
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-purple-400 transition-colors"></span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-purple-400 transition-colors"></span>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-purple-400 transition-colors"></span>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-purple-400 transition-colors"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full"></div>
                Resources
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/help" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/tutorials" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/status" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                    Status
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                Support
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/support" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-orange-400 transition-colors"></span>
                    Get Help
                  </Link>
                </li>
                <li>
                  <Link to="/feedback" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-orange-400 transition-colors"></span>
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link to="/report" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-orange-400 transition-colors"></span>
                    Report Issue
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@neighborfit.com" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-orange-400 transition-colors"></span>
                    Email Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} NeighborFit. All rights reserved.
              </div>
              <div className="hidden md:block w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="text-sm text-gray-500">
                Made with ❤️ for better living
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                Cookie Policy
              </Link>
              <Link to="/security" className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;