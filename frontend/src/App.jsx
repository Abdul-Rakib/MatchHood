import React from 'react';
import { useContext, useState, useEffect } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation } from "react-router-dom";
import './App.css'
import { GlobalContext } from './context/globalContext';
import Navbar from './components/common/navbar';
import Homepage from './pages/home/homepage';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import Dashboard from './pages/dashboard/dashboard';
import Profile from './pages/dashboard/profile';
import Contact from './pages/contact';
import KycStatus from './pages/dashboard/kycStatus';
import ProtectedRoute from './routes/protectedRoutes';
function App() {

  const { pathname } = useLocation();
  const { isLoggedIn } = useContext(GlobalContext)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/register" element={<>{!isLoggedIn ? <Register /> : <Homepage />}</>}></Route>
        <Route path="/login" element={<>{!isLoggedIn ? <Login /> : <Homepage />}</>}></Route>
        <Route path="/home" element={
          <>
            <Homepage />
          </>
        }
        ></Route>
        <Route path='/contact' element={<Contact />} />

        {/* Protect the /dashboard route */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route index element={<Profile />} />
          <Route path="kyc" element={<KycStatus />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
