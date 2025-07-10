function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={product.image}
        alt={product.name}
        className="card-img-top"
        style={{ height: "220px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h6 className="fw-bold">{product.name}</h6>
        <p className="text-muted small mb-2">{product.description}</p>
        <strong className="text-primary">${product.price.toFixed(2)}</strong>
        <button className="btn btn-sm btn-outline-dark mt-auto">Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
