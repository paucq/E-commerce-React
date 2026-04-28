import { create } from "zustand";
import { fetchProducts } from "../services/productService.js";

const useProductsStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  loadProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await fetchProducts();
      set({ products, isLoading: false });
    } catch (error) {
      set({
        error: error?.message ?? "No pudimos cargar los productos.",
        isLoading: false,
      });
    }
  },
}));

export default useProductsStore;
