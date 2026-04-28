import apiClient from "./apiClient.js";

export async function fetchProducts() {
  const response = await apiClient.get("/products");
  return response.data;
}
