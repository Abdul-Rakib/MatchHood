// components/DashboardLayout.jsx
import React, { useState, useContext, use } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  UserCircle,
  Store,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Book,
  Link2,
  Wallet,
  CreditCard,
  Package,
  FileText
} from 'lucide-react';
import { GlobalContext } from "../../context/globalContext"

const DashboardLayout = () => {
  const { deleteUser } = useContext(GlobalContext);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Profile', path: '/dashboard', icon: UserCircle },
    { name: 'KYC', path: '/dashboard/kyc', icon: FileText },
  ];

  const handleLogout = () => {
    deleteUser();
  };

  const handleLinkClick = (path) => {
    if (window.innerWidth < 768) {
      // Close the sidebar on mobile when a link is clicked
      setSidebarOpen(false);
    }
    navigate(path);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static`}
      >
        <div className="p-4 border-b flex justify-between items-center md:hidden">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleLinkClick(item.path)}  // Added click handler to close the sidebar on mobile
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
                {isActive && <ChevronRight className="h-5 w-5 ml-auto" />}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-4 py-3 mt-6 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Menu Button */}
        <div className="md:hidden p-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto max-h-screen p-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;