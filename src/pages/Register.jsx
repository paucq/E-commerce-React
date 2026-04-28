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
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Crear cuenta
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">Registrate</h1>
          <p className="text-sm text-slate-600">
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
            className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            type="submit"
          >
            Crear cuenta
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          ¿Ya tenés cuenta?{" "}
          <Link className="font-semibold text-slate-900" to="/login">
            Iniciá sesión
          </Link>
        </p>
      </div>

      <aside className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-slate-100 p-8 text-slate-900">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Checkout seguro
          </p>
          <h2 className="text-2xl font-semibold">Sumate al club.</h2>
          <p className="text-sm text-slate-600">
            Protegemos tus datos y te damos acceso a novedades y descuentos.
          </p>
        </div>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
          Tu información queda guardada solo en este dispositivo.
        </div>
      </aside>
    </section>
  );
}
