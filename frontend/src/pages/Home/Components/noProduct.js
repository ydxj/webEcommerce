import { useEffect, useRef } from "react";
import gsap from "gsap";

function NoProducts() {
  const containerRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-center mt-5 px-3"
      style={{ maxWidth: 400, margin: "auto" }}
    >
      {/* Simple friendly illustration */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="150"
        fill="none"
        viewBox="0 0 64 64"
        style={{ marginBottom: 20 }}
      >
        <circle cx="32" cy="32" r="30" fill="#f0f0f0" />
        <path
          fill="#ccc"
          d="M22 25h20v2H22zm0 8h20v2H22zm0 8h20v2H22z"
          opacity="0.6"
        />
        <path
          fill="#bbb"
          d="M32 15a6 6 0 100 12 6 6 0 000-12z"
        />
      </svg>

      <h2 className="mb-3" style={{ fontWeight: "700", color: "#555" }}>
        No Products Available
      </h2>
      <p style={{ color: "#777", fontSize: "1rem" }}>
        We’re sorry, but there are currently no products to display. Please check back later or try adjusting your filters.
      </p>
    </div>
  );
}

export default NoProducts;
