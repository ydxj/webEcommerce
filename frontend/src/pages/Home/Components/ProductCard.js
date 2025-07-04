import { useEffect, useRef } from "react";
import { FaTag, FaBoxOpen } from "react-icons/fa";
import gsap from "gsap";

function ProductCard({ product }) {
  const cardRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={cardRef}
      className="card shadow-sm rounded-4 p-3"
      style={{ cursor: "pointer", maxWidth: "350px", display: "flex", flexDirection: "column" }}
    >
      <div
        className="d-flex flex-column"
        style={{ flexGrow: 1, gap: "1rem" }}
      >
        {/* Image */}
        <div style={{ flexShrink: 0, borderRadius: "12px", overflow: "hidden", height: "200px" }}>
          <img
            src={product.image_url}
            alt={product.alt_text}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Info */}
        <div className="d-flex flex-column flex-grow-1">
          <h5 className="card-title text-truncate mb-2">{product.name}</h5>
          <p
            className="card-text text-muted flex-grow-1"
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              fontSize: "0.9rem",
            }}
          >
            {product.description}
          </p>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <p className="mb-1 d-flex align-items-center gap-2 text-success fw-semibold" style={{ fontSize: "1.1rem" }}>
                <FaTag /> ${product.price.toFixed(2)}
              </p>
              <p
                className={`mb-0 d-flex align-items-center gap-2 ${
                  product.stock > 0 ? "text-primary" : "text-danger"
                } fw-semibold`}
              >
                <FaBoxOpen />
                {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
              </p>
            </div>
            <a
              href={`/products/${product.id}`}
              className="btn btn-outline-primary btn-sm rounded-pill"
              style={{ whiteSpace: "nowrap" }}
            >
              View Product
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
