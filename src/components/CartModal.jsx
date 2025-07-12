import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import '../scss/components/_cartmodal.scss';
const CartModal = () => {
  const { cart, setCart, isCartOpen, toggleCart, finalizePurchase } = useContext(ProductContext);

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
            if (item.quantity === 1) return null;
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item !== null)
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
    <div className="modal-overlay" onClick={closeModalOutside}>
      <div className="cart-modal">
        <button className="close-btn" onClick={toggleCart}>Cerrar ✖️</button>
        <h2>Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.foto} alt={item.nombre} />
                <div>
                  <h4>{item.nombre}</h4>
                  <p>Precio: ${item.precio}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Subtotal: ${item.precio * item.quantity}</p>
                  <button onClick={() => sumQuantity(item.id)}>+</button>
                  <button onClick={() => subtractQuantity(item.id)}>-</button>
                  <button className="delete-btn" onClick={() => removeFromCart(item.id)}>Eliminar ❌</button>
                </div>
              </div>
            ))}
            <hr />
            <h3>Total: ${totalPrice}</h3>
            <button className="clear-btn" onClick={clearCart}>
              Vaciar carrito
            </button>
            <button className="buy-btn" onClick={finalizePurchase}>
              Finalizar compra 🛒
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
