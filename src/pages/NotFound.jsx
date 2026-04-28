import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Página no encontrada</h1>
      <p className="text-slate-600">La ruta que buscás no existe.</p>
      <Link className="text-sm font-semibold text-blue-600" to="/">
        Volver al inicio
      </Link>
    </section>
  );
}
