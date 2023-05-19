export default function Button({ text, type, handleClick, disabled }) {
  return (
    <button type={type} onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  );
}
