import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./SellerDashboard.css"; // custom CSS
import SellerLayout from "../layout/SellerLayout";

export default function SellerDashboard() {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.from(cardsRef.current, {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  const stats = [
    { label: "Total Sales", value: "$7,820.50", icon: "💰" },
    { label: "Products", value: "34", icon: "📦" },
    { label: "Orders", value: "97", icon: "🛒" },
  ];

  return (
    <>
    <SellerLayout />
    <div className="container py-5">
      <h2 className="mb-4 text-center fw-bold">Seller Dashboard</h2>
      <div className="row g-4 justify-content-center">
        {stats.map((stat, index) => (
          <div className="col-md-4" key={index}>
            <div
              className="card dashboard-card h-100 text-center shadow-sm"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="card-body">
                <div className="display-5">{stat.icon}</div>
                <h5 className="card-title mt-3">{stat.label}</h5>
                <p className="card-text fs-4 fw-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
