import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link, Outlet } from "react-router-dom";
import "./sellerMenu.css";

export default function SellerLayout() {
  const sidebarRef = useRef();

  useEffect(() => {
    gsap.from(sidebarRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="seller-sidebar p-3 text-white bg-dark"
      >
        <h4 className="mb-4 text-center">Seller Panel</h4>
        <ul className="nav flex-column gap-2">
          <li><Link to="/seller/dashboard" className="nav-link">📊 Dashboard</Link></li>
          <li><Link to="/seller/products" className="nav-link">📦 Products</Link></li>
          <li><Link to="/seller/orders" className="nav-link">🧾 Orders</Link></li>
          <li><Link to="/seller/add-product" className="nav-link">➕ Add Product</Link></li>
          <li><Link to="/seller/settings" className="nav-link">⚙️ Settings</Link></li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </div>
    </div>
  );
}
