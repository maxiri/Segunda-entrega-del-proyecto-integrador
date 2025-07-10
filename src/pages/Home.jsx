import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const Home = () => {
  const { products, addToCart } = useContext(ProductContext);

  return (
    <div>
      <h1>Lista de Productos</h1>


      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.foto} alt={product.nombre} style={styles.img} />
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

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
    marginTop: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '12px',
    textAlign: 'center',
  },
  img: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  toast: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'green',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '8px',
    zIndex: 999,
  },
};

export default Home;

