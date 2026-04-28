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
      <div className="rounded-3xl border border-tech-border bg-tech-surface p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-muted">
            Acceso
          </p>
          <h1 className="font-display text-3xl font-semibold text-tech-ink">
            Iniciar sesión
          </h1>
          <p className="text-sm text-tech-muted">
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
            className="w-full rounded-xl bg-tech-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition hover:bg-tech-primary"
            type="submit"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-sm text-tech-muted">
          ¿No tenés cuenta?{" "}
          <Link className="font-semibold text-tech-ink" to="/register">
            Registrate
          </Link>
        </p>
      </div>

      <aside className="flex flex-col justify-between rounded-3xl border border-tech-border bg-tech-ink p-8 text-white shadow-glow">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-highlight">
            Beneficios
          </p>
          <h2 className="font-display text-2xl font-semibold">
            Guardá tu carrito y recibí ofertas exclusivas.
          </h2>
          <p className="text-sm text-slate-200">
            Iniciá sesión para acceder al checkout y seguir con tu compra en
            cualquier momento.
          </p>
        </div>
        <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-slate-100">
          ¿Necesitás ayuda? Escribinos en soporte@ecommerce.com
        </div>
      </aside>
    </section>
  );
}
