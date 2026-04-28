import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCartStore from "../store/useCartStore.js";
import { fetchProductById } from "../services/productService.js";

export default function ProductDetail() {
  const { productId } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(productId);
        if (isMounted) {
          setProduct(data);
        }
      } catch (error) {
        if (isMounted) {
          setError(error?.message ?? "No pudimos cargar el producto.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (isLoading) {
    return (
      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex h-96 items-center justify-center rounded-3xl border border-slate-200 bg-white">
          <div className="h-64 w-64 animate-pulse rounded-2xl bg-slate-100" />
        </div>
        <div className="space-y-4">
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
          <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="space-y-4">
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
        <Link className="text-sm font-semibold text-tech-primary" to="/">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  if (!product) {
    return null;
  }

  const { title, image, price, category, description, rating } = product;
  const formattedPrice =
    typeof price === "number" ? `$${price.toFixed(2)}` : "Precio no disponible";
  const ratingValue = rating?.rate ? rating.rate.toFixed(1) : null;
  const ratingCount = rating?.count ?? 0;

  return (
    <section className="space-y-8">
      <Link className="text-xs font-semibold uppercase text-tech-muted" to="/">
        Volver
      </Link>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex items-center justify-center rounded-3xl border border-tech-border bg-tech-surface p-8 shadow-glow">
          <img
            alt={title}
            className="h-72 w-auto object-contain"
            src={image}
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-muted">
              {category}
            </p>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-tech-ink">
              {title}
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-tech-muted">{description}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-tech-ink px-4 py-2 text-sm font-semibold text-white shadow-glow">
              {formattedPrice}
            </span>
            {ratingValue ? (
              <span className="text-xs font-medium text-tech-muted">
                {ratingValue} ({ratingCount} reseñas)
              </span>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="inline-flex h-11 items-center justify-center rounded-xl bg-tech-ink px-5 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition hover:bg-tech-primary"
              type="button"
              onClick={() => addItem(product)}
            >
              Agregar al carrito
            </button>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-xl border border-tech-border px-5 text-sm font-semibold uppercase tracking-[0.15em] text-tech-ink transition hover:border-tech-primary hover:text-tech-primary"
              to="/"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
