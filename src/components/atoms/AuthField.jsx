export default function AuthField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <label className="block text-sm font-semibold text-tech-ink" htmlFor={id}>
      <span className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-tech-muted">
        {label}
      </span>
      <input
        id={id}
        name={name}
        className="mt-2 w-full rounded-2xl border border-tech-border/80 bg-white px-4 py-3 text-sm text-tech-ink shadow-[0_16px_40px_-30px_rgba(15,23,42,0.6)] transition focus:border-tech-primary focus:outline-none focus:ring-2 focus:ring-tech-primary/20"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
