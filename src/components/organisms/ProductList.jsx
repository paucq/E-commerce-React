import ProductCard from "../molecules/ProductCard.jsx";

export default function ProductList({ products, searchQuery }) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-10 text-center">
        <p className="text-sm font-semibold text-slate-700">
          No encontramos resultados.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Probá con otro termino o revisá la ortografía.
        </p>
        {searchQuery ? (
          <p className="mt-4 text-xs text-slate-400">
            Buscaste: <span className="font-semibold">{searchQuery}</span>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
