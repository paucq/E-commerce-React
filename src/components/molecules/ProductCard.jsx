import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { title, image, price, category, rating, id } = product;
  const formattedPrice =
    typeof price === "number" ? `$${price.toFixed(2)}` : "Precio no disponible";
  const ratingValue = rating?.rate ? rating.rate.toFixed(1) : null;
  const ratingCount = rating?.count ?? 0;

  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-tech-border bg-tech-surface p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-tech-primary/50 hover:shadow-glow sm:p-5">
      <div className="flex h-40 items-center justify-center rounded-xl bg-tech-surface-soft sm:h-48">
        <img
          alt={title}
          className="h-32 w-auto object-contain sm:h-40"
          loading="lazy"
          src={image}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-tech-muted">
          {category}
        </span>
        <h3 className="font-display text-base font-semibold text-tech-ink line-clamp-2 sm:text-lg">
          {title}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-base font-semibold text-tech-ink sm:text-lg">
            {formattedPrice}
          </span>
          {ratingValue ? (
            <span className="text-xs font-medium text-tech-muted">
              {ratingValue} ({ratingCount})
            </span>
          ) : null}
        </div>
        <Link
          to={`/products/${id}`}
          className="mt-3 inline-flex items-center justify-center rounded-lg border border-tech-border px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-tech-ink transition hover:border-tech-primary hover:text-tech-primary"
        >
          Ver detalles
        </Link>
      </div>
    </article>
  );
}
