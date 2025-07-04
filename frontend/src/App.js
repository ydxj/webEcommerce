import './App.css';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Security/PrivateRoutes';
import Home from './pages/Home/home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
