import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthField from "../components/atoms/AuthField.jsx";
import useAuthStore from "../store/useAuthStore.js";

export default function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [formValues, setFormValues] = useState({
    name: "",
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
    const result = register(formValues);
    if (!result?.success) {
      setError(result?.message ?? "No pudimos crear la cuenta.");
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
            Crear cuenta
          </p>
          <h1 className="font-display text-3xl font-semibold text-tech-ink">Registrate</h1>
          <p className="text-sm text-tech-muted">
            Solo necesitamos algunos datos para continuar.
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <AuthField
            id="name"
            name="name"
            label="Nombre"
            placeholder="Tu nombre"
            type="text"
            value={formValues.name}
            onChange={handleChange}
          />

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
            placeholder="Elegí una contraseña"
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
            Crear cuenta
          </button>
        </form>

        <p className="mt-6 text-sm text-tech-muted">
          ¿Ya tenés cuenta?{" "}
          <Link className="font-semibold text-tech-ink" to="/login">
            Iniciá sesión
          </Link>
        </p>
      </div>

      <aside className="flex flex-col justify-between rounded-3xl border border-tech-border bg-tech-surface-soft p-8 text-tech-ink shadow-sm">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tech-muted">
            Checkout seguro
          </p>
          <h2 className="font-display text-2xl font-semibold">Sumate al club.</h2>
          <p className="text-sm text-tech-muted">
            Protegemos tus datos y te damos acceso a novedades y descuentos.
          </p>
        </div>
        <div className="mt-8 rounded-2xl border border-tech-border bg-white p-4 text-sm text-tech-muted">
          Tu información queda guardada solo en este dispositivo.
        </div>
      </aside>
    </section>
  );
}
