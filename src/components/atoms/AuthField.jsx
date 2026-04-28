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
    <label className="block text-sm font-semibold text-slate-700" htmlFor={id}>
      {label}
      <input
        id={id}
        name={name}
        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}
