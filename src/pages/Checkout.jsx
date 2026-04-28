import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore.js";

export default function Checkout() {
  const { items, getTotals } = useCartStore();
  const { totalItems, totalPrice } = getTotals();
  const formattedTotal = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-muted">
          Checkout
        </p>
        <h1 className="font-display text-2xl font-semibold text-tech-ink sm:text-3xl">
          Confirmá tu compra
        </h1>
        <p className="text-sm text-tech-muted sm:text-base">
          Revisá tu pedido antes de finalizar.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-tech-border bg-tech-surface p-6 text-sm text-tech-muted">
              Tu carrito está vacío. Agregá productos para continuar.
            </div>
          ) : (
            items.map((item) => {
              const lineTotal = item.price * item.quantity;
              const formattedLineTotal = new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "USD",
              }).format(lineTotal);
              return (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-tech-border bg-tech-surface p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-tech-surface-soft sm:h-24 sm:w-24">
                    <img
                      alt={item.title}
                      className="h-14 w-auto object-contain sm:h-16"
                      loading="lazy"
                      src={item.image}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h2 className="font-display text-sm font-semibold text-tech-ink sm:text-base">
                      {item.title}
                    </h2>
                    <p className="text-xs text-tech-muted">
                      {item.quantity} unidad{item.quantity === 1 ? "" : "es"}
                    </p>
                  </div>
                  <div className="text-right text-sm font-semibold text-tech-ink sm:text-base">
                    {formattedLineTotal}
                  </div>
                </article>
              );
            })
          )}
        </div>

        <aside className="space-y-4 rounded-2xl border border-tech-border bg-tech-surface p-6 shadow-sm">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-tech-ink">
              Resumen
            </p>
            <p className="text-sm text-tech-muted">
              {totalItems} producto{totalItems === 1 ? "" : "s"}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm text-tech-muted">
            <span>Subtotal</span>
            <span>{formattedTotal}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-tech-muted">
            <span>Envío</span>
            <span>Gratis</span>
          </div>
          <div className="flex items-center justify-between border-t border-tech-border pt-4 text-base font-semibold text-tech-ink">
            <span>Total</span>
            <span>{formattedTotal}</span>
          </div>
          <button
            className="w-full rounded-xl bg-tech-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition hover:bg-tech-primary disabled:cursor-not-allowed disabled:bg-slate-300"
            type="button"
            disabled={items.length === 0}
          >
            Pagar ahora
          </button>
          <Link
            className="inline-flex w-full items-center justify-center rounded-xl border border-tech-border px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-tech-ink transition hover:border-tech-primary hover:text-tech-primary"
            to="/cart"
          >
            Volver al carrito
          </Link>
        </aside>
      </div>
    </section>
  );
}
