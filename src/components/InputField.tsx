export const InputField: React.FC<{
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (value: string | number) => void;
  error?: string | number;
}> = ({ id, label, type, placeholder, value, onChange, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-bold mb-2 text-gray-100" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
