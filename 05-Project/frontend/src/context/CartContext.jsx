import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'cart';

// Cart shape: { restaurantId, restaurantName, items: [{ foodId, name, price, quantity, image }] }
const getInitialCart = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { restaurantId: null, restaurantName: '', items: [] };
  } catch (err) {
    return { restaurantId: null, restaurantName: '', items: [] };
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Adds a food item to the cart. If the cart already has items from a
  // different restaurant, the cart is reset first (single-restaurant cart).
  const addToCart = (food, restaurant) => {
    setCart((prev) => {
      const isDifferentRestaurant = prev.restaurantId && prev.restaurantId !== restaurant._id;

      const baseItems = isDifferentRestaurant ? [] : prev.items;
      const existingItem = baseItems.find((item) => item.foodId === food._id);

      let newItems;
      if (existingItem) {
        newItems = baseItems.map((item) =>
          item.foodId === food._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [
          ...baseItems,
          {
            foodId: food._id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1,
          },
        ];
      }

      return {
        restaurantId: restaurant._id,
        restaurantName: restaurant.name,
        items: newItems,
      };
    });
  };

  const updateQuantity = (foodId, quantity) => {
    if (quantity < 1) return;
    setCart((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.foodId === foodId ? { ...item, quantity } : item)),
    }));
  };

  const removeFromCart = (foodId) => {
    setCart((prev) => {
      const newItems = prev.items.filter((item) => item.foodId !== foodId);
      return {
        ...prev,
        items: newItems,
        restaurantId: newItems.length ? prev.restaurantId : null,
        restaurantName: newItems.length ? prev.restaurantName : '',
      };
    });
  };

  const clearCart = () => {
    setCart({ restaurantId: null, restaurantName: '', items: [] });
  };

  const cartTotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
