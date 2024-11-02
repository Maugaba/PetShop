import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchCart = async () => {
    if (!user) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/carrito/cart', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const items = data.items.map(item => ({
          id: item.product.id,
          name: item.product.name,
          price: parseFloat(item.product.price),
          quantity: item.quantity,
        }));
        setCartItems(items);
      } else {
        console.error('Error al obtener el carrito');
      }
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    if (!user) {
      console.error('Debe iniciar sesión para agregar productos al carrito');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/carrito/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        await fetchCart();
      } else {
        console.error('Error al agregar producto al carrito');
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (!user) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/carrito/cart/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity,
        }),
      });

      if (response.ok) {
        await fetchCart();
      } else {
        console.error('Error al actualizar cantidad en el carrito');
      }
    } catch (error) {
      console.error('Error al actualizar cantidad en el carrito:', error);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/carrito/cart/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          product_id: productId,
        }),
      });

      if (response.ok) {
        await fetchCart();
      } else {
        console.error('Error al eliminar producto del carrito');
      }
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart: cartItems, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
