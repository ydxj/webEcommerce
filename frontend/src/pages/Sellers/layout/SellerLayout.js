import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import "./sellerMenu.css";

export default function SellerLayout() {
  const navRef = useRef();
  const location = useLocation();

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, []);

  const navItems = [
    { label: "Dashboard", path: "/seller/dashboard" },
    { label: "Products", path: "/seller/products" },
    { label: "Orders", path: "/seller/orders" },
    { label: "Add Product", path: "/seller/add-product" },
    { label: "Settings", path: "/seller/settings" },
  ];

  return (
    <div>
      <nav
        ref={navRef}
        className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm"
      >
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/seller/dashboard">
            Seller Panel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sellerNavbar"
            aria-controls="sellerNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="sellerNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {navItems.map(({ label, path }) => (
                <li className="nav-item" key={path}>
                  <Link
                    to={path}
                    className={`nav-link ${
                      location.pathname === path ? "active" : ""
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="container my-4">
        <Outlet />
      </main>
    </div>
  );
}
