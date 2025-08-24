import React from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import {Home}from './Components/Product/Home'
import { useState } from 'react';
import Login from './Components/product/Login/Login'
import Signup from './Components/product/Login/Signup';


import { Profile } from './Components/Product/ClickingPges';
import LoanPendingListComponent from './Components/clickpages/LoanDash';
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt'));
  console.log(localStorage.getItem("jwt"))

  // Callback to update authentication after login/signup
  const handleAuthSuccess = () => setIsAuthenticated(true);

  // Callback for logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsAuthenticated(false);
  };

  AOS.init();
  return (

    <Router className='font-sans    w-full h-auto'>
     
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/home" /> :
            <Login onAuthSuccess={handleAuthSuccess} />
        } />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/home" /> :
            <Signup onAuthSuccess={handleAuthSuccess} />
        } />
        <Route path="/home" element={
          isAuthenticated ? <Home onLogout={handleLogout} /> :
            <Navigate to="/login" />
        } />
        <Route path="*" element={
          isAuthenticated ? <Navigate to="/home" /> :
            <Navigate to="/login" />
        } />
        <Route path="/Profile" element={
          isAuthenticated ? <Profile logout={handleLogout} /> :
            <Navigate to="/login" />
        } />
            <Route path="/admin" element={
          isAuthenticated ? <LoanPendingListComponent logout={handleLogout} /> :
            <Navigate to="/login" />
        } />


      </Routes>



    </Router>
  )
}
