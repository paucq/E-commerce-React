import { create } from "zustand";

const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product) => {
    const items = get().items;
    const existingItem = items.find((item) => item.id === product.id);
    if (existingItem) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
      return;
    }
    set({
      items: [
        ...items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ],
    });
  },
  updateQuantity: (productId, quantity) => {
    const safeQuantity = Math.max(1, quantity);
    set({
      items: get().items.map((item) =>
        item.id === productId ? { ...item, quantity: safeQuantity } : item
      ),
    });
  },
  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.id !== productId) });
  },
  clearCart: () => set({ items: [] }),
  getTotals: () => {
    const items = get().items;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    return {
      totalItems,
      totalPrice,
    };
  },
}));

export default useCartStore;
