import { useState, useEffect } from "react";
import Header from "./Components/header/header";
import axios from "axios";
import { backendUrl } from "../../env";
import ProductCard from "./Components/ProductCard";
import NoProducts from "./Components/noProduct";
import Footer from "./Components/Footer";

function Home() {
  const [products, setProducts] = useState([]);

  const dummyProducts = [
    // Women
    {
      id: 1, name: "Elegant Red Dress", description: "Stylish for all occasions", price: 59.99, stock: 20, category: "Women", image: "https://m.media-amazon.com/images/I/61cSwc9dA8L._AC_UY879_.jpg"
    },
    {
      id: 2, name: "Casual Women's Sneakers", description: "Comfortable walking shoes", price: 39.99, stock: 35, category: "Women", image: "https://m.media-amazon.com/images/I/61zF4xdyLmL._AC_UY695_.jpg"
    },
    {
      id: 3, name: "Ladies Handbag", description: "Leather crossbody bag", price: 79.99, stock: 50, category: "Women", image: "https://m.media-amazon.com/images/I/81vpsIs58WL._AC_UY695_.jpg"
    },

    // Men
    {
      id: 4, name: "Men's Slim Fit Shirt", description: "Perfect for business or casual", price: 45.99, stock: 40, category: "Men", image: "https://m.media-amazon.com/images/I/61m+VDQyMyL._AC_UX569_.jpg"
    },
    {
      id: 5, name: "Men's Leather Belt", description: "Genuine leather classic belt", price: 25.99, stock: 60, category: "Men", image: "https://m.media-amazon.com/images/I/81KnGMldnFL._AC_UX679_.jpg"
    },

    // Electronics
    {
      id: 6, name: "iPhone 14 Pro", description: "128GB - Space Black", price: 999.99, stock: 10, category: "Electronics", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-deep-purple?wid=940&hei=1112"
    },
    {
      id: 7, name: "Samsung 55\" QLED TV", description: "Smart 4K Ultra HD", price: 699.99, stock: 5, category: "Electronics", image: "https://m.media-amazon.com/images/I/91ZchUqAbPL._AC_SX679_.jpg"
    },
    {
      id: 8, name: "Logitech Wireless Mouse", description: "MX Master 3S", price: 99.99, stock: 30, category: "Electronics", image: "https://m.media-amazon.com/images/I/61vJfZf6f6L._AC_SX679_.jpg"
    },

    // Accessories
    {
      id: 9, name: "Ray-Ban Sunglasses", description: "Polarized lenses", price: 149.99, stock: 22, category: "Accessories", image: "https://m.media-amazon.com/images/I/61Uv7DGTckL._AC_UX679_.jpg"
    },
    {
      id: 10, name: "Fossil Watch", description: "Men's chronograph watch", price: 129.99, stock: 15, category: "Accessories", image: "https://m.media-amazon.com/images/I/81YI4F6zdzL._AC_UL1500_.jpg"
    },

    // Add 20 more...
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 11,
      name: `Product ${i + 11}`,
      description: `Awesome item ${i + 11}`,
      price: 19.99 + i,
      stock: 100 - i,
      category: i % 4 === 0 ? "Women" : i % 4 === 1 ? "Men" : i % 4 === 2 ? "Electronics" : "Accessories",
      image: "https://via.placeholder.com/300x300.png?text=Product+" + (i + 11)
    }))
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/products`);
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          setProducts(dummyProducts);
        }
      } catch (err) {
        console.error("API failed, using dummy data", err);
        setProducts(dummyProducts);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["Women", "Men", "Electronics", "Accessories"];

  return (
    <div className="bg-light">
      <Header />
      <div className="container py-5">
        <h1 className="text-center fw-bold mb-5">Welcome to Our Mega Store 🛍️</h1>

        {categories.map((cat) => {
          const catProducts = products.filter((p) => p.category === cat);
          if (catProducts.length === 0) return null;

          return (
            <div key={cat} className="mb-5">
              <h3 className="fw-bold mb-3">{cat} Products</h3>
              <div className="row g-4">
                {catProducts.map((item) => (
                  <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                    <ProductCard product={item} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
