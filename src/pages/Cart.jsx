import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/useCartStore.js";

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, getTotals } =
    useCartStore();
  const { totalItems, totalPrice } = getTotals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const modalRef = useRef(null);
  const timerRef = useRef(null);
  const formattedTotal = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
  }).format(totalPrice);

  const openModal = () => {
    setPaymentStatus("idle");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPaymentStatus("idle");
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentStatus !== "idle") return;
    setPaymentStatus("processing");
    timerRef.current = setTimeout(() => {
      setPaymentStatus("success");
    }, 1800);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = modalRef.current?.querySelectorAll(
      focusableSelector
    );
    if (focusableElements?.length) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }
      if (event.key !== "Tab") return;
      if (!focusableElements || focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  if (items.length === 0) {
    return (
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-muted">
            Carrito
          </p>
          <h1 className="font-display text-2xl font-semibold text-tech-ink sm:text-3xl">
            Tu carrito está vacío
          </h1>
          <p className="text-sm text-tech-muted sm:text-base">
            Agregá productos para continuar con la compra.
          </p>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-xl border border-tech-border px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-tech-ink transition hover:border-tech-primary hover:text-tech-primary"
          to="/"
        >
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4 sm:items-center">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-muted">
            Carrito
          </p>
          <h1 className="font-display text-2xl font-semibold text-tech-ink sm:text-3xl">
            Resumen de compra
          </h1>
          <p className="text-sm text-tech-muted sm:text-base">
            {totalItems} producto{totalItems === 1 ? "" : "s"} en tu carrito.
          </p>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-xl border border-rose-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
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
                className="flex flex-col gap-4 rounded-2xl border border-tech-border bg-tech-surface p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-tech-surface-soft sm:h-28 sm:w-28">
                  <img
                    alt={item.title}
                    className="h-16 w-auto object-contain sm:h-20"
                    loading="lazy"
                    src={item.image}
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2">
                  <h2 className="font-display text-base font-semibold text-tech-ink sm:text-lg">
                    {item.title}
                  </h2>
                  <p className="text-sm text-tech-muted">
                    ${item.price.toFixed(2)} por unidad
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full border border-tech-border px-3 py-1">
                      <button
                        className="text-sm font-semibold text-tech-muted hover:text-tech-primary"
                        type="button"
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold text-tech-ink">
                        {item.quantity}
                      </span>
                      <button
                        className="text-sm font-semibold text-tech-muted hover:text-tech-primary"
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-xs font-semibold uppercase tracking-[0.15em] text-rose-600"
                      type="button"
                      onClick={() => removeItem(item.id)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
                <div className="text-right text-sm font-semibold text-tech-ink sm:text-base">
                  {formattedLineTotal}
                </div>
              </article>
            );
          })}
        </div>

        <aside className="space-y-4 rounded-2xl border border-tech-border bg-tech-surface p-6 shadow-sm">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-tech-ink">
              Total estimado
            </p>
            <p className="font-display text-2xl font-semibold text-tech-ink sm:text-3xl">
              {formattedTotal}
            </p>
            <p className="text-xs text-tech-muted">
              Impuestos y envío calculados al finalizar.
            </p>
          </div>
          <button
            className="w-full rounded-xl bg-tech-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition hover:bg-tech-primary"
            type="button"
            onClick={openModal}
          >
            Finalizar compra
          </button>
          <Link
            className="inline-flex w-full items-center justify-center rounded-xl border border-tech-border px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-tech-ink transition hover:border-tech-primary hover:text-tech-primary"
            to="/"
          >
            Seguir comprando
          </Link>
        </aside>
      </div>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          role="presentation"
        >
          <div
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-title"
            className="relative w-full max-w-2xl rounded-3xl border border-tech-border bg-white/95 p-6 shadow-2xl backdrop-blur sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-muted">
                  Pasarela de pago Urban Store
                </p>
                <h2
                  id="payment-title"
                  className="font-display text-xl font-semibold text-tech-ink sm:text-2xl"
                >
                  Finalizar compra segura
                </h2>
                <p className="text-sm text-tech-muted">
                  Total a pagar: {formattedTotal}
                </p>
              </div>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-tech-border text-lg text-tech-muted transition hover:border-tech-primary hover:text-tech-primary"
                type="button"
                onClick={closeModal}
                aria-label="Cerrar"
              >
                X
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-tech-border bg-tech-surface-soft p-4 text-xs text-tech-muted">
              Esta es una simulacion de pago. Tus datos no se guardan.
            </div>

            {paymentStatus === "success" ? (
              <div className="mt-6 space-y-6">
                <div className="rounded-2xl border border-tech-border bg-white p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
                    OK
                  </div>
                  <h3 className="font-display text-lg font-semibold text-tech-ink">
                    Pago confirmado
                  </h3>
                  <p className="mt-2 text-sm text-tech-muted">
                    Enviamos tu comprobante por email. Gracias por tu compra.
                  </p>
                </div>
                <button
                  className="w-full rounded-xl bg-tech-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition hover:bg-tech-primary"
                  type="button"
                  onClick={closeModal}
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
                  <div className="space-y-2">
                    <label
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-muted"
                      htmlFor="card-number"
                    >
                      Numero de tarjeta
                    </label>
                    <input
                      id="card-number"
                      name="cardNumber"
                      type="text"
                      inputMode="numeric"
                      placeholder="1234 5678 9012 3456"
                      className="w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm text-tech-ink outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-tech-primary/20"
                      required
                      disabled={paymentStatus === "processing"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-muted"
                      htmlFor="expiry"
                    >
                      Vencimiento
                    </label>
                    <input
                      id="expiry"
                      name="expiry"
                      type="text"
                      placeholder="MM/AA"
                      className="w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm text-tech-ink outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-tech-primary/20"
                      required
                      disabled={paymentStatus === "processing"}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
                  <div className="space-y-2">
                    <label
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-muted"
                      htmlFor="card-name"
                    >
                      Nombre en la tarjeta
                    </label>
                    <input
                      id="card-name"
                      name="cardName"
                      type="text"
                      placeholder="Nombre y apellido"
                      className="w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm text-tech-ink outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-tech-primary/20"
                      required
                      disabled={paymentStatus === "processing"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-tech-muted"
                      htmlFor="cvv"
                    >
                      CVV
                    </label>
                    <input
                      id="cvv"
                      name="cvv"
                      type="password"
                      inputMode="numeric"
                      placeholder="123"
                      className="w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm text-tech-ink outline-none transition focus:border-tech-primary focus:ring-2 focus:ring-tech-primary/20"
                      required
                      disabled={paymentStatus === "processing"}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    className="rounded-xl border border-tech-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-tech-ink transition hover:border-tech-primary hover:text-tech-primary"
                    type="button"
                    onClick={closeModal}
                    disabled={paymentStatus === "processing"}
                  >
                    Cancelar
                  </button>
                  <button
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-tech-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition hover:bg-tech-primary disabled:cursor-wait disabled:bg-tech-ink/70"
                    type="submit"
                    disabled={paymentStatus === "processing"}
                  >
                    {paymentStatus === "processing" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                        Procesando
                      </>
                    ) : (
                      "Confirmar pago"
                    )}
                  </button>
                </div>

                {paymentStatus === "processing" ? (
                  <div className="rounded-2xl border border-tech-border bg-white p-4 text-sm text-tech-muted">
                    <div className="flex items-center justify-between">
                      <span>Conectando con el gateway</span>
                      <span className="text-tech-ink">{formattedTotal}</span>
                    </div>
                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-tech-surface-soft">
                      <div className="h-full w-2/3 animate-pulse rounded-full bg-tech-primary" />
                    </div>
                  </div>
                ) : null}
              </form>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
