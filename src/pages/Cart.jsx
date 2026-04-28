import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore.js";

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, getTotals } =
    useCartStore();
  const { totalItems, totalPrice } = getTotals();
  const formattedTotal = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  if (items.length === 0) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Carrito
          </p>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Tu carrito esta vacio
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Agrega productos para continuar con la compra.
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          to="/"
        >
          Volver al catalogo
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4 sm:items-center">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Carrito
          </p>
          <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
            Resumen de compra
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            {totalItems} producto{totalItems === 1 ? "" : "s"} en tu carrito.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-xl border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
          type="button"
          onClick={clearCart}
        >
          Vaciar carrito
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          {items.map((item) => {
            const lineTotal = item.price * item.quantity;
            const formattedLineTotal = new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "USD",
            }).format(lineTotal);
            return (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-slate-50 sm:h-28 sm:w-28">
                  <img
                    alt={item.title}
                    className="h-16 w-auto object-contain sm:h-20"
                    loading="lazy"
                    src={item.image}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                    {item.title}
                  </h2>
                  <p className="text-sm text-slate-500">
                    ${item.price.toFixed(2)} por unidad
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
                      <button
                        className="text-sm font-semibold text-slate-600"
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        className="text-sm font-semibold text-slate-600"
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-xs font-semibold text-rose-600"
                      type="button"
                      onClick={() => removeItem(item.id)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
                <div className="text-right text-sm font-semibold text-slate-900 sm:text-base">
                  {formattedLineTotal}
                </div>
              </article>
            );
          })}
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-slate-900">
              Total estimado
            </p>
            <p className="text-2xl font-semibold text-slate-900 sm:text-3xl">
              {formattedTotal}
            </p>
            <p className="text-xs text-slate-500">
              Impuestos y envio calculados al finalizar.
            </p>
          </div>
          <button
            className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="button"
          >
            Finalizar compra
          </button>
          <Link
            className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            to="/"
          >
            Seguir comprando
          </Link>
        </aside>
      </div>
    </section>
  );
}
