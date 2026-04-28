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
      {label}
      <input
        id={id}
        name={name}
        className="mt-2 w-full rounded-xl border border-tech-border bg-white px-4 py-3 text-sm text-tech-ink shadow-sm transition focus:border-tech-primary focus:outline-none focus:ring-2 focus:ring-tech-primary/20"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
