import logo from './logo.svg';
import './App.css';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Security/PrivateRoutes';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
