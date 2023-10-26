import React from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  id: string;
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  label,
  name,
  value,
  options,
  onChange,
  className = "mb-4",
  labelClassName = "block text-sm font-bold mb-2 text-gray-100",
  selectClassName = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight",
}) => {
  return (
    <div className={className}>
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClassName}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
