import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold">
          E-commerce React
        </Link>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-500" htmlFor="search">
            Buscar
          </label>
          <input
            id="search"
            className="h-9 w-44 rounded-md border border-slate-200 px-3 text-sm focus:border-blue-500 focus:outline-none"
            placeholder="Buscar productos"
            type="search"
          />
        </div>
      </div>
    </header>
  );
}
