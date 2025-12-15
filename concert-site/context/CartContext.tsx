import { createContext, useContext, useState, type ReactNode } from "react";

export type Seat = {
  id: number;
  row: string;
  number: number;
  price: number;
  sessionId: number;
};

type CartContextValue = {
  items: Seat[];
  addSeat: (seat: Seat) => void;
  removeSeat: (seatId: number) => void;
  clearCart: () => void;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartProviderProps = {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<Seat[]>([]); // each item = seat

  function addSeat(seat: Seat) {
    // seat: { id, row, number, price, sessionId }
    setItems((prev) => {
      // prevent duplicates...
      const exists = prev.some((s) => s.id === seat.id);
      if (exists) return prev;
      return [...prev, seat];
    });
  }

  function removeSeat(seatId: number) {
    setItems((prev) => prev.filter((s) => s.id !== seatId));
  }

  function clearCart() {
    setItems([]);
  }

  const totalPrice = items.reduce((sum, seat) => sum + seat.price, 0);

  const value: CartContextValue = {
    items,
    addSeat,
    removeSeat,
    clearCart,
    totalPrice,
  };

  return <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>;
}

// helper hook for being able to call useCart() anywhere!
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}