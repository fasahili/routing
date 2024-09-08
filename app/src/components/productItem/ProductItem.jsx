import React, { useState } from "react";
import "./ProductItem.style.css";

const ProductItem = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="product-item">
      <h2>{product.title}</h2>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      {showDescription && (
        <p>
          <strong>Description:</strong> {product.description}
        </p>
      )}
      <button onClick={toggleDescription}>
        {showDescription ? "Hide Description" : "See Description"}
      </button>
      <img src={product.image} alt={product.title} className="product-image" />
    </div>
  );
};

export default ProductItem;
