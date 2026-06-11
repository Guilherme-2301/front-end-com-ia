export default function Input({ label, type = "text", name, value, onChange, hasError }) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        style={{
          border: hasError ? "2px solid red" : "1px solid #ccc"
        }}
      />
    </div>
  );
}