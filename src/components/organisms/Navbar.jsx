import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore.js";
import useProductsStore from "../../store/useProductsStore.js";
import useAuthStore from "../../store/useAuthStore.js";

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useProductsStore();
  const items = useCartStore((state) => state.items);
  const { user, logout } = useAuthStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="border-b border-tech-border bg-tech-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to="/"
          className="font-display text-xl font-semibold tracking-tight text-tech-ink"
        >
          <span className="text-tech-primary">E</span>-commerce React
        </Link>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-muted" htmlFor="search">
              Buscar
            </label>
            <input
              id="search"
              className="h-10 w-full rounded-xl border border-tech-border bg-white px-4 text-sm text-tech-ink shadow-sm transition focus:border-tech-primary focus:outline-none focus:ring-2 focus:ring-tech-primary/20 sm:w-64"
              placeholder="Buscar productos"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/cart"
              className="inline-flex items-center gap-3 rounded-full bg-tech-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition hover:bg-tech-primary"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6h15l-1.5 8.5a2 2 0 0 1-2 1.5H8a2 2 0 0 1-2-1.6L4 4H2" />
                  <circle cx="9" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-tech-highlight text-[0.6rem] font-semibold text-tech-ink">
                  {totalItems}
                </span>
              </span>
              <span>Carrito</span>
            </Link>
            {user ? (
              <button
                className="rounded-full border border-tech-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-tech-muted transition hover:border-tech-primary hover:text-tech-primary"
                type="button"
                onClick={logout}
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded-full border border-tech-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-tech-muted transition hover:border-tech-primary hover:text-tech-primary"
              >
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
