
import React from 'react';

interface InputGroupProps {
  label: string;
  id: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  hint,
  placeholder,
  required = true,
  className = '',
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      {hint && <p className="mt-2 text-xs text-gray-500">{hint}</p>}
    </div>
  );
};

export default InputGroup;
