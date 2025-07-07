import { useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaHeart, FaBox, FaUserCircle } from "react-icons/fa";
import gsap from "gsap";
import "./BuyerDashboard.css";
import BuyerLayout from "./layout/BuyerLayout";

function BuyerDashboard({ user }) {
  const [recentOrders, setRecentOrders] = useState([]);
  const cardsRef = useRef([]);
  const sectionRef = useRef();

  useEffect(() => {
    // Sample orders — replace with API call
    setRecentOrders([
      { id: 1, product: "Vitamin C Gummies", status: "Delivered", date: "2025-07-01" },
      { id: 2, product: "Omega-3 Capsules", status: "Shipped", date: "2025-07-03" },
    ]);

    // Animate cards on load
    gsap.from(cardsRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power3.out"
    });

    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.5,
      ease: "power2.out"
    });
  }, []);

  const summaryCards = [
    { label: "Orders", value: 8, icon: <FaBox />, color: "primary" },
    { label: "Favorites", value: 5, icon: <FaHeart />, color: "danger" },
    { label: "Cart", value: "2 items", icon: <FaShoppingCart />, color: "success" },
    { label: "Profile", value: "Updated", icon: <FaUserCircle />, color: "info" },
  ];

  return (
    <>
    <BuyerLayout />
    <div className="container py-5">
      {/* Welcome */}
      <div className="mb-4 d-flex align-items-center gap-3">
        <FaUserCircle size={42} className="text-primary" />
        <div>
          <h2 className="fw-bold mb-0">Welcome back, {user?.name || "Buyer"}!</h2>
          <small className="text-muted">Here's your latest activity.</small>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-4 mb-5">
        {summaryCards.map((card, idx) => (
          <div className="col-md-3 col-sm-6" key={idx} ref={(el) => (cardsRef.current[idx] = el)}>
            <div className={`card border-0 shadow-sm rounded-4 bg-light p-3 h-100`}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <p className="text-muted small mb-1">{card.label}</p>
                  <h5 className="fw-bold mb-0">{card.value}</h5>
                </div>
                <div className={`text-${card.color} fs-3`}>{card.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="mb-4" ref={sectionRef}>
        <h5 className="mb-3 fw-semibold">Quick Categories</h5>
        <div className="d-flex flex-wrap gap-2">
          {["Vitamins", "Supplements", "Wellness", "Kids", "Immunity"].map((cat, idx) => (
            <button key={idx} className="btn btn-outline-primary rounded-pill btn-sm px-3">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card border-0 shadow-sm rounded-4 p-4 mt-4">
        <h5 className="fw-semibold mb-3">Recent Orders</h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.product}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        order.status === "Delivered" ? "success" : "warning text-dark"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
}

export default BuyerDashboard;
