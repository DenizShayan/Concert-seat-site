import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeSeat, clearCart, totalPrice } = useCart();

  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart 🛒</h1>

      {items.length === 0 ? (
        <p className="text-slate-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((seat) => (
              <div
                key={seat.id}
                className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 p-4"
              >
                <div>
                  <p className="font-semibold">
                    Row {seat.row} - Seat {seat.number}
                  </p>
                  <p className="text-sm text-slate-400">
                    Session: {seat.sessionId}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-semibold">
                    ${seat.price}
                  </span>
                  <button
                    onClick={() => removeSeat(seat.id)}
                    className="text-red-400 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-slate-700 pt-4">
            <div>
              <p className="text-lg font-semibold">
                Total: <span className="text-emerald-400">${totalPrice}</span>
              </p>
              <p className="text-sm text-slate-400">
                Tickets: {items.length}
              </p>
            </div>

            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </main>
  );
}
