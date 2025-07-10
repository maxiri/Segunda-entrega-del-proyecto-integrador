import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const Header = () => {
  const { toggleCart, cart } = useContext(ProductContext);

  return (
    <header style={styles.header}>
      <nav>
        {/* Tus enlaces */}
        <button type="button" onClick={toggleCart}>
          🛒 Carrito ({cart.reduce((acc, item) => acc + item.quantity, 0)})
        </button>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    padding: '10px 20px',
    backgroundColor: '#048b7b',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
  
};

export default Header;
