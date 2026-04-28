import { useEffect } from "react";
import ProductList from "../components/organisms/ProductList.jsx";
import useProductsStore from "../store/useProductsStore.js";

export default function Home() {
  const { products, isLoading, error, loadProducts } = useProductsStore();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Catálogo
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Productos destacados
        </h1>
        <p className="max-w-2xl text-sm text-slate-600">
          Explorá la selección completa desde FakeStore API.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white"
            />
          ))}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {!isLoading && !error ? <ProductList products={products} /> : null}
    </section>
  );
}
