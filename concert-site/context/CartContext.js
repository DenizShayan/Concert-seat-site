import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // each item = seat

  function addSeat(seat) {
    // seat: { id, row, number, price, sessionId }
    setItems((prev) => {
      // prevent duplicates
      const exists = prev.some((s) => s.id === seat.id);
      if (exists) return prev;
      return [...prev, seat];
    });
  }

  function removeSeat(seatId) {
    setItems((prev) => prev.filter((s) => s.id !== seatId));
  }

  function clearCart() {
    setItems([]);
  }

  const totalPrice = items.reduce((sum, seat) => sum + seat.price, 0);

  const value = {
    items,
    addSeat,
    removeSeat,
    clearCart,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Nice helper hook so we can call useCart() anywhere
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
