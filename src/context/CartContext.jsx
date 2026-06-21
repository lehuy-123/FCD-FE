import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Initialize cart state synchronously if user is already known
  const [cart, setCart] = useState(() => {
    // Attempt to get user from localStorage directly if context hasn't updated yet
    // though since we're a child of AuthProvider, it should be fine.
    const savedUser = localStorage.getItem('facades_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser && parsedUser.id) {
        const savedCart = localStorage.getItem(`facades_cart_${parsedUser.id}`);
        return savedCart ? JSON.parse(savedCart) : [];
      }
    }
    return [];
  });

  // Load cart when user changes (e.g. login/logout)
  useEffect(() => {
    if (user && user.id) {
      const saved = localStorage.getItem(`facades_cart_${user.id}`);
      setCart(saved ? JSON.parse(saved) : []);
    } else {
      setCart([]);
    }
  }, [user]);

  // Save cart when it changes
  useEffect(() => {
    if (user && user.id) {
      localStorage.setItem(`facades_cart_${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product) => {
    if (!user) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, selected: true }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const toggleSelection = (id) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const toggleAll = (isSelected) => {
    setCart(prev => prev.map(item => ({ ...item, selected: isSelected })));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      toggleSelection, 
      toggleAll,
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};
