// context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const CartContext = createContext();

// Hook para usar el contexto
export function useCart() {
  return useContext(CartContext);
}

// Proveedor del contexto
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
