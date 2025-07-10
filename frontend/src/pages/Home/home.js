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
      id: 1,
      name: "Floral Summer Dress",
      description: "Light and breezy floral dress perfect for summer.",
      price: 49.99,
      stock: 30,
      category: "Women",
      image: "https://m.media-amazon.com/images/I/71zVRn-DNsL._AC_UX679_.jpg"
    },
    {
      id: 2,
      name: "Women's Denim Jacket",
      description: "Classic fitted denim jacket with button closure.",
      price: 59.99,
      stock: 40,
      category: "Women",
      image: "https://m.media-amazon.com/images/I/61aCsTfpi-L._AC_UX679_.jpg"
    },
    {
      id: 3,
      name: "Elegant Evening Gown",
      description: "Stunning full-length dress for formal occasions.",
      price: 129.99,
      stock: 15,
      category: "Women",
      image: "https://m.media-amazon.com/images/I/71b8u2DjjDL._AC_UY741_.jpg"
    },
    {
      id: 4,
      name: "Ladies Handbag",
      description: "Stylish faux leather handbag with gold accents.",
      price: 69.99,
      stock: 50,
      category: "Women",
      image: "https://m.media-amazon.com/images/I/71a-G0PhDUL._AC_UY695_.jpg"
    },
    {
      id: 5,
      name: "Women's Running Shoes",
      description: "Comfortable sneakers for daily walking or gym.",
      price: 89.99,
      stock: 20,
      category: "Women",
      image: "https://m.media-amazon.com/images/I/71hg6cxl8CL._AC_UY695_.jpg"
    },

    // Men
    {
      id: 6,
      name: "Men's Slim Fit Shirt",
      description: "Sharp looking casual/business shirt.",
      price: 39.99,
      stock: 35,
      category: "Men",
      image: "https://m.media-amazon.com/images/I/61no93nM+2L._AC_UX522_.jpg"
    },
    {
      id: 7,
      name: "Men's Leather Jacket",
      description: "Biker style with zipper details.",
      price: 109.99,
      stock: 10,
      category: "Men",
      image: "https://m.media-amazon.com/images/I/81PbPPptHqL._AC_UX679_.jpg"
    },
    {
      id: 8,
      name: "Casual Sneakers",
      description: "Trendy low-top white sneakers for everyday use.",
      price: 59.99,
      stock: 25,
      category: "Men",
      image: "https://m.media-amazon.com/images/I/61ePbfeJQDL._AC_UX695_.jpg"
    },
    {
      id: 9,
      name: "Men's Watch",
      description: "Classic stainless steel wristwatch.",
      price: 89.99,
      stock: 30,
      category: "Men",
      image: "https://m.media-amazon.com/images/I/81C5LSKZ+rL._AC_UL1500_.jpg"
    },
    {
      id: 10,
      name: "Men's Hoodie",
      description: "Comfortable cotton hoodie for everyday wear.",
      price: 49.99,
      stock: 40,
      category: "Men",
      image: "https://m.media-amazon.com/images/I/61uK9xg0c3L._AC_UX679_.jpg"
    },

    // Electronics
    {
      id: 11,
      name: "Apple iPhone 14",
      description: "128GB, Midnight – Unlocked.",
      price: 899.99,
      stock: 12,
      category: "Electronics",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-finish-select-202209-6-1inch-midnight_AV1?wid=470&hei=556&fmt=png-alpha&.v=1661027371943"
    },
    {
      id: 12,
      name: "Sony Noise Cancelling Headphones",
      description: "WH-1000XM5 – Over-ear wireless.",
      price: 349.99,
      stock: 22,
      category: "Electronics",
      image: "https://m.media-amazon.com/images/I/61M8R3-V6-L._AC_SX679_.jpg"
    },
    {
      id: 13,
      name: "MacBook Air M2",
      description: "13-inch Retina display, 8GB RAM, 256GB SSD.",
      price: 1199.99,
      stock: 8,
      category: "Electronics",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-config-20220606?wid=820&hei=498&fmt=jpeg&qlt=95&.v=1654122894567"
    },
    {
      id: 14,
      name: "Canon EOS R50 Camera",
      description: "24MP Mirrorless with 18-45mm lens.",
      price: 679.99,
      stock: 5,
      category: "Electronics",
      image: "https://m.media-amazon.com/images/I/81H2l5HIXUL._AC_SX679_.jpg"
    },
    {
      id: 15,
      name: "Samsung 55” QLED TV",
      description: "Crystal-clear 4K UHD Smart TV.",
      price: 749.99,
      stock: 6,
      category: "Electronics",
      image: "https://m.media-amazon.com/images/I/91ZchUqAbPL._AC_SX679_.jpg"
    },

    // Accessories
    {
      id: 16,
      name: "Ray-Ban Sunglasses",
      description: "Classic aviator design, polarized lenses.",
      price: 149.99,
      stock: 18,
      category: "Accessories",
      image: "https://m.media-amazon.com/images/I/61Uv7DGTckL._AC_UX679_.jpg"
    },
    {
      id: 17,
      name: "Fjällräven Backpack",
      description: "Kånken Classic – durable and trendy.",
      price: 89.99,
      stock: 25,
      category: "Accessories",
      image: "https://m.media-amazon.com/images/I/81s6DUyQCZL._AC_SX679_.jpg"
    },
    {
      id: 18,
      name: "Apple AirPods Pro",
      description: "2nd Gen with active noise cancellation.",
      price: 249.99,
      stock: 28,
      category: "Accessories",
      image: "https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SX679_.jpg"
    },
    {
      id: 19,
      name: "Logitech MX Master 3S",
      description: "Advanced ergonomic wireless mouse.",
      price: 99.99,
      stock: 33,
      category: "Accessories",
      image: "https://m.media-amazon.com/images/I/61vJfZf6f6L._AC_SX679_.jpg"
    },
    {
      id: 20,
      name: "Wireless Power Bank",
      description: "10,000mAh fast charge portable battery.",
      price: 39.99,
      stock: 45,
      category: "Accessories",
      image: "https://m.media-amazon.com/images/I/71xheHLlE-L._AC_SX679_.jpg"
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/products`);
        setProducts(response.data.length > 0 ? response.data : dummyProducts);
      } catch (error) {
        console.warn("Using dummy products due to error:", error.message);
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
        <h1 className="text-center fw-bold mb-5">🛒 Welcome to Our Mega Store</h1>
        {categories.map((cat) => {
          const filtered = products.filter((p) => p.category === cat);
          if (!filtered.length) return null;

          return (
            <div key={cat} className="mb-5">
              <h3 className="fw-bold mb-4">{cat} Products</h3>
              <div className="row g-4">
                {filtered.map((product) => (
                  <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                    <ProductCard product={product} />
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
