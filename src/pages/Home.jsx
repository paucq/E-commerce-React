import { useEffect, useMemo, useState } from "react";
import Pagination from "../components/molecules/Pagination.jsx";
import ProductList from "../components/organisms/ProductList.jsx";
import useProductsStore from "../store/useProductsStore.js";

export default function Home() {
  const { products, isLoading, error, loadProducts, searchQuery } =
    useProductsStore();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredProducts = useMemo(() => {
    if (!normalizedQuery) {
      return products;
    }
    return products.filter((product) => {
      const title = product?.title ?? "";
      const category = product?.category ?? "";
      return (
        title.toLowerCase().includes(normalizedQuery) ||
        category.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [products, normalizedQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-tech-border bg-tech-hero p-6 shadow-glow sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-muted">
          Catálogo
        </p>
        <h1 className="font-display text-3xl font-semibold text-tech-ink sm:text-4xl">
          Productos destacados
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <p className="max-w-2xl text-sm text-tech-muted sm:text-base">
            Explorá la selección completa desde FakeStore API.
          </p>
          <span className="rounded-full border border-tech-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-tech-primary">
            Tech Pop
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="h-72 animate-pulse rounded-2xl border border-tech-border bg-tech-surface"
            />
          ))}
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {!isLoading && !error ? (
        <div className="space-y-8">
          <ProductList products={paginatedProducts} searchQuery={searchQuery} />
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : null}
    </section>
  );
}
