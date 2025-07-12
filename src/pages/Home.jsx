import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductModal from '../components/ProductModal';
import '../scss/pages/_home.scss';

const Home = () => {
  const { products, addToCart } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCartAndClose = () => {
    addToCart(selectedProduct);
    setSelectedProduct(null);
  };

  return (
    <div className="home-container">
      <h1>Lista de Productos</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleCardClick(product)}
          >
            <img src={product.foto} alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <p>{product.descripcionCorta}</p>
            <p><strong>${product.precio}</strong></p>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCartAndClose}
        />
      )}
    </div>
  );
};

export default Home;
