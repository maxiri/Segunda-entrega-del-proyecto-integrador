import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import '../scss/pages/_home.scss';

const Home = () => {
  const { products, addToCart } = useContext(ProductContext);

  return (
    <div className="home-container">
      <h1>Lista de Productos</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.foto} alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <p>{product.descripcionCorta}</p>
            <p><strong>${product.precio}</strong></p>
            <button onClick={() => addToCart(product)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
