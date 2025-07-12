import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const Header = () => {
  const { toggleCart, cart } = useContext(ProductContext);

  return (
    <header style={styles.header}>
      <h2 style={styles.title}>
        <Link to="/" style={styles.link}>Mi Tienda</Link>
      </h2>

      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/alta" style={styles.link}>Alta</Link>
        <Link to="/contacto" style={styles.link}>Contacto</Link>
        <button type="button" onClick={toggleCart} style={styles.cartButton}>
          🛒 ({cart.reduce((acc, item) => acc + item.quantity, 0)})
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
  },
  title: {
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
  cartButton: {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Header;
