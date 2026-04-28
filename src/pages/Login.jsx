import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthField from "../components/atoms/AuthField.jsx";
import useAuthStore from "../store/useAuthStore.js";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(formValues);
    if (!result?.success) {
      setError(result?.message ?? "No pudimos iniciar sesión.");
      return;
    }
    setError("");
    navigate("/checkout");
  };

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Acceso
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Iniciar sesión
          </h1>
          <p className="text-sm text-slate-600">
            Retomá tu compra y guardá tu historial de pedidos.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <AuthField
            id="email"
            name="email"
            label="Email"
            placeholder="vos@email.com"
            type="email"
            value={formValues.email}
            onChange={handleChange}
          />

          <AuthField
            id="password"
            name="password"
            label="Contraseña"
            placeholder="Tu contraseña"
            type="password"
            value={formValues.password}
            onChange={handleChange}
          />

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="submit"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          ¿No tenés cuenta?{" "}
          <Link className="font-semibold text-slate-900" to="/register">
            Registrate
          </Link>
        </p>
      </div>

      <aside className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Beneficios
          </p>
          <h2 className="text-2xl font-semibold">
            Guardá tu carrito y recibí ofertas exclusivas.
          </h2>
          <p className="text-sm text-slate-300">
            Iniciá sesión para acceder al checkout y seguir con tu compra en
            cualquier momento.
          </p>
        </div>
        <div className="mt-8 rounded-2xl bg-white/10 p-4 text-sm text-slate-100">
          ¿Necesitás ayuda? Escribinos en soporte@ecommerce.com
        </div>
      </aside>
    </section>
  );
}
