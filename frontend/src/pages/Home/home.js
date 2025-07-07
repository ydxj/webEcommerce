import { useState } from "react";
import Header from "./Components/header/header";
import { useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../../env";
import ProductCard from "./Components/ProductCard";
import NoProducts from "./Components/noProduct";
import Footer from "./Components/Footer";

function Home(){
    const [product, setProduct] = useState([]);
    const [testProduct, setTestProduct] = useState([{
        name: "Test Product",
        description: "This is a test product",
        price: 19.99,
        stock: 100,
        category: 1,
        seller_id: 1
    }, {
        name: "Test Product 2",
        description: "This is another test product",
        price: 29.99,
        stock: 50,
        category: 2,
        seller_id: 1
    
    }, {
        name: "Test Product 2",
        description: "This is another test product",
        price: 29.99,
        stock: 50,
        category: 2,
        seller_id: 1
    
    }, {
        name: "Test Product 2",
        description: "This is another test product",
        price: 29.99,
        stock: 50,
        category: 2,
        seller_id: 1
    }]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/products`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);
    
    return (
        <div>
            <Header />
            {product.length > 0 ? (
                <div className="d-flex flex-wrap gap-4 justify-content-center">
                    {product.map((item) => (
                        <ProductCard product={item} key={item.id} />
                    ))}
                </div>
            ) : (
                <NoProducts />
            )}
            <Footer />
        </div>
    )
}
export default Home;