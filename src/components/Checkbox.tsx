import React from "react";

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean | undefined;
  onChange: (checked: boolean) => void;
  className?: string;
  error?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onChange,
  className = "shadow appearance-none border rounded w-fit py-3 px-3 text-gray-700 leading-tight",
  error,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-bold mb-2 text-gray-100" htmlFor={id}>
      {label}
    </label>
    <input
      type="checkbox"
      id={id}
      name={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={className}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
