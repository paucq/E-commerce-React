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
    <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[2.5rem] border border-tech-border bg-tech-surface p-8 shadow-sm sm:p-10">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-tech-muted">
            Acceso
          </p>
          <h1 className="font-display text-3xl font-semibold text-tech-ink sm:text-4xl">
            Iniciar sesión
          </h1>
          <p className="text-sm text-tech-muted">
            Retomá tu compra con un acceso rápido y seguro.
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
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            className="w-full rounded-full bg-tech-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-glow transition hover:bg-tech-primary"
            type="submit"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-tech-muted">
          <span>¿No tenés cuenta?</span>
          <Link
            className="rounded-full border border-tech-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-tech-ink transition hover:border-tech-primary hover:text-tech-primary"
            to="/register"
          >
            Registrate
          </Link>
        </div>
      </div>

      <aside className="flex flex-col justify-between rounded-[2.5rem] border border-tech-border bg-tech-ink p-8 text-white shadow-glow sm:p-10">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-tech-highlight">
            Urban Store
          </p>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Guardá tu carrito y activá beneficios exclusivos.
          </h2>
          <p className="text-sm text-slate-200">
            Volvé cuando quieras y retomá tu compra en dos clics.
          </p>
        </div>
        <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-4 text-sm text-slate-100">
          ¿Necesitás ayuda? Escribinos a soporte@ecommerce.com
        </div>
      </aside>
    </section>
  );
}
