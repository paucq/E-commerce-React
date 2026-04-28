import ProductCard from "../molecules/ProductCard.jsx";

export default function ProductList({ products, searchQuery }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-tech-border bg-tech-surface px-6 py-10 text-center shadow-sm">
        <p className="text-sm font-semibold text-tech-ink">
          No encontramos resultados.
        </p>
        <p className="mt-2 text-sm text-tech-muted">
          Probá con otro término o revisá la ortografía.
        </p>
        {searchQuery ? (
          <p className="mt-4 text-xs text-tech-muted">
            Buscaste: <span className="font-semibold">{searchQuery}</span>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
