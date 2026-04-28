export default function ProductCard({ product }) {
  const { title, image, price, category, rating } = product;
  const formattedPrice =
    typeof price === "number" ? `$${price.toFixed(2)}` : "Precio no disponible";
  const ratingValue = rating?.rate ? rating.rate.toFixed(1) : null;
  const ratingCount = rating?.count ?? 0;

  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-48 items-center justify-center rounded-xl bg-slate-50">
        <img
          alt={title}
          className="h-40 w-auto object-contain"
          loading="lazy"
          src={image}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-xs uppercase tracking-wide text-slate-400">
          {category}
        </span>
        <h3 className="text-base font-semibold text-slate-900 line-clamp-2">
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-900">
            {formattedPrice}
          </span>
          {ratingValue ? (
            <span className="text-xs font-medium text-slate-500">
              {ratingValue} ({ratingCount})
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
