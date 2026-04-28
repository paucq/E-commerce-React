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
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold">
          E-commerce React
        </Link>
        <div className="flex items-center gap-4">
          <label className="text-sm text-slate-500" htmlFor="search">
            Buscar
          </label>
          <input
            id="search"
            className="h-9 w-44 rounded-md border border-slate-200 px-3 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="Buscar productos"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          {user ? (
            <button
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              type="button"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Ingresar
            </Link>
          )}
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Carrito
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
