import React from 'react';
import '../scss/components/_productModal.scss';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  return (
    <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>✖️</button>
        <img src={product.foto} alt={product.nombre} />
        <h2>{product.nombre}</h2>
        <p>{product.descripcionLarga}</p>
        <p><strong>Precio: ${product.precio}</strong></p>
        <button className="add-btn" onClick={onAddToCart}>Agregar al carrito 🛒</button>
      </div>
    </div>
  );
};

export default ProductModal;
