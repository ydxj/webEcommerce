import { useEffect, useState, useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import { Card, Spinner } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import BuyerLayout from "../layout/BuyerLayout";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const ordersRef = useRef(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const userId = localStorage.getItem("userId"); // Adjust if using context/auth
        const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
        setOrders(response.data);
        setLoading(false);
        gsap.fromTo(
          ordersRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        );
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="text-success" />;
      case "cancelled":
        return <FaTimesCircle className="text-danger" />;
      default:
        return <FaClock className="text-warning" />;
    }
  };

  return (
    <>
        <BuyerLayout />
    <div className="container py-5">
      <h3 className="mb-4 fw-bold">🧾 My Orders</h3>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <div ref={ordersRef} className="row row-cols-1 row-cols-md-2 g-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div className="col" key={order.id}>
                <Card className="shadow-sm border rounded-4 p-3 h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between mb-2">
                      <span className="fw-bold">Order #{order.id}</span>
                      {getStatusIcon(order.status)}
                    </div>
                    <p className="mb-1 text-muted">Placed: {new Date(order.created_at).toLocaleDateString()}</p>
                    <p className="fw-semibold mb-2">Total: ${parseFloat(order.total_price).toFixed(2)}</p>
                    <a
                      href={`/orders/${order.id}`}
                      className="btn btn-outline-primary btn-sm rounded-pill"
                    >
                      View Details
                    </a>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">
              You haven’t placed any orders yet.
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
}

export default MyOrders;
