"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  imageUrl: string;
  hoverImageUrl?: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

interface CartContextType {
  cart: CartState;
  addToCart: (product: Omit<CartItem, 'quantity'>, quantity: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }
  return { items: [], totalItems: 0, totalPrice: 0 };
};

// Save cart to localStorage
const saveCartToStorage = (cart: CartState): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { item: Omit<CartItem, 'quantity'>; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { item, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        cartItem => cartItem.id === item.id && cartItem.size === item.size
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // Add new item
        newItems = [...state.items, { ...item, quantity }];
      }

      const newState = {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      };

      saveCartToStorage(newState);
      return newState;
    }

    case 'REMOVE_FROM_CART': {
      const { id, size } = action.payload;
      const newItems = state.items.filter(
        item => !(item.id === id && item.size === size)
      );

      const newState = {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      };

      saveCartToStorage(newState);
      return newState;
    }

    case 'UPDATE_QUANTITY': {
      const { id, size, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { id, size } });
      }

      const newItems = state.items.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      );

      const newState = {
        items: newItems,
        totalItems: newItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      };

      saveCartToStorage(newState);
      return newState;
    }

    case 'CLEAR_CART': {
      const newState = { items: [], totalItems: 0, totalPrice: 0 };
      saveCartToStorage(newState);
      return newState;
    }

    case 'LOAD_CART':
      return action.payload;

    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, loadCartFromStorage());

  // Load cart from localStorage on mount
  useEffect(() => {
    const initialCart = loadCartFromStorage();
    dispatch({ type: 'LOAD_CART', payload: initialCart });
  }, []);

  const addToCart = (product: Omit<CartItem, 'quantity'>, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { item: product, quantity } });
  };

  const removeFromCart = (id: string, size: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id, size } });
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
