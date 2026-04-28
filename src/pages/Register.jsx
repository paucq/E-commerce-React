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
    <section className="grid min-h-[70vh] place-items-center">
      <div className="w-full max-w-xl rounded-[2.5rem] border border-tech-border bg-tech-surface p-8 shadow-sm sm:p-10">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-tech-muted">
            Crear cuenta
          </p>
          <h1 className="font-display text-3xl font-semibold text-tech-ink sm:text-4xl">
            Registrate
          </h1>
          <p className="text-sm text-tech-muted">
            Solo necesitamos algunos datos para continuar. Podras ver nuestros descuentos y ofertas especiales.
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
            placeholder="nombre@email.com"
            type="email"
            value={formValues.email}
            onChange={handleChange}
          />

          <AuthField
            id="password"
            name="password"
            label="Contraseña"
            placeholder="Elige una contraseña"
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
            Crear cuenta
          </button>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-tech-muted">
          <span>¿Ya tienes una cuenta?</span>
          <Link
            className="rounded-full border border-tech-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-tech-ink transition hover:border-tech-primary hover:text-tech-primary"
            to="/login"
          >
            Iniciá sesión
          </Link>
        </div>
      </div>
    </section>
  );
}
