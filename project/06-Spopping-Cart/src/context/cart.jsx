import { createContext, useState } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity += 1;
      return setCart(newCart);
    }
    setCart((prevState) => [...prevState, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (product) => {
    setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  };

  const decrementQuantity = (product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCartIndex].quantity -= 1;
      if (newCart[productInCartIndex].quantity === 0) {
        return removeFromCart(product);
      }
      return setCart(newCart);
    }
  };

  const updateQuantity = (product, quantity) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);

    if (productInCartIndex >= 0) {
      const newCart = structuredClone(cart);
      if (quantity <= 0) {
        return removeFromCart(product);
      }
      newCart[productInCartIndex].quantity = quantity;
      return setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, decrementQuantity, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
