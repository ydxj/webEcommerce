import { useEffect, useRef } from "react";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
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

  // Function to generate star rating (static for now — can be dynamic)
  const renderStars = (rating = 4) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {Array(fullStars).fill().map((_, i) => (
          <FaStar key={i} className="text-warning" />
        ))}
        {Array(emptyStars).fill().map((_, i) => (
          <FaRegStar key={i} className="text-warning" />
        ))}
      </>
    );
  };

  return (
    <div className="col" ref={cardRef}>
      <div className="bg-white rounded border shadow-sm p-3 position-relative product-card h-100">
        {/* Wishlist Button */}
        <button
          className="btn btn-sm btn-light position-absolute top-0 end-0 m-2"
          title="Add to Wishlist"
        >
          <FaHeart className="text-danger" />
        </button>

        {/* Product Image */}
        <a href={`/products/${product.id}`}>
          <img
            src={product.image_url}
            alt={product.alt_text || product.name}
            className="w-100 mb-2"
            style={{ objectFit: "cover", height: "200px", borderRadius: "0.5rem" }}
          />
        </a>

        {/* Product Name */}
        <div className="fw-medium small text-truncate">
          {product.name}
        </div>

        {/* Product Price */}
        <div className="fw-bold">${product.price.toFixed(2)}</div>

        {/* Static Rating */}
        <div className="text-warning small d-flex align-items-center gap-1">
          {renderStars(product.rating)}
          <span className="text-muted">({product.reviewsCount || 0})</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
