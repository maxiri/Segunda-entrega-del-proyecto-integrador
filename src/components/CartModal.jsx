import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';

const CartModal = () => {
  const { cart, setCart, isCartOpen, toggleCart } = useContext(ProductContext);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') toggleCart();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [toggleCart]);

  const sumQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const subtractQuantity = (id) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            // Si solo hay 1, eliminar el producto
            if (item.quantity === 1) {
              return null;
            }
            // Si hay más de 1, restar
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item !== null) // Filtrar eliminados
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const closeModalOutside = (e) => {
    if (e.target.className === 'modal-overlay') {
      toggleCart();
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  if (!isCartOpen) return null;

  return (
    <div className="modal-overlay" style={styles.overlay} onClick={closeModalOutside}>
      <div style={styles.modal}>
        <button onClick={toggleCart}>Cerrar ✖️</button>
        <h2>Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} style={styles.item}>
                <img src={item.foto} alt={item.nombre} style={styles.img} />
                <div>
                  <h4>{item.nombre}</h4>
                  <p>Precio: ${item.precio}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Subtotal: ${item.precio * item.quantity}</p>
                  <button onClick={() => sumQuantity(item.id)}>+</button>
                  <button onClick={() => subtractQuantity(item.id)}>-</button>
                  <button onClick={() => removeFromCart(item.id)}>Eliminar ❌</button>
                </div>
              </div>
            ))}
            <hr />
            <h3>Total: ${totalPrice}</h3>
            <button onClick={clearCart} style={{ marginTop: '10px' }}>
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modal: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxHeight: '80vh',
    overflowY: 'auto',
    width: '400px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  item: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  img: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
  },
};

export default CartModal;
