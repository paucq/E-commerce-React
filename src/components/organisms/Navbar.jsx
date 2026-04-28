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
          className="group inline-flex items-center gap-3 font-display text-2xl font-semibold tracking-tight text-tech-ink sm:text-3xl"
        >
          <span className="inline-flex items-center gap-2">
            <span className="rounded-full bg-tech-ink px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-tech-highlight shadow-glow">
              Tech Pop
            </span>
            <span className="text-tech-primary transition group-hover:text-tech-ink">E</span>-commerce
          </span>
        </Link>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <div className="relative w-full sm:w-72">
            <label className="sr-only" htmlFor="search">
              Buscar productos
            </label>
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-tech-muted">
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
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-3.5-3.5" />
              </svg>
            </span>
            <input
              id="search"
              className="h-11 w-full rounded-full border border-tech-border/80 bg-tech-surface-soft px-4 pl-11 text-sm text-tech-ink shadow-[0_18px_45px_-30px_rgba(15,23,42,0.6)] transition focus:border-tech-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-tech-primary/20"
              placeholder="Buscar productos"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/cart"
              className="inline-flex h-10 items-center gap-3 rounded-full bg-tech-ink px-4 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition hover:bg-tech-primary"
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
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
