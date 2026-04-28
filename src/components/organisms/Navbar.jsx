import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold">
          E-commerce React
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">Buscar</span>
          <div className="h-9 w-40 rounded-md border border-slate-200 bg-slate-50" />
        </div>
      </div>
    </header>
  );
}
