import './App.css';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Security/PrivateRoutes';
import Home from './pages/Home/home';
import BuyerDashboard from './pages/Users/dashboard/dashboard';
import MyOrders from './pages/Users/MyOrders';
import EditProfile from './pages/Users/Edit Profile/EditProfile';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><BuyerDashboard /></PrivateRoute>} />
          <Route path="/myOrders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
