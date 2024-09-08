import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../api/productService";
import ProductItem from "../../components/productItem/ProductItem";
import "./home.style.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <h1>Products List</h1>
      <div className="products-list">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
