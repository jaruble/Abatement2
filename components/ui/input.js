export function Input({ type = 'text', placeholder, onChange, min, max }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      min={min}
      max={max}
      onChange={onChange}
      className="border rounded px-3 py-2 w-full"
    />
  );
}