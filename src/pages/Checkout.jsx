import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore.js";

export default function Checkout() {
  const { items, getTotals, clearCart } = useCartStore();
  const { totalItems, totalPrice } = getTotals();
  const formattedTotal = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [formValues, setFormValues] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleOpenModal = () => {
    if (items.length === 0) {
      return;
    }
    setIsModalOpen(true);
  };

  const resetModalState = () => {
    setPaymentStatus("idle");
    setFormValues({
      name: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });
  };

  const handleCloseModal = () => {
    if (paymentStatus === "processing") {
      return;
    }
    setIsModalOpen(false);
    resetModalState();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentStatus === "processing") {
      return;
    }
    setPaymentStatus("processing");
    timerRef.current = setTimeout(() => {
      setPaymentStatus("success");
      clearCart();
      timerRef.current = setTimeout(() => {
        setIsModalOpen(false);
        resetModalState();
      }, 1200);
    }, 1600);
  };

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
            onClick={handleOpenModal}
          >
            Finalizar compra
          </button>
          <Link
            className="inline-flex w-full items-center justify-center rounded-xl border border-tech-border px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-tech-ink transition hover:border-tech-primary hover:text-tech-primary"
            to="/cart"
          >
            Volver al carrito
          </Link>
        </aside>
      </div>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8"
          role="dialog"
          aria-modal="true"
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-tech-border bg-tech-surface p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-muted">
                  Pasarela de pago
                </p>
                <h2 className="font-display text-xl font-semibold text-tech-ink">
                  Completá los datos de tu tarjeta
                </h2>
                <p className="text-sm text-tech-muted">
                  Total a pagar: {formattedTotal}
                </p>
              </div>
              <button
                className="rounded-full border border-tech-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-tech-muted transition hover:border-tech-primary hover:text-tech-primary disabled:cursor-not-allowed"
                type="button"
                onClick={handleCloseModal}
                disabled={paymentStatus === "processing"}
              >
                Cerrar
              </button>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm font-semibold text-tech-ink">
                Nombre en la tarjeta
                <input
                  className="mt-2 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm text-tech-ink shadow-sm focus:border-tech-primary focus:outline-none focus:ring-2 focus:ring-tech-primary/20 disabled:bg-slate-100"
                  name="name"
                  placeholder="Lucia Martinez"
                  type="text"
                  value={formValues.name}
                  onChange={handleChange}
                  disabled={paymentStatus !== "idle"}
                  required
                />
              </label>
              <label className="block text-sm font-semibold text-tech-ink">
                Numero de tarjeta
                <input
                  className="mt-2 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm text-tech-ink shadow-sm focus:border-tech-primary focus:outline-none focus:ring-2 focus:ring-tech-primary/20 disabled:bg-slate-100"
                  name="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  type="text"
                  value={formValues.cardNumber}
                  onChange={handleChange}
                  disabled={paymentStatus !== "idle"}
                  required
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-tech-ink">
                  Vencimiento
                  <input
                    className="mt-2 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm text-tech-ink shadow-sm focus:border-tech-primary focus:outline-none focus:ring-2 focus:ring-tech-primary/20 disabled:bg-slate-100"
                    name="expiry"
                    placeholder="MM/AA"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    type="text"
                    value={formValues.expiry}
                    onChange={handleChange}
                    disabled={paymentStatus !== "idle"}
                    required
                  />
                </label>
                <label className="block text-sm font-semibold text-tech-ink">
                  CVV
                  <input
                    className="mt-2 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm text-tech-ink shadow-sm focus:border-tech-primary focus:outline-none focus:ring-2 focus:ring-tech-primary/20 disabled:bg-slate-100"
                    name="cvv"
                    placeholder="123"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    type="password"
                    value={formValues.cvv}
                    onChange={handleChange}
                    disabled={paymentStatus !== "idle"}
                    required
                  />
                </label>
              </div>

              {paymentStatus === "processing" ? (
                <div className="rounded-xl border border-tech-border bg-tech-surface-soft px-4 py-3 text-sm text-tech-muted">
                  Procesando tu pago, no cierres esta ventana.
                </div>
              ) : null}
              {paymentStatus === "success" ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Pago aprobado. Estamos preparando tu pedido.
                </div>
              ) : null}

              <button
                className="w-full rounded-xl bg-tech-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition hover:bg-tech-primary disabled:cursor-not-allowed disabled:bg-slate-300"
                type="submit"
                disabled={paymentStatus !== "idle"}
              >
                {paymentStatus === "processing" ? "Procesando..." : "Pagar"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
