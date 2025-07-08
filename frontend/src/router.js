import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Home from './pages/Home/home';
import BuyerDashboard from './pages/Users/dashboard/dashboard';
import MyOrders from './pages/Users/MyOrders/MyOrders';
import EditProfile from './pages/Users/Edit Profile/EditProfile';
import PrivateRoute from './Security/PrivateRoutes';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<PrivateRoute><BuyerDashboard /></PrivateRoute>} />
    <Route path="/myOrders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
    <Route path="/profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
  </Routes>
);

export default AppRoutes;
