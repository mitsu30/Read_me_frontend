export default function Input({
  id,
  label,
  value,
  type,
  placeholder,
  handleChange,
}) {
  return (
    <label htmlFor={id}>
      {label}：
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
      />
    </label>
  );
}
