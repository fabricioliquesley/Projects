import { SelectHTMLAttributes } from "react";
import "./styles.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

export const Select = ({ id, label, options, ...props }: SelectProps) => {
  return (
    <div className="select-block">
      <label htmlFor={id}>{label}</label>
      <select defaultValue={""} id={id} {...props}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
