import React, { createContext, useState, useEffect } from 'react';

// Creamos el contexto
export const ProductContext = createContext();

// Provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); // Productos disponibles
  const [cart, setCart] = useState(() => {
    // Si hay datos previos en localStorage
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Traer productos de mockapi (lo completaremos luego)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://686ee02191e85fac429f37e2.mockapi.io/:endpoint'); // ⚠️ Cambiar por tu URL
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener productos', error);
      }
    };
    fetchProducts();
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Función para agregar al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Podés agregar otras funciones como removeItem, clearCart, etc.

  return (
    <ProductContext.Provider value={{ products, cart, setCart, addToCart }}>
      {children}
    </ProductContext.Provider>
  );
};
