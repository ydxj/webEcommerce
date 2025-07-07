import { NavLink } from "react-router-dom";
import {
  FaHome, FaBox, FaShoppingCart, FaHeart, FaUser, FaSignOutAlt
} from "react-icons/fa";

function BuyerMenu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold text-primary" to="/">
          Zerhouni
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#buyerNavbar"
          aria-controls="buyerNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="buyerNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/dashboard">
                <FaHome className="me-1" /> Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/myorders">
                <FaBox className="me-1" /> My Orders
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/cart">
                <FaShoppingCart className="me-1" /> Cart
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/favorites">
                <FaHeart className="me-1" /> Favorites
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center" to="/profile">
                <FaUser className="me-1" /> Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link d-flex align-items-center text-danger" to="/logout">
                <FaSignOutAlt className="me-1" /> Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default BuyerMenu;
