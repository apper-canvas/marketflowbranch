import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("marketflow_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("marketflow_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(item => item.productId === product.Id);
      
      if (existingItem) {
        toast.success("Cart updated successfully!");
        return currentItems.map(item =>
          item.productId === product.Id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success("Item added to cart!");
        return [...currentItems, {
          productId: product.Id,
          quantity: 1,
          savedForLater: false,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(currentItems => {
      const newItems = currentItems.filter(item => item.productId !== productId);
      toast.success("Item removed from cart");
      return newItems;
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(currentItems =>
      currentItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const saveForLater = (productId) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.productId === productId
          ? { ...item, savedForLater: !item.savedForLater }
          : item
      )
    );
    toast.info("Item saved for later");
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared");
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = (products) => {
    return cartItems.reduce((total, item) => {
      const product = products.find(p => p.Id === item.productId);
      if (product) {
        return total + (product.discountPrice || product.price) * item.quantity;
      }
      return total;
    }, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    saveForLater,
    clearCart,
    getCartCount,
    getCartTotal
  };
};