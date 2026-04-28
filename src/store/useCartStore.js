import { create } from "zustand";

const STORAGE_KEY = "ecommerce-cart";

const loadCartState = () => {
  if (typeof window === "undefined") {
    return { items: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { items: [] };
    }
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) {
      return { items: [] };
    }
    return { items: parsed.items };
  } catch (error) {
    return { items: [] };
  }
};

const persistCart = (items) => {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items }));
  } catch (error) {
    // ignore write errors
  }
};

const updateCartItems = (set, nextItems) => {
  set({ items: nextItems });
  persistCart(nextItems);
};

const useCartStore = create((set, get) => ({
  ...loadCartState(),
  addItem: (product) => {
    const items = get().items;
    const existingItem = items.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      updateCartItems(set, updatedItems);
      return;
    }
    updateCartItems(set, [
      ...items,
      {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      },
    ]);
  },
  updateQuantity: (productId, quantity) => {
    const safeQuantity = Math.max(1, quantity);
    const updatedItems = get().items.map((item) =>
      item.id === productId ? { ...item, quantity: safeQuantity } : item
    );
    updateCartItems(set, updatedItems);
  },
  removeItem: (productId) => {
    const updatedItems = get().items.filter((item) => item.id !== productId);
    updateCartItems(set, updatedItems);
  },
  clearCart: () => updateCartItems(set, []),
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
